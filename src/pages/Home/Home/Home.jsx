import React from 'react';
import Gallery from '../Gallery/Gallery';
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
        </div>
    );
};

export default Home;