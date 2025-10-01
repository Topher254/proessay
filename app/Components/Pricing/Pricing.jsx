import React from 'react';
import { useNavigate } from "react-router-dom";

// SEO Keywords: pricing, affordable essay writing, pay for dissertation, pay for thesis, write essays for money, refund, money back

export default function Pricing() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/gethelp"); // Navigate to /gethelp route
  };
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-8" aria-label="Pricing for Essay Writing Services">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-indigo-200 rounded-lg  animate-spin flex items-center justify-center mr-4" aria-hidden="true">
              <div className="w-6 h-6 bg-white rounded opacity-80"></div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Pocket-friendly assignment support</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your academic stress into success with our affordable, expert-crafted solutions 
            that turn impossible deadlines into achievable milestones for every student's journey.
          </p>
        </header>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Pricing */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border-2 border-gray-600 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 ">Friendly pricing</h2>
              <ul className="space-y-6">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3" aria-hidden="true"></div>
                    <span className="text-gray-700 font-medium">Writing</span>
                  </div>
                  <div className="text-gray-600">
                    from <span className="font-bold text-gray-800">$8.50</span>/page
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3" aria-hidden="true"></div>
                    <span className="text-gray-700 font-medium">Proofreading</span>
                  </div>
                  <div className="text-gray-600">
                    from <span className="font-bold text-gray-800">$2.00</span>/page
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3" aria-hidden="true"></div>
                    <span className="text-gray-700 font-medium">Editing</span>
                  </div>
                  <div className="text-gray-600">
                    from <span className="font-bold text-gray-800">$4.50</span>/page
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3" aria-hidden="true"></div>
                    <span className="text-gray-700 font-medium">Rewriting</span>
                  </div>
                  <div className="text-gray-600">
                    from <span className="font-bold text-gray-800">$6.60</span>/page
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* Right Column - Services */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Included services</h2>
              <ul className="space-y-6">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Unlimited revisions</span>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    free
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Unlimited sources</span>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    free
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Plagiarism & AI report</span>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    free
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">Title page and formatting</span>
                  <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                    free
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* CTA Button */}
        <div className="text-center mt-12">
          <button  onClick={handleOrderClick} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-12 py-2 rounded-lg text-lg transition-colors duration-200">
            Order now
          </button>
        </div>
      </div>
    </section>
  );
}