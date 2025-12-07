import React, { useEffect, useState } from 'react';
import { CiDeliveryTruck } from 'react-icons/ci';
import { FaTasks, FaUsers } from 'react-icons/fa';
import { FaMotorcycle, FaRegCreditCard } from 'react-icons/fa6';
import { Link, Outlet } from 'react-router';
import useRole from '../Hooks/UseRole';
import { RiEBikeFill } from 'react-icons/ri';
import { SiGoogletasks } from 'react-icons/si';

const DashboardLayout = () => {
    const { role } = useRole();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const update = () => {
            if (window.innerWidth >= 1024) setIsOpen(true);
            else setIsOpen(false);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const toggle = () => setIsOpen(v => !v);
    const close = () => {
        if (window.innerWidth < 1024) setIsOpen(false);
    };

    return (
        <div className="drawer lg:drawer-open">

            {/* Main drawer toggle controller */}
            <input
                id="dashboard-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                onChange={(e) => setIsOpen(e.target.checked)}
            />

            {/* NAVBAR */}
            <div className="drawer-content">
                <nav className="navbar bg-primary px-4">
                    {/* Menu Button (works for ALL devices) */}
                    <button
                        onClick={toggle}
                        className="btn lg:hidden bg-base-200 mr-6 hover:bg-gray-300 btn-ghost"
                    >
                        {/* icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            strokeLinejoin="round" strokeLinecap="round" strokeWidth="2"
                            fill="none" stroke="currentColor" className="size-5">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </button>

                    <span className="text-accent font-bold ml-2 text-lg">eTuitionBd Dashboard</span>
                </nav>

                {/* PAGE CONTENT */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* SIDEBAR */}
            <div className="drawer-side">
                {/* overlay - only mobile */}
                <label htmlFor="dashboard-drawer" className="drawer-overlay" onClick={close}></label>

                <aside
                    className={`min-h-full bg-secondary/95 duration-300 flex flex-col 
                        ${isOpen ? "w-64" : "w-20"}
                    `}
                >
                    {/* top toggle button INSIDE sidebar */}
                    <button
                        onClick={toggle}
                        className="btn btn-ghost mt-3 mx-2 bg-base-200 hover:bg-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            strokeLinejoin="round" strokeLinecap="round" strokeWidth="2"
                            fill="none" stroke="currentColor" className="size-5">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </button>

                    <ul className="menu px-2 py-4 gap-1">

                        {DrawerItem("/", "Homepage", <HomeIcon />, isOpen)}

                        {DrawerItem("/dashboard/my-tuitions", "My Tuitions", <CiDeliveryTruck />, isOpen)}

                        {DrawerItem("/dashboard/post-new-tuition", "Post New Tuition", <FaRegCreditCard />, isOpen)}

                        {DrawerItem("/dashboard/applied-tutors", "Applied Tutors", <FaRegCreditCard />, isOpen)}
                        
                        {DrawerItem("/dashboard/payment-history", "Payment History", <FaRegCreditCard />, isOpen)}

                        {DrawerItem("/dashboard/profile-settings", "Profile Settings", <FaRegCreditCard />, isOpen)}

                        {role === "Tutor" && (
                            <>
                                {DrawerItem("/dashboard/my-applications", "My Applications", <FaTasks />, isOpen)}

                                {DrawerItem("/dashboard/ongoing-tuitions", "Ongoing Tuitions", <SiGoogletasks />, isOpen)}

                                {DrawerItem("/dashboard/revenue-history", "Revenue History", <SiGoogletasks />, isOpen)}
                            </>
                        )}
                        {role === "Admin" && (
                            <>
                                {DrawerItem("/dashboard/manage-users", "User Management", <FaUsers />, isOpen)}

                                {DrawerItem("/dashboard/manage-tuitions", "Tuition Management", <FaMotorcycle />, isOpen)}

                                {DrawerItem("/dashboard/reports-analytics", "Reports & Analytics", <RiEBikeFill />, isOpen)}
                            </>
                        )}

                    </ul>
                </aside>
            </div>
        </div>
    );
};

/* Drawer Item Component */
const DrawerItem = (to, label, icon, isOpen) => (
    <li>
        <Link
            to={to}
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-primary transition-all 
                ${!isOpen ? "tooltip tooltip-right" : ""}
            `}
        // data-tip={!isOpen ? label : ""}
        >
            <span className="text-xl text-accent">{icon}</span>
            {isOpen && <span className='text-accent'>{label}</span>}
        </Link>
    </li>
);

/* SVG ICONS */
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        strokeWidth="2" fill="none" stroke="currentColor" className="size-5">
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        strokeWidth="2" fill="none" stroke="currentColor" className="size-5">
        <path d="M20 7h-9"></path>
        <path d="M14 17H5"></path>
        <circle cx="17" cy="17" r="3"></circle>
        <circle cx="7" cy="7" r="3"></circle>
    </svg>
);

export default DashboardLayout;
