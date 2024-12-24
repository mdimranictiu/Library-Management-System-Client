import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

const UpdateBook = () => {
    const location= useLocation();
    const id=location?.state;
    const [book,setBook]=useState([]);
    const [isloading,setIsloading]=useState(true);
    const timeoutRef=useRef(null)
    useEffect(()=>{
        timeoutRef.current = setTimeout(() => {
            setIsloading(false); 
          }, 1000);
    
        axios.get(`http://localhost:3000/book/${id}`)
        .then((res)=>{
            const result=res.data;
            setBook(result)
            
        })
        .catch((error)=>{
            console.log(error)
            setIsloading(false)
        })

    }
    ,[])
    const {name,bookImageUrl,authorName,category,rating}=book
    console.log(book)
    const categories = ["Novel", "Thriller", "History", "Drama", "Sci-Fi","Fiction"];
  const [ratingError,setratingError]=useState("")

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
    axios
      .patch(`http://localhost:3000/book/${id}`, UpdateBook)
      .then((res) => {
        console.log(res.data)
        Swal.fire({
          title: "Book Update Successfully",
          showConfirmButton: false,
          timer: 3000,
          icon: "success"
        });
        form.reset();
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

    return (
        <div className="py-10">
      <h2 className="text-3xl py-10  text-center font-bold text-[#008575]">
        Update Book
      </h2>
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
                  type="number"
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