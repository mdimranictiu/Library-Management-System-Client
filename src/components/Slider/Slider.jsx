import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import image
import slider1 from "../../assets/slider01.webp";
import slider2 from "../../assets/slider02.webp";
import slider03 from "../../assets/slider03.webp";
import slider04 from "../../assets/slider04.png";
import slider05 from "../../assets/slider05.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  return (
    <div className="py-10">
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
          <div className="w-full h-[500px]">
            <div className="w-full h-full  mx-auto">
              <img className="w-full  opacity-80" src={slider1} alt="Slide 1" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className=" max-sm:text-3xl  text-4xl  font-bold text-[#008575] opacity-90 bg-white/75  px-4 py-2 rounded">
                Welcome to Our Library Management System{" "}
              </h2>
              <br />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px]">
            <div className="w-full h-full mx-auto">
              <img className="w-full opacity-80 " src={slider2} alt="Slide 2" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className=" text-4xl max-sm:text-3xl  font-bold text-[#008575] opacity-90 bg-white/75  px-4 py-2 rounded">
                Explore a Wide Range of Book Categories
              </h2>
              <br />
              <button class="btn border-none text-white  w-[200px] text-[16px] hover:bg-white outline-none hover:text-[#008575] bg-[#008575]">
                Explore Categories
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px]">
            <div className="w-full h-full mx-auto">
              <img className="w-full opacity-80" src={slider03} alt="Slide 3" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className=" max-sm:text-3xl  text-4xl  font-bold text-[#008575] opacity-90 bg-white/75   px-4 py-2 rounded">
                Borrow Books in Just a Few Clicks
              </h2>
              <br />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px]">
            <div className="w-full h-full mx-auto">
              <img className="w-full opacity-80" src={slider04} alt="Slide 4" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="  text-4xl max-sm:text-3xl  font-bold text-[#008575] opacity-90 bg-white/75  px-4 py-2 rounded">
                Access Digital Books and Resources Anytime
              </h2>
              <br />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px]">
            <div className="w-full h-full mx-auto">
              <img className="w-full opacity-80" src={slider05} alt="Slide 5" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className=" max-sm:text-3xl  text-4xl  font-bold text-[#008575] opacity-90 bg-white/75  px-4 py-2 rounded">
                Manage Your Account and Borrowing History
              </h2>
              <br />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
