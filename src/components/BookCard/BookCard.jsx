import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const BookCard = ({ book }) => {
    const navigate = useNavigate();
    const {
        name,
        bookImageUrl,
        authorName,
        category,
        rating = 0,  // ✅ Set default rating to avoid ReactStars warning
        _id
    } = book;

    return (
        <div className="card card-compact bg-[#eff1ed] shadow-2xl flex flex-col justify-between">
            <div className="card-body flex-grow">
                <div className='h-[280px] w-[250px] mx-auto rounded-lg my-5'>
                    <img src={bookImageUrl} alt="Book Image URL" className='w-full h-full' />
                </div>

                <div className='flex flex-col items-center'>
                    <h2 className="card-title mt-2 text-[#008575]">{name}</h2>
                    <h3 className="font-semibold text-[16px] mt-2">Author: {authorName}</h3>
                    <h3 className="font-semibold text-[16px] mt-2 py-2">   <Link
                                          className="text-[#3c65f5]"
                                          to="/category"
                                          state={category}
                                        >
                                          {category}
                                        </Link></h3>

                    <ReactStars
                        count={5}
                        value={rating}
                        size={30}
                        activeColor="#c96e23"
                        isHalf={true}
                        edit={false}
                    />

                    <div className='py-5'>
                        <Link to='/UpdateBook' state={{ id: _id }}>  {/* ✅ Fixing the state issue */}
                            <button className='text-[16px] w-[200px] font-semibold input input-bordered text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]'>
                                Update
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
