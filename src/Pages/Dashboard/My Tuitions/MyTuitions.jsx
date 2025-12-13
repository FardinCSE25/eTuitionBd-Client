import React, { useRef, useState } from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyTuitions = () => {
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    const [selectedTuition, setSelectedTuition] = useState(null);
    const modalRef = useRef(null);

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
            text: "You won't be able to regain this post!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tuitions/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire("Deleted!", "Your tuition has been deleted.", "success")
                        }
                    })
            }
        })
    };

    const handleTuitionUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const updatedTuition = {
            studentName: form.studentName.value,
            subject: form.subject.value,
            class: form.class.value,
            budget: form.budget.value
        };

        axiosSecure.patch(`/tuitions/${selectedTuition._id}/update`, updatedTuition)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "Updated!",
                        text: "Tuition updated successfully!",
                        icon: "success",
                        confirmButtonColor: "#3B82F6"
                    });
                    ;
                }
            })
            .catch(err => console.log(err));
    };

    return (
       <div className='py-12 lg:py-20'>
         <div className="w-11/12 mx-auto bg-white rounded-2xl shadow-xl p-6">
            <title>eTuitionBd- My Tuitions</title>
            <h1 className="text-center text-3xl mt-6 font-bold text-secondary">
                My Tuitions <span className="text-primary ml-1"> ({tuitions.length})</span>
            </h1>
            <p className='text-center text-sm text-primary mt-2'> (Approved only) </p>

            <div className="overflow-x-auto mt-6">
                <table className="table">
                    <thead className="bg-primary text-accent">
                        <tr>
                            <th>Sl No</th>
                            <th>Student Name</th>
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Budget</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tuitions.map((tuition, index) => (
                            <tr key={tuition._id}>
                                <td>{index + 1}</td>
                                <td>{tuition.studentName}</td>
                                <td>{tuition.subject}</td>
                                <td>{tuition.class}</td>
                                <td>{tuition.budget}</td>
                                <td className="flex gap-2">
                                    {
                                        tuition.approvalStatus !== "Approved" && <>
                                            <button
                                                className="btn btn-square bg-primary text-white"
                                                onClick={() => {
                                                    setSelectedTuition(tuition);
                                                    modalRef.current.showModal();
                                                }}
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                onClick={() => handleTuitionDelete(tuition._id)}
                                                className="btn btn-square bg-red-500 text-white"
                                            >
                                                <FaTrash />
                                            </button>
                                        </>

                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4 text-primary">Update Tuition</h3>

                    {selectedTuition && (
                        <form onSubmit={handleTuitionUpdate} className="grid gap-4">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Student Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    defaultValue={selectedTuition.studentName}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Subject</span>
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    defaultValue={selectedTuition.subject}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Class</span>
                                </label>
                                <input
                                    type="text"
                                    name="class"
                                    defaultValue={selectedTuition.class}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Budget</span>
                                </label>
                                <input
                                    type="text"
                                    name="budget"
                                    defaultValue={selectedTuition.budget}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>

                            <button className="btn btn-primary text-accent mt-3" type="submit">
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
       </div>
    );
};

export default MyTuitions;
