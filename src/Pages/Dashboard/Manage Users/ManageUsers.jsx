import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from 'react-icons/fi';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        },
    });

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
            <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">
            <title>eTuitionBd - Manage Users</title>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mt-8 mb-12">
                Manage Users <span className="text-primary ml-2">({users.length})</span>
            </h2>
          
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-primary text-accent uppercase text-sm font-bold">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role Action</th>
                            <th>Other Actions</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{index + 1}</th>

                           
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={user.photoURL}
                                                    alt="User"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-secondary">{user.displayName}</div>
                                            <div className="text-sm opacity-50 text-secondary">Registered User</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="text-secondary">{user.email}</td>
                                <td className="font-semibold text-secondary">{user.role}</td>

                                <td>
                                    {user.role === "Admin" ? (
                                        <button
                                            onClick={() => handleRemoveAdmin(user)}
                                            className="btn bg-red-500 text-white hover:bg-red-600"
                                        >
                                            <FiShieldOff size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-primary text-accent border-none shadow-md hover:opacity-80"
                                        >
                                            <FaUserShield size={18} />
                                        </button>
                                    )}
                                </td>
                                
                                <td>
                                    {
                                        user.role !== "Admin" &&

                                        (
                                            user.role === "Student" ?
                                                <button onClick={() => handleMakeTutor(user)} className="btn bg-primary text-accent border-none shadow-md hover:opacity-80">Make Tutor
                                                </button> :
                                                <button onClick={() => handleMakeStudent(user)} className="btn bg-primary text-accent border-none shadow-md hover:opacity-80">Make Student
                                                </button>
                                        )

                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ManageUsers;
