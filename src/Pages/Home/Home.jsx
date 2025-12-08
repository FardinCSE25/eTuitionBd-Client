import React from 'react';
import Hero from '../../Components/Hero/Hero';
import HowItWorks from '../../Components/How it Works/HowItWorks';
import Features from '../../Components/Features/Features';
import RecentTuitions from '../../Components/Recent Tuitions/RecentTuitions';
import RecentTutors from '../../Components/Recent Tutors/RecentTutors';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Hero />
            <RecentTuitions />
            <RecentTutors />
            <HowItWorks />
            <Features />
        </div>
    );
};

export default Home;