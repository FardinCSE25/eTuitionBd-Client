import React, { useRef } from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import UseRole from '../../Hooks/UseRole';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaUserGraduate, FaBook, FaGraduationCap, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaEnvelope, FaCheckCircle, FaPaperPlane, FaUserTie } from 'react-icons/fa';
import TuitionDetailsLoading from '../../Components/Loading/HomePage/TuitionDetailsLoading';

const TuitionDetails = () => {
    const { id } = useParams();
    const axiosInstance = UseAxios();
    const { role } = UseRole()
    const modalRef = useRef(null);
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const { data: tuitions = [], isLoading, refetch } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-tuitions?status=Approved`);
            return res.data;
        },
    });

    const { data: tuition = [] } = useQuery({
        queryKey: ["tuition", id, user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tuitions/${id}/tutor?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <TuitionDetailsLoading />;
    }

    const exactTuition = tuitions.result?.find(tuition => tuition._id === id);

    if (!exactTuition) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-4xl text-red-500">❌</span>
                    </div>
                    <h2 className="text-3xl font-bold text-secondary mb-3">Tuition Not Found!</h2>
                    <p className="text-slate-600 max-w-md mx-auto">The tuition you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    const handleApply = (e) => {
        e.preventDefault()

        const form = e.target;
        const appliedTutorInfo = {
            tuition: exactTuition,
            name: form.name.value,
            email: form.email.value,
            qualification: form.qualification.value,
            experience: form.experience.value,
            expectedSalary: form.salary.value,
            photoURL: user.photoURL
        };

        axiosSecure.patch(`/tuitions/apply`, appliedTutorInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "🎉 Successfully Applied!",
                        text: "Your application has been submitted successfully!",
                        icon: "success",
                        confirmButtonColor: "#3B82F6",
                        background: '#f8fafc',
                        customClass: {
                            popup: 'rounded-2xl border border-slate-200'
                        }
                    });
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="min-h-screen py-8 lg:pt-44 lg:pb-12 px-4">
            <div className="max-w-11/12 mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-primary to-primary/90 rounded-2xl mb-6 shadow-xl">
                        <FaBook className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        Tuition Details
                    </h1>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-lg font-semibold text-secondary">
                                Status:
                                <span className="text-primary ml-2 font-bold">Approved</span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 mb-8"
                >
                    {/* Card Header */}
                    <div className="bg-linear-to-r from-primary via-primary/90 to-primary p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-white">{exactTuition.subject}</h2>
                                <p className="text-blue-100 mt-1">Tuition Opportunity</p>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                <FaCalendarAlt className="text-white" />
                                <span className="text-white font-medium">
                                    Posted: {new Date(exactTuition.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-8">
                        {/* Student Info Section */}
                        <div className="mb-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-linear-to-r from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                                    <FaUserGraduate className="text-3xl text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-secondary">{exactTuition.studentName}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaEnvelope className="text-slate-400 text-sm" />
                                        <p className="text-slate-600">{exactTuition.studentEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {/* Subject Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FaBook className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-secondary">Subject</h4>
                                        <p className="text-2xl font-bold text-primary mt-2">{exactTuition.subject}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Class Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FaGraduationCap className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-secondary">Class Level</h4>
                                        <p className="text-2xl font-bold text-primary mt-2">{exactTuition.class}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Location Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FaMapMarkerAlt className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-secondary">Location</h4>
                                        <p className="text-2xl font-bold text-primary mt-2">{exactTuition.location}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Budget Card */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FaMoneyBillWave className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-secondary">Monthly Budget</h4>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-2xl font-bold text-primary">৳{exactTuition.budget}</span>
                                            <span className="text-slate-500">/ month</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Additional Info */}
                        <div className="p-6 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-2xl border border-primary/10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-xl text-primary" />
                                    <div>
                                        <h4 className="font-semibold text-secondary">Posted Date</h4>
                                        <p className="text-slate-600">
                                            {new Date(exactTuition.created_at).toLocaleString("en-US", {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Apply Button Section */}
                {role.role === "Tutor" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                        {tuition?.length === 1 ? (
                            <div className="inline-flex items-center gap-3 bg-linear-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl shadow-lg">
                                <FaCheckCircle className="text-xl" />
                                <span className="text-lg font-semibold">Already Applied</span>
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => modalRef.current.showModal()}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                            >
                                <FaPaperPlane className="text-xl" />
                                Apply for this Tuition
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center text-slate-600"
                >
                    <p className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200">
                        <span className="text-primary">💡</span>
                        Interested tutors can apply directly through the application form
                    </p>
                </motion.div>
            </div>

            {/* Apply Modal */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box p-0 max-w-2xl overflow-hidden bg-white rounded-3xl border border-slate-200">
                    {/* Modal Header */}
                    <div className="bg-linear-to-r from-primary to-primary/90 p-8">
                        <h3 className="text-2xl font-bold text-white">Apply for Tuition</h3>
                        <p className="text-blue-50/90 mt-1">Submit your application for this tuition opportunity</p>
                    </div>

                    {/* Modal Content */}
                    <form onSubmit={handleApply} className="p-8">
                        <div className="space-y-6">
                            {/* Applicant Info */}
                            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/10">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-secondary">{user.displayName}</h4>
                                    <p className="text-sm text-slate-500">{user.email}</p>
                                </div>
                                <div className="ml-auto">
                                    <FaUserTie className="text-2xl text-primary" />
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className=" text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user.displayName}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                        readOnly
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className=" text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        Your Email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        defaultValue={user.email}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
                                        readOnly
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-3 items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        Qualifications
                                    </label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        placeholder="e.g., B.Sc. in Mathematics, M.A. in English"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-secondary mb-3 items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        Experience (Years)
                                    </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        placeholder="e.g., 3"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400"
                                        min="0"
                                        step="0.5"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className=" text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    Expected Salary (৳)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary font-bold">৳</span>
                                    <input
                                        type="number"
                                        name="salary"
                                        placeholder="e.g., 5000"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-3 focus:ring-primary/20 transition-all duration-300 bg-white text-secondary placeholder-slate-400"
                                        min="1000"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2">Monthly salary expectation in BDT</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-8 mt-8 border-t border-slate-100">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-primary to-primary/90 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
                            >
                                <FaPaperPlane />
                                Submit Application
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => modalRef.current.close()}
                                className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-slate-300 text-secondary hover:bg-slate-50 hover:border-primary/50 rounded-xl font-medium transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    <button
                        className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white border-none"
                        onClick={() => modalRef.current.close()}
                    >
                        ✕
                    </button>
                </div>

                <form method="dialog" className="modal-backdrop bg-black/50 backdrop-blur-sm">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TuitionDetails;