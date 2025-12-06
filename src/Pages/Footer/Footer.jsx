import React from 'react';
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { SiX } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-secondary text-primary px-8 py-14 mt-16">
            <div className="w-[1600px] mx-auto grid md:grid-cols-3 gap-52 text-center md:text-left">

                {/* Brand / Logo */}
                <div>
                    <p className="font-bold text-lg mt-3">eTuitionBd</p>
                    <p className="text-sm mt-1">
                        Find verified tutors, manage tuitions, track payments, and connect with your ideal tutor— all in one platform.
                    </p>
                    <p className="text-xs text-accent mt-4 opacity-70">
                        © {new Date().getFullYear()} eTuitionBd — All rights reserved.
                    </p>
                </div>

                {/* How the Platform Works */}
                <div>
                    <h3 className="font-bold text-lg mb-3">How eTuitionBd Works</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>📚 Students post tuition requirements & schedules</li>
                        <li>🧑‍🏫 Tutors browse posts & apply</li>
                        <li>✅ Admin verifies tutors & approves posts</li>
                        <li>💸 Students pay approved tutors securely</li>
                        <li>📊 Dashboard to track classes & payments</li>
                    </ul>
                </div>

                {/* Quick Links & Socials */}
                <div className='w-[200px]'>
                    <h3 className="font-bold text-lg mb-3">Quick Links & Socials</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>🏠 Home</li>
                        <li>📚 Tuition Listing</li>
                        <li>🧑‍🏫 Tutors</li>
                        <li>💳 Payment History</li>
                        <li>⚙️ Profile Settings</li>
                    </ul>

                    <div className="flex justify-center md:justify-start gap-5 mt-5 text-primary">
                        <FaFacebook size={26} className="cursor-pointer hover:text-white duration-200" />
                        <FaYoutube size={26} className="cursor-pointer hover:text-white duration-200" />
                        <SiX size={26} className="cursor-pointer hover:text-white duration-200" />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
