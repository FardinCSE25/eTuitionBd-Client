import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyApplications = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const modalRef = useRef(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    console.log(selectedApplication);
    

    const { data: applications = [], isLoading, refetch } = useQuery({
        queryKey: ["my-applications", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/application?email=${user?.email}`)
            return res.data
        }
    })
    if (isLoading) return <Loading />;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#1E293B",
            confirmButtonText: "Yes, Delete"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/applications/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire("Deleted!", "Your application has been removed.", "success");
                        }
                    })
            }
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedApplication = {
            qualification: form.qualification.value,
            experience: form.experience.value,
            salary: form.salary.value,
        };

        axiosSecure.patch(`/applications/${selectedApplication._id}/update`, updatedApplication)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire("Updated!", "Application updated successfully!", "success");
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-20 bg-white rounded-2xl shadow-xl p-6">
            <title>eTuitionBd- My Applications</title>
            <h1 className="text-center text-3xl font-bold text-secondary">
                My Applications <span className="text-primary ml-1">({applications.length})</span>
            </h1>
            <p className='text-center text-sm text-primary mt-2'>
                Track the status of your tuition applications.
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
                            <th>Status</th>
                            <th>Applied at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.studentName}</td>
                                <td>{app.subject}</td>
                                <td>{app.class}</td>
                                <td>{app.location}</td>
                                <td>
                                    <span
                                        className={`px-3 py-2 rounded-full text-white 
                                            ${app.applicationStatus === "Pending" ? "bg-yellow-500" :
                                                app.applicationStatus === "Approved" ? "bg-green-500" : "bg-red-500"}`}
                                    >
                                        {app.applicationStatus}
                                    </span>
                                </td>

                                <td>{new Date(app.applied_at).toLocaleString("en-GB")}</td>

                                <td className="flex gap-2">
                                   
                                    {app.applicationStatus === "Pending" && (
                                        <button
                                            className="btn btn-square bg-primary text-white"
                                            onClick={() => {
                                                setSelectedApplication(app);
                                                modalRef.current.showModal();
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(app._id)}
                                        className="btn btn-square bg-red-500 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4 text-primary">Update Application</h3>

                    {selectedApplication && (
                        <form onSubmit={handleUpdate} className="grid gap-4">

                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Name</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={selectedApplication.tutorName}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>

                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Email</span></label>
                                <input
                                    type="text"
                                    name="email"
                                    defaultValue={selectedApplication.tutorEmail}
                                    className="input input-bordered w-full"
                                    readOnly
                                />
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Qualification</span></label>
                                <input
                                    type="text"
                                    name="qualification"
                                    defaultValue={selectedApplication.tutorQualification}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Experience</span></label>
                                <input
                                    type="text"
                                    name="experience"
                                    defaultValue={selectedApplication.tutorExperience}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>


                            <div className="form-control">
                                <label className="label"><span className="label-text font-semibold">Salary</span></label>
                                <input
                                    type="text"
                                    name="salary"
                                    defaultValue={selectedApplication.tutorExpectedSalary}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>


                            <button className="btn btn-primary mt-3" type="submit">
                                Update
                            </button>
                        </form>
                    )}

                    <button
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => modalRef.current.close()}
                    >
                        ✕
                    </button>
                </div>
            </dialog>

        </div>
    );
};

export default MyApplications;