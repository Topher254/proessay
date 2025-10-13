"use client";

// SEO Keywords: essay writers, assignment writing service, reviews, blog, contact, order essay, get help

import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about' },
    { name: 'Writers', path: '/writers' },
    { name: 'Order any Assignment', path: '/gethelp' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' }
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <Link href="/" className="   transition-colors flex items-center">
          <Image
            src="/logo.png"
            alt="ProEssayWorks Logo"
            width={64}
            height={64}
            className="w-32 h-10 object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={name}
              href={path}
              className={`px-3 py-2 text-gray-700 font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 ${
                pathname === path
                  ? 'border-b-2 border-indigo-600 bg-transparent text-indigo-700'
                  : ''
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Contact Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-2">
          <Link href="/contact" className="bg-indigo-600 text-white px-5 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-700 rounded-lg p-2 hover:bg-indigo-100 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg p-6 z-50 md:hidden rounded-b-2xl border-b border-gray-200"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map(({ name, path }) => (
                  <Link
                    key={name}
                    href={path}
                    className={`px-4 py-3 text-gray-700 font-medium hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 ${
                      pathname === path
                        ? 'border-b-2 border-indigo-600 bg-transparent text-indigo-700'
                        : ''
                    }`}
                  >
                    {name}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="bg-indigo-600 text-white px-4 py-3 rounded-full text-center font-semibold shadow hover:bg-indigo-700 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating urgent help button */}
      {pathname !== '/gethelp' && pathname !== '/admin' && (
        <Link href="/gethelp" className="fixed bottom-6 right-6 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 100, y: 100, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-red-600 text-white text-lg px-6 py-3 animate-bounce rounded-full shadow-xl hover:bg-red-700 transition-colors font-bold"
          >
            Need urgent help? Click here
          </motion.div>
        </Link>
      )}
    </>
  );
};

export default Navbar;
