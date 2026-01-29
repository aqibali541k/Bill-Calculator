import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <nav className="bg-gradient-to-r from-amber-800 via-yellow-700 to-amber-800 text-amber-50 shadow-lg border-b-4 border-amber-900">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-wide font-serif"
        >
          🏪 مہر ارشاد کریانہ اسٹور
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-300"
          >
            Bill Page
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-yellow-300 transition duration-300"
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
        <div className="md:hidden bg-amber-900/95 px-6 py-4 space-y-3 text-center font-medium">
          <Link
            to="/"
            className="block hover:text-yellow-300"
            onClick={() => setOpen(false)}
          >
            Bill Page
          </Link>
          <Link
            to="/dashboard"
            className="block hover:text-yellow-300"
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
