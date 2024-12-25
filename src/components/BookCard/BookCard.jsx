import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BookCard = ({book}) => {
    const navigate=useNavigate()
    const {
   name,
   bookImageUrl,
   authorName,
   category,
   rating,
   _id

    }=book

   
      
      
    return (
        <div className="card card-compact bg-[#eff1ed] shadow-2xl  flex flex-col justify-between">
            <div className="card-body flex-grow">
                 <div className='w-3/5 h-[300px] mx-auto rounded-lg  max-auto my-5'>
                    <img src={bookImageUrl} alt="Book Image URL" className='w-full h-full' />
                 </div>
                
                <div className='flex flex-col items-center'>
                <h2 className="card-title mt-2 text-[#008575]">Book Name: {name}</h2>
                <h3 className="font-semibold text-[16px] mt-2">Author Name: {authorName}</h3>
                <h3 className="font-semibold text-[16px] mt-2">Category: {category}</h3>
                <h3 className="font-semibold text-[16px] mt-2">Rating: {rating} / 5</h3>
                <div className='py-5 '>
                <Link to='/UpdateBook' state={_id} ><button  className='text-[16px] w-[200px] font-semibold input input-bordered  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]'>Update</button></Link>
                </div>
                </div>
            </div>
            
        </div>
    )
};

export default BookCard;