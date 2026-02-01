import React from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaBook, FaUserGraduate, FaMapMarkerAlt, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';
import RecentTuitionsLoading from '../Loading/HomePage/RecentTuitionsLoading';

const RecentTuitions = () => {
    const axiosInstance = UseAxios();

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ['recent-tuitions'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/recent-tuitions?status=Approved`);
            return res.data;
        }
    });

    if (isLoading) return <RecentTuitionsLoading />;

    return (
        <div className="w-11/12 mx-auto my-20">
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-center text-3xl font-bold text-secondary mb-10"
            >
                Recent Tuitions
            </motion.h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map(tuition => (
                    <motion.div
                        key={tuition._id}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        transition={{
                            duration: 0.35,
                            ease: 'easeOut',
                            hover: { type: "spring", stiffness: 300 }
                        }}
                        className="group relative"
                    >
                        {/* Background Glow Effect */}
                        <div className="absolute -inset-0.5 bg-linear-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>

                        {/* Card */}
                        <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-2xl transition-all duration-300 group-hover:border-primary/30">
                            {/* Subject Header - Moved inside card */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-linear-to-r from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                                        <FaBook className="text-xl text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-secondary">{tuition.subject}</h2>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                                Approved
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                    <div className="w-10 h-10 bg-linear-to-br from-primary/10 to-blue-500/10 rounded-full flex items-center justify-center">
                                        <FaUserGraduate className="text-lg text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-secondary">{tuition.studentName}</h3>
                                        <p className="text-sm text-slate-500">Student</p>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="space-y-4">
                                {/* Class */}
                                <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <FaGraduationCap className="text-primary" />
                                        </div>
                                        <span className="font-medium text-slate-700">Class</span>
                                    </div>
                                    <span className="font-bold text-secondary">{tuition.class}</span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <FaMapMarkerAlt className="text-primary" />
                                        </div>
                                        <span className="font-medium text-slate-700">Location</span>
                                    </div>
                                    <span className="font-semibold text-secondary truncate max-w-[120px]">
                                        {tuition.location || 'Flexible'}
                                    </span>
                                </div>

                                {/* Budget */}
                                <div className="p-4 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-xl text-primary" />
                                            <span className="font-semibold text-slate-700">Budget</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-secondary">
                                                ৳{tuition.budget || 'Negotiable'}
                                            </div>
                                            <div className="text-xs text-slate-500">per month</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentTuitions;