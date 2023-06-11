import React from 'react';
import CheckComponent from '../../../components/CheckComponent';
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
            <CheckComponent />
        </div>
    );
};

export default Home;