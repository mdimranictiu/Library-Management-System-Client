import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hook/UseAxiosPublic/UseAxiosPublic";

const FeedBack = () => {
  document.title = "Feedback and Suggestions";
  const axiosPublic=UseAxiosPublic()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.feedback.trim()) errors.feedback = "Feedback is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axiosPublic
      .post("/submit/feedback", formData) // Assume this is your feedback API endpoint
      .then(() => {
       

            Swal.fire({
            icon: "success",
            title: "Feedback Submitted",
            text: "Thank you for your feedback!",
          });
        
        setFormData({ name: "", email: "", feedback: "" });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to submit feedback. Please try again later.",
        });
      });
  };

  return (
    <div className="py-20 px-5 max-w-3xl mx-auto">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575] mb-6">
        Feedback and Suggestions
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-xl"
      >
        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Your Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-[#008575]">Your Feedback/Suggestion</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
            placeholder="Your feedback or suggestions"
          ></textarea>
          {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#008575] text-white text-lg py-2 rounded-lg hover:bg-[#006655] transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
