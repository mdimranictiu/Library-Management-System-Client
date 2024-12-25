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
    timeoutRef.current = setTimeout(() => {
      axios.get(`http://localhost:3000/book/${id}`)
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
      console.log(`Return Date: ${returnDate}, Updated Quantity: ${book.quantity - 1}`);
      const borrowBook={
        quantity:book.quantity-1,
        returnDate: returnDate,
        email:user.email
      }
      axios
      .patch(`http://localhost:3000/book/${id}`, borrowBook)
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

    setIsModalOpen(false); // Close modal
  };

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
        <dialog id="my_modal_4" className="modal" open>
          <div className="modal-box w-11/12 max-w-5xl">
            <div>
              <form onSubmit={handleBorrowConfirm} className="max-sm:w-full max-md:w-full rounded-xl border border-gray-300 mx-auto">
                <div className="grid p-10 grid-cols-2 gap-5 max-md:grid-cols-1 max-md:w-full max-sm:w-full max-sm:grid-cols-1 mx-auto">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-[18px] text-[#008575]">Name</span>
                    </label>
                    <label className="input-group">
                      <input
                        type="text"
                        placeholder="Title of the Book"
                        required
                        name="displayName" defaultValue={displayName}
                        className="input focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                      />
                    </label>
                  </div>

                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-[18px] text-[#008575]">Email</span>
                    </label>
                    <label className="input-group">
                      <input
                        type="email"
                        placeholder="User Email"
                        required
                        name="email" defaultValue={user.email}
                        className="input focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                      />
                    </label>
                  </div>

                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text text-[18px] text-[#008575]">Return Date</span>
                    </label>
                    <label className="input-group">
                      <input
                        type="date"
                        required
                        placeholder="Return Date"
                        name="returnDate"
                        className="input focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-4/5 max-md:w-full mx-auto max-sm:w-full"
                      />
                    </label>
                  </div>
                </div>

                <div className="form-control my-16 ">
                  <label className="input-group w-2/5 max-sm:w-3/5 mx-auto">
                    <input
                      type="submit"
                      value="Borrow Book"
                      className="input input-bordered font-semi-bold text-[22px] w-full text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
                    />
                  </label>
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
