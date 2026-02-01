import React from "react";
import { FaCheckCircle, FaClock, FaShieldAlt, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      title: "Verified Tutors",
      desc: "All tutors are verified by our admin to ensure quality education and reliability."
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      title: "Flexible Scheduling",
      desc: "Students and tutors can schedule classes at convenient times, making learning stress-free."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Secure Payments",
      desc: "All payments are processed securely through Stripe with full transparency and tracking."
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Student-Tutor Communication",
      desc: "Direct communication between students and tutors to ensure smooth coordination and feedback."
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      className="bg-secondary rounded-xl my-20 py-16 px-5"
      variants={sectionVariants}
      initial="hidden"
      animate="visible" // reload-safe
    >
      {/* Section Header */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-primary mb-3">Why Choose Us</h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          Our platform provides a seamless and reliable experience connecting students and tutors.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // reload-safe
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -6,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="bg-white rounded-xl p-6 cursor-pointer relative group hover:bg-primary"
          >
            <div className="flex justify-center mb-4">
              {React.cloneElement(feature.icon, {
                className: `${feature.icon.props.className} group-hover:text-white transition-colors duration-300`
              })}
            </div>
            <h3 className="text-xl font-semibold text-secondary text-center mb-3 group-hover:text-white transition-colors duration-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center group-hover:text-white transition-colors duration-300">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
