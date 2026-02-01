import React from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='bg-gray-100'>
            <div className='w-screen relative'>
                <Navbar />
            </div>
            <div className='max-w-[1600px] mx-auto'>
                <Outlet />
            </div>
            <div className='w-screen'>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;