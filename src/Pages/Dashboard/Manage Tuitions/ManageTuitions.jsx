import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';

const ManageTuitions = () => {
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: tuitions = [] } = useQuery({
        queryKey: ['tuitions', 'Pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tuitions');
            return res.data;
        }
    })

    const updateTuitionStatus = (tuition, status) => {
        const updateInfo = { status: status }
        axiosSecure.patch(`/tuitions/${tuition._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${tuition.studentName}'s tuition has been ${status}`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            })
    }
    
    const filteredTuitions = tuitions.filter(tuition=> tuition.status === "Pending")

    const handleApproval = tuition => updateTuitionStatus(tuition, 'Approved');
    const handleRejection = tuition => updateTuitionStatus(tuition, 'Rejected');

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

            <title>eTuitionBd- Manage Tuitions</title>

            {/* Header */}
            <h1 className="text-center text-3xl md:text-4xl font-bold text-secondary py-5">
                Tuition Pending Approval <span className="text-primary ml-2">({filteredTuitions.length})</span>
            </h1>

            {/* Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full">
                    <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                        <tr>
                            <th>Sl No</th>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Location</th> 
                            <th>Budget</th>
                            <th>Tuition Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tuitions.map((tuition, index) => (
                            <tr key={tuition._id} className="hover:bg-primary/10 transition">
                                <th className="text-secondary">{index + 1}</th>
                                <td className="text-secondary font-medium">{tuition.studentName}</td>
                                <td className="text-secondary">{tuition.studentEmail}</td>
                                <td className="text-secondary">{tuition.subject}</td>
                                <td className="text-secondary">{tuition.class}</td>
                                <td className="text-secondary">{tuition.location}</td>
                                <td className="text-secondary">{tuition.budget}</td>
                                <td>
                                    <span className={`font-semibold ${tuition.status === 'Approved' ? 'text-primary' :
                                            tuition.status === 'Pending' ? 'text-yellow-400' : 'text-red-500'
                                        }`}>
                                        {tuition.status}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {
                                        tuition.status === "Pending" && (
                                            <>
                                            <button
                                        onClick={() => handleApproval(tuition)}
                                        className="btn btn-square bg-primary text-accent border-none hover:bg-primary/80 shadow-md"
                                    >
                                        <FaUserCheck />
                                    </button>

                                    <button
                                        onClick={() => handleRejection(tuition)}
                                        className="btn btn-square bg-primary text-accent border-none hover:bg-primary/80 shadow-md"
                                    >
                                        <IoPersonRemoveSharp />
                                    </button>
                                    </>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTuitions;
