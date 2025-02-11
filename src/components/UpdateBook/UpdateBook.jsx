import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import UseAxiosPrivate from "../../hook/UseAxiosPrivate/UseAxiosPrivate";

const UpdateBook = () => {
    const location= useLocation();
    const axiosPrivate=UseAxiosPrivate()
    const {id}=location?.state;
    const [book,setBook]=useState([]);
    const [isloading,setIsloading]=useState(true);
    const [isupdating,setisupdating]=useState(false)
    const timeoutRef=useRef(null)
    const categories = ["Novel", "Thriller", "History", "Drama", "Sci-Fi","Fiction"];
  const [ratingError,setratingError]=useState("")
  useEffect(() => {
      if (book?.name) {
        document.title = `${book.name} - Update Book`;
      }
    }, [book]);
    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {

          axiosPrivate.get(`/book/find/${id}`)
          .then((res)=>{
              const result=res.data;
              setBook(result)
              setIsloading(false)
              
          })
          .catch((error)=>{
              console.log(error)
              setIsloading(false)
          })
        }, 1000);
    
        return () => clearTimeout(timeoutRef.current);


    }
    
    ,[])
    const {name,bookImageUrl,authorName,category,rating}=book
    console.log(book)
    

  const handleUpdateBook = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const bookImageUrl = form.imageURL.value;
    const authorName = form.AuthorName.value;
    const category = form.category.value;
    const rating =parseFloat(form.rating.value);
    if (rating < 1 || rating > 5) {
      setratingError("Rating must be between 1 and 5");
      return;
    }
    setratingError("");

    const UpdateBook = {
      name,
      bookImageUrl,
      authorName,
      category,
      rating,
    };
    setisupdating(true);
    axiosPrivate
      .patch(`/book/update/${id}`, UpdateBook)
      .then((res) => {
        console.log(res.data)
        Swal.fire({
          title: "Book Update Successfully",
          showConfirmButton: false,
          timer: 2000,
          icon: "success"
        });
        setisupdating(false)
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Update Book",
          text: `${error.message}`,
          confirmButtonText: "Try Again",
        });
      });
  };
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
        <div className="py-10 min-h-screen">
      <h2 className="text-3xl py-10  text-center font-bold text-[#008575]">
        Update Book
      </h2>
        {isupdating && 
        
        (
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
          
          
          <div className="w-4/5 max-sm:w-full mx-auto p-10 rounded-xl shadow-2xl">
        <form
          onSubmit={handleUpdateBook}
          className=" max-sm:w-full max-md:w-full  rounded-xl  border border-gray-300 mx-auto"
        >
          <div className="grid p-10  grid-cols-2  gap-5 max-md:grid-cols-1 max-md:w-full max-sm:w-full max-sm:grid-cols-1 mx-auto">
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Name
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  required
                  name="name" defaultValue={name}
                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Image
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Book  Image Url"
                  required
                  name="imageURL" defaultValue={bookImageUrl}
                  className="input focus:ring-1 focus:outline-none focus:ring-[#176960]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Author Name
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Author Name"
                  name="AuthorName" defaultValue={authorName}
                  required
                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Category
                </span>
              </label>
              <label className="input-group">
                <select
                  placeholder="Book Category"
                  required
                  name="category" defaultValue={category || ""}
                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                >
                  <option disabled value="">Select Book Category</option>

                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Rating
                </span>
              </label>
              <label className="input-group">
                <input
                  type="number"   step="0.01"

                  placeholder="Rating(1-5)"
                  required
                  name="rating" defaultValue={rating}
                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
              </label>
              {ratingError && <p className="text-red-700">{ratingError}</p>}
            </div>
          </div>
          <div className="form-control my-16 ">
            <label className="input-group">
              <input
                type="submit"
                value="Update Book"
                className="input input-bordered font-semi-bold text-[22px] w-2/5 max-sm:w-full max-sm:mx-auto ml-[30%] text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
    );
};

export default UpdateBook;