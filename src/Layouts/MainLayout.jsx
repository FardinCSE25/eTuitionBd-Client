import React from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Footer/Footer';

const MainLayout = () => {
    return (
        <div className=''>
            <div className='max-w-[1600px] mx-auto'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;