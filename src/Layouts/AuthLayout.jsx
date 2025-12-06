import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div className='pl-7 pt-7 bg-gray-100'>
                <Link to='/'>
                    <Logo />
                </Link>
            </div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;