import React from 'react';
import Slider from '../Slider/Slider';
import Categories from '../Categories/Categories';
import NewArrival from '../NewArrival/NewArrival';
import LibraryStats from '../LibraryStats/LibraryStats';
import NewsLetter from '../NewsLetter/NewsLetter';

const Home = () => {
    document.title="Home"
    return (
        <div className='py-10'>
            <Slider></Slider>
            <Categories></Categories>
            <NewArrival ></NewArrival>
            <LibraryStats></LibraryStats>
            <NewsLetter></NewsLetter>
           
        </div>
    );
};

export default Home;