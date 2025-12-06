import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div className='pl-7 pt-7 bg-gray-100'>
                <Logo />
            </div>
            <Outlet/>
        </div>
    );
};

export default AuthLayout;