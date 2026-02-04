import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUserShield, FaTrashAlt, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import { FiShieldOff, FiEdit2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import ManageUsersLoading from '../../../Components/Loading/Dashboard/ManageUsersLoading';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

    if (isLoading) {
        return <ManageUsersLoading />;
    }

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "Admin" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} is now an Admin`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    const handleMakeTutor = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "Tutor" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} is made Tutor`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    const handleMakeStudent = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "Student" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} is made Student`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    const handleRemoveAdmin = (user) => {
        axiosSecure.patch(`/users/${user._id}/role`, { role: "Student" })
            .then((res) => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: `${user.displayName} is removed from admin and made Student`,
                        timer: 1800,
                        showConfirmButton: false,
                    });
                }
            });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete the account of ${user.displayName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, delete!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: "User Deleted",
                                text: `The account of ${user.displayName} has been deleted!`,
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                    })
            }
        });
    };

    return (
        <div className='py-12 lg:py-20'>
            <div className="w-11/12 mx-auto bg-white rounded-2xl p-6 animate-fade-in">
                <title>eTuitionBd - Manage Users</title>
                
                {/* Header with animation */}
                <div className="animate-slide-down">
                    <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent text-center -mt-6 mb-4">
                        Manage Users 
                    </p>
                    <div className="text-center mb-8">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold text-lg animate-pulse">
                            Total Users: {users.length}
                        </span>
                    </div>
                </div>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-up">
                    <div className="bg-linear-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 font-semibold">Admins</p>
                                <p className="text-2xl font-bold text-secondary">
                                    {users.filter(user => user.role === "Admin").length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <FaUserShield className="text-blue-600 text-xl" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-linear-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-600 font-semibold">Tutors</p>
                                <p className="text-2xl font-bold text-secondary">
                                    {users.filter(user => user.role === "Tutor").length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <FaChalkboardTeacher className="text-green-600 text-xl" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-linear-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-600 font-semibold">Students</p>
                                <p className="text-2xl font-bold text-secondary">
                                    {users.filter(user => user.role === "Student").length}
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <FaUserGraduate className="text-purple-600 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto mt-6">
                    <table className="table w-full">
                        <thead className="bg-linear-to-r from-primary to-primary/90 text-accent uppercase text-sm font-bold">
                            <tr>
                                <th className="py-4 px-4 rounded-tl-xl">#</th>
                                <th className="py-4 px-4">User</th>
                                <th className="py-4 px-4">Email</th>
                                <th className="py-4 px-4">Role</th>
                                <th className="py-4 px-4">Role Action</th>
                                <th className="py-4 px-4">Other Actions</th>
                                <th className="py-4 px-4 rounded-tr-xl">Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr 
                                    key={user._id} 
                                    className="hover:bg-primary/5 transition-all duration-300 border-b border-gray-100 last:border-b-0"
                                >
                                    <th className="py-4 px-4">
                                        <span className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-full font-semibold">
                                            {index + 1}
                                        </span>
                                    </th>

                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3 group">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12 ring-2 ring-offset-2 ring-primary/30 group-hover:ring-primary transition-all duration-300">
                                                    <img
                                                        src={user.photoURL}
                                                        alt="User"
                                                        className="group-hover:scale-105 transition-transform duration-300"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-secondary group-hover:text-primary transition-colors duration-300">
                                                    {user.displayName}
                                                </div>
                                                <div className="text-sm text-gray-500">Registered User</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-4 px-4 text-secondary">{user.email}</td>
                                    
                                    <td className="py-4 px-4">
                                        <span className={`
                                            px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1
                                            ${user.role === "Admin" ? "bg-red-100 text-red-700" : 
                                              user.role === "Tutor" ? "bg-green-100 text-green-700" : 
                                              "bg-blue-100 text-blue-700"}
                                        `}>
                                            {user.role === "Admin" && <FaUserShield />}
                                            {user.role === "Tutor" && <FaChalkboardTeacher />}
                                            {user.role === "Student" && <FaUserGraduate />}
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="py-4 px-4">
                                        {user.role === "Admin" ? (
                                            <button
                                                onClick={() => handleRemoveAdmin(user)}
                                                className="btn bg-linear-to-r from-red-500 to-red-600 text-white border-none 
                                                         hover:from-red-600 hover:to-red-700 hover:shadow-lg 
                                                         active:scale-95 transition-all duration-300 flex items-center gap-2"
                                            >
                                                <FiShieldOff size={18} />
                                                <span>Remove Admin</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="btn bg-linear-to-r from-primary to-primary/90 text-accent border-none 
                                                         hover:shadow-lg hover:opacity-90 active:scale-95 
                                                         transition-all duration-300 flex items-center gap-2"
                                            >
                                                <FaUserShield size={18} />
                                                <span>Make Admin</span>
                                            </button>
                                        )}
                                    </td>
                                    
                                    <td className="py-4 px-4">
                                        {user.role !== "Admin" && (
                                            user.role === "Student" ? (
                                                <button 
                                                    onClick={() => handleMakeTutor(user)}
                                                    className="btn bg-linear-to-r from-green-500 to-green-600 text-white border-none 
                                                             hover:from-green-600 hover:to-green-700 hover:shadow-lg 
                                                             active:scale-95 transition-all duration-300 flex items-center gap-2"
                                                >
                                                    <FaChalkboardTeacher size={16} />
                                                    <span>Make Tutor</span>
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => handleMakeStudent(user)}
                                                    className="btn bg-linear-to-r from-blue-500 to-blue-600 text-white border-none 
                                                             hover:from-blue-600 hover:to-blue-700 hover:shadow-lg 
                                                             active:scale-95 transition-all duration-300 flex items-center gap-2"
                                                >
                                                    <FaUserGraduate size={16} />
                                                    <span>Make Student</span>
                                                </button>
                                            )
                                        )}
                                    </td>
                                    
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn bg-linear-to-r from-gray-600 to-gray-700 text-white border-none 
                                                     hover:from-red-600 hover:to-red-700 hover:shadow-lg 
                                                     active:scale-95 transition-all duration-300 flex items-center gap-2"
                                        >
                                            <FaTrashAlt size={16} />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {users.length === 0 && (
                        <div className="text-center py-12 animate-pulse">
                            <div className="text-gray-400 text-lg">No users found</div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Add custom animation styles */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slide-down {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes slide-up {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
                
                .animate-slide-down {
                    animation: slide-down 0.6s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ManageUsers;