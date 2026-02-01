import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ProfileSettingsLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 py-12 lg:py-24 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section Skeleton */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-200 rounded-2xl mb-6 animate-pulse"></div>
                    <div className="h-12 bg-slate-200 rounded-xl w-64 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-slate-200 rounded w-80 mx-auto animate-pulse"></div>
                </div>

                {/* Profile Card Skeleton */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
                >
                    {/* Profile Header Skeleton */}
                    <div className="bg-linear-to-r from-slate-200 to-slate-300 p-8 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative z-10 text-center">
                            {/* Profile Image Skeleton */}
                            <div className="relative w-40 h-40 mx-auto mb-6">
                                <div className="w-full h-full rounded-full border-4 border-white bg-slate-300 animate-pulse"></div>
                            </div>

                            {/* Name and Email Skeleton */}
                            <div className="space-y-4">
                                <div className="h-8 bg-slate-300 rounded-lg w-48 mx-auto animate-pulse"></div>
                                <div className="inline-flex">
                                    <div className="h-10 bg-slate-300/50 rounded-full w-64 px-4 py-2 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details Skeleton */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {/* Account Information Card */}
                            <div className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-slate-200 rounded-lg">
                                        <div className="w-6 h-6"></div>
                                    </div>
                                    <div className="h-6 bg-slate-200 rounded-lg w-40 animate-pulse"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <div className="h-4 bg-slate-200 rounded w-24 animate-pulse"></div>
                                        <div className="h-4 bg-slate-200 rounded w-32 animate-pulse"></div>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <div className="h-4 bg-slate-200 rounded w-16 animate-pulse"></div>
                                        <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Actions Card */}
                            <div className="bg-linear-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-slate-200 rounded-lg">
                                        <div className="w-6 h-6"></div>
                                    </div>
                                    <div className="h-6 bg-slate-200 rounded-lg w-36 animate-pulse"></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-12 bg-slate-200 rounded-xl w-full animate-pulse"></div>
                                    <div className="text-center mt-4">
                                        <div className="h-3 bg-slate-200 rounded w-48 mx-auto animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Section Skeleton */}
                        <div className="bg-linear-to-br from-slate-100 to-slate-200 p-6 rounded-2xl border border-slate-200">
                            <div className="h-6 bg-slate-300 rounded w-32 mb-4 animate-pulse"></div>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full mt-2"></div>
                                    <div className="h-3 bg-slate-300 rounded w-64 animate-pulse"></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full mt-2"></div>
                                    <div className="h-3 bg-slate-300 rounded w-72 animate-pulse"></div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-slate-300 rounded-full mt-2"></div>
                                    <div className="h-3 bg-slate-300 rounded w-60 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProfileSettingsLoading;