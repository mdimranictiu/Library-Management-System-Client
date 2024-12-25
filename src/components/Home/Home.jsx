import React from 'react';
import Slider from '../Slider/Slider';
import Categories from '../Categories/Categories';

const Home = () => {
    return (
        <div className='py-10'>
            <Slider></Slider>
            <Categories></Categories>
        </div>
    );
};

export default Home;