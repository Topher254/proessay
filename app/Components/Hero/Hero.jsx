"use client";

// SEO Keywords: urgent homework, essay writers, do my assignment, pay for research paper, college essay writing, assignment support

import React from "react";
import { FaStar, FaSearch, FaRegFileAlt, FaClock } from "react-icons/fa";
import { PiRobotLight } from "react-icons/pi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Hero = () => {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push("/gethelp");
  };

  return (
    <section className="bg-gradient-to-r from-indigo-50 to-indigo-50 py-16 px-6" aria-label="ProEssayWorks Hero">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Section */}
        <header className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            ProEssayWorks: <br />
            <span className="text-gray-800">get help from real pros</span>
          </h1>

          <p className="text-lg text-gray-600">
            Get your paper written for any subject, on any topic, with guaranteed quality.
          </p>

          {/* Order Now Button */}
          <button
            onClick={handleOrderClick}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-10 py-3 rounded-full shadow"
          >
            Order now
          </button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-left text-sm">
            <div className="flex items-start space-x-2">
              <PiRobotLight className="text-xl text-indigo-600 mt-1" aria-hidden="true" />
              <span className="text-indigo-600">NO AI</span> <span className="text-red-600 font-semibold"> 100% human content</span>
            </div>
            <div className="flex items-start space-x-2">
              <FaRegFileAlt className="text-xl text-indigo-600 mt-1" aria-hidden="true" />
              <span className="text-indigo-600">Plagiarism report upon request</span>
            </div>
            <div className="flex items-start space-x-2">
              <FaSearch className="text-xl text-indigo-600 mt-1" aria-hidden="true" />
              <span className="text-indigo-600">Expert-driven quality</span>
            </div>
            <div className="flex items-start space-x-2">
              <FaClock className="text-xl text-indigo-600 mt-1" aria-hidden="true" />
              <span className="text-indigo-600">3-hour minimum deadline</span>
            </div>
          </div>
        </header>

        {/* Right Section with Image */}
        <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">
          <Image
            src="/wobg.png"
            alt="Student using ProEssayWorks essay writing service on laptop"
            width={350}
            height={350}
            className="w-[300px] md:w-[350px] rounded-md object-cover relative z-10"
            priority
          />

          {/* Floating Rating */}
          <div className="absolute z-30 top-4 right-4 bg-white rounded-xl shadow-md p-3 flex items-center space-x-2">
            <FaStar className="text-yellow-400" aria-hidden="true" />
            <div className="">
              <p className="text-md text-indigo-500 font-semibold">4.8/5</p>
              <p className="text-xs text-gray-500">ProESsayWorks is rated</p>
            </div>
          </div>

          {/* Floating Subjects */}
          <div className="absolute bottom-4 z-30 right-4 bg-white rounded-xl shadow-md p-3 flex items-center space-x-2">
            <FaSearch className="text-purple-500" aria-hidden="true" />
            <div className="z-30">
              <p className="text-md text-indigo-600 font-semibold">115+</p>
              <p className="text-xs text-gray-500">Subjects covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
