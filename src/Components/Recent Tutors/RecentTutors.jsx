import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxios from '../../Hooks/UseAxios';
import Loading from '../Loading/Loading';

const RecentTutors = () => {
    const axiosInstance = UseAxios();

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ["recent-tutors"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/recent-tutors?role=Tutor`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="w-11/12 mx-auto mt-28 mb-12">
            <h1 className="text-3xl font-bold text-center text-secondary mb-6">
                Latest Tutors
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                    <div
                        key={tutor._id}
                        className="bg-white border border-secondary/20 rounded-2xl shadow-md p-5 hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={tutor.photoURL || "https://via.placeholder.com/100"}
                                alt={tutor.displayName}
                                className="w-20 h-20 rounded-full object-cover mb-3 shadow"
                            />
                            <h2 className="text-lg font-semibold text-secondary">
                                {tutor.displayName}
                            </h2>
                            <p className="text-sm text-secondary/80">{tutor.email}</p>

                            <p className="text-sm mt-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                                Joined: {new Date(tutor.created_at).toLocaleDateString("en-GB")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTutors;
