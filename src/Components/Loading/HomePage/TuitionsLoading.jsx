import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TuitionsLoading = () => {
    return (
        <div className="min-h-screen py-8 lg:pt-44 lg:pb-12 px-4">
            <div className="max-w-11/12 mx-auto">
                {/* Header Section Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-12 bg-slate-200 rounded-xl w-64 mx-auto mb-6 animate-pulse"></div>
                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-slate-300 rounded-full animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded w-80 mx-auto mt-4 animate-pulse"></div>
                </div>

                {/* Search and Filter Bar Skeleton */}
                <div className="mb-10">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            {/* Sort Filter Skeleton */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-200 rounded-lg animate-pulse">
                                    <div className="w-5 h-5"></div>
                                </div>
                                <div className="h-12 bg-slate-200 rounded-xl w-48 animate-pulse"></div>
                            </div>

                            {/* Search Bar Skeleton */}
                            <div className="relative w-full lg:w-1/3">
                                <div className="h-12 bg-slate-200 rounded-xl w-full animate-pulse"></div>
                            </div>

                            {/* Reset Button Skeleton */}
                            <div className="h-12 bg-slate-200 rounded-xl w-32 animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Tuitions Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: item * 0.1 }}
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
                                                <div className="h-6 bg-slate-200 rounded w-20 mb-1 animate-pulse"></div>
                                                <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* View Details Button Skeleton */}
                                <div className="mt-6 pt-4 border-t border-slate-100">
                                    <div className="h-12 bg-slate-200 rounded-xl w-full animate-pulse"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="flex items-center justify-center gap-2 mt-12">
                    <div className="h-12 bg-slate-200 rounded-xl w-24 animate-pulse"></div>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3].map((page) => (
                            <div key={page} className="h-12 bg-slate-200 rounded-xl w-12 animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-12 bg-slate-200 rounded-xl w-24 animate-pulse"></div>
                </div>

                {/* Page Info Skeleton */}
                <div className="text-center mt-6">
                    <div className="h-4 bg-slate-200 rounded w-64 mx-auto animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default TuitionsLoading;