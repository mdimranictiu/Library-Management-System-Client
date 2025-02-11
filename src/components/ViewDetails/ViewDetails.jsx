import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import UseAxiosPrivate from "../../hook/UseAxiosPrivate/UseAxiosPrivate";

const ViewDetails = () => {
  const { user } = useContext(AuthContext);
  const { email, displayName } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [book, setBook] = useState({});
  const timeoutRef = useRef(null);
  const axiosPrivate = UseAxiosPrivate();
  const location = useLocation();
  const id = location?.state;
  const [borrowAccess, setBorrowAccess] = useState(false);

  useEffect(() => {
    if (book?.name) {
      document.title = `${book.name} - Book Details`;
    }
  }, [book]);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      axiosPrivate
        .get(`/book/find/${id}`)
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

  useEffect(() => {
    axiosPrivate
      .get(`/borrowed-books?email=${email}`)
      .then((res) => {
        const borrowedBookList = res?.data;
        const data = borrowedBookList.find((b) => b.bookid === book._id); // Compare book._id with the borrowed list
        if (data) {
          setBorrowAccess(false); // User cannot borrow again
        } else {
          setBorrowAccess(true); // User can borrow the book
        }
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
      });
  }, [email, axiosPrivate, book._id]);

  const handleBorrow = () => {
    if (borrowAccess) {
      setIsModalOpen(true); // Open modal if allowed to borrow
    } else {
      Swal.fire({
        title: "You have already borrowed this book",
        icon: "warning",
        showConfirmButton: true,
      });
    }
  };

  const handleBorrowConfirm = (event) => {
    event.preventDefault();
    const form = event.target;
    const returnDate = form.returnDate.value;
    const id = book._id;

    if (book.quantity > 0) {
      setBook((prevBook) => ({
        ...prevBook,
        quantity: prevBook.quantity - 1,
      }));
      const updateQuantity = { quantity: book.quantity - 1 };

      axiosPrivate
        .patch(`/book/update/${id}`, updateQuantity)
        .then((res) => {
          Swal.fire({
            title: "Book Borrowed Successfully",
            showConfirmButton: false,
            timer: 2000,
            icon: "success",
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

      // Add the borrowed book to user borrow list
      const borrowDate = new Date().toISOString().split("T")[0];
      const addBookBorrow = {
        email,
        borrowBookImg: book.bookImageUrl,
        title: book.name,
        category: book.category,
        bookid: book._id,
        borrowDate,
        returnDate,
      };

      axiosPrivate
        .post("/addBorrowBook", addBookBorrow)
        .then((res) => {
          const data = res.data;
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsModalOpen(false); // Close modal
    } else {
      Swal.fire({
        title: "No more copies available",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleCancelbtn = () => {
    document.getElementById("my_modal_4").close();
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="items-center text-center py-16 min-h-screen">
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

  const {
    name,
    bookImageUrl,
    authorName,
    category,
    rating,
    quantity,
    shortdescription,
    bookContent,
  } = book;

  return (
    <>
      <div>
        <div className="card bg-gray-200 w-4/5 max-md:w-full max-sm:w-full my-5 mx-auto shadow-xl">
          <div className="card-body">
            <h3 className="text-2xl font-bold text-center py-5">
              Book Information
            </h3>
            <div className="w-1/5 bg-[#89dfd5] rounded-lg max-md:w-3/5 max-sm:w-full mx-auto min-h-[220px] max-sm:h-[320px] ">
              <img
                className="w-full h-full rounded-lg "
                src={bookImageUrl}
                alt="BookImage"
              />
            </div>
            <div className="w-4/5 mx-auto rounded-lg p-5 max-md:p-5 max-sm:p-3 max-md:w-full max-sm:w-full ">
              <div className="flex flex-col items-center gap-2 ">
                <h3 className="text-xl text-[#008575] font-semibold">{name}</h3>
                <p>
                  <span className="font-semibold">
                    <Link
                      className="text-[#3c65f5]"
                      to="/category"
                      state={category}
                    >
                      {category}
                    </Link>
                  </span>
                </p>
                <p>
                  <span className="font-semibold">
                    Author Name: {authorName}
                  </span>
                </p>
                <p>
                  <ReactStars
                    count={5}
                    value={rating}
                    size={30}
                    activeColor="#c96e23"
                    isHalf={true}
                    edit={false}
                  />
                </p>
                <p>
                  <span className="font-semibold">
                    <span>Available Quantity:</span> {quantity}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Short Description:</span>{" "}
                </p>
                <p className="text-justify">{shortdescription}</p>
                <p>
                  <span className="font-semibold">Book Content: </span>{" "}
                </p>
                <p className="text-justify">{bookContent}</p>
              </div>
              <div className="w-2/5 max-sm:w-full max-md:w-full py-10 mx-auto">
                <button
                  disabled={!borrowAccess || quantity === 0}
                  onClick={handleBorrow}
                  className="btn w-full bg-[#008575] hover:bg-white text-[18px] hover:text-[#008575] text-white"
                >
                  {quantity === 0
                    ? "Not Available"
                    : !borrowAccess
                    ? "You Already Borrowed"
                    : "Borrow"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog id="my_modal_4" open className="modal">
          <div className="modal-box w-11/12 max-w-4xl bg-gray-100 shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col  items-center p-6">
              <form
                onSubmit={handleBorrowConfirm}
                className="w-full max-w-3xl bg-white rounded-xl border border-gray-300 p-6 shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-center text-[#008575] mb-4">
                  Borrow Book
                </h2>

                {/* Name Field */}
                <div className="form-control mb-4">
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
                      name="displayName"
                      defaultValue={displayName}
                      readOnly
                      className="input w-full"
                    />
                  </label>
                </div>

                {/* Return Date */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-[18px] text-[#008575]">
                      Return Date
                    </span>
                  </label>
                  <input
                    type="date"
                    required
                    name="returnDate"
                    className="input w-full"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-[#008575] hover:bg-white hover:text-[#008575] text-white"
                  >
                    Borrow
                  </button>
                  <button
                    onClick={handleCancelbtn}
                    type="button"
                    className="btn bg-[#f44336] hover:bg-white hover:text-[#f44336] text-white"
                  >
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
