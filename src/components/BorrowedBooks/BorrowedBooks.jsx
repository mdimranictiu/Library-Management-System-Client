import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import BorrowBook from '../BorrowBook/BorrowBook';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  document.title='Borrowed Books';

  useEffect(() => {
    axios.get(`https://library-management-system-server-ten.vercel.app/borrowed-books?email=${email}`)
      .then((res) => {
        setBooks(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [email]);

  return (
    <div className="py-10 min-h-screen">
      <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
        My Borrowed Books
      </h2>
      
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
      ) : books.length ? (
        <div className="grid lg:grid-cols-3 mx-auto md:grid-cols-2 sm:grid-cols-1 gap-10">
          {books.map((book) => (
            <BorrowBook
              books={books}
              setBooks={setBooks}
              key={book.bookid}
              book={book}
            />
          ))}
        </div>
      ) : (
        <h2 className="text-3xl pb-10 text-center font-bold text-[#008575]">
          You Have No Borrowed Books
        </h2>
      )}
    </div>
  );
};

export default BorrowedBooks;
