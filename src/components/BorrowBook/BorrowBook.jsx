import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const BorrowBook = ({ book, books, setBooks }) => {
  const [oldbook, setOldBook] = useState({});

  const {
    email,
    borrowBookImg,
    title,
    category,
    bookid,
    borrowDate,
    borrowedBookId,
    returnDate,
  } = book;

  // get book info
  axios
    .get(`https://library-management-system-server-ten.vercel.app/book/${bookid}`)
    .then((res) => {
      const result = res.data;
      setOldBook(result);
    })
    .catch((error) => {
      console.log(error);
    });

  const handleReturn = () => {
    console.log("return click", bookid, borrowedBookId);
    Swal.fire({
      title: "Are you sure?",
      text: "Next time You will be able to Borrow the book if Available",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Return it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://library-management-system-server-ten.vercel.app/borrowed-books/delete/${borrowedBookId}`
          )
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire("Returned!", "success");
              const remain = books.filter((data) => data.bookid !== bookid);
              setBooks(remain);
            } else {
              Swal.fire("Error!", "Failed to return.", "error");
            }
          })
          .catch((error) => {
            console.error("Return Error:", error);
            Swal.fire(
              "Error!",
              "An error occurred while return the book.",
              "error"
            );
          });
        const updateQuantity = {
          quantity: oldbook.quantity + 1,
        };
        axios
          .patch(`https://library-management-system-server-ten.vercel.app/book/${bookid}`, updateQuantity)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="card card-compact bg-[#eff1ed] shadow-2xl flex flex-col justify-between">
      <div className="card-body flex-grow">
        <div className="w-3/5 h-[300px] mx-auto rounded-lg my-5">
          <img alt="Book" src={borrowBookImg} className="w-full h-full" />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="card-title mt-2 text-[#008575]">Book Name: {title}</h2>
          <h3 className="font-semibold text-[16px] mt-2">
            Category: {category}
          </h3>
          <h3 className="font-semibold text-[16px] mt-2">
            Borrow Date: {borrowDate}
          </h3>
          <h3 className="font-semibold text-[16px] text-red-600 mt-2">
            Return Date: {returnDate}
          </h3>

          <div className="py-5">
            <button
              onClick={() => handleReturn(bookid, borrowedBookId)}
              className="text-[16px] w-[200px] font-semibold input input-bordered text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
