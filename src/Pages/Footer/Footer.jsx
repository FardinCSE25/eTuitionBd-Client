import React from 'react';
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { SiX } from 'react-icons/si';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-secondary text-primary px-6 py-10 mt-16">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-28">

                <div className="text-center md:text-left">
                    <p className="font-bold text-xl mt-3">eTuitionBd</p>
                    <p className="text-sm mt-1 leading-relaxed">
                        Find verified tutors, manage tuitions, track payments, and connect with your ideal tutor — all in one platform.
                    </p>
                    <p className="text-xs text-accent mt-4 opacity-70">
                        © {new Date().getFullYear()} eTuitionBd — All rights reserved.
                    </p>
                </div>

             
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg mb-3">How eTuitionBd Works</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>📚 Students post tuition requirements & schedules</li>
                        <li>🧑‍🏫 Tutors browse posts & apply</li>
                        <li>✅ Admin verifies tutors & approves posts</li>
                        <li>💸 Students pay approved tutors securely</li>
                        <li>📊 Dashboard to track classes & payments</li>
                    </ul>
                </div>

            
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg mb-3">Quick Links & Socials</h3>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li>🏠 Home</li>
                        <li className="list-none">📚 Tuition Listing</li>
                        <li className="list-none">🧑‍🏫 Tutors</li>
                        <li className="list-none">💳 Payment History</li>
                        <li className="list-none">⚙️ Profile Settings</li>
                    </ul>

                   
                    <div className="flex justify-center md:justify-start gap-5 mt-5 text-primary">
                        <a target="blank" href="https://www.facebook.com/fardin.ahmed.493619">
                            <FaFacebook size={26} className="cursor-pointer hover:text-accent duration-200" />
                        </a>

                        <a target="blank" href="https://www.youtube.com/@Nafiz0809">
                            <FaYoutube size={26} className="cursor-pointer hover:text-red-600 duration-200" />
                        </a>

                        <a target="blank" href="https://x.com/FardinAhmed203">
                            <SiX size={26} className="cursor-pointer hover:text-white duration-200" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
