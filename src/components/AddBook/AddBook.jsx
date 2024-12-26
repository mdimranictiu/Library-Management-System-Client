import React, {useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


const AddBook = () => {
  const categories = ["Novel", "Thriller", "History", "Drama", "Sci-Fi","Fiction"];
  const [ratingError,setratingError]=useState("")

  document.title="Add Book"

  const handleAddBook = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const bookImageUrl = form.imageURL.value;
    const authorName = form.AuthorName.value;
    const category = form.category.value;
    const quantity = form.quantity.value;
    const rating =parseFloat(form.rating.value);
    const shortdescription = form.shortdescription.value;
    const bookContent = form.bookContent.value;
    if (rating < 1 || rating > 5) {
      setratingError("Rating must be between 1 and 5");
      return;
    }
    setratingError("");

    const addBook = {
      name,
      bookImageUrl,
      authorName,
      category,
      quantity,
      rating,
      shortdescription,
      bookContent
    };
    axios
      .post("http://localhost:3000/addBook", addBook)
      .then(() => {
        Swal.fire({
          html: `
      <div style="width:200px; margin:10px auto; height: 200px; margin-top: 10px;display: flex; justify-content: center; align-items: center;">
          <img src="${bookImageUrl}" alt="Book Image" style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        <p>Book Name: <strong>${name}</strong></p>
        <p>Author Name: <strong>${authorName}</strong></p>
        
      `,
          title: "Book Added Successfully",
          showConfirmButton: false,
          timer: 3000,
        });
        form.reset();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to add Book",
          text: `${error.message}`,
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="py-10">
      <h2 className="text-3xl  text-center font-bold text-[#008575]">
        Add Book
      </h2>
      <div className="w-4/5 max-sm:w-full mx-auto p-10 rounded-xl shadow-2xl">
        <form
          onSubmit={handleAddBook}
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
                  name="name"
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
                  name="imageURL"
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
                  name="AuthorName"
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
                  name="category"
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
                  Quantity
                </span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  placeholder="Quantity"
                  min="1"
                  name="quantity"
                  required
                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
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
                  name="rating"   step="0.01"

                  className="input focus:ring-1 focus:outline-none focus:ring-[#008575]   text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                />
              </label>
              {ratingError && <p className="text-red-700">{ratingError}</p>}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Short Description
                </span>
              </label>
              <label className="input-group">
                <textarea
                  placeholder="Write a short description about the book"
                  name="shortdescription"
                  required
                  className="input focus:ring-1 h-[120px]  focus:ring-[#008575] focus:outline-none focus:ring-offset-2 text-[18px] input-bordered w-4/5 mx-auto max-md:w-full max-sm:w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Book Content
                </span>
              </label>
              <label className="input-group">
                <textarea
                  placeholder="Write a short about book"
                  required
                  name="bookContent"
                  className="input focus:ring-1 h-[120px] focus:outline-none focus:ring-[#008575]  max-md:w-full text-[18px] input-bordered w-4/5 mx-auto max-sm:w-full"
                />
              </label>
            </div>
          </div>
          <div className="form-control my-16 ">
            <label className="input-group">
              <input
                type="submit"
                value="Add Book"
                className="input input-bordered font-semi-bold text-[22px] w-2/5 max-sm:w-full max-sm:mx-auto ml-[30%] text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
              />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
