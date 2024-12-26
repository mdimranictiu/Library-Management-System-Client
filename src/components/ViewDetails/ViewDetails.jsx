import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';


const ViewDetails = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState({});
  const timeoutRef = useRef(null);

  const location = useLocation();
  const id = location?.state;
  useEffect(() => {
    if (book?.name) {
      document.title = `${book.name} - Book Details`;
    }
  }, [book]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      axios.get(`https://library-management-system-server-ten.vercel.app/book/${id}`)
        .then((res) => {
          const result = res.data;
          setBook(result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [id]);

  const handleBorrow = () => {
    setIsModalOpen(true); // Open modal
  };

  const handleBorrowConfirm = (event) => {
    event.preventDefault(); // Prevent form submission
    const form = event.target;
    const returnDate = form.returnDate.value;
    const id=book._id;
    if (book.quantity > 0) {
      // Update the book state with reduced quantity
      setBook((prevBook) => ({
        ...prevBook,
        quantity: prevBook.quantity - 1, // Decrease quantity by 1
      }));
      const updateQuantity={
        quantity:book.quantity-1,
      }
      axios
      .patch(`https://library-management-system-server-ten.vercel.app/book/${id}`, updateQuantity)
      .then((res) => {
        console.log(res.data)
        Swal.fire({
          title: "Book Borrow Successfully",
          showConfirmButton: false,
          timer: 2000,
          icon: "success"
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed to Borrow Book",
          text: `${error.message}`,
          confirmButtonText: "Try Again",
        });
      });
    } else {
      console.log("No more copies available to borrow.");
    }
    //add borrow book to user borrow List
    const {
      name,
      bookImageUrl,
      authorName,
      category,
      rating,
      _id
   
       }=book
       const borrowDate=new Date().toISOString().split('T')[0];
    const addBookBorrow={
      email,borrowBookImg:bookImageUrl,title:name,category:category,bookid:_id,borrowDate,
      returnDate
    }
    axios
    .post('https://library-management-system-server-ten.vercel.app/addBorrowBook',addBookBorrow)
    .then((res)=>{
     const data=res.data;
     console.log(data)
    })
    .catch((error)=>{
      console.log(error)
    })

    setIsModalOpen(false); // Close modal
  };
  const handleCancelbtn=()=>{
    document.getElementById('my_modal_4').close();
    setIsModalOpen(false);
  }

  // Check loading state and render loading spinner
  if (isLoading) {
    return (
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
    );
  }

  const { name, bookImageUrl, authorName, category, rating, quantity, shortdescription, bookContent } = book;

  return (
    <>
      <div>
        <div className="card bg-base-100 w-4/5 max-md:w-full max-sm:w-full my-5 mx-auto shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center py-5">Book Information</h3>
            <div className='w-1/5 bg-[#89dfd5] rounded-lg max-md:w-3/5 max-sm:w-full mx-auto h-[220px] '>
              <img className='w-full h-full object-cover' src={bookImageUrl} alt="BookImage" />
            </div>
            <div className='w-4/5 mx-auto rounded-lg p-10 max-md:p-5 max-sm:p-3 max-md:w-full max-sm:w-full '>
              <div className="flex flex-col items-center gap-2 text-[20px]">
                <h3 className="text-xl text-[#008575] font-semibold">Book Name: {name}</h3>
                <p><span className="font-semibold">Category: <Link className='text-[#3c65f5]' to="/category" state={category}>{category}</Link></span></p>
                <p><span className="font-semibold">Author Name: {authorName}</span></p>
                <p><ReactStars
                  count={5}
                  value={rating}
                  size={30}
                  activeColor="#c96e23"
                  isHalf={true}
                  edit={false}
                /></p>
                <p><span className="font-semibold">Available Quantity: {quantity}</span></p>
                <p><span className="font-semibold">Short Description: {shortdescription}</span></p>
                <p><span className="font-semibold">Book Content: {bookContent}</span></p>
              </div>
              <div className="w-2/5 max-sm:w-full max-md:w-full py-10 mx-auto">
                <button
                  disabled={quantity === 0}
                  onClick={handleBorrow}
                  className="btn w-full bg-[#008575] hover:bg-white text-[18px] hover:text-[#008575] text-white"
                >
                  Borrow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog id="my_modal_4" open className="modal">
        <div className="modal-box w-11/12 max-w-5xl shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col bg-gradient-to-r from-[#008575] to-[#98d4cd] items-center p-6">
            <form
              onSubmit={handleBorrowConfirm}
              className="w-full max-w-3xl bg-white rounded-xl border border-gray-300 p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-center text-[#008575] mb-4">Borrow Book</h2>
      
              {/* Name Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-[18px] text-[#008575]">Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    placeholder="Title of the Book"
                    required
                    name="displayName"
                    defaultValue={displayName} readOnly
                    className="input w-full focus:ring-2 focus:ring-[#008575] text-[18px] input-bordered"
                  />
                </label>
              </div>
      
              {/* Email Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-[18px] text-[#008575]">Email</span>
                </label>
                <label className="input-group">
                  <input
                    type="email"
                    placeholder="User Email" readOnly
                    required
                    name="email"
                    defaultValue={user.email}
                    className="input w-full focus:ring-2 focus:ring-[#008575] text-[18px] input-bordered"
                  />
                </label>
              </div>
      
              {/* Return Date Field */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text text-[18px] text-[#008575]">Return Date</span>
                </label>
                <label className="input-group">
                  <input
                    type="date"
                    required
                    name="returnDate"
                    className="input w-full focus:ring-2 focus:ring-[#008575] text-[18px] input-bordered"
                  />
                </label>
              </div>
      
              {/* Buttons */}
              <div className="flex justify-center space-x-4 mt-6">
                {/* Submit Button */}
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#008575] text-white hover:bg-white hover:text-[#008575] border border-[#008575] transition duration-300 text-[18px]">
                  Borrow Book
                </button>
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={handleCancelbtn}
                  className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300 text-[18px]">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      
      )}
    </>
  );
};

export default ViewDetails;
