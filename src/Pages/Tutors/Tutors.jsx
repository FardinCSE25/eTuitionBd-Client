import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Components/Loading/Loading';
import UseAxios from '../../Hooks/UseAxios';

const Tutors = () => {
    const axiosInstance = UseAxios();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users`);
            return res.data;
        },
    });

    const tutors = users.filter(user => user.role === "Tutor");

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen px-4 md:px-0">
            <title>eTuitionBd - Tutors</title>

            <div className="w-full md:w-11/12 mx-auto my-10 md:my-32 bg-white rounded-2xl shadow-xl border border-secondary/20 p-4 md:p-6">

                {/* Title */}
                <h1 className="text-center text-2xl md:text-3xl m-6 font-bold text-secondary">
                    Our Tutors <span className="text-primary ml-1">({tutors.length})</span>
                </h1>

                {/* Responsive Table */}
                <div className="overflow-x-auto mt-10">
                    <table className="table w-full">
                        <thead className="bg-primary text-accent uppercase text-xs md:text-sm font-bold">
                            <tr>
                                <th>#</th>
                                <th>Tutor</th>
                                <th>Email</th>
                                <th>Joined At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tutors.map((tutor, index) => (
                                <tr key={tutor._id} className="hover:bg-primary/10 transition text-sm md:text-base">
                                    <th className="text-secondary">{index + 1}</th>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                                                    <img
                                                        src={tutor.photoURL || 'https://via.placeholder.com/150'}
                                                        alt={tutor.displayName}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-secondary text-sm md:text-base">
                                                    {tutor.displayName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-secondary break-all">{tutor.email}</td>

                                    <td className="text-secondary">
                                        {new Date(tutor.created_at).toLocaleDateString("en-GB")}
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

export default Tutors;
