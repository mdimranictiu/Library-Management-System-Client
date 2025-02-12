import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hook/UseAxiosPublic/UseAxiosPublic";
import { AuthContext } from "../../context/AuthProvider";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPublic = UseAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      checkSubscription(user.email);
    }
  }, [user]);

  const checkSubscription = async (email) => {
    try {
      const response = await axiosPublic.get(`/newsletter/check?email=${email}`);
      if (response.data?.subscribed) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when typing
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setError("Email is required");
    if (!validateEmail(email)) return setError("Invalid email format");

    if (isSubscribed) {
      setError("This email is already subscribed.");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axiosPublic.post("/newsletter/subscribe", { email });

      if (response.data?.success) {
        setIsSubscribed(true);
        setError("");
        Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: "You have successfully subscribed to our newsletter.",
        });
      } else {
        setError("Subscription failed. Try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 px-5 shadow-md bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl max-sm:text-2xl font-bold text-[#008575] mb-5">
          Stay Updated with Our Newsletter!
        </h2>
        <p className="text-lg text-gray-700 mb-5">
          Get the latest book news, updates, and author messages straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full md:w-80 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008575] text-black"
          />
          <button
            type="submit"
            className={`px-6 py-3 font-medium rounded-lg transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#008575] text-white hover:bg-[#006655]"
            }`}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        {isSubscribed && <p className="text-black text-sm mt-3">✅ You are already subscribed!</p>}
      </div>
    </div>
  );
};

export default NewsLetter;
