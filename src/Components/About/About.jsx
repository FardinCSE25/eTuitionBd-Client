import React from "react";
import aboutImage from "../../assets/stack-books-graduation-cap-flat-600nw-2583669407.webp";
import { FaCheckCircle, FaUsers, FaLaptopCode } from "react-icons/fa";

export default function About() {
    const points = [
        {
            icon: <FaCheckCircle className="text-primary text-3xl mr-3" />,
            text: "Verified tutors for every subject ensuring quality education."
        },
        {
            icon: <FaUsers className="text-primary text-3xl mr-3" />,
            text: "Seamless connection between students and tutors with transparent communication."
        },
        {
            icon: <FaLaptopCode className="text-primary text-3xl mr-3" />,
            text: "Digital dashboard to track classes, payments, and applications efficiently."
        }
    ];

    return (
        <section className="bg-secondary rounded-xl my-20 py-16 px-5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                
                {/* Image Section */}
                <div className="lg:w-1/2">
                    <img 
                        src={aboutImage} 
                        alt="About eTuitionBd" 
                        className="rounded-xl w-full shadow-lg"
                    />
                </div>

                {/* Text Section */}
                <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-primary">About eTuitionBd</h2>
                    <p className="text-accent text-lg">
                        eTuitionBd is a modern Tuition Management System connecting students with verified tutors. 
                        Our platform ensures smooth communication, secure payments, and efficient class tracking.
                    </p>

                    {/* Features List */}
                    <ul className="space-y-4">
                        {points.map((point, index) => (
                            <li key={index} className="flex items-center text-accent text-lg">
                                {point.icon}
                                <span>{point.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}
