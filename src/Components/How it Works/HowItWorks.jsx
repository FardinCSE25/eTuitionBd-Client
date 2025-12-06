import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave } from "react-icons/fa";

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

    return (
        <section className="bg-secondary rounded-xl my-20 py-16 px-5">
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h2 className="text-3xl font-bold text-primary">How the Platform Works</h2>
                <p className="text-accent mt-2 max-w-2xl mx-auto">
                    A simple 3-step process to connect students with verified tutors and manage tuitions efficiently.
                </p>
            </div>

            {/* Fully Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {steps.map((item, i) => (
                    <div
                        key={i}
                        className="card bg-white w-full shadow-md rounded-xl p-6 
                                   cursor-pointer transition-all duration-300
                                   hover:bg-primary group"
                    >
                        <div className="flex justify-center mb-4">
                            {React.cloneElement(item.icon, {
                                className: `${item.icon.props.className} group-hover:text-white transition-colors duration-300`
                            })}
                        </div>

                        <h3 className="text-xl font-semibold text-secondary text-center mb-3 group-hover:text-white transition">
                            {item.title}
                        </h3>

                        <p className="text-gray-600 text-center group-hover:text-white transition">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
