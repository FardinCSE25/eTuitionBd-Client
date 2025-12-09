import React from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import UseRole from '../../Hooks/UseRole';

const TuitionDetails = () => {
    const { id } = useParams();
    const axiosInstance = UseAxios();
    const {role} = UseRole()

    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-tuitions?status=Approved`);
            return res.data;
        },
    });

    if (isLoading) {
        return <Loading />;
    }

    const exactTuition = tuitions.find(tuition => tuition._id === id);

    if (!exactTuition) {
        return (
            <div className="w-11/12 mx-auto my-20 p-6 bg-white rounded-xl shadow-md text-center">
                <h2 className="text-xl font-semibold text-red-500">Tuition not found!</h2>
            </div>
        );
    }

    return (
        <div className="w-11/12 md:w-2/3 mx-auto mt-36 mb-44 p-6 bg-white rounded-xl shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-10 text-center">
                Tuition Details
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="font-semibold text-gray-700">Student Name:</p>
                    <p className="text-gray-900">{exactTuition.studentName}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Student Email:</p>
                    <p className="text-gray-900">{exactTuition.studentEmail}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Subject:</p>
                    <p className="text-gray-900">{exactTuition.subject}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Class:</p>
                    <p className="text-gray-900">{exactTuition.class}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Location:</p>
                    <p className="text-gray-900">{exactTuition.location}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Budget:</p>
                    <p className="text-gray-900">{exactTuition.budget}</p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700">Created At:</p>
                    <p className="text-gray-900">{new Date(exactTuition.created_at).toLocaleString("en-GB")}</p>
                </div>
            </div>

            {/* Apply Button */}
            {
                role.role === "Tutor" &&
                <div className="mt-6 text-center">
                    <button
                        className="btn btn-primary px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                        onClick={() => alert("Apply function not implemented yet")}
                    >
                        Apply
                    </button>
                </div>
            }
        </div>
    );
};

export default TuitionDetails;
