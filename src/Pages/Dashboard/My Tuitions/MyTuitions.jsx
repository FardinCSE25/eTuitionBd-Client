import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyTuitions = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()

    const { data: tuitions = [], refetch } = useQuery({
        queryKey: ["my-tuitions", user?.email, "Approved"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions?email=${user?.email}&status=Approved`)
            return res.data
        }
    })

    const handleTuitionDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to regain this post in future!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            cancelButtonText: "<span style='color:white; display:block;'>Cancel</span>",
            confirmButtonText: "Yes, Delete it"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your tuition has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };


    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>eTuitionBd - My Tuitions</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary pt-5 pb-2">
                My Tuitions <span className="text-primary ml-2">({tuitions.length})</span>
            </h1>
            <p className='text-center text-sm text-secondary'>
                (Approved only)
            </p>
            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tuitions.map((tuition, index) => (
                                <tr
                                    key={tuition._id}
                                    className="hover:bg-primary/10 transition"
                                >
                                    <th className="text-secondary">{index + 1}</th>
                                    <td className="text-secondary font-medium">{tuition.subject}</td>
                                    <td className="text-secondary">{tuition.class}</td>
                                    <td className="text-secondary">{tuition.budget}</td>

                                    {/* Actions */}
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-square bg-primary text-accent hover:bg-primary/80 border-none"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => handleTuitionDelete(tuition._id)}
                                            className="btn btn-square bg-red-500 text-white hover:opacity-80 border-none"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTuitions;