import { useQuery } from '@tanstack/react-query';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import UseAxios from '../../Hooks/UseAxios';
import Loading from '../Loading/Loading';
import { FaUserTie, FaGraduationCap, FaStar, FaEnvelope, FaCalendarAlt, FaBook } from 'react-icons/fa';
import RecentTuitionsLoading from '../Loading/HomePage/RecentTuitionsLoading';
import RecentTutorsLoading from '../Loading/HomePage/RecentTutorsLoading';

const RecentTutors = () => {
    const axiosInstance = UseAxios();

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ['recent-tutors'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/recent-tutors?role=Tutor`);
            return res.data;
        }
    });

    if (isLoading) return <RecentTutorsLoading />;

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
                Latest Tutors
            </motion.h1>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                    <motion.div
                        key={tutor._id}
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
                            {/* Tutor Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-linear-to-r from-primary/10 to-primary/5 rounded-full flex items-center justify-center overflow-hidden">
                                            <img
                                                src={tutor.photoURL || 'https://via.placeholder.com/100'}
                                                alt={tutor.displayName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Online Status Badge */}
                                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-secondary">{tutor.displayName}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Tutor Info Grid */}
                            <div className="space-y-4">
                                {/* Email */}
                                <div className="flex items-center justify-between p-3 bg-linear-to-r from-slate-50 to-slate-100 rounded-xl group-hover:from-primary/5 group-hover:to-blue-50 transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                            <FaEnvelope className="text-primary" />
                                        </div>
                                        <span className="font-medium text-slate-700">Email</span>
                                    </div>
                                    <span className="font-semibold text-secondary text-sm truncate">
                                        {tutor.email}
                                    </span>
                                </div>

                                {/* Join Date */}
                                <div className="p-4 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-xl border border-primary/10 group-hover:border-primary/20 transition-all duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-xl text-primary" />
                                            <span className="font-semibold text-slate-700">Member Since</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-secondary">
                                                {new Date(tutor.created_at).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {Math.floor((new Date() - new Date(tutor.created_at)) / (1000 * 60 * 60 * 24 * 30))} months
                                            </div>
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

export default RecentTutors;