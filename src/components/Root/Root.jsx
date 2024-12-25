import React from 'react';
import Home from '../Home/Home';
import NavBar from '../SharedComponents/NavBar/NavBar';
import Footer from '../SharedComponents/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
        <div>
        <NavBar></NavBar>
        <div className='w-4/5 max-md:w-[90%] max-sm:w-[90%] my-5 mx-auto'>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </div>
        </>
    );
};

export default Root;