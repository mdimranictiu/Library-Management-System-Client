import axios from 'axios';
import React from 'react';
const axiosPublic = axios.create({
    // baseURL: 'https://library-management-system-server-ten.vercel.app/'
    baseURL: 'http://localhost:3000/'
   
})
const UseAxiosPublic = () => {
      return axiosPublic
};

export default UseAxiosPublic;