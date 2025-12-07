import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, BookOpen } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import UseAuth from '../../Hooks/UseAuth';
import SocialLogin from './SocialLogin';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    const { signInUser } = UseAuth();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result);
                navigate(location?.state || "/");
            })
            .catch(error => console.log(error));
    };

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
            <title>eTuitionBd — Login</title>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">

                <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">

                    {/* LEFT FORM SECTION */}
                    <motion.div
                        className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-10">
                            Welcome Back
                        </h1>

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

                            {/* Email */}
                            <div>
                                <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                    <Mail className="w-5 h-5 mr-2 text-primary" /> Email
                                </label>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="w-full p-3 text-black bg-white border border-gray-300 rounded-xl 
                                    focus:ring-2 focus:ring-primary transition"
                                    placeholder="Your Email"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-lg font-medium text-gray-700 flex items-center mb-1">
                                    <Lock className="w-5 h-5 mr-2 text-primary" /> Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password', { required: true })}
                                        className="w-full p-3 bg-white text-black border border-gray-300 rounded-xl 
                                        focus:ring-2 focus:ring-primary transition pr-10"
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
                            </div>

                            <div className="text-right">
                                <Link to="/resetPass" className="text-primary hover:underline text-sm font-medium">
                                    Forgot password?
                                </Link>
                            </div>

                            <SocialLogin />

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-primary text-white text-xl py-3 mt-1 rounded-xl font-bold shadow-lg transition"
                            >
                                <LogIn className="w-5 h-5 inline-block mr-2" />
                                Login
                            </motion.button>
                        </form>

                        <p className="text-center text-gray-700 mt-6">
                            New to eTuitionBd?
                            <Link state={location.state} to="/register" className="text-primary font-semibold ml-1 hover:underline">
                                Register
                            </Link>
                        </p>
                    </motion.div>

                    {/* RIGHT SIDE EDUCATIONAL THEME SECTION */}
                    <motion.div
                        className="hidden lg:flex w-full lg:w-1/2 p-16 bg-primary items-center justify-center relative"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="absolute inset-0 bg-white opacity-10"></div>

                        <div className="relative text-accent z-10 text-center max-w-md">
                            <BookOpen className="w-24 h-24 mx-auto mb-6" />
                            <motion.h2
                                className="text-4xl font-extrabold mb-4"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Your Learning Journey Starts Here
                            </motion.h2>

                            <motion.p
                                className="text-lg font-light"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                Login to access personalized tuition resources, academic tools,
                                professional tutors, real-time progress tracking, and community study
                                support — all in one platform.
                            </motion.p>

                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
};

export default Login;
