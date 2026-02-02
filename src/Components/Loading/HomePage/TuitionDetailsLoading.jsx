import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TuitionDetailsLoading = () => {
    return (
        <div className="min-h-screen py-8 lg:pt-44 lg:pb-12 px-4">
            <div className="max-w-11/12 mx-auto">
                {/* Header Section Skeleton */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-2xl mb-6 animate-pulse mx-auto"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-80 mx-auto mb-6 animate-pulse"></div>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200 w-fit mx-auto">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-slate-300 rounded-full animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Card Skeleton */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 mb-8">
                    {/* Card Header Skeleton */}
                    <div className="bg-linear-to-r from-slate-200 to-slate-300 p-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="h-8 bg-slate-300 rounded w-48 animate-pulse"></div>
                                <div className="h-4 bg-slate-300 rounded w-32 animate-pulse"></div>
                            </div>
                            <div className="h-10 bg-slate-300/50 rounded-full w-48 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Card Content Skeleton */}
                    <div className="p-8">
                        {/* Student Info Section Skeleton */}
                        <div className="mb-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-slate-200 rounded-full animate-pulse"></div>
                                <div className="space-y-2">
                                    <div className="h-6 bg-slate-200 rounded w-40 animate-pulse"></div>
                                    <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: item * 0.1 }}
                                    className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-slate-200 rounded-lg animate-pulse">
                                            <div className="w-6 h-6"></div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-5 bg-slate-200 rounded w-24 animate-pulse"></div>
                                            <div className="h-7 bg-slate-200 rounded w-32 animate-pulse"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Info Skeleton */}
                        <div className="p-6 bg-slate-100 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-slate-300 rounded animate-pulse"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-300 rounded w-24 animate-pulse"></div>
                                        <div className="h-3 bg-slate-300 rounded w-48 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Apply Button Section Skeleton */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 rounded-xl w-64 mx-auto animate-pulse">
                        <div className="w-6 h-6 bg-slate-300 rounded animate-pulse"></div>
                        <div className="h-6 bg-slate-300 rounded w-40 animate-pulse"></div>
                    </div>
                </div>

                {/* Footer Note Skeleton */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full border border-slate-200 w-fit mx-auto">
                        <div className="w-4 h-4 bg-slate-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-slate-200 rounded w-64 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionDetailsLoading;