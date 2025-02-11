import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [Error, setError] = useState("");
  const { newUserCreate, signInwithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  document.title = "Register";

  // Validate Password
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const minLength = 6;

    if (!uppercaseRegex.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!lowercaseRegex.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (password.length < minLength) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  };

  // Handle Register
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const passError = validatePassword(password);
    if (passError) {
      setError(passError);
      return;
    }
    setError('');

    const userInfo = {
      name, email, photoURL, password
    };

    newUserCreate(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        form.reset();
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            Swal.fire({
              title: `Hi, ${name}`,
              text: "Your Account Created Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate('/');
          })
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: `${error.message}`,
          confirmButtonText: 'Try Again',
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInwithGoogle()
      .then((data) => {
        const user = data.user;
        Swal.fire({
          title: `Hi, ${user.displayName}`,
          text: "Your Account Created Successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: `${error.message}`,
          confirmButtonText: 'Try Again',
        });
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h2 className="text-4xl font-extrabold text-[#008575] mb-3 text-center">Create Your Account</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">Register with your details to get started</p>
      <div className="w-full max-w-xl p-8 border border-gray-300 shadow-lg rounded-lg bg-white">
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Name</label>
            <input type="text" name="name" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Enter Your Name" />
          </div>
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Email</label>
            <input type="email" name="email" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Enter Your Email" />
          </div>
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Photo URL</label>
            <input type="text" name="photoURL" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Enter Your Photo URL" />
          </div>
          <div className="form-control">
            <label className="label text-[#008575] text-lg">Password</label>
            <input type="password" name="password" required className="input input-bordered w-full p-3 focus:ring-1 focus:ring-[#008575]" placeholder="Enter Your Password" />
            {Error && <span className="text-red-700">{Error}</span>}
          </div>
          <button type="submit" className="w-full bg-[#008575] text-white text-lg font-semibold py-2 rounded-md hover:bg-white hover:text-[#008575] border border-[#008575] transition">Register</button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <Link to="/login" className="text-[#008575] font-bold">Login</Link>
        </p>
        <div className="mt-5">
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 text-lg font-semibold py-2 rounded-md border transition">
            <FcGoogle /> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
