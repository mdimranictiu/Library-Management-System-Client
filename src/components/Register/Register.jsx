import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl py-5 font-bold text-center text-[#008575]">
       Register
      </h2>
      <div className="p-5 w-full sm:w-full md:w-full lg:w-2/5 border border-gray-300 mx-auto">
        <form>
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
                  name="name"
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
                  placeholder="Enter Your Email"
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
                  placeholder="Enter Your Photo URL"
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
                  placeholder="Password"
                  name="password"
                  className="input  focus:ring-1 focus:outline-none focus:ring-[#008575] text-[18px] w-full input-bordered"
                />
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
          <button className="justify-center gap-2 w-full input input-bordered font-semi-bold text-[22px]  max-sm:mx-auto  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]">
            Continue with Google
          </button>
        </label>
        <label className="input-group">
          <button className="justify-center gap-2 w-full input input-bordered font-semi-bold text-[22px]  max-sm:mx-auto  text-white hover:bg-white duration-300 cursor-pointer bg-[#008575] hover:text-[#008575]">
            Continue with Github
          </button>
        </label>
     </div>
      </div>
    </div>
  );
};

export default Register;
