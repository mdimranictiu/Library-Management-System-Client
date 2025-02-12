import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const BookCategoryCard = ({ book }) => {
  const {
    name,
    bookImageUrl,
    authorName,
    category,
    rating,
    _id,
    quantity
  } = book;
  return (
    <div className="card card-compact bg-white shadow-xl flex flex-col justify-between">
      <div className="card-body flex-grow">
        <div className='h-[280px] w-full  mx-auto rounded-lg my-5'>
          <img src={bookImageUrl} alt="Book" className='w-full h-full  rounded-lg' />
        </div>

        <div className='flex flex-col items-center'>
          <h2 className="card-title  text-[#008575]">{name}</h2>
          <h3 className="font-semibold text-[16px] mt-1">Author: {authorName}</h3>
          <h3 className="font-semibold text-[16px] mt-1"><span className="font-semibold"><Link className='text-[#3c65f5]' to="/category" state={category}>{category}</Link></span></h3>
          <ReactStars
            count={5} 
            value={rating}
            size={30}
            activeColor="#c96e23" 
            isHalf={true} 
            edit={false} 
          />
          <br />
          <h3 className="font-bold text-[16px] ">Available Quantity: {quantity}</h3>


        

          <div className='py-5'>
            <Link to='/ViewDetails' state={_id}>
              <button className='text-[16px] w-[200px] font-semibold input input-bordered text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]'>
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCategoryCard;
