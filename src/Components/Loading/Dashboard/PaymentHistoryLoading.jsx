import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const PaymentHistoryLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section Skeleton */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-2xl mb-6 animate-pulse"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-80 mx-auto animate-pulse"></div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: item * 0.1 }}
                            className="bg-linear-to-r from-slate-200 to-slate-300 rounded-2xl p-6 animate-pulse"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-300 rounded w-24"></div>
                                    <div className="h-8 bg-slate-300 rounded w-16"></div>
                                </div>
                                <div className="h-10 w-10 bg-slate-300 rounded-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Table Container Skeleton */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    <div className="px-6 py-8">
                        {/* Table Header Skeleton */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-slate-200 rounded-lg animate-pulse"></div>
                                <div className="h-8 bg-slate-200 rounded-lg w-40 animate-pulse"></div>
                            </div>
                            <div className="h-8 bg-slate-200 rounded-full w-32 animate-pulse"></div>
                        </div>

                        {/* Table Headers Skeleton */}
                        <div className="overflow-hidden rounded-2xl border border-slate-100 mb-4">
                            <div className="grid grid-cols-6 gap-4 p-4 bg-linear-to-r from-slate-200 to-slate-300">
                                {[1, 2, 3, 4, 5, 6].map((col) => (
                                    <div key={col} className="h-4 bg-slate-300 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Table Rows Skeleton */}
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((row) => (
                                <div key={row} className="grid grid-cols-6 gap-4 p-4 border border-slate-100 rounded-xl animate-pulse">
                                    {/* SL No */}
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
                                    </div>

                                    {/* Subject */}
                                    <div className="flex items-center">
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 rounded w-20"></div>
                                            <div className="h-2 bg-slate-200 rounded w-32"></div>
                                        </div>
                                    </div>

                                    {/* Amount */}
                                    <div className="flex items-center">
                                        <div className="h-6 bg-slate-200 rounded w-16"></div>
                                    </div>

                                    {/* Payment Date */}
                                    <div className="space-y-2">
                                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                                    </div>

                                    {/* Transaction ID */}
                                    <div className="flex items-center">
                                        <div className="h-4 bg-slate-200 rounded w-32"></div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center">
                                        <div className="h-6 bg-slate-200 rounded-full w-24"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State Skeleton (hidden by default, shown conditionally) */}
                        <div className="text-center py-16 animate-pulse">
                            <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
                            <div className="h-6 bg-slate-200 rounded w-48 mx-auto mb-3"></div>
                            <div className="h-4 bg-slate-200 rounded w-64 mx-auto"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Note Skeleton */}
                <div className="mt-8 text-center animate-pulse">
                    <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full">
                        <div className="h-4 bg-slate-200 rounded w-4"></div>
                        <div className="h-4 bg-slate-200 rounded w-72"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistoryLoading;