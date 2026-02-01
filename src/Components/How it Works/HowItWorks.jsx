import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUserGraduate className="text-4xl text-primary" />,
      title: "Post Tuition Requirement",
      desc: "Students can post their tuition requirements including subject, class, location, schedule, and budget."
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-primary" />,
      title: "Apply & Approve Tutors",
      desc: "Tutors browse tuition posts and apply. Students review applications and approve verified tutors."
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-primary" />,
      title: "Secure Payment & Track Progress",
      desc: "Students pay tutors securely after approval. Track tuition status and payment history from the dashboard."
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
        <h2 className="text-3xl font-bold text-primary mb-3">
          How the Platform Works
        </h2>
        <p className="text-accent mt-2 max-w-2xl mx-auto">
          A simple 3-step process to connect students with verified tutors and manage tuitions efficiently.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // reload-safe
      >
        {steps.map((item, i) => (
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
              {React.cloneElement(item.icon, {
                className: `${item.icon.props.className} group-hover:text-white transition-colors duration-300`
              })}
            </div>
            <h3 className="text-xl font-semibold text-secondary text-center mb-3 group-hover:text-white transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center group-hover:text-white transition-colors duration-300">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
