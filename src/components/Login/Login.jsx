import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { loginUser, signInwithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  document.title = "Login";

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await loginUser(email.value, password.value);
      event.target.reset();
      navigate(from);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.message, confirmButtonText: "Try Again" });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInwithGoogle();
      navigate(from);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Login Failed", text: error.message, confirmButtonText: "Try Again" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="text-4xl font-extrabold text-[#008575] mb-3 text-center">Welcome Back!</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">Log in with your email and password to continue</p>
      <div className="w-full max-w-xl p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Email</label>
            <input type="email" name="email" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Enter Your Email" />
          </div>
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Password</label>
            <input type="password" name="password" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Password" />
          </div>
          <button type="submit" className="w-full bg-[#008575] text-white text-lg font-semibold py-2 rounded-md hover:bg-white hover:text-[#008575] border border-[#008575] transition">Log In</button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Are you new here? <Link to="/register" className="text-[#008575] font-bold">Register</Link>
        </p>
        <div className="mt-5">
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 text-lg font-semibold   py-2 rounded-md   border  transition">
            <FcGoogle /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
