import React from 'react';

const ReportsAnalyticsLoading = () => {
    return (
        <div className='py-12 lg:py-20'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
                {/* Header Loading */}
                <div className="text-center mb-12 animate-pulse">
                    <div className="inline-flex items-center justify-center p-3 bg-gray-200 rounded-full mb-4 w-16 h-16 mx-auto"></div>
                    <div className="h-12 bg-gray-200 rounded-lg w-96 max-w-full mx-auto mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-80 max-w-full mx-auto"></div>
                </div>

                {/* Stats Cards Grid Loading */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[1, 2, 3, 4].map((card) => (
                        <div 
                            key={card} 
                            className="bg-linear-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-lg"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-gray-200 rounded-xl w-12 h-12"></div>
                                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                            <div className="h-10 bg-gray-200 rounded w-36 mb-3"></div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section Loading */}
                <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Table Header Loading */}
                    <div className="px-6 py-4 bg-linear-to-r from-gray-100 to-gray-200 border-b border-gray-300">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div className="h-8 bg-gray-300 rounded w-48"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-72"></div>
                    </div>

                    {/* Table Loading */}
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            {/* Table Head Loading */}
                            <thead className="bg-linear-to-r from-gray-200 to-gray-300 text-white uppercase text-sm">
                                <tr>
                                    {['#', 'Subject', 'Transaction ID', 'Status', 'Paid at'].map((header, index) => (
                                        <th key={index} className="py-4 px-6">
                                            <div className="h-4 bg-gray-400 rounded w-24 mx-auto"></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body Loading */}
                            <tbody className="divide-y divide-gray-100">
                                {[1, 2, 3, 4, 5].map((row) => (
                                    <tr key={row} className="animate-pulse">
                                        {/* Serial Number */}
                                        <td className="py-4 px-6">
                                            <div className="flex justify-center">
                                                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                            </div>
                                        </td>
                                        
                                        {/* Subject */}
                                        <td className="py-4 px-6">
                                            <div className="h-5 bg-gray-200 rounded w-32"></div>
                                        </td>
                                        
                                        {/* Transaction ID */}
                                        <td className="py-4 px-6">
                                            <div className="h-5 bg-gray-200 rounded w-48"></div>
                                        </td>
                                        
                                        {/* Status */}
                                        <td className="py-4 px-6">
                                            <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                        </td>
                                        
                                        {/* Paid at */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded w-40"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer Loading */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="h-4 bg-gray-200 rounded w-8"></div>
                            <div className="h-4 bg-gray-200 rounded w-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                    </div>
                </div>

                {/* Shimmer Effect Overlay */}
                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
            </div>

            {/* Animation Styles */}
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default ReportsAnalyticsLoading;