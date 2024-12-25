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
    <div className="card card-compact bg-[#eff1ed] shadow-2xl flex flex-col justify-between">
      <div className="card-body flex-grow">
        <div className='w-3/5 h-[300px] mx-auto rounded-lg my-5'>
          <img src={bookImageUrl} alt="Book" className='w-full h-full' />
        </div>

        <div className='flex flex-col items-center'>
          <h2 className="card-title mt-2 text-[#008575]">Book Name: {name}</h2>
          <h3 className="font-semibold text-[16px] mt-2">Author Name: {authorName}</h3>
          <h3 className="font-semibold text-[16px] mt-2">Category: {category}</h3>
          <br />
          <ReactStars
            count={5} 
            value={rating}
            size={30}
            activeColor="#c96e23" 
            isHalf={true} 
            edit={false} 
          />
          <br />
          <h3 className="font-bold text-[16px] mt-2">Quantity: {quantity}</h3>


        

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
