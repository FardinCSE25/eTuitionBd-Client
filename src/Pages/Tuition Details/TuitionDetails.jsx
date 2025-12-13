import React, { useRef } from 'react';
import { useParams } from 'react-router';
import UseAxios from '../../Hooks/UseAxios';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';
import UseRole from '../../Hooks/UseRole';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const TuitionDetails = () => {
    const { id } = useParams();
    const axiosInstance = UseAxios();
    const { role } = UseRole()
    const modalRef = useRef(null);
    const { user } = UseAuth()
    const axiosSecure = UseAxiosSecure()
    
    const { data: tuitions = [], isLoading, refetch } = useQuery({
        queryKey: ["tuitions"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/all-tuitions?status=Approved`);
            return res.data;
        },
    });

    const { data: tuition = [] } = useQuery({
        queryKey: ["tuition", id, user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/tuitions/${id}/tutor?email=${user?.email}`);
            return res.data;
        },
    });

    // console.log(tuition);
    

     if (isLoading) {
        return <Loading />;
    }
console.log(tuitions);

    const exactTuition = tuitions.result.find(tuition => tuition._id === id);

    if (!exactTuition) {
        return (
            <div className="w-11/12 mx-auto mt-44 mb-20 py-24 px-6 bg-white rounded-xl shadow-md text-center">
                <h2 className="text-4xl font-semibold text-red-500">Tuition not found!</h2>
            </div>
        );
    }

    const handleApply = (e) => {
        e.preventDefault()

        const form = e.target;
        const appliedTutorInfo = {
            tuition: exactTuition,
            name: form.name.value,
            email: form.email.value,
            qualification: form.qualification.value,
            experience: form.experience.value,
            expectedSalary: form.salary.value,
            photoURL : user.photoURL
        };

        axiosSecure.patch(`/tuitions/apply`, appliedTutorInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "Applied!",
                        text: "You have applied for the tuition successfully!",
                        icon: "success",
                        confirmButtonColor: "#3B82F6"
                    });
                    ;
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="w-11/12 md:w-2/3 mx-auto mt-36 mb-44 p-6 bg-white rounded-xl shadow-md">
            <title>eTuitionBd- Tuition Details</title>
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
                    <p className="font-semibold text-gray-700">Created at:</p>
                    <p className="text-gray-900">{new Date(exactTuition.created_at).toLocaleString("en-GB")}</p>
                </div>
            </div>

            {
                role.role === "Tutor" &&
                <div className="mt-6 text-center">
                           {
                        tuition?.length === 1 ? (
                            <button className="btn btn-primary" disabled>Applied</button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    modalRef.current.showModal();
                                }}
                            >
                                Apply
                            </button>
                        )
                    }
                     
                </div>
            }

            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl mb-4 text-primary">Apply for this Tuition</h3>


                    <form onSubmit={handleApply} className="grid gap-4">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Your Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user.displayName}
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Your Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                defaultValue={user.email}
                                className="input input-bordered w-full"
                                readOnly
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Qualifications</span>
                            </label>
                            <input
                                type="text"
                                name="qualification"

                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Experience (Years)</span>
                            </label>
                            <input
                                type="text"
                                name="experience"

                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Expected Salary</span>
                            </label>
                            <input
                                type="text"
                                name="salary"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <button className="btn btn-primary text-accent mt-3" type="submit">
                            Confirm
                        </button>
                    </form>

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

export default TuitionDetails;
