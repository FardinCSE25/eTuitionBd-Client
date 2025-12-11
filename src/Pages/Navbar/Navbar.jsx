import React from 'react';
import { Link, NavLink } from 'react-router';
import UseAuth from '../../Hooks/UseAuth';
import Logo from '../../Components/Logo/Logo';
import "./navbar.css";

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const handleLogout = () => {
        logOut()
            .catch(error => {
                console.log(error)
            });
    }

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/tuitions">Tuitions</NavLink></li>
            <li><NavLink to="/tutors">Tutors</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            {user && <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
            }
        </>
    );

    return (
        <div className="py-4 flex justify-center w-full">
            <div className="navbar lg:fixed lg:z-1000 lg:top-0 w-full bg-white shadow-sm px-5 py-7 rounded-xl">

                {/* LEFT — Logo + Mobile Menu */}
                <div className="navbar-start flex items-center gap-2">

                    <div className="dropdown lg:hidden">
                        <button tabIndex={0} className="btn btn-ghost p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-lg mt-3 w-56 pt-3 px-3 shadow border border-gray-200 z-20">

                            {user && (
                                <li className="flex items-center gap-0">
                                    <div className="avatar rounded-full overflow-hidden">
                                        <img referrerPolicy="no-referrer" src={user.photoURL} className="rounded-full w-10 h-10" />
                                    </div>
                                    <span className="font-semibold">{user.displayName}</span>
                                </li>
                            )}

                            {links}

                            {user ? (
                                <li><button className='btn btn-sm bg-primary text-white mt-2'>Logout</button></li>
                            ) : (
                                <>
                                    <li><Link to="/login" className='btn btn-sm bg-primary text-white mt-2'>Login</Link></li>
                                    <li className='mb-2'><Link to="/register" className='btn btn-sm bg-primary text-white mt-2'>Register</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to="/" className="ml-5 cursor-pointer"><Logo /></Link>
                </div>

                {/* CENTER (Desktop Menu) */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2">
                        {links}
                    </ul>
                </div>

                {/* RIGHT — Buttons (Desktop Only) */}
                <div className="navbar-end hidden mr-5 lg:flex items-center gap-4">


                    <div className="flex items-center ">
                        {user &&
                            <div className="dropdown lg:ml-0 ml-64 dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn w-12 btn-ghost btn-circle avatar"
                                >
                                    <div className="border-2 border-[#228B22] rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            referrerPolicy="no-referrer"
                                            src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        />
                                    </div>
                                </div>
                                <ul tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-5 shadow" >
                                    {user && (
                                        <li className="flex items-center gap-0 px-auto">
                                            <span className="font-semibold text-lg">{user.displayName}</span>
                                            <span className="font-semibold">{user.email}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        }
                    </div>

                    {user ? (
                        <button onClick={handleLogout} className="btn bg-primary hover:text-secondary text-white hover:bg-white hover:border-primary">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn bg-primary text-white hover:bg-white hover:text-secondary hover:border-primary">
                                Login
                            </Link>
                            <Link to="/register" className="btn bg-primary text-white hover:bg-white hover:text-secondary hover:border-primary">
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Navbar;