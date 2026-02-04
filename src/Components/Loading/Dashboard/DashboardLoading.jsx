// Components/DashboardLoading/DashboardLoading.js
import React from 'react';

const DashboardLoading = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto animate-pulse">
                {/* Skeleton structure matching your dashboard */}
                <div className="h-48 bg-gray-200 rounded-3xl mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardLoading;