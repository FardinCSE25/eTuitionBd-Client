import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const TutorsLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 px-4 md:px-0 py-8 md:pt-36 md:pb-24">
            <div className="relative w-full md:w-10/12 lg:w-9/12 mx-auto">
                
                {/* Header Section Skeleton */}
                <div className="text-center mb-12">
                    {/* Icon Skeleton */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-300 mb-6 shadow-lg animate-pulse mx-auto">
                        <div className="w-10 h-10 rounded-full bg-gray-400"></div>
                    </div>
                    
                    {/* Title Skeleton */}
                    <div className="h-10 md:h-12 bg-gray-300 rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
                    
                    {/* Counter Skeleton */}
                    <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-300 animate-pulse">
                        <div className="h-4 bg-gray-400 rounded w-20"></div>
                        <div className="px-4 py-1 rounded-full bg-gray-400 w-12"></div>
                    </div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            className="bg-gray-300 rounded-2xl p-6 shadow-lg animate-pulse"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-400 mb-4"></div>
                            <div className="h-8 bg-gray-400 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                        </motion.div>
                    ))}
                </div>

                {/* Tutors Grid View Skeleton */}
                <div className="mb-16">
                    {/* Section Title Skeleton */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="group relative bg-gray-300 rounded-2xl overflow-hidden shadow-lg animate-pulse"
                            >
                                {/* Rating Badge Skeleton */}
                                <div className="absolute top-4 right-4 z-10">
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-400">
                                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                        <div className="w-8 h-4 bg-gray-300 rounded"></div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Avatar Skeleton */}
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white bg-gray-400">
                                            <div className="w-full h-full bg-gray-400"></div>
                                        </div>
                                        <div className="absolute bottom-0 right-1/4 w-8 h-8 rounded-full bg-gray-400 border-4 border-white"></div>
                                    </div>

                                    {/* Tutor Info Skeleton */}
                                    <div className="text-center mb-6">
                                        <div className="h-6 bg-gray-400 rounded w-3/4 mx-auto mb-2"></div>
                                        <div className="h-4 bg-gray-400 rounded w-1/2 mx-auto mb-4"></div>
                                        
                                        {/* Skills Tags Skeleton */}
                                        <div className="flex flex-wrap gap-2 justify-center mb-4">
                                            {[1, 2, 3].map((skill) => (
                                                <div
                                                    key={skill}
                                                    className="px-3 py-1 rounded-full bg-gray-400 w-16 h-6"
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Info Skeleton */}
                                    <div className="space-y-3 border-t border-gray-400 pt-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gray-400"></div>
                                            <div className="h-4 bg-gray-400 rounded flex-1"></div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-gray-400"></div>
                                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Enhanced Table View Skeleton */}
                <div className="bg-gray-300 rounded-3xl shadow-2xl overflow-hidden animate-pulse">
                    {/* Table Header Skeleton */}
                    <div className="p-6 md:p-8 border-b border-gray-400">
                        <div className="h-7 bg-gray-400 rounded w-48 mb-2"></div>
                        <div className="h-4 bg-gray-400 rounded w-64"></div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-linear-to-r from-gray-400 to-gray-500">
                                    {[1, 2, 3, 4, 5].map((col) => (
                                        <th key={col} className="py-5 px-6">
                                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {[1, 2, 3, 4, 5].map((row) => (
                                    <tr key={row} className="border-b border-gray-400">
                                        <td className="py-4 px-6">
                                            <div className="h-6 bg-gray-400 rounded w-8"></div>
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
                                                        <div className="w-full h-full bg-gray-400"></div>
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gray-400 border-2 border-white"></div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-5 bg-gray-400 rounded w-32 mb-1"></div>
                                                    <div className="h-3 bg-gray-400 rounded w-24"></div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                                <div className="h-4 bg-gray-400 rounded w-48"></div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                                <div className="h-4 bg-gray-400 rounded w-24"></div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-6">
                                            <div className="px-4 py-1.5 rounded-full bg-gray-400 w-16 h-6"></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Note Skeleton */}
                <div className="mt-12 text-center">
                    <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default TutorsLoading;