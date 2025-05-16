import React, { useState } from "react";
import { Menu, Close, MenuBook, AccountCircle } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "My Books", path: "/my-books" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <MenuBook className="text-blue-600" />
        <span className="text-xl font-bold text-blue-600">BooksApp</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link key={link.path} to={link.path} className="text-gray-700 hover:text-blue-600 font-medium transition">
            {link.label}
          </Link>
        ))}
        <AccountCircle className="text-gray-700 hover:text-blue-600 cursor-pointer" />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <Close /> : <Menu />}</button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute top-[64px] left-0 w-full bg-white shadow-md flex flex-col items-start gap-4 px-4 py-3 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
              <AccountCircle />
              Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
