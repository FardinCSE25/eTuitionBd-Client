import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../../Components/Loading/Loading';
import UseAxios from '../../Hooks/UseAxios';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCalendar, FiUser, FiChevronRight } from 'react-icons/fi';
import { FaGraduationCap, FaStar } from 'react-icons/fa';
import TutorsLoading from '../../Components/Loading/HomePage/TutorsLoading';

const Tutors = () => {
    const axiosInstance = UseAxios();
    const [hoveredCard, setHoveredCard] = useState(null);

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users`);
            return res.data;
        },
    });

    const tutors = users.filter(user => user.role === "Tutor");

    if (isLoading) {
        return <TutorsLoading />;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 px-4 md:px-0 py-8 md:pt-36 md:pb-24">
            <title>eTuitionBd - Tutors</title>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 rounded-full bg-linear-to-r from-primary/10 to-secondary/10"
                        initial={{
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                            scale: 0
                        }}
                        animate={{
                            x: Math.random() * 100 - 50 + 'vw',
                            y: Math.random() * 100 - 50 + 'vh',
                            scale: [0, 1, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 20 + i * 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative w-full md:w-10/12 lg:w-9/12 mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-r from-primary to-secondary mb-6 shadow-lg">
                        <FaGraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Our Expert <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Tutors</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Meet our passionate educators dedicated to your learning journey
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-md">
                        <span className="text-gray-600">Total Tutors:</span>
                        <span className="px-4 py-1 rounded-full bg-primary text-white font-bold text-lg">
                            {tutors.length}
                        </span>
                    </div>
                </motion.div>

                {/* Tutors Grid View */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                        <FiUser className="text-primary" />
                        Meet Our Team
                    </h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {tutors.map((tutor) => (
                                <motion.div
                                    key={tutor._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -10,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                    onMouseEnter={() => setHoveredCard(tutor._id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Hover Overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-linear-to-r from-primary/10 to-secondary/10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredCard === tutor._id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Rating Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200">
                                            <FaStar className="w-4 h-4 text-yellow-500" />
                                            <span className="text-sm font-bold text-gray-800">4.8</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Avatar */}
                                        <div className="relative mb-6">
                                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-primary transition-all duration-300">
                                                <motion.img
                                                    src={tutor.photoURL || 'https://via.placeholder.com/150'}
                                                    alt={tutor.displayName}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            </div>
                                            <div className="absolute bottom-0 right-1/4 w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white"></div>
                                            </div>
                                        </div>

                                        {/* Tutor Info */}
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                                                {tutor.displayName}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">Expert Tutor</p>

                                            {/* Skills Tags */}
                                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                                {['Math', 'Science', 'English'].map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary transition-all"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-3 border-t border-gray-100 pt-4">
                                            <div className="flex items-center gap-3 text-gray-600 group-hover:text-primary transition-colors">
                                                <FiMail className="w-5 h-5" />
                                                <span className="text-sm truncate">{tutor.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FiCalendar className="w-5 h-5" />
                                                <span className="text-sm">
                                                    Joined {new Date(tutor.created_at).toLocaleDateString("en-GB", {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Enhanced Table View */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-6 md:p-8 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">All Tutors List</h2>
                        <p className="text-gray-600">Detailed information about all our tutors</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-linear-to-r from-primary to-secondary">
                                    <th className="py-5 px-6 text-left">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">#</span>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">Tutor Information</span>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">Contact</span>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">Joined Date</span>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <span className="text-white font-bold text-sm uppercase tracking-wider">Status</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <AnimatePresence>
                                    {tutors.map((tutor, index) => (
                                        <motion.tr
                                            key={tutor._id}
                                            variants={tableRowVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover={{
                                                backgroundColor: "rgba(59, 130, 246, 0.05)",
                                                scale: 1.005
                                            }}
                                            transition={{ duration: 0.2 }}
                                            className="border-b border-gray-100 hover:bg-blue-50/50 transition-all duration-300"
                                        >
                                            <td className="py-4 px-6">
                                                <div className="text-lg font-bold text-gray-800">{index + 1}</div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.6 }}
                                                        className="relative"
                                                    >
                                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                                                            <img
                                                                src={tutor.photoURL || 'https://via.placeholder.com/150'}
                                                                alt={tutor.displayName}
                                                                className="w-full h-full object-cover"
                                                                referrerPolicy="no-referrer"
                                                            />
                                                        </div>
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                                                    </motion.div>
                                                    <div>
                                                        <div className="font-bold text-gray-800 hover:text-primary transition-colors cursor-pointer">
                                                            {tutor.displayName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">Expert Tutor</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <motion.a
                                                    href={`mailto:${tutor.email}`}
                                                    whileHover={{ x: 5 }}
                                                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                                                >
                                                    <FiMail className="w-4 h-4" />
                                                    <span className="text-sm md:text-base break-all group-hover:underline">
                                                        {tutor.email}
                                                    </span>
                                                </motion.a>
                                            </td>

                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-700 font-medium">
                                                        {new Date(tutor.created_at).toLocaleDateString("en-GB", {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-6">
                                                <motion.span
                                                    initial={{ scale: 0.8 }}
                                                    animate={{ scale: 1 }}
                                                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200"
                                                >
                                                    Active
                                                </motion.span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center text-gray-600"
                >
                    <p className="text-sm">
                        Showing <span className="font-bold text-primary">{tutors.length}</span> expert tutors
                        ready to guide your learning journey
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Tutors;