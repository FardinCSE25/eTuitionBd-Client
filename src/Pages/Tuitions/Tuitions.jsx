// src/pages/Tuitions.jsx
import React from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router';

const Tuitions = () => {
    const axiosInstance = UseAxios();

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-tuitions?status=Approved`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='h-screen'>
            <div className="w-11/12 mx-auto my-32 bg-white rounded-2xl shadow-xl border border-secondary/20 p-6">

                <h1 className="text-center text-3xl font-bold text-secondary">
                    All Tuitions <span className="text-primary ml-1"> ({tuitions.length})</span>
                </h1>

                <div className="overflow-x-auto mt-6">
                    <table className="table w-full">
                        <thead className="bg-secondary/10 text-secondary uppercase text-sm font-bold">
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tuitions.map((tuition, index) => (
                                <tr key={tuition._id} className="hover:bg-primary/10 transition">
                                    <td className="text-secondary">{index + 1}</td>

                                    <td className="text-secondary font-medium">{tuition.studentName}</td>
                                    <td className="text-secondary font-medium">{tuition.subject}</td>
                                    <td className="text-secondary">{tuition.class}</td>
                                    <td>
                                        <Link to={`/tuition-details/${tuition._id}`} className="btn btn-square bg-primary text-white">
                                            <FaEye />
                                        </Link>
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

export default Tuitions;
