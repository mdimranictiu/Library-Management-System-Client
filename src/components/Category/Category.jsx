import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookCategoryCard from '../BookCategoryCard/BookCategoryCard';
import axios from 'axios';

const Category = () => {
    const location=useLocation();
    const category=location?.state
    const [isloading,setIsloading]=useState(true);
    const [books,setBooks]=useState([])
    document.title=`Category- ${category}`
    const timeoutRef=useRef(null)
    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {
          axios.get(`https://library-management-system-server-ten.vercel.app/books/category?category=${category}`)
          .then((res)=>{
              const result=res.data;
              setBooks(result)
              setIsloading(false)
              
          })
          .catch((error)=>{
              console.log(error)
              setIsloading(false)
          })
          }, 1000);
    
    }
    
    
    
    
    
    
    ,[])
    return (
        <div className="py-10  min-h-screen">
        <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
          Books: {category}
        </h2>
        
          {isloading ?(
             <>
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
             </>
  
          ) :(
           <div className="grid lg:grid-cols-3 mx-auto md:grid-cols-2 sm:grid-cols-1 gap-10">
           {books.map((book)=><BookCategoryCard key={book._id} book={book}></BookCategoryCard>)}
          </div>
          )}
        
      </div>
    );
};

export default Category;