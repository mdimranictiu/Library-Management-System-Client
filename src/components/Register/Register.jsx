import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'


const Register = () => {

  const [Error,setError]=useState("")
  const {newUserCreate,signInwithGoogle}=useContext(AuthContext)
  const navigate= useNavigate()
  document.title="Register"
  // validate Password 
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

  const handleRegister=(event)=>{
    event.preventDefault();
    const form=event.target;
    const name= form.name.value;
    const email= form.email.value;
    const photoURL=form.photoURL.value;
    const password=form.password.value;

    const passError=validatePassword(password)
    if(passError){
      setError(passError);
      return;
    }
    setError('')
    
    
    const userInfo={
      name,email,photoURL,password
    }
    
    newUserCreate(email,password)
    .then((userCredential)=>{
       const user= userCredential.user;
       form.reset();
       console.log(user)
       updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
    })
    .then(()=>{
      Swal.fire({
        title: `Hi, ${name} `,
        text: "Your Account Created Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/')
    })
   
   
    })
    .catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `${error.message}`,
        confirmButtonText: 'Try Again',

      });
    })

  }
  const handleGoogleSignIn=()=>{
    signInwithGoogle()
    .then((data)=>{
      const user=data.user;
      console.log(user)
      Swal.fire({
        title: `Hi, ${user.displayName} `,
        text: "Your Account Created Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate('/')
    })
    .catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: `${error.message}`,
        confirmButtonText: 'Try Again',

      });
    })
  
  }



  return (
    <div className="my-10">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575]">
       Register
      </h2>
      <div className="p-5 w-full sm:w-full md:w-full lg:w-2/5 border border-gray-300 mx-auto">
        <form onSubmit={handleRegister}>
          <div className="grid p-10 gap-5  max-md:w-full max-sm:w-full mx-auto w-4/5">
          <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Name
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name" required
                  className="input  focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Email
                </span>
              </label>
              <label className="input-group">
                <input
                  type="email"
                  placeholder="Enter Your Email" required
                  name="email"
                  className="input  focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                 Photo URL
                </span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  placeholder="Enter Your Photo URL" required
                  name="photoURL"
                  className="input  focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text text-[18px] text-[#008575]">
                  Password
                </span>
              </label>
              <label className="input-group">
                <input
                  type="password"
                  placeholder="Password" required
                  name="password"
                  className="input  focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] w-full input-bordered"
                />
                {<><span className="text-red-700">{Error}</span></>}
              </label>
            </div>
          </div>
          <div className="form-control my-16 ">
            <label className="input-group">
              <input
                type="submit"
                value="Register"
                className="input input-bordered w-full font-semi-bold text-[22px]  max-sm:mx-auto  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]"
              />
            </label>

            <p className="text-center mt-5">
            Already have an account?{" "}
              <Link className="font-bold" to="/login">
                {" "}
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
     <div className="flex flex-col gap-5">
     <label className="input-group">
          <button onClick={handleGoogleSignIn} className="justify-center gap-2 w-full input input-bordered font-semi-bold text-[22px]  max-sm:mx-auto  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]">
            Continue with Google
          </button>
        </label>
        {/* <label className="input-group">
          <button className="justify-center gap-2 w-full input input-bordered font-semi-bold text-[22px]  max-sm:mx-auto  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]">
            Continue with Github
          </button>
        </label> */}
     </div>
      </div>
    </div>
  );
};

export default Register;
