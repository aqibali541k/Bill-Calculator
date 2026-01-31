import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 text-blue-50 shadow-lg border-b-4 border-blue-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-wide font-serif"
        >
          🏪 Grocery Store Bill Generator
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-300 transition duration-300">
            Bill Page
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-blue-300 transition duration-300"
          >
            Admin Dashboard
          </Link>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-blue-900/95 px-6 py-4 space-y-3 text-center font-medium">
          <Link
            to="/"
            className="block hover:text-blue-300"
            onClick={() => setOpen(false)}
          >
            Bill Page
          </Link>
          <Link
            to="/dashboard"
            className="block hover:text-blue-300"
            onClick={() => setOpen(false)}
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
