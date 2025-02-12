import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BookCard from "../BookCard/BookCard";
import UseAxiosPrivate from "../../hook/UseAxiosPrivate/UseAxiosPrivate";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state
  const [sortOrder, setSortOrder] = useState("desc"); // Sorting order state

  const timeoutRef = useRef(null);
  document.title = "All Books";
  const axiosPrivate = UseAxiosPrivate();

  // Fetch books with pagination and search
  useEffect(() => {
    setIsLoading(true);
    timeoutRef.current = setTimeout(() => {
      axiosPrivate
        .get(`/books`, {
          params: {
            search,
            page: currentPage,
            limit: 8, // Number of books per page
          },
        })
        .then((res) => {
          const result = res.data;
          let sortedBooks = result.books;

          // Apply sorting before setting books
          sortedBooks = sortedBooks.sort((a, b) =>
            sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
          );

          setBooks(sortedBooks);
          setTotalPages(result.totalPages);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [search, currentPage, sortOrder]); // Update when search, page, or sortOrder changes

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Handle sorting toggle
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="py-10 min-h-screen">
      <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
        All Books
      </h2>

      {/* Search Bar */}
        <div className="flex justify-center items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books by title, author or category"
          className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none"
          value={search}
          onChange={handleSearchChange}
        />
        <button
          className="px-10 py-2 bg-[#008575] text-white rounded-lg"
          onClick={() => setCurrentPage(1)}
        >
          Search
        </button>

       
      </div>
       {/* Sort Button */}
       <button
          className="px-4 py-2 my-5 bg-[#008575] text-white rounded-lg"
          onClick={toggleSortOrder}
        >
          Sort by Rating {sortOrder === "asc" ? "(Low to High)" : "(High to Low)"}
        </button>


      {/* Loading Indicator */}
      {isLoading ? (
  <div className="items-center min-h-screen text-center py-16">
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#008575] text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
