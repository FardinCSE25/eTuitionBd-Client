import React, { useState } from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBookOpen, FaMapMarkerAlt, FaMoneyBillWave, FaPaperPlane } from 'react-icons/fa';

const PostNewTuition = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePostTuition = async (data) => {
        setIsSubmitting(true);
        console.log("Tuition Form Submitted:", data);

        const result = await Swal.fire({
            title: `<h2 class="text-2xl font-bold text-secondary">📚 Confirm Tuition Post?</h2>`,
            html: `
                <div class="text-left space-y-2 mt-4">
                    <p class="text-secondary"><span class="font-semibold">Subject:</span> ${data.subject}</p>
                    <p class="text-secondary"><span class="font-semibold">Class:</span> ${data.class}</p>
                    <p class="text-secondary"><span class="font-semibold">Location:</span> ${data.location}</p>
                    <p class="text-secondary"><span class="font-semibold">Budget:</span> ৳${data.budget}</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3B82F6",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "<span class='text-white font-semibold px-4 py-2'>Confirm Post</span>",
            cancelButtonText: "<span class='text-white font-semibold'>Cancel</span>",
            background: '#f8fafc',
            customClass: {
                popup: 'rounded-2xl border border-slate-200',
                confirmButton: 'rounded-lg',
                cancelButton: 'rounded-lg'
            }
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.post('/tuitions', data);

                if (res.data.message === "tuition exists") {
                    Swal.fire({
                        title: "Already Posted!",
                        text: "You have already posted this tuition before!",
                        icon: "warning",
                        background: '#f8fafc',
                        customClass: {
                            popup: 'rounded-2xl border border-slate-200'
                        }
                    });
                    reset();
                    setIsSubmitting(false);
                    return;
                }

                if (res.data.insertedId) {
                    Swal.fire({
                        title: "🎉 Success!",
                        text: "Your tuition request has been posted successfully!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false,
                        background: '#f8fafc',
                        customClass: {
                            popup: 'rounded-2xl border border-slate-200'
                        }
                    });
                    reset();
                }
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to post tuition request. Please try again.",
                    icon: "error",
                    background: '#f8fafc',
                    customClass: {
                        popup: 'rounded-2xl border border-slate-200'
                    }
                });
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-secondary rounded-2xl mb-6 shadow-lg">
                        <FaUserGraduate className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text">
                        Post New Tuition
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Find the perfect tutor for your academic journey. Fill in the details below to post your tuition request.
                    </p>
                </motion.div>

                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
                >
                    {/* Form Header */}
                    <div className="bg-linear-to-r from-primary via-primary/90 to-primary p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Tuition Details</h2>
                                <p className="text-blue-100 mt-2">Fill in all required information</p>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                                    <span className="text-white font-semibold">Step 1 of 1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit(handlePostTuition)} className="p-8">
                        {/* Personal Information Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-10 bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FaUserGraduate className="text-primary text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-2 items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Your Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            defaultValue={user?.displayName}
                                            {...register("studentName", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Name must be at least 3 characters"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.studentName ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.studentName && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.studentName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-2 items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Your Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            defaultValue={user?.email}
                                            {...register("studentEmail", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.studentEmail ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                            placeholder="Enter your email"
                                        />
                                        {errors.studentEmail && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.studentEmail.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Academic Details Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-10 bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FaBookOpen className="text-primary text-xl" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary">Academic Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-2 items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Subject
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...register("subject", {
                                                required: "Subject is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Subject must be at least 2 characters"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.subject ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                            placeholder="e.g. Mathematics, Physics, Chemistry"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.subject.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-2 items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Class Level
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...register("class", {
                                                required: "Class level is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Class level must be at least 2 characters"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.class ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                            placeholder="e.g. Class 9, HSC, O Level"
                                        />
                                        {errors.class && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.class.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Location & Budget Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-10 bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <FaMapMarkerAlt className="text-primary text-xl" />
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary">Location</h3>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            {...register("location", {
                                                required: "Location is required",
                                                minLength: {
                                                    value: 3,
                                                    message: "Location must be at least 3 characters"
                                                }
                                            })}
                                            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.location ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                            placeholder="e.g. Mirpur, Dhanmondi, Gulshan"
                                        />
                                        {errors.location && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.location.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <FaMoneyBillWave className="text-primary text-xl" />
                                        </div>
                                        <h3 className="text-xl font-bold text-secondary">Budget</h3>
                                    </div>
                                    <div className="relative">
                                        <div className="flex items-center">
                                            <span className="absolute left-4 text-secondary font-bold">৳</span>
                                            <input
                                                type="number"
                                                {...register("budget", {
                                                    required: "Budget is required",
                                                    min: {
                                                        value: 1000,
                                                        message: "Minimum budget is ৳1000"
                                                    },
                                                    max: {
                                                        value: 50000,
                                                        message: "Maximum budget is ৳50,000"
                                                    }
                                                })}
                                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${errors.budget ? 'border-red-300' : 'border-slate-200'} focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400`}
                                                placeholder="e.g. 4000"
                                            />
                                        </div>
                                        {errors.budget && (
                                            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                                ⚠️ {errors.budget.message}
                                            </p>
                                        )}
                                        <p className="text-slate-500 text-sm mt-2">Monthly tuition fee in BDT</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center"
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`group relative inline-flex items-center justify-center gap-3 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 ${isSubmitting
                                        ? 'bg-slate-400 cursor-not-allowed'
                                        : 'bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90'
                                    } text-white shadow-xl hover:shadow-2xl`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                                        Post Tuition Request
                                    </>
                                )}
                            </button>
                            <p className="text-slate-500 text-sm mt-4 text-center">
                                Your tuition request will be reviewed and visible to tutors shortly.
                            </p>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-slate-600"
                >
                    <p className="text-sm">
                        💡 Tip: Be specific about your requirements to attract the right tutors.
                        Typically, tutors respond within 24 hours.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default PostNewTuition;