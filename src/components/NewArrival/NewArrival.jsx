import React, { useState } from 'react';
import Slider from 'react-infinite-logo-slider'
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UseAxiosPublic from '../../hook/UseAxiosPublic/UseAxiosPublic';


const NewArrival = () => {
    const [newbook,setnewbook]=useState([])
    const axiosPublic=UseAxiosPublic()

    useEffect(() => {
        axiosPublic.get(`/latestbooks`)
          .then((res) => {
            const result=res.data
            setnewbook(result);
            console.log(result)
            
          })
          .catch((error) => {
            console.log(error);
          });
      }, [axiosPublic]);


 

    return (
        <div className="py-5">
            <h2 className="text-3xl py-5 font-bold text-center text-[#008575]">
                New Arrival Books 
            </h2>
            <div className='my-16'>
            <Slider
            width="400px"
            duration={50}
            pauseOnHover={true}
            blurBorders={false}
            blurBorderColor={'#fff'}
        >
          
          {
            newbook.map((b,index)=><><h2>  <Slider.Slide key={index}>
            <Link  to="/ViewDetails" state={b._id}>
              <div className="w-[200px] h-[250px] px-5 rounded-sm cursor-pointer">
                <img
                  src={b.bookImageUrl}
                  className="w-full h-full"
                  alt="bookImageUrl"
                />
              </div>
            </Link>
            </Slider.Slide></h2></>)
        }
        </Slider>
     
            </div>
        </div>
    );
};

export default NewArrival;
