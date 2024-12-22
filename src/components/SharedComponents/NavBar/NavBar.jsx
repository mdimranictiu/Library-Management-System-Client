import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = true;
  const [isHovered, setIsHovered] = useState(false);

  const links = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      {user && (
        <>
          <li>
            <Link>All Books</Link>
          </li>
          <li>
            <Link>Add Book</Link>
          </li>
          <li>
            <Link>Borrowed Books</Link>
          </li>
        </>
      )}
    </>
  );
  const registerSection = (
    <>
      {user ? (
        <>
          <div className="flex items-center gap-6">
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-blue-500 transition duration-300"
            >
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isHovered && (
                <div className="absolute top-14  transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                  {user.displayName || "User"}
                </div>
              )}
            </button>

            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
              Log out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex space-x-2">
            <Link to="/login" className=" px-4 py-2  rounded">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 rounded ">
              Register
            </Link>
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-2xl"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">My Logo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-2xl">{links}</ul>
      </div>
      <div className="navbar-end text-2xl">{registerSection}</div>
    </div>
  );
};

export default NavBar;
