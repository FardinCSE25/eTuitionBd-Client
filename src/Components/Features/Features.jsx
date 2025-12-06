import React from "react";
import { FaCheckCircle, FaClock, FaShieldAlt, FaUsers } from "react-icons/fa";

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

    return (
        <section className="bg-secondary rounded-xl my-20 py-16 px-5">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-primary">Why Choose Us</h2>
                <p className="text-accent mt-2 max-w-2xl mx-auto">
                    Our platform provides a seamless and reliable experience connecting students and tutors.
                </p>
            </div>

            {/* Fully Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="card bg-white w-full shadow-md rounded-xl p-6
                                   cursor-pointer transition-all duration-300
                                   hover:bg-primary group"
                    >
                        <div className="flex justify-center mb-4">
                            {React.cloneElement(feature.icon, {
                                className: `${feature.icon.props.className} group-hover:text-white transition-colors duration-300`
                            })}
                        </div>

                        <h3 className="text-xl font-semibold text-secondary text-center mb-3 group-hover:text-white transition">
                            {feature.title}
                        </h3>

                        <p className="text-gray-600 text-center group-hover:text-white transition">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
