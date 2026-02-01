import React from 'react';

const AppliedTutorsLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 lg:py-20">
            <div className="w-11/12 mx-auto animate-pulse">

                {/* Header Skeleton */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                    <div className="h-10 w-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 w-96 bg-gray-200 rounded-lg mb-6"></div>
                    <div className="h-10 w-48 bg-gray-200 rounded-full"></div>
                </div>

                {/* Stats Overview Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-8 w-12 bg-gray-200 rounded"></div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Applications Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
                            {/* Profile Section */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 bg-gray-200 rounded-2xl"></div>
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            {/* Tuition Details Box */}
                            <div className="bg-gray-50 p-4 rounded-2xl space-y-4 mb-6">
                                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                                <div className="flex justify-between"><div className="h-3 w-16 bg-gray-200 rounded"></div><div className="h-3 w-20 bg-gray-200 rounded"></div></div>
                                <div className="flex justify-between"><div className="h-3 w-16 bg-gray-200 rounded"></div><div className="h-3 w-20 bg-gray-200 rounded"></div></div>
                            </div>

                            {/* Salary Box */}
                            <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center mb-8">
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                                <div className="flex-1 h-12 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppliedTutorsLoading;