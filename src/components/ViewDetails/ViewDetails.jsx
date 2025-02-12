import React, { useContext, useEffect, useState } from "react";
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
  const [borrowAccess, setBorrowAccess] = useState(false);
  const axiosPrivate = UseAxiosPrivate();
  const location = useLocation();
  const id = location?.state;

  // Fetch book details and borrowed status
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    Promise.all([
      axiosPrivate.get(`/book/find/${id}`),
      axiosPrivate.get(`/borrowed-books?email=${email}`)
    ])
      .then(([bookRes, borrowRes]) => {
        setBook(bookRes.data);
        const isBorrowed = borrowRes.data.some((b) => b.bookid === bookRes.data._id);
        setBorrowAccess(!isBorrowed); // Disable if already borrowed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setIsLoading(false));

  }, [id, email, axiosPrivate]);

  useEffect(() => {
    if (book?.name) {
      document.title = `${book.name} - Book Details`;
    }
  }, [book]);

  const handleBorrow = () => {
    if (!borrowAccess) {
      return Swal.fire({
        title: "You have already borrowed this book",
        icon: "warning",
        showConfirmButton: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleBorrowConfirm = async (event) => {
    event.preventDefault();
    const returnDate = event.target.returnDate.value;

    if (book.quantity <= 0) {
      return Swal.fire({
        title: "No more copies available",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    try {
      const updatedQuantity = book.quantity - 1;

      // Optimistic UI Update
      setBook((prevBook) => ({
        ...prevBook,
        quantity: updatedQuantity
      }));

      // Update book quantity in the database
      await axiosPrivate.patch(`/book/update/${book._id}`, { quantity: updatedQuantity });

      // Add to borrowed books list
      await axiosPrivate.post("/addBorrowBook", {
        email,
        borrowBookImg: book.bookImageUrl,
        title: book.name,
        category: book.category,
        bookid: book._id,
        borrowDate: new Date().toISOString().split("T")[0],
        returnDate
      });

      // Disable borrow button after borrowing
      setBorrowAccess(false);

      Swal.fire({
        title: "Book Borrowed Successfully",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
      });

      setIsModalOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Borrow Book",
        text: `${error.message}`,
        confirmButtonText: "Try Again",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="items-center text-center py-16 min-h-screen">
        <span className="loading loading-lg loading-ring text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <div className="card bg-white w-4/5 max-md:w-full max-sm:w-full my-5 mx-auto shadow-xl">
        <div className="card-body">
          <h3 className="text-2xl font-bold text-center py-5">Book Information</h3>
          <div className="w-1/5 bg-[#89dfd5] rounded-lg max-md:w-3/5 max-sm:w-full mx-auto min-h-[220px]">
            <img className="w-full h-full rounded-lg" src={book.bookImageUrl} alt="Book" />
          </div>
          <div className="w-4/5 mx-auto rounded-lg p-5">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-xl text-[#008575] font-semibold">{book.name}</h3>
              <p>
                <span className="font-semibold">
                  <Link className="text-[#3c65f5]" to="/category" state={book.category}>
                    {book.category}
                  </Link>
                </span>
              </p>
              <p>
                <span className="font-semibold">Author Name: {book.authorName}</span>
              </p>
              <p>
                <ReactStars count={5} value={book.rating} size={30} activeColor="#c96e23" isHalf={true} edit={false} />
              </p>
              <p>
                <span className="font-semibold">Available Quantity: {book.quantity}</span>
              </p>
              <p>
                <span className="font-semibold">Short Description:</span> {book.shortdescription}
              </p>
              <p>
                <span className="font-semibold">Book Content: </span> {book.bookContent}
              </p>
            </div>
            <div className="w-2/5 max-sm:w-full max-md:w-full py-10 mx-auto">
              <button
                disabled={!borrowAccess || book.quantity === 0}
                onClick={handleBorrow}
                className="btn w-full bg-[#008575] hover:bg-white text-[18px] hover:text-[#008575] text-white"
              >
                {book.quantity === 0 ? "Not Available" : borrowAccess ? "Borrow" : "You Already Borrowed"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <dialog id="my_modal_4" open className="modal">
          <div className="modal-box w-11/12 max-w-4xl bg-gray-100 shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col items-center p-6">
              <form onSubmit={handleBorrowConfirm} className="w-full max-w-3xl bg-white rounded-xl border p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-[#008575] mb-4">Borrow Book</h2>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-[18px] text-[#008575]">Name</span>
                  </label>
                  <input type="text" defaultValue={displayName} readOnly className="input w-full" />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-[18px] text-[#008575]">Return Date</span>
                  </label>
                  <input type="date" required name="returnDate" className="input w-full" />
                </div>
                <div className="modal-action">
                  <button type="submit" className="btn bg-[#008575] text-white">Borrow</button>
                  <button onClick={() => setIsModalOpen(false)} className="btn bg-[#f44336] text-white">Cancel</button>
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
