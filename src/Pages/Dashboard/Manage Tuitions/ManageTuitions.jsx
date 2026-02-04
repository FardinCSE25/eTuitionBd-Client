import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
    FaUserCheck,
    FaUserTimes,
    FaTrashAlt,
    FaHourglassHalf,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaMoneyBillWave,
    FaEnvelope
} from 'react-icons/fa';
import {
    IoPersonRemoveSharp,
    IoCheckmarkCircleSharp,
    IoCloseCircleSharp
} from 'react-icons/io5';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import ManageTuitionsLoading from '../../../Components/Loading/Dashboard/ManageTuitionsLoading';

const ManageTuitions = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: tuitions = [], isLoading } = useQuery({
        queryKey: ['tuitions', 'Pending', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/Pending?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <ManageTuitionsLoading />;
    }

    const updateTuitionStatus = (tuition, status) => {
        const updateInfo = { status: status };
        axiosSecure.patch(`/tuitions/${tuition._id}?email=${user?.email}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${tuition.studentName}'s tuition has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000,
                        background: '#fff',
                        color: '#333',
                    });
                }
            });
    };

    const filteredTuitions = tuitions.filter(tuition => tuition.status === "Pending");

    const handleApproval = tuition => updateTuitionStatus(tuition, 'Approved');
    const handleRejection = tuition => updateTuitionStatus(tuition, 'Rejected');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className='py-12 lg:-py-32'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl p-6 md:p-8 animate-fade-in">
                <title>eTuitionBd - Manage Tuitions</title>

                {/* Header Section */}
                <div className="text-center mb-10 animate-slide-down">
                    <div className="inline-flex items-center justify-center p-4 bg-linear-to-r from-primary/10 to-yellow-50 rounded-2xl mb-4">
                        <FaHourglassHalf className="text-4xl text-primary" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                        Tuition Pending Approval
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-lg">
                        <span className="px-4 py-2 bg-linear-to-r from-primary to-primary/80 text-white rounded-full font-bold">
                            {filteredTuitions.length} Pending
                        </span>
                        <span className="text-gray-500">• Total: {tuitions.length}</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-linear-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 font-semibold">Pending Review</p>
                                <p className="text-2xl font-bold text-secondary">{filteredTuitions.length}</p>
                            </div>
                            <FaHourglassHalf className="text-3xl text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 font-semibold">Total Applications</p>
                                <p className="text-2xl font-bold text-secondary">{tuitions.length}</p>
                            </div>
                            <FaGraduationCap className="text-3xl text-green-500" />
                        </div>
                    </div>

                    <div className="bg-linear-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 font-semibold">Awaiting Action</p>
                                <p className="text-2xl font-bold text-secondary">{filteredTuitions.length}</p>
                            </div>
                            <FaCalendarAlt className="text-3xl text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-linear-to-r from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-slide-up">
                    <div className="px-6 py-4 bg-linear-to-r from-primary/5 to-yellow-50 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                            <FaHourglassHalf className="text-primary" />
                            Pending Applications List
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">
                            Review and take action on tuition applications
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-linear-to-r from-primary to-primary/90 text-white uppercase text-sm">
                                <tr>
                                    <th className="py-4 px-4 font-semibold">#</th>
                                    <th className="py-4 px-4 font-semibold">Student Details</th>
                                    <th className="py-4 px-4 font-semibold">Subject & Class</th>
                                    <th className="py-4 px-4 font-semibold">Location</th>
                                    <th className="py-4 px-4 font-semibold">Budget</th>
                                    <th className="py-4 px-4 font-semibold">Status</th>
                                    <th className="py-4 px-4 font-semibold">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {tuitions.map((tuition, index) => (
                                    <tr
                                        key={tuition._id}
                                        className="group hover:bg-primary/5 transition-all duration-300"
                                    >
                                        {/* Serial Number */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-lg font-bold group-hover:scale-110 transition-transform duration-300">
                                                {index + 1}
                                            </div>
                                        </td>

                                        {/* Student Details */}
                                        <td className="py-4 px-4">
                                            <div className="space-y-1">
                                                <div className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                                                    {tuition.studentName}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 gap-1">
                                                    <FaEnvelope className="text-primary/70" />
                                                    <span className="truncate max-w-[180px]">{tuition.studentEmail}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Subject & Class */}
                                        <td className="py-4 px-4">
                                            <div className="space-y-2">
                                                <div className="font-medium text-gray-800 bg-gray-50 px-3 py-1 rounded-lg inline-block">
                                                    {tuition.subject}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600 gap-1">
                                                    <FaGraduationCap className="text-primary/70" />
                                                    <span>Class {tuition.class}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Location */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center text-gray-700 gap-1">
                                                <FaMapMarkerAlt className="text-red-500" />
                                                <span>{tuition.location}</span>
                                            </div>
                                        </td>

                                        {/* Budget */}
                                        <td className="py-4 px-4">
                                            <div className="flex items-center font-bold text-secondary gap-1">
                                                <FaMoneyBillWave className="text-green-500" />
                                                <span>৳ {tuition.budget}</span>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(tuition.status)}`}>
                                                {tuition.status === 'Pending' && <FaHourglassHalf className="mr-1.5" />}
                                                {tuition.status === 'Approved' && <IoCheckmarkCircleSharp className="mr-1.5" />}
                                                {tuition.status === 'Rejected' && <IoCloseCircleSharp className="mr-1.5" />}
                                                {tuition.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                {tuition.status === "Pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApproval(tuition)}
                                                            className="btn bg-linear-to-r from-green-500 to-green-600 text-white border-none hover:from-green-600 hover:to-green-700 hover:shadow-lg active:scale-95 transition-all duration-300 tooltip"
                                                            data-tip="Approve Tuition"
                                                        >
                                                            <IoCheckmarkCircleSharp className="text-xl" />
                                                        </button>

                                                        <button
                                                            onClick={() => handleRejection(tuition)}
                                                            className="btn bg-linear-to-r from-red-500 to-red-600 text-white border-none hover:from-red-600 hover:to-red-700 hover:shadow-lg active:scale-95 transition-all duration-300 tooltip"
                                                            data-tip="Reject Tuition"
                                                        >
                                                            <IoCloseCircleSharp className="text-xl" />
                                                        </button>
                                                    </>
                                                )}
                                                {tuition.status !== "Pending" && (
                                                    <button
                                                        className="btn bg-linear-to-r from-gray-500 to-gray-600 text-white border-none hover:from-gray-600 hover:to-gray-700 hover:shadow-lg active:scale-95 transition-all duration-300 opacity-50 cursor-not-allowed"
                                                        disabled
                                                    >
                                                        <span className="text-sm">Reviewed</span>
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-sm text-gray-600 mb-2 md:mb-0">
                                Showing <span className="font-semibold">{tuitions.length}</span> tuition applications
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Quick Actions:</span>
                                <button className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                                    Approve All
                                </button>
                                <button className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                                    Reject All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes fade-in {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes slide-down {
                    from { 
                        opacity: 0; 
                        transform: translateY(-30px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes slide-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.5s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ManageTuitions;