"use client";

// SEO Keywords: essay writing service, case study writing service, research paper writing, dissertation proposal writing service, book report writing service, speech writing services

import React, { useState } from 'react';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('Paperwork');

  const categories = {
    'Paperwork': [
      'Essay',
      'Case study', 
      'Report',
      'Research paper',
      'Presentation or speech',
      'Annotated bibliography',
      'Article review',
      'Literature review',
      'Business plan',
      'Research proposal',
      'Book / Movie review',
      'Reflective writing',
      'Thesis / Dissertation',
      'Admission essay',
      'Creative writing',
      'Critical thinking / Review',
      'Term paper',
      'Other'
    ],
    'Coursework/Homework': [
      'Mathematics Assignment',
      'Physics Problem Set',
      'Chemistry Lab Report',
      'Biology Research Project',
      'History Essay',
      'English Literature Analysis',
      'Psychology Case Study',
      'Sociology Survey Report',
      'Economics Data Analysis',
      'Political Science Paper',
      'Philosophy Argument Essay',
      'Statistics Homework',
      'Computer Science Programming',
      'Engineering Design Project',
      'Art History Critique'
    ],
    'Other assignments': [
      'Grant Proposal',
      'Business Proposal',
      'Marketing Plan',
      'Technical Documentation',
      'White Paper',
      'Policy Brief',
      'Conference Abstract',
      'Book Proposal',
      'Scholarship Essay',
      'Personal Statement'
    ]
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8" aria-label="Assignment Writing Services">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-700 mb-8">
            How can you help me in writing my assignments?
          </h1>
        </header>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 rounded-2xl items-center bg-white">
          {/* Left Column - Categories */}
          <nav className="lg:w-1/3 min-h-full" aria-label="Assignment Categories">
            <div className="bg-white rounded-2xl p-6 border-r">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3" aria-hidden="true">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-800">Order any:</span>
              </div>
              <div className="space-y-3">
                {Object.keys(categories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      activeCategory === category
                        ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </nav>
          {/* Right Column - Subject Lists */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* First Div */}
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <ul className="space-y-4">
                  {categories[activeCategory].slice(0, Math.ceil(categories[activeCategory].length / 2)).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Second Div */}
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <ul className="space-y-4">
                  {categories[activeCategory].slice(Math.ceil(categories[activeCategory].length / 2)).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
