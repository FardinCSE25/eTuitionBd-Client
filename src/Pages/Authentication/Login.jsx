import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser } = UseAuth()

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result);
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
    return (
        <>
            <title>eTuitionBd- Login</title>
            <style>
                {`
                    @keyframes pulse-bg {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animated-bg {
                        background: linear-linear(135deg, #e0f2f1, #e3f2fd, #e0f7fa);
                        background-size: 200% 200%;
                        animation: pulse-bg 15s ease infinite;
                    }
                `}
            </style>
            <div className="min-h-screen flex items-center justify-center pt-4 font-inter animated-bg">
                <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">

                    <motion.div
                        className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
                            Welcome Back!
                        </h1>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

                            <div>
                                <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                    <Mail className="w-5 h-5 mr-2 text-cyan-500" /> Email
                                </label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="input text-black w-full p-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
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
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', { required: true })}
                                        className="input w-full text-black bg-white p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 pr-10"
                                        placeholder="Password"
                                    />
                                    {errors.password?.type === 'required' && <p className='text-red-500 mt-1 text-sm'>Password is required.</p>}
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


                            <div className='text-right'>
                                <Link to="/resetPass" type='button' className="text-sm font-medium text-[#228B22] hover:text-[#006400] hover:underline transition">
                                    Forgot password?
                                </Link>
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
                                <span>Login</span>
                            </motion.button>
                        </form>


                        <p className='text-center text-base mt-6 text-gray-600'>
                            New to eTuitionBd ?
                            <Link to="/register" className='text-[#228B22] font-semibold ml-1 hover:underline'>
                                Register
                            </Link>
                        </p>
                    </motion.div>

                    <motion.div
                        className="lg:flex hidden w-full lg:w-1/2 p-16 bg-[#228B22] items-center justify-center relative"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="absolute inset-0 opacity-10 bg-white/20"></div>

                        <div className="relative text-white z-10 text-center">
                            <svg className="w-64 h-64 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <motion.circle
                                    cx="12" cy="12" r="10" stroke="white" strokeWidth="2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 1, type: 'spring' }}
                                />
                                <motion.path
                                    d="M8 12L12 16L16 8"
                                    stroke="white" strokeWidth="2"
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
                                Report & Track Local Issues
                            </motion.h2>

                            <motion.p
                                className="mt-2 text-lg font-light"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 2.0 }}
                            >
                                Log in to raise community concerns, report cleanliness problems,
                                and help make your neighborhood a cleaner, safer place.
                            </motion.p>
                        </div>
                    </motion.div>

                </div>
            </div >
        </>
    );
};

export default Login;