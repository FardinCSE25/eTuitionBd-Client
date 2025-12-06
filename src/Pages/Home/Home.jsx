import React from 'react';
import Hero from '../../Components/Hero/Hero';
import HowItWorks from '../../Components/How it Works/HowItWorks';
import Features from '../../Components/Features/Features';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero />
            <HowItWorks />
            <Features />
        </div>
    );
};

export default Home;