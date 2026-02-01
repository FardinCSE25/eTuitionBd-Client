import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const RecentTutorsLoading = () => {
    return (
        <div className="w-11/12 mx-auto my-20">
            {/* Title Skeleton */}
            <div className="text-center mb-10">
                <div className="h-10 bg-slate-200 rounded-lg w-56 mx-auto animate-pulse"></div>
            </div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: item * 0.1 }}
                        className="group relative"
                    >
                        {/* Card Skeleton */}
                        <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-md">
                            {/* Tutor Header Skeleton */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse"></div>
                                        {/* Online Status Badge Skeleton */}
                                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-slate-300 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-6 bg-slate-200 rounded w-32 mb-2 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Tutor Info Grid Skeleton */}
                            <div className="space-y-4">
                                {/* Email Skeleton */}
                                <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded w-12 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                                </div>

                                {/* Join Date Skeleton */}
                                <div className="p-4 bg-slate-100 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
                                            <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                                        </div>
                                        <div className="text-right">
                                            <div className="h-5 bg-slate-200 rounded w-20 mb-1 animate-pulse"></div>
                                            <div className="h-3 bg-slate-200 rounded w-12 animate-pulse"></div>
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

export default RecentTutorsLoading;