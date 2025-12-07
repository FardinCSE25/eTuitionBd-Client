import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Phone, LogIn, BookOpen, Image } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from './SocialLogin';
import axios from 'axios';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { registerUser, updateUserProfile } = UseAuth();

    const handleRegister = (data) => {
        const photo = data.photo[0]
        const formData = new FormData();
        formData.append('image', photo);
        const photo_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageHost}`;

        axios.post(photo_API_URL, formData)
            .then(result => {
                const photoURL = result.data.data.url;

                const userInfo = {
                    email: data.email,
                    displayName: data.name,
                    photoURL: photoURL
                };
                
                updateUserProfile(userInfo)
                    .then(() => navigate(location.state || '/'))
                    .catch(err => console.log(err));
            })

        registerUser(data.email, data.password)
            .then(result => console.log(result.user))
            .catch(error => console.log(error));
    };

    const formVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 15 } }
    };

    const imageVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50, damping: 15, delay: 0.2 } }
    };

    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-24 px-4 font-inter">

            <title>eTuitionBd - Register</title>

            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">

                {/* LEFT FORM SECTION */}
                <motion.div
                    className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-10">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="text-lg font-medium text-secondary flex items-center mb-1">
                                <User className="w-5 h-5 mr-2 text-primary" /> Name
                            </label>
                            <input
                                {...register("name", { required: true })}
                                type="text"
                                className="input w-full p-3 bg-white text-black border border-gray-300 rounded-xl 
                                focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Your Name"
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-lg font-medium text-secondary flex items-center mb-1">
                                <Mail className="w-5 h-5 mr-2 text-primary" /> Email
                            </label>
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                className="input w-full p-3 bg-white text-black border border-gray-300 rounded-xl 
                                focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Your Email"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required.</p>}
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-lg font-medium text-secondary flex items-center mb-1">
                                <Lock className="w-5 h-5 mr-2 text-primary" /> Password
                            </label>

                            <div className="relative">
                                <input
                                    {...register("password", { required: true, minLength: 6 })}
                                    type={showPassword ? "text" : "password"}
                                    className="input w-full p-3 bg-white text-black border border-gray-300 rounded-xl 
                                    focus:ring-2 focus:ring-primary focus:border-primary pr-10"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-primary"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>

                            <div>
                                <label className="text-gray-700 font-semibold flex items-center mt-3 mb-2">
                                    <Image className="w-5 h-5 mr-2 text-primary" /> Photo
                                </label>
                                <input type="file" {...register('photo', { required: true })} className="file-input w-full" />
                                {errors.photo && <p className='text-red-500 mt-1 text-sm'>Photo is required.</p>}
                            </div>

                            {errors.password?.type === "required" && (
                                <p className="text-red-500 text-sm">Password is required.</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500 text-sm">Password must be 6+ characters.</p>
                            )}
                        </div>

                        {/* ROLE */}
                        <h2 className="text-lg font-medium text-secondary mb-3">Select Your Role</h2>
                        <div className="flex gap-6">
                            <label className="label text-secondary text-sm">
                                <input type="radio" {...register("role")} value="Student" className="radio radio-primary" defaultChecked />
                                Student
                            </label>
                            <label className="label text-secondary text-sm">
                                <input type="radio" {...register("role")} value="Tutor" className="radio radio-primary" />
                                Tutor
                            </label>
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="text-lg font-medium text-secondary flex items-center mb-2">
                                <Phone className="w-5 h-5 mr-2 text-primary" /> Phone Number
                            </label>
                            <input
                                {...register("phone", { required: true })}
                                type="text"
                                className="input mb-3 w-full p-3 bg-white text-black border border-gray-300 rounded-xl 
                                focus:ring-2 focus:ring-primary focus:border-primary"
                                placeholder="Your phone number"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">Phone number is required.</p>}
                        </div>

                        <SocialLogin />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full text-xl py-3 mt-4 rounded-xl font-bold text-accent shadow-lg 
                            bg-primary transition duration-300 flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-5 h-5" /> Register
                        </motion.button>
                    </form>

                    <p className="text-center text-secondary mt-4">
                        Already have an account?
                        <Link state={location.state} to="/login" className="text-primary font-semibold ml-1 hover:underline">
                            Login
                        </Link>
                    </p>
                </motion.div>

                {/* RIGHT SIDE THEME SECTION */}
                <motion.div
                    className="hidden lg:flex w-full lg:w-1/2 p-16 bg-primary items-center justify-center relative"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="absolute inset-0 opacity-10 bg-white"></div>

                    <div className="relative text-accent z-10 text-center">
                        <BookOpen className="w-24 h-24 mx-auto mb-6" />

                        <motion.h2
                            className="text-4xl font-extrabold"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.0 }}
                        >
                            Learn Smarter with eTuitionBd
                        </motion.h2>

                        <motion.p
                            className="mt-4 text-lg font-light max-w-md mx-auto leading-relaxed"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                        >
                            Connect with expert tutors, attend live classes, complete assignments,
                            and grow academically — all in one digital platform built for modern students.
                        </motion.p>

                        <motion.p
                            className="mt-4 text-md font-medium opacity-90"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6 }}
                        >
                            ⭐ Trusted by Students & Tutors across Bangladesh
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
