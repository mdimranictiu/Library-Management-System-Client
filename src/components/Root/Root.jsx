import React from 'react';
import Home from '../Home/Home';
import NavBar from '../SharedComponents/NavBar/NavBar';
import Footer from '../SharedComponents/Footer/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
        <div>
        <div className='w-4/5 mx-auto'>
        <NavBar></NavBar>
        <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </div>
        </>
    );
};

export default Root;