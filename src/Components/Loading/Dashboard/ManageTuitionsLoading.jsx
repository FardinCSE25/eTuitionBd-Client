import React from 'react';

const ManageTuitionsLoading = () => {
    return (
        <div className='py-12 lg:py-20 animate-pulse'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-2xl border border-secondary/10 p-6 md:p-8">
                
                {/* Header Section Loading */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-gray-200 rounded-2xl mb-4 w-20 h-20 mx-auto"></div>
                    <div className="h-10 bg-gray-200 rounded-lg w-80 max-w-full mx-auto mb-3"></div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-8 bg-gray-200 rounded-full w-32"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                </div>

                {/* Stats Overview Loading */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((card) => (
                        <div key={card} className="bg-gray-100 p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                                </div>
                                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Table Section Loading */}
                <div className="bg-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    
                    {/* Table Header Loading */}
                    <div className="px-6 py-4 bg-gray-100 border-b border-gray-300">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div className="h-7 bg-gray-300 rounded w-48"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-64"></div>
                    </div>

                    {/* Table Loading */}
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head Loading */}
                            <thead className="bg-gray-200">
                                <tr>
                                    {[...Array(7)].map((_, i) => (
                                        <th key={i} className="py-4 px-4">
                                            <div className="h-4 bg-gray-400 rounded w-24 mx-auto"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body Loading - 5 Rows */}
                            <tbody className="divide-y divide-gray-200">
                                {[1, 2, 3, 4, 5].map((row) => (
                                    <tr key={row} className="hover:bg-gray-100">
                                        {/* Serial Number */}
                                        <td className="py-5 px-4">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Student Details */}
                                        <td className="py-5 px-4">
                                            <div className="space-y-2">
                                                <div className="h-5 bg-gray-300 rounded w-32"></div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Subject & Class */}
                                        <td className="py-5 px-4">
                                            <div className="space-y-2">
                                                <div className="h-8 bg-gray-300 rounded w-28"></div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Location */}
                                        <td className="py-5 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                                <div className="h-5 bg-gray-300 rounded w-32"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Budget */}
                                        <td className="py-5 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                                <div className="h-5 bg-gray-300 rounded w-24"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Status */}
                                        <td className="py-5 px-4">
                                            <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                                        </td>
                                        
                                        {/* Actions */}
                                        <td className="py-5 px-4">
                                            <div className="flex gap-2">
                                                <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                                                <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer Loading */}
                    <div className="px-6 py-4 bg-gray-100 border-t border-gray-300">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-2 mb-3 md:mb-0">
                                <div className="h-4 bg-gray-300 rounded w-8"></div>
                                <div className="h-4 bg-gray-300 rounded w-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 bg-gray-300 rounded w-24"></div>
                                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
        </div>
    );
};

export default ManageTuitionsLoading;