import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5"; // Importing Close Icon
import { AuthContext } from "../../../context/AuthProvider";
import ToggleTheme from "../../ToggleTheme"; 

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is enabled (you can use a context or localStorage for persistence)
  useEffect(() => {
    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logOut()
      .then(() => console.log("Sign out successfully"))
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li onClick={() => setMenuOpen(false)}>
        <Link to="/">Home</Link>
      </li>
      <li onClick={() => setMenuOpen(false)}>
        <Link to="/books">All Books</Link>
      </li>
      {user && (
        <>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/add-book">Add Book</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/borrowed-books">Borrowed Books</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} shadow-md`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Left Side - Logo */}
        <Link to="/" className="text-2xl font-bold text-[#008575]">
          Library MS
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">{links}</ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ToggleTheme />

          {user ? (
            <button onClick={handleSignOut} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Log out
            </button>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-4 py-2 bg-[#008575] text-white rounded hover:bg-white hover:text-[#008575] transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-[#008575] text-white rounded hover:bg-white hover:text-[#008575] transition">
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-3xl text-[#008575]">
            <IoIosMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={menuRef} className={`fixed top-0 left-0 h-full w-[75%] max-w-xs ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} shadow-lg transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Close Button */}
        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-red-500 transition">
          <IoClose />
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col space-y-4 text-lg p-6 mt-12">{links}</ul>

        {/* Auth Section (Mobile Only) */}
        <div className="p-6">
          {user ? (
            <button onClick={handleSignOut} className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
              Log out
            </button>
          ) : (
            <div className="flex flex-col space-y-4">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full px-4 py-2 bg-[#008575] text-white rounded hover:bg-white hover:text-[#008575] transition text-center">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="w-full px-4 py-2 bg-[#008575] text-white rounded hover:bg-white hover:text-[#008575] transition text-center">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
