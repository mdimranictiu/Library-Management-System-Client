import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UseAxiosPrivate from '../../hook/UseAxiosPrivate/UseAxiosPrivate';

const SuggestBook = () => {
  document.title = "Suggest a Book";
  const axiosPrivate=UseAxiosPrivate()

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.author.trim()) errors.author = "Author is required";
    if (!formData.genre.trim()) errors.genre = "Genre is required";
    if (!formData.description.trim()) errors.description = "Description is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axiosPrivate
      .post("/submit/suggest-book", formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Book Suggested",
          text: "Your book suggestion has been submitted successfully!",
        });
        setFormData({ title: '', author: '', genre: '', description: '' });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to suggest the book. Please try again later.",
        });
      });
  };

  return (
    <div className="py-20 px-5 max-w-3xl mx-auto">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575] mb-6">Suggest a Book</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Book Title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Author Name"
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Book Genre"
          />
          {errors.genre && <p className="text-red-500 text-sm">{errors.genre}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Brief Description of the Book"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#008575] text-white text-lg py-2 rounded-lg hover:bg-[#006655] transition duration-300"
        >
          Suggest Book
        </button>
      </form>
    </div>
  );
};

export default SuggestBook;
