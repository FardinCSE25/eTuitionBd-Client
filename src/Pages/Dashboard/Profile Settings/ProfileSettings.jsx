import React, { useRef } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProfileSettings = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const modalRef = useRef(null);

    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loading />;

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedProfile = {
            name: form.name.value,
            photo: form.photo.value,
        };

        axiosSecure
            .patch(`/users?email=${user?.email}`, updatedProfile)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    modalRef.current.close();
                    Swal.fire({
                        title: "Profile Updated!",
                        text: "Your profile has been successfully updated.",
                        icon: "success",
                        confirmButtonColor: "#3B82F6",
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const p = profile[0];

    return (
        <motion.div
            className="w-11/12 md:w-7/12 lg:w-5/12 mx-auto mt-32 mb-20 bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative mb-6">
                <img
                    src={p.photoURL}
                    alt="profile"
                    className="w-36 h-36 rounded-full border-4 border-blue-300 shadow-xl object-cover"
                />
            </div>

            <div className="text-center space-y-3 mb-6">
                <h1 className="text-3xl font-extrabold text-primary">{p.displayName}</h1>
                <p className="text-gray-600 text-lg">{p.email}</p>
            </div>

            <button
                className="px-7 py-3 bg-primary text-white rounded-full hover:bg-secondary transition mb-6"
                onClick={() => modalRef.current.showModal()}
            >
                Edit Profile
            </button>

            <dialog ref={modalRef} className="modal">
                <div className="modal-box rounded-2xl p-6">
                    <h3 className="text-center text-2xl font-bold text-primary mb-4">
                        Update Your Profile
                    </h3>

                    <form onSubmit={handleProfileUpdate} className="grid gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={p.displayName}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                defaultValue={p.photoURL}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary mt-3 text-white"
                            type="submit"
                        >
                            Save Changes
                        </motion.button>
                    </form>

                    <button
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                        onClick={() => modalRef.current.close()}
                    >
                        ✕
                    </button>
                </div>
            </dialog>
        </motion.div>
    );
};

export default ProfileSettings;
