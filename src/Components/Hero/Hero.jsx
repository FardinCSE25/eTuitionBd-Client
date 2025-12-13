import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/premium-quality-image-back-school-2024_1266756-355.avif";
import banner2 from "../../assets/young-students-learning-together-group-study_23-2149211067.avif";
import banner3 from "../../assets/istockphoto-1059510610-612x612.jpg";
import banner4 from "../../assets/istockphoto-1444142886-612x612.jpg";

const Hero = () => {
    return (
        <div className='rounded-[20px] mt-32 lg:rounded-[40px] overflow-hidden'>
            <Carousel autoPlay infiniteLoop className="h-full">
                {[banner1, banner2, banner3, banner4].map((banner, index) => (
                    <div key={index}>
                        <img src={banner} className="h-full w-full" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Hero;