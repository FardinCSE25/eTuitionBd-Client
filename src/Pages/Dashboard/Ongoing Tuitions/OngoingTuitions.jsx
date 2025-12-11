import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loading from '../../../Components/Loading/Loading';

const OngoingTuitions = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = UseAuth();

    const { data: ongoingTuitions = [], isLoading } = useQuery({
        queryKey: ["tuitions", user?.email, "Approved"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/tuitions/application?email=${user?.email}&status=Approved`
            );
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl p-6">
            <title>eTuitionBd- Ongoing Tuitions</title>
            <h1 className="text-center text-3xl font-bold text-secondary">
                Ongoing Tuitions{" "}
                <span className="text-primary ml-1">({ongoingTuitions.length})</span>
            </h1>
            <p className="text-center text-sm text-primary mt-2">
                These are the tuitions that have been approved and are ongoing.
            </p>

            <div className="overflow-x-auto mt-6">
                <table className="table">
                    <thead className="bg-primary text-accent">
                        <tr>
                            <th>Sl No</th>
                            <th>Student</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Location</th>
                            <th>Salary</th>
                            <th>Applied at</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ongoingTuitions.map((t, index) => (
                            <tr key={t._id} className="hover:bg-gray-100">
                                <td>{index + 1}</td>
                                <td>{t.studentName}</td>
                                <td>{t.subject}</td>
                                <td>{t.class}</td>
                                <td>{t.location}</td>
                                <td>{t.tutorExpectedSalary} ৳</td>
                                <td>{new Date(t.applied_at).toLocaleString("en-GB")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OngoingTuitions;
