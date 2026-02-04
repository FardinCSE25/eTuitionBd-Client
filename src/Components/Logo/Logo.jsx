import React from 'react';
import logo from "../../assets/logo.jpeg"

const Logo = () => {
    return ( 
        <div className='flex items-center gap-2'>
            <div className='w-12 h-12'>
                <img className='rounded-full w-full h-full' src={logo} alt="logo" />
            </div>
            <h1 className='text-2xl text-secondary font-bold'>
                eTuitionBd
            </h1>
        </div>
    );
};

export default Logo;