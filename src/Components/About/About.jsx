import React, { useState } from "react";
import aboutImage from "../../assets/stack-books-graduation-cap-flat-600nw-2583669407.webp";
import { FaCheckCircle, FaUsers, FaLaptopCode, FaGraduationCap, FaArrowRight, FaLightbulb } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const About = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const points = [
        {
            icon: <FaCheckCircle />,
            title: "Verified Tutors",
            text: "Rigorously verified tutors for every subject ensuring quality education with background checks.",
            color: "from-green-500 to-emerald-600",
            gradient: "bg-gradient-to-br from-green-50 to-emerald-100"
        },
        {
            icon: <FaUsers />,
            title: "Seamless Connection",
            text: "Effortless connection between students and tutors with transparent communication channels.",
            color: "from-blue-500 to-cyan-600",
            gradient: "bg-gradient-to-br from-blue-50 to-cyan-100"
        },
        {
            icon: <FaLaptopCode />,
            title: "Digital Dashboard",
            text: "Comprehensive digital dashboard to track classes, payments, and applications efficiently.",
            color: "from-purple-500 to-indigo-600",
            gradient: "bg-gradient-to-br from-purple-50 to-indigo-100"
        }
    ];


    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
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

    const imageVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                duration: 0.8
            }
        }
    };

    const featureCardVariants = {
        hidden: { x: 30, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            scale: 1.02,
            x: 10,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative min-h-screen flex items-center justify-center pt-40 pb-20 px-4 md:px-6 overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-l from-primary/10 to-secondary/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <title>eTuitionBd - About</title>

            <div className="relative max-w-11/12 mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Image Section with Animation */}
                    <motion.div
                        variants={imageVariants}
                        className="relative"
                    >
                        <div className="relative z-10">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="rounded-3xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src={aboutImage}
                                    alt="About eTuitionBd"
                                    className="w-full h-230 object-cover transform hover:scale-110 transition-transform duration-700"
                                />
                            </motion.div>

                            {/* Floating Badges */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -right-6 bg-linear-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl shadow-xl"
                            >
                                <div className="flex items-center gap-2">
                                    <FaGraduationCap className="text-xl" />
                                    <span className="font-bold text-lg">Since 2025</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-linear-to-r from-primary/20 to-secondary/20"
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>

                    {/* Text Section */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Title Section */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-secondary/10 text-primary font-semibold">
                                <FaGraduationCap />
                                <span>About Our Platform</span>
                            </div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-4xl md:text-5xl font-bold"
                            >
                                <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Revolutionizing
                                </span>
                                <br />
                                <span className="text-gray-800">Education Management</span>
                            </motion.h2>

                            <motion.p
                                variants={itemVariants}
                                className="text-gray-600 text-lg md:text-xl leading-relaxed"
                            >
                                eTuitionBd is a cutting-edge Tuition Management System designed to bridge the gap
                                between students and verified tutors. Our intelligent platform ensures secure,
                                transparent, and efficient educational experiences for everyone involved.
                            </motion.p>
                        </div>

                        {/* Features List */}
                        <motion.div variants={containerVariants} className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-800">Why Choose eTuitionBd?</h3>

                            <div className="space-y-4">
                                {points.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        variants={featureCardVariants}
                                        whileHover="hover"
                                        onMouseEnter={() => setHoveredItem(index)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${point.gradient} border border-gray-200`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <motion.div
                                                animate={{
                                                    scale: hoveredItem === index ? 1.2 : 1,
                                                    rotate: hoveredItem === index ? 10 : 0
                                                }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className={`p-3 rounded-xl bg-linear-to-r ${point.color} text-white`}
                                            >
                                                <div className="text-2xl">
                                                    {point.icon}
                                                </div>
                                            </motion.div>

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="text-xl font-bold text-gray-800">
                                                        {point.title}
                                                    </h4>
                                                    <motion.div
                                                        animate={{
                                                            x: hoveredItem === index ? 5 : 0,
                                                            opacity: hoveredItem === index ? 1 : 0.5
                                                        }}
                                                    >
                                                        <FaArrowRight className="text-primary" />
                                                    </motion.div>
                                                </div>
                                                <p className="text-gray-600">
                                                    {point.text}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div variants={itemVariants}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-linear-to-r from-primary to-secondary text-white rounded-2xl font-bold text-lg overflow-hidden"
                            >
                                <Link to="/" className="relative z-10 flex items-center gap-2">
                                    Explore Platform
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <FaArrowRight />
                                    </motion.span>
                                </Link>
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Elements */}
            <motion.div
                className="absolute bottom-10 left-10 hidden lg:block"
                animate={{
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="w-16 h-16 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                    <FaCheckCircle className="text-primary text-2xl" />
                </div>
            </motion.div>

            <motion.div
                className="absolute top-10 right-10 hidden lg:block"
                animate={{
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                <div className="w-20 h-20 rounded-full bg-linear-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                    <FaUsers className="text-secondary text-3xl" />
                </div>
            </motion.div>
        </motion.section>
    );
};

export default About;