import React, { useState } from "react";
import { useNavigate } from "react-router";
import UseAuth from "../../../Hooks/UseAuth";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaBookOpen, 
  FaPlusCircle, 
  FaUserCheck, 
  FaCreditCard, 
  FaUserCog,
  FaArrowRight,
  FaGraduationCap
} from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";

const StudentHome = () => {
    const { user } = UseAuth();
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const stats = [
        { label: "Active Tuitions", value: "3", icon: <FaBookOpen />, change: "+12%", color: "from-blue-500 to-cyan-500" },
        { label: "Total Payments", value: "৳1,240", icon: <FaCreditCard />, change: "+8%", color: "from-emerald-500 to-green-500" },
        { label: "Applied Tutors", value: "5", icon: <FaUserCheck />, change: "+2", color: "from-purple-500 to-pink-500" },
        { label: "Success Rate", value: "94%", icon: <FiTrendingUp />, change: "+3%", color: "from-orange-500 to-red-500" }
    ];

    const cards = [
        {
            id: 1,
            title: "My Tuitions",
            desc: "View and manage all your tuition requests and approval status.",
            icon: <FaBookOpen />,
            color: "from-blue-500 to-cyan-500",
            gradient: "bg-linear-to-br from-blue-50 to-cyan-50",
            stats: "3 Active",
            path: "/dashboard/my-tuitions"
        },
        {
            id: 2,
            title: "Post New Tuition",
            desc: "Need a tutor? Post a new tuition requirement easily.",
            icon: <FaPlusCircle />,
            color: "from-emerald-500 to-green-500",
            gradient: "bg-linear-to-br from-emerald-50 to-green-50",
            action: "Create New",
            path: "/dashboard/post-new-tuition"
        },
        {
            id: 3,
            title: "Applied Tutors",
            desc: "Check tutors who have applied to teach you and review profiles.",
            icon: <FaUserCheck />,
            color: "from-purple-500 to-pink-500",
            gradient: "bg-linear-to-br from-purple-50 to-pink-50",
            stats: "5 Applications",
            path: "/dashboard/applied-tutors"
        },
        {
            id: 4,
            title: "Payment History",
            desc: "View past payments and transaction details in one place.",
            icon: <FaCreditCard />,
            color: "from-amber-500 to-orange-500",
            gradient: "bg-linear-to-br from-amber-50 to-orange-50",
            stats: "12 Transactions",
            path: "/dashboard/payment-history"
        },
        {
            id: 5,
            title: "Profile Settings",
            desc: "Update personal info and manage account details.",
            icon: <FaUserCog />,
            color: "from-indigo-500 to-violet-500",
            gradient: "bg-linear-to-br from-indigo-50 to-violet-50",
            action: "Update Profile",
            path: "/dashboard/profile-settings"
        }
    ];

    const handleCardClick = (path) => {
        // Add a small delay for animation to complete before navigation
        setTimeout(() => {
            navigate(path);
        }, 150);
    };

    const handleCardKeyPress = (event, path) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick(path);
        }
    };

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
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.03,
            y: -10,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    const statCardVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
            <title>eTuitionBd - Dashboard Home</title>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-96 h-96 rounded-full bg-linear-to-r from-primary/5 to-secondary/5"
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
                            duration: 25 + i * 5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Welcome Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-secondary shadow-2xl mb-8"
                >
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="relative p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-white/20">
                                        <FaGraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-white/90 text-sm font-medium">Welcome Back</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    Hello, <span className="bg-linear-to-r from-white to-blue-100 bg-clip-text text-transparent">{user?.displayName}</span> 👋
                                </h1>
                                <p className="text-white/90 max-w-2xl">
                                    Manage your tuitions, track payments, apply to tutors and customize your profile—everything in one place.
                                </p>
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative group"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                                    <img
                                        src={user?.photoURL || 'https://via.placeholder.com/150'}
                                        alt={user?.displayName}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/50 transition-all duration-300"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={statCardVariants}
                            whileHover="hover"
                            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-hidden group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-linear-to-r ${stat.color} text-white shadow-md`}>
                                    <div className="text-2xl">
                                        {stat.icon}
                                    </div>
                                </div>
                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-800">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                            <motion.div
                                className="h-1 w-0 group-hover:w-full bg-linear-to-r from-transparent via-white to-transparent absolute bottom-0 left-0"
                                initial={false}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Actions Grid */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Quick Actions</h2>
                            <p className="text-gray-600">Manage your learning journey with ease</p>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    whileTap="tap"
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onClick={() => handleCardClick(card.path)}
                                    onKeyDown={(e) => handleCardKeyPress(e, card.path)}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Navigate to ${card.title}`}
                                    className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                                >
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                    
                                    {/* Hover Overlay */}
                                    <motion.div
                                        className={`absolute inset-0 bg-linear-to-r ${card.color}`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <div className="relative bg-white p-6 rounded-2xl border border-gray-100 group-hover:border-transparent transition-all duration-300">
                                        {/* Icon */}
                                        <div className="flex items-center justify-between mb-6">
                                            <motion.div
                                                animate={{
                                                    scale: hoveredCard === index ? 1.2 : 1,
                                                    rotate: hoveredCard === index ? 5 : 0
                                                }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className={`p-4 rounded-xl bg-linear-to-r ${card.color} text-white shadow-lg`}
                                            >
                                                <div className="text-2xl">
                                                    {card.icon}
                                                </div>
                                            </motion.div>
                                            <motion.div
                                                animate={{
                                                    x: hoveredCard === index ? 5 : 0,
                                                    opacity: hoveredCard === index ? 1 : 0.5
                                                }}
                                            >
                                                <FaArrowRight className="text-gray-400 group-hover:text-primary text-xl" />
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {card.desc}
                                        </p>

                                        {/* Stats or Action */}
                                        <div className="flex items-center justify-between mt-4">
                                            {card.stats ? (
                                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    {card.stats}
                                                </span>
                                            ) : (
                                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 text-primary">
                                                    {card.action}
                                                </span>
                                            )}
                                            <motion.div
                                                className="h-1 w-8 bg-linear-to-r from-transparent via-primary to-transparent rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: hoveredCard === index ? "100%" : "2rem" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Click Animation Indicator */}
                                    <motion.div
                                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent opacity-0"
                                        initial={false}
                                        animate={{
                                            opacity: [0, 0.3, 0],
                                            x: ["-100%", "100%", "100%"]
                                        }}
                                        transition={{
                                            times: [0, 0.5, 1],
                                            duration: 0.6
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;