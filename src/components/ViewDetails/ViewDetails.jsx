import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';

const ViewDetails = () => {
    const location=useLocation();
    const id=location?.state
    const [isloading,setIsloading]=useState(true);
    const [book,setBook]=useState([])
    const timeoutRef=useRef(null)
    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {
          axios.get(`http://localhost:3000/book/${id}`)
          .then((res)=>{
              const result=res.data;
              setBook(result)
              console.log(result)
              setIsloading(false)
              
          })
          .catch((error)=>{
              console.log(error)
              setIsloading(false)
          })
          }, 1000);
    
    }
    
    
    
    
    
    
    ,[])
    const {name,bookImageUrl,authorName,category,rating,quantity,shortdescription,bookContent}=book

    if(isloading){
        return(
          <div className="items-center text-center py-16">
    <span className="loading loading-lg loading-ring text-primary"></span>
    <span className="loading loading-lg loading-ring text-secondary"></span>
    <span className="loading loading-lg loading-ring text-accent"></span>
    <span className="loading loading-lg loading-ring text-neutral"></span>
    <span className="loading loading-lg loading-ring text-info"></span>
    <span className="loading loading-lg loading-ring text-success"></span>
    <span className="loading loading-lg loading-ring text-warning"></span>
    <span className="loading loading-lg loading-ring text-error"></span>
    </div>
        )
      }

    return (
        <div>
        <div className="card  bg-base-100 w-4/5 max-md:w-full max-sm:w-full  my-5 mx-auto shadow-xl">
          <div className="card-body">
           
            <h3 className="text-2xl  font-bold text-center py-5">Book Information</h3>
            
            <div className='w-1/5 bg-[#89dfd5] rounded-lg max-md:w-3/5 max-sm:w-full mx-auto h-[220px] '>
             <img className='w-full h-full object-cover' src={bookImageUrl} alt="BookImage" />
            </div>
            <div className='w-4/5 mx-auto rounded-lg p-10 max-md:p-5 max-sm:p-3 max-md:w-full max-sm:w-full '>
            <div className="flex flex-col items-center gap-2 text-[20px]">
            <h3 className="text-xl text-[#008575] font-semibold">Book Name: {name}</h3>
             <p> <span className="font-semibold">Category: <Link className=' text-[#3c65f5]' to="/category" state={category}>{category}</Link></span></p>
             <p><span className="font-semibold "> Author Name  :{authorName}</span></p>
             <p><ReactStars
                         count={5} 
                         value={rating}
                         size={30}
                         activeColor="#c96e23" 
                         isHalf={true} 
                         edit={false} 
                       /></p>
             <p> <span className="font-semibold">Available Quantity: {quantity}</span> </p>
             <p> <span className="font-semibold">Short Description: {shortdescription}</span> </p>
             <p> <span className="font-semibold">Book Content: {bookContent}</span> </p>
            </div>
            <div className="w-2/5 max-sm:w-full max-md:w-full py-10 mx-auto">
            <button className="btn  w-full bg-[#008575]  hover:bg-white text-[18px] hover:text-[#008575] text-white">Borrow</button>
            </div>
            </div>

            
          </div>
        </div>
      </div>
  
    );
};

export default ViewDetails;