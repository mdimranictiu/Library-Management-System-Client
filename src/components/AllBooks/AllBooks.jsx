import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "../BookCard/BookCard";

const AllBooks = () => {
    const [books,setBooks]=useState([]);
    const [isloading,setIsloading]=useState(true);
    const timeoutRef=useRef(null)
    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {
            setIsloading(false); 
          }, 2000);
    
        axios.get('http://localhost:3000/books')
        .then((res)=>{
            const result=res.data;
            setBooks(result)
            
        })
        .catch((error)=>{
            console.log(error)
            setIsloading(false)
        })



    }
    
    
    
    
    
    
    ,[])
  
  return (
    <div className="py-10  min-h-screen">
      <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
        All Books
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
         {books.map((book)=><BookCard key={book._id} book={book}></BookCard>)}
        </div>
        )}
      
    </div>
  );
};

export default AllBooks;
