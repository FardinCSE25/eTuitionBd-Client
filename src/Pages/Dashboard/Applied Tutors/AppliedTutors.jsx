import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../Components/Loading/Loading';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { Calendar, BookOpen, GraduationCap, DollarSign } from "lucide-react";

const AppliedTutors = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["applied-tutors", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/${user?.email}/applied`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    const handleAccept = async (app) => {

        const paymentInfo = {
            fee : app.tutorExpectedSalary,
            tuitionId : app._id,
            studentEmail: app.studentEmail,
            subject: app.subject,
            tutorEmail: app.tutorEmail
        }

       const res = await axiosSecure.post("/create-checkout-session", paymentInfo)
       console.log(res.data);
       window.location.href = res.data.url
    };

    const handleReject = (app) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this proposal!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tuitions/reject`, app)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch();
                            Swal.fire("Rejected!", `${app.tutorName}'s application has been rejected.`, "success");
                        }
                    })
            }
        });
    };

    return (
        <div className='w-11/12 mx-auto my-12'>
            <h1 className='text-3xl md:text-4xl text-center font-extrabold text-secondary mb-14'>
                Tutor Applications <span className='text-3xl md:text-4xl text-center font-extrabold text-primary'>({applications.length})</span>
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {applications.map(app => (
                    <div
                        key={app._id}
                        className='bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transition hover:shadow-2xl'
                    >
                        {/* Tutor Info */}
                        <div className='flex items-center gap-4'>
                            <img
                                src={app.tutorPhoto}
                                alt="Tutor"
                                className='w-20 h-20 rounded-full object-cover border-2 border-primary'
                            />
                            <div>
                                <h2 className='text-xl font-bold text-secondary'>{app.tutorName}</h2>
                                <p className='text-gray-600 text-sm flex items-center gap-1'>
                                    <GraduationCap size={15} /> {app.tutorQualification}
                                </p>
                            </div>
                        </div>

                        {/* Tuition Info */}
                        <div className='mt-4 bg-gray-50 p-4 rounded-xl border'>
                            <p className='text-sm text-gray-700 flex items-center gap-2'>
                                <BookOpen size={16} /> <strong>Subject:</strong> {app.subject}
                            </p>
                            <p className='text-sm text-gray-700 flex items-center gap-2 mt-1'>
                                <GraduationCap size={16} /> <strong>Class:</strong> {app.class}
                            </p>
                            <p className='text-sm text-gray-700 flex items-center gap-2 mt-1'>
                                <Calendar size={16} />
                                <strong>Applied on:</strong> {new Date(app.applied_at).toLocaleDateString("en-GB")}
                            </p>
                        </div>

                        {/* More Details */}
                        <div className='mt-4'>
                            <p className='text-gray-700'>
                                <strong>Experience:</strong> {app.tutorExperience} years
                            </p>
                            <p className='text-gray-700 flex items-center gap-1'>
                                <strong>Expected Salary:</strong> BDT {app.tutorExpectedSalary}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex justify-between mt-6'>
                           {
                            app.approvalStatus === "Approved" ? <button
                                disabled
                                className='px-5 py-2 bg-green-800 text-white rounded-lg font-semibold shadow'
                            >
                                Accepted
                            </button> :  <>
                            <button
                                onClick={() => handleAccept(app)}
                                className='px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow'
                            >
                                Accept
                            </button>

                            <button
                                onClick={() => handleReject(app)}
                                className='px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow'
                            >
                                Reject
                            </button></>
                           }
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppliedTutors;
