import React from 'react';
import Contact from '../Contact/Contact';
import ContactUs from '../ContactUs/ContactUs';
import Gallery from '../Gallery/Gallery';
import Review from '../Review/Review';
import Slider from '../Slider/Slider';
import TopClasses from '../TopClasses/TopClasses';
import TopInstructors from '../TopInstructors/TopInstructors';

const Home = () => {
    return (
        <div>
            <Slider />
            <TopClasses />
            <TopInstructors />
            <Gallery />
            <Contact />
            <Review />
            <ContactUs />
        </div>
    );
};

export default Home;