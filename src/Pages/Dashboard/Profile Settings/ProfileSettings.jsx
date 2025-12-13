import React, { useRef } from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import UseAxios from "../../../Hooks/UseAxios";
import axios from "axios";
import { useNavigate } from "react-router";

const ProfileSettings = () => {
    const { user, updateUserProfile } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const modalRef = useRef(null);
    const navigate = useNavigate()

    const { data: profile = {}, isLoading, refetch } = useQuery({
        queryKey: ["profile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        },
    });

    console.log(profile);


    if (isLoading) return <Loading />;

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const photo = form.photo.files[0]
        // console.log(photo);

        
        const formData = new FormData();
        formData.append('image', photo);
        const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;

        axios.post(photo_API_URL, formData)
            .then(result => {
                console.log(result);
                
                const photoURL = result.data.data.display_url;

                const updatedProfile = {
                    name: form.name.value,
                    photoURL: photoURL,
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

                    const userProfile = {
                    displayName: form.name.value,
                    photoURL: photoURL
                };

                updateUserProfile(userProfile)
                    .then(() => navigate(location.state || '/'))
                    .catch(err => console.log(err));
            })
        }

        const p = profile[0];

        return (

            <div className="py-16 lg:py-26">
                <motion.div
                    className="w-11/12 md:w-7/12 lg:w-5/12 mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <title>eTuitionBd- Profile Settings</title>
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
                                        <span className="label-text font-semibold">Photo</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="photo"
                                        className="file-input w-full"
                                        required
                                    />
                                </div>

                                {/* <div>
                                <label className="text-gray-700 font-semibold flex items-center mt-3 mb-2">
                                    <Image className="w-5 h-5 mr-2 text-primary" /> Photo
                                </label>
                                <input type="file" {...register('photo', { required: true })} className="file-input w-full" />
                                {errors.photo && <p className='text-red-500 mt-1 text-sm'>Photo is required.</p>}
                            </div> */}

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
            </div>
        )
    };

    export default ProfileSettings;
