import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiCrossedSabres } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";

const NavBar = () => {
  const user =false;
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {user && (
        <>
          <li>
            <Link to="/books">All Books</Link>
          </li>
          <li>
            <Link to="/add-book">Add Book</Link>
          </li>
          <li>
            <Link to="/borrowed-books">Borrowed Books</Link>
          </li>
        </>
      )}
    </>
  );

  const registerSection = (
    <>
      {user ? (
        <div className="flex items-center max-sm:items-start gap-6 max-sm:flex-col">
          <button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 hover:ring-2 hover:ring-blue-500 transition duration-300 relative"
          >
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isHovered && (
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
                {user.displayName || "User"}
              </div>
            )}
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-4 max-sm:flex-col">
         <button className="px-4 py-2 bg-[#008575] text-white  hover:bg-white hover:text-[#008575] rounded transition duration-300"> <Link to="/login" className="px-4 py-2 rounded">
            Login
          </Link></button>
          <button className="px-4 py-2 bg-[#008575] text-white  hover:bg-white hover:text-[#008575] rounded transition duration-300">
          <Link to="/register" className="px-4 py-2 rounded">
            Register
          </Link>
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 sticky top-0 left-0  z-50 shadow">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className=" text-3xl font-bold text-[#008575] lg:hidden"
          >
          <IoIosMenu />
          </div>
        </div>
        <a className="btn btn-ghost text-xl">My Logo</a>
      </div>
      <div
        className={`fixed top-[60px] left-0 py-10 z-40 w-full bg-base-100 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
         <GiCrossedSabres/>
        </button>
        <ul className="menu p-3 text-center text-xl">{links}{ <div className="text-xl p-3 md:hidden">{registerSection}</div>}</ul>
       
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-2xl">{links}</ul>
      </div>
      <div className="navbar-end max-sm:hidden max-md:hidden text-2xl">{registerSection}</div>
    </div>
  );
};

export default NavBar;
