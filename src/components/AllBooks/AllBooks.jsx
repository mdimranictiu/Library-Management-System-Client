import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "../BookCard/BookCard";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const timeoutRef = useRef(null);

  document.title = "All Books";

  // Fetch books with pagination and search
  useEffect(() => {
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      axios
        .get(`https://library-management-system-server-ten.vercel.app/books`, {
          params: {
            search,
            page: currentPage,
            limit: 8, // Number of books per page
          },
        })
        .then((res) => {
          const result = res.data;
          setBooks(result.books); // Assuming `books` is in the response
          setTotalPages(result.totalPages); // Assuming `totalPages` is in the response
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [search, currentPage]); // Fetch data whenever search or currentPage changes

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Trigger search manually
  const handleSearchClick = () => {
    setCurrentPage(1); // Reset to first page when search is clicked
  };

  // Handle pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="py-10 min-h-screen">
      <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
        All Books
      </h2>

      {/* Search Bar */}
      <div className="flex items-center max-sm:w-full max-md:w-4/5 w-3/5 mx-auto my-10 bg-gray-200 p-2 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search books by title, author or category"
          className="w-full p-2 rounded-l-lg focus:outline-none"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className="p-2 bg-blue-600 text-white rounded-r-lg"
          onClick={handleSearchClick} // Trigger search manually
        >
          <span>Search</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
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
      ) : books.length === 0 ? (
        <div className="text-center py-16 text-xl text-gray-500">
          <p>No books found matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 mx-auto md:grid-cols-2 grid-cols-1 gap-10">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {books.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
