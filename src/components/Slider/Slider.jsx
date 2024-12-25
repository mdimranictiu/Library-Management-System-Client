import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';

const Slider = () => {
  return (
    <div className='py-10'>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div >
            <img src="https://www.maynoothuniversity.ie/sites/default/files/assets/images/studentsforweb2.jpg" alt="Slide 1" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className=" text-3xl  font-bold  px-4 py-2 rounded">
            Welcome to Our Library Management System </h2>
            <br />          
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div >
            <img src="https://i.ibb.co.com/cgBrHgW/R.jpg" alt="Slide 2" />
            <p>Slide 2 Text</p>
          </div>
        </SwiperSlide>
        
        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
};

export default Slider;
