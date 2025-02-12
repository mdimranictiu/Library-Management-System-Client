import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import contactAnimation from '../../assets/contact.json'
import UseAxiosPublic from "../../hook/UseAxiosPublic/UseAxiosPublic";

const ContactUs = () => {
  document.title = "Contact Us";
  const axiosPublic=UseAxiosPublic();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axiosPublic
      .post("/submit/contact", formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: "Your message has been sent successfully!",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send message. Please try again later.",
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-10 py-16 px-5 max-w-5xl mx-auto">
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={contactAnimation} className="w-4/5 md:w-full" loop />
      </div>

      {/* Contact Form */}
      <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-[#008575] mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-lg font-medium text-[#008575]">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
              placeholder="Subject"
            />
            {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-[#008575]">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-[#008575] focus:outline-none"
              placeholder="Your Message"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#008575] text-white text-lg py-2 rounded-lg hover:bg-[#006655] transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
