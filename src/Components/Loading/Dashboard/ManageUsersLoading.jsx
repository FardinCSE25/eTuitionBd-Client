import React from 'react';

const ManageUsersLoading = () => {
    return (
        <div className='py-12 lg:py-20 animate-pulse'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">
                {/* Header Skeleton */}
                <div className="text-center mt-8 mb-12">
                    <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded-full mx-auto"></div>
                </div>
                
                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="space-y-3">
                                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                                </div>
                                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Table Header Skeleton */}
                <div className="h-12 bg-gray-200 rounded-t-xl mb-4"></div>
                
                {/* Table Rows Skeleton */}
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0">
                            {/* Index */}
                            <div className="w-12 flex justify-center">
                                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                            </div>
                            
                            {/* User Info */}
                            <div className="flex-1 max-w-xs">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Email */}
                            <div className="flex-1 max-w-xs hidden md:block">
                                <div className="h-4 w-40 bg-gray-200 rounded"></div>
                            </div>
                            
                            {/* Role */}
                            <div className="flex-1 max-w-xs hidden lg:block">
                                <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                            </div>
                            
                            {/* Role Action Button */}
                            <div className="flex-1 max-w-xs">
                                <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                            </div>
                            
                            {/* Other Actions Button */}
                            <div className="flex-1 max-w-xs hidden lg:block">
                                <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                            </div>
                            
                            {/* Delete Button */}
                            <div className="flex-1 max-w-xs">
                                <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Table Footer Skeleton */}
                <div className="mt-6 flex justify-between items-center">
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    <div className="flex gap-2">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                        <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsersLoading;