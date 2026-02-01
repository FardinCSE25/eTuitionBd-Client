import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const MyTuitionsLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Skeleton */}
                <div className="text-center mb-12">
                    <div className="h-12 bg-slate-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
                    <div className="inline-flex">
                        <div className="h-12 bg-slate-200 rounded-full w-48 animate-pulse"></div>
                    </div>
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
                            <div className="h-8 bg-slate-200 rounded-lg w-32 animate-pulse"></div>
                            <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                        </div>

                        {/* Table Skeleton */}
                        <div className="overflow-x-auto rounded-2xl border border-slate-100">
                            <table className="min-w-full">
                                <thead className="bg-linear-to-r from-slate-200 to-slate-300">
                                    <tr>
                                        {[1, 2, 3, 4, 5, 6].map((header) => (
                                            <th key={header} className="px-6 py-4">
                                                <div className="h-4 bg-slate-300 rounded w-20 mx-auto animate-pulse"></div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[1, 2, 3, 4].map((row) => (
                                        <tr key={row} className="animate-pulse">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 bg-slate-200 rounded-full mr-3"></div>
                                                    <div className="space-y-1">
                                                        <div className="h-4 bg-slate-200 rounded w-24"></div>
                                                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-6 bg-slate-200 rounded-full w-16"></div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="h-4 bg-slate-200 rounded w-12"></div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-6 bg-slate-200 rounded w-12"></div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
                                                    <div className="h-10 w-10 bg-slate-200 rounded-lg"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MyTuitionsLoading;