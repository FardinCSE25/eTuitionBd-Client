import React from 'react';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { FaBook, FaUserGraduate } from 'react-icons/fa';

const RecentTuitions = () => {
    const axiosInstance = UseAxios();

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["recent-tuitions"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/recent-tuitions?status=Approved`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }
     return (
        <div className="w-11/12 mx-auto my-16">
            <h1 className="text-center text-3xl font-bold text-secondary mb-8">
                Recent Tuitions 
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tuitions.map(tuition => (
                    <div
                        key={tuition._id}
                        className="p-6 bg-white rounded-2xl shadow-md border border-secondary/20 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-secondary mb-3 flex items-center gap-2">
                            <FaBook className="text-primary" /> {tuition.subject}
                        </h2>

                        <p className="text-secondary/80 font-medium flex items-center gap-2">
                            <FaUserGraduate className="text-primary" /> 
                            {tuition.studentName}
                        </p>

                        <p className="mt-2 text-secondary/70 text-sm">
                            <span className="font-semibold">Class:</span> {tuition.class}
                        </p>

                        <p className="mt-1 text-secondary/70 text-sm">
                            <span className="font-semibold">Location:</span> {tuition.location || 'N/A'}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTuitions;