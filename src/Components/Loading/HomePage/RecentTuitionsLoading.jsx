import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const RecentTuitionsLoading = () => {
    return (
        <div className="w-11/12 mx-auto my-20">
            {/* Title Skeleton */}
            <div className="text-center mb-10">
                <div className="h-10 bg-slate-200 rounded-lg w-64 mx-auto animate-pulse"></div>
            </div>
            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            {/* Subject Header Skeleton */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-6 bg-slate-200 rounded w-32 mb-2 animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded w-20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Student Info Skeleton */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-xl">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                                        <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid Skeleton */}
                            <div className="space-y-4">
                                {/* Class Skeleton */}
                                <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded w-12 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                                </div>

                                {/* Location Skeleton */}
                                <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                                </div>

                                {/* Budget Skeleton */}
                                <div className="p-4 bg-slate-100 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-slate-200 rounded animate-pulse"></div>
                                            <div className="h-4 bg-slate-200 rounded w-14 animate-pulse"></div>
                                        </div>
                                        <div className="text-right">
                                            <div className="h-6 bg-slate-200 rounded w-20 animate-pulse mb-1"></div>
                                            <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Status Skeleton */}
                            <div className="mt-6 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse"></div>
                                        <div className="h-3 bg-slate-200 rounded w-12 animate-pulse"></div>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RecentTuitionsLoading;