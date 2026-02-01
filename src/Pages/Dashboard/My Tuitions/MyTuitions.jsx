import React, { useRef, useState } from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaCheckCircle } from 'react-icons/fa';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';
import MyTuitionsLoading from '../../../Components/Loading/Dashboard/MyTuitionsLoading';

const MyTuitions = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const [selectedTuition, setSelectedTuition] = useState(null);
    const modalRef = useRef(null);

    const { data: tuitions = [], refetch, isLoading } = useQuery({
        queryKey: ["my-tuitions", user?.email, "Approved"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user?.email}&status=Approved`)
            return res.data
        }
    })

    const handleTuitionDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to regain this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, Delete",
            background: '#f8fafc',
            color: '#1E293B',
            iconColor: '#dc2626'
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your tuition has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#3B82F6",
                                background: '#f8fafc',
                                color: '#1E293B',
                                iconColor: '#059669'
                            })
                        }
                    })
            }
        })
    };

    const handleTuitionUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedTuition = {
            studentName: form.studentName.value,
            subject: form.subject.value,
            class: form.class.value,
            budget: form.budget.value
        };

        axiosSecure.patch(`/tuitions/${selectedTuition._id}/update`, updatedTuition)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "Updated!",
                        text: "Tuition updated successfully!",
                        icon: "success",
                        confirmButtonColor: "#3B82F6",
                        background: '#f8fafc',
                        color: '#1E293B',
                        iconColor: '#059669'
                    });
                }
            })
            .catch(err => console.log(err));
    };

    // Loading skeleton
    if (isLoading) return <MyTuitionsLoading/>;
    

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
                        My Tuitions
                    </h1>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-lg font-semibold text-secondary">
                                Total Approved:
                                <span className="text-primary ml-2 font-bold text-xl">
                                    {tuitions.length}
                                </span>
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="bg-linear-to-r from-primary/90 to-primary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Active Tuitions</p>
                                <h3 className="text-3xl font-bold text-white mt-2">{tuitions.length}</h3>
                            </div>
                            <FaCheckCircle className="text-4xl text-white/90" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="bg-linear-to-r from-primary via-blue-500 to-blue-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Total Budget</p>
                                <h3 className="text-3xl font-bold text-white mt-2">
                                    ৳{tuitions.reduce((sum, tuition) => sum + parseInt(tuition.budget || 0), 0)}
                                </h3>
                            </div>
                            <div className="text-4xl text-white">৳</div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="bg-linear-to-r from-primary to-secondary rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-primary/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-50 text-sm font-medium">Status</p>
                                <h3 className="text-2xl font-bold text-white mt-2">All Approved</h3>
                            </div>
                            <div className="text-4xl text-white/90">✓</div>
                        </div>
                    </motion.div>
                </div>

                {/* Tuitions Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="px-6 py-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-secondary">Tuition List</h2>
                            <div className="text-sm text-slate-500">
                                Showing {tuitions.length} approved tuitions
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="min-w-full divide-y divide-slate-100">
                                <thead className="bg-linear-to-r from-primary to-primary/90">
                                    <tr>
                                        {["SL No", "Student", "Subject", "Class", "Budget", "Actions"].map((header, idx) => (
                                            <th
                                                key={idx}
                                                className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    <AnimatePresence>
                                        {tuitions.map((tuition, index) => (
                                            <motion.tr
                                                key={tuition._id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                whileHover={{
                                                    scale: 1.01,
                                                    backgroundColor: "rgba(59, 130, 246, 0.03)"
                                                }}
                                                className="group hover:bg-primary/5 transition-all duration-200"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="shrink-0 h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                                                            <span className="text-lg font-bold text-primary">{index + 1}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-md">
                                                            {tuition.studentName.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-semibold text-secondary">
                                                                {tuition.studentName}
                                                            </div>
                                                            <div className="text-xs text-slate-500">
                                                                {user?.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                                                        {tuition.subject}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-secondary">
                                                        {tuition.class}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="text-lg font-bold text-secondary">
                                                            ৳{tuition.budget}
                                                        </span>
                                                        <span className="ml-2 text-xs text-slate-400">/month</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => {
                                                                setSelectedTuition(tuition);
                                                                modalRef.current.showModal();
                                                            }}
                                                            className="p-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                        >
                                                            <FaEdit className="w-4 h-4" />
                                                        </motion.button>

                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleTuitionDelete(tuition._id)}
                                                            className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                                        >
                                                            <FaTrash className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {tuitions.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-4xl text-primary">📚</span>
                                </div>
                                <h3 className="text-xl font-semibold text-secondary mb-2">
                                    No Approved Tuitions Found
                                </h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    Your approved tuitions will appear here once they are approved by the admin
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Update Modal */}
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box p-0 max-w-2xl overflow-hidden bg-white">
                        <div className="bg-linear-to-r from-primary to-primary/90 p-6">
                            <h3 className="text-2xl font-bold text-white">Update Tuition Details</h3>
                            <p className="text-blue-50/90 mt-1">Make changes to your tuition information</p>
                        </div>

                        {selectedTuition && (
                            <form onSubmit={handleTuitionUpdate} className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                Student Name
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="studentName"
                                            defaultValue={selectedTuition.studentName}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                Subject
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            defaultValue={selectedTuition.subject}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                Class
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="class"
                                            defaultValue={selectedTuition.class}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-semibold text-secondary flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                                Budget (৳)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="budget"
                                            defaultValue={selectedTuition.budget}
                                            className="input input-bordered w-full bg-white border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-secondary"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        className="btn flex-1 bg-primary border-none text-white hover:bg-primary/90 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <FaEdit className="mr-2" />
                                        Update Tuition
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => modalRef.current.close()}
                                        className="btn btn-outline border-slate-300 text-secondary hover:bg-slate-50 hover:border-primary/50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <button
                            className="btn btn-sm btn-circle absolute right-4 top-4 bg-white/20 hover:bg-white/30 text-white border-none"
                            onClick={() => modalRef.current.close()}
                        >
                            ✕
                        </button>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
};

export default MyTuitions;