import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, Image, LogIn } from 'lucide-react';
import { Link } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from './SocialLogin';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser } = UseAuth()

    const handleRegister = (data) => {
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);

            })
    }

    const formVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15 } }
    };

    const imageVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 50, damping: 15, delay: 0.2 } }
    };

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-44 px-4 font-inter">
            <title>eTuitionBd- Register</title>
            <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">


                <motion.div
                    className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
                        Create Your Account
                    </h1>

                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">

                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <User className="w-5 h-5 mr-2 text-green-500" /> Name
                            </label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="input w-full p-3 bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your Name"
                            />
                            {errors.name?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Name is required.</p>}
                        </div>


                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Mail className="w-5 h-5 mr-2 text-cyan-500" /> Email
                            </label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your Email"
                            />
                            {errors.email?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Email is required.</p>}
                        </div>

                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Lock className="w-5 h-5 mr-2 text-green-500" /> Password
                            </label>
                            <div className="relative">
                                <input
                                    {...register('password', { required: true, minLength: 6 })}
                                    type={showPassword ? 'text' : 'password'}
                                    className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 pr-10"
                                    placeholder="Password"
                                />
                                {errors.password?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Password is required.</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-500 mt-1 text-sm'>Password should be at least 6 characters.</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-500 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <h2 className='text-xl'>
                            Select Your Role
                        </h2>
                        <div className='flex gap-6'>
                            <label className="label text-secondary">
                                <input type="radio" {...register('role')} value="Student" className="radio radio-primary" defaultChecked />
                                Student
                            </label>
                            <label className="label text-secondary">
                                <input type="radio" {...register('role')} value="Tutor" className="radio radio-primary" />
                                Tutor
                            </label>
                        </div>

                        <div>
                            <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                <Image className="w-5 h-5 mr-2 text-indigo-500" /> Phone Number
                            </label>
                            <input
                                {...register('phone', { required: true })}
                                type="text"
                                className="input w-full bg-white text-black p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
                                placeholder="Your phone number"
                            />
                            {errors.phone?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Phone Number is required.</p>}
                        </div>

                        <SocialLogin />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full cursor-pointer text-xl py-3 mt-6 rounded-xl font-bold text-white shadow-lg 
                                       bg-[#228B22] hover:from-green-700 hover:to-cyan-600 
                                       transition duration-300 flex items-center justify-center space-x-2"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>Register</span>
                        </motion.button>
                    </form>


                    <p className='text-center text-base mt-4 text-gray-600'>
                        Already have an account?
                        <Link to="/login" className='text-[#228B22] font-semibold ml-1 hover:underline'>
                            Login
                        </Link>
                    </p>
                </motion.div>


                <motion.div
                    className="hidden lg:flex w-full lg:w-1/2 p-16 bg-[#228B22] items-center justify-center relative"
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="absolute inset-0 opacity-10 bg-white/20"></div>

                    <div className="relative text-white z-10 text-center">
                        <svg
                            className="w-64 h-64 mx-auto"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="white"
                                strokeWidth="2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                            />
                            <motion.path
                                d="M8 12L12 16L16 8"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                            />
                        </svg>

                        <motion.h2
                            className="mt-6 text-4xl font-extrabold"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.8 }}
                        >
                            Join the Movement for a Cleaner Community
                        </motion.h2>

                        <motion.p
                            className="mt-2 text-lg font-light"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2.0 }}
                        >
                            Take a step towards a better tomorrow — report issues, raise awareness,
                            and be part of the change your neighborhood deserves.
                        </motion.p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Register;