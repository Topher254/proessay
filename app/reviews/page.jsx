"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Head from 'next/head';

export default function Testimonials() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentView, setCurrentView] = useState('testimonials');
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 4;
  const router = useRouter();

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleOrderClick = () => {
    router.push("/gethelp");
  };

  const faqs = [
    {
      question: "Who are the academic writers in your team?",
      answer: "Our team consists of PhD holders, master's degree graduates, and subject matter experts from top universities worldwide. Each writer undergoes rigorous screening and testing before joining our platform."
    },
    {
      question: "Is there a discount code I can use?",
      answer: "Yes! New customers receive 15% off their first order with code WELCOME15. We also offer seasonal promotions and loyalty discounts for returning customers."
    },
    {
      question: "If I hire you to write an assignment for me, will I be updated once it's complete?",
      answer: "Absolutely! You'll receive instant notifications via email and SMS when your assignment is completed. You can also track progress in real-time through your dashboard."
    },
    {
      question: "Can I modify the requirements after the writer begins to work on my assignment?",
      answer: "Yes, minor modifications are welcome within the first 24 hours at no extra cost. Major changes may require additional time and fees, which we'll discuss beforehand."
    },
    {
      question: "How do I hire someone to write my research paper?",
      answer: "Simply fill out our order form with your requirements, choose your preferred writer, make payment, and we'll get started immediately. The entire process takes less than 5 minutes."
    },
    {
      question: "If I hire you to write my assignments for me, will anyone discover?",
      answer: "Your privacy is our top priority. We maintain strict confidentiality, use secure payment methods, and never share your personal information with third parties."
    },
    {
      question: "Do fees include editing if I hire someone to write a research assignment?",
      answer: "Yes! All our packages include unlimited free revisions within 14 days, basic proofreading, and formatting according to your specified academic style."
    },
    {
      question: "What level of expertise will my writer possess?",
      answer: "Writers are matched based on your assignment's complexity. Bachelor's level work goes to graduates, while PhD-level assignments are handled by doctoral degree holders in relevant fields."
    }
  ];

  const allReviews = [
    {
      id: 1,
      rating: 5,
      text: "Exceptional service! The quality exceeded my expectations and the writer understood exactly what I needed. Will definitely use again for future projects.",
      studentId: "#892456",
      writer: "Prof. Darwin Victor",
      date: "03/15/2024",
      initials: "SM",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      id: 2,
      rating: 5,
      text: "Amazing turnaround time without compromising quality. The research was thorough and the writing style perfectly matched my requirements. Highly recommend!",
      studentId: "#745123",
      writer: "Cole Raphael",
      date: "03/12/2024",
      initials: "JD",
      gradient: "from-indigo-400 to-green-400"
    },
    {
      id: 3,
      rating: 5,
      text: "The writer was professional and delivered exactly what I asked for. Great communication throughout the process and finished ahead of deadline.",
      studentId: "#634789",
      writer: "Dr. Sarah Martinez",
      date: "03/10/2024",
      initials: "AL",
      gradient: "from-red-400 to-orange-400"
    },
    {
      id: 4,
      rating: 4,
      text: "Very satisfied with the quality of work. The paper was well-researched and properly formatted. Minor revisions were handled quickly.",
      studentId: "#556123",
      writer: "Prof. Michael Chen",
      date: "03/08/2024",
      initials: "RT",
      gradient: "from-green-400 to-teal-400"
    },
    {
      id: 5,
      rating: 5,
      text: "Outstanding work! The analysis was deep and insightful. I received an A+ on my assignment thanks to their expertise.",
      studentId: "#789234",
      writer: "Dr. Emma Wilson",
      date: "03/05/2024",
      initials: "KM",
      gradient: "from-indigo-400 to-purple-400"
    },
    {
      id: 6,
      rating: 5,
      text: "Perfect citations and references. The writer clearly understood the academic standards required for my field of study.",
      studentId: "#445678",
      writer: "Prof. James Rodriguez",
      date: "03/03/2024",
      initials: "NP",
      gradient: "from-pink-400 to-rose-400"
    },
    {
      id: 7,
      rating: 4,
      text: "Good quality work delivered on time. The writer was responsive to feedback and made necessary adjustments promptly.",
      studentId: "#321456",
      writer: "Dr. Lisa Thompson",
      date: "03/01/2024",
      initials: "BH",
      gradient: "from-cyan-400 to-indigo-400"
    },
    {
      id: 8,
      rating: 5,
      text: "Exceeded expectations! The research paper was comprehensive and well-structured. Excellent use of sources and proper methodology.",
      studentId: "#654321",
      writer: "Prof. David Park",
      date: "02/28/2024",
      initials: "GS",
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      id: 9,
      rating: 5,
      text: "Brilliant work on my thesis chapter. The writer understood complex concepts and presented them clearly and coherently.",
      studentId: "#987654",
      writer: "Dr. Rachel Green",
      date: "02/25/2024",
      initials: "MK",
      gradient: "from-emerald-400 to-green-400"
    },
    {
      id: 10,
      rating: 4,
      text: "Professional service with good customer support. The final paper was well-written and met all the requirements specified.",
      studentId: "#135792",
      writer: "Prof. Andrew Miller",
      date: "02/22/2024",
      initials: "TP",
      gradient: "from-violet-400 to-indigo-400"
    },
    {
      id: 11,
      rating: 5,
      text: "Fantastic attention to detail and excellent writing quality. The writer went above and beyond to ensure perfection.",
      studentId: "#246813",
      writer: "Dr. Jennifer Lee",
      date: "02/20/2024",
      initials: "CL",
      gradient: "from-fuchsia-400 to-pink-400"
    },
    {
      id: 12,
      rating: 5,
      text: "Incredible research skills and perfect formatting. The assignment was delivered earlier than expected with top-notch quality.",
      studentId: "#369258",
      writer: "Prof. Robert Adams",
      date: "02/18/2024",
      initials: "DW",
      gradient: "from-lime-400 to-green-400"
    }
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const currentReviews = allReviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToReviews = () => {
    setCurrentView('reviews');
    setCurrentPage(0);
  };

  const goToTestimonials = () => {
    setCurrentView('testimonials');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
          </svg>
        ))}
      </div>
    );
  };

  if (currentView === 'reviews') {
    return (
      <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-8" aria-label="Student Reviews">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <button 
              onClick={goToTestimonials}
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Testimonials
            </button>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">All Student Reviews</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Read what our students have to say about their experience with our academic writing services.
            </p>
          </header>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {currentReviews.map((review) => (
              <article key={review.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200" aria-label={`Review by ${review.studentId}`}>
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                <blockquote className="text-gray-700 mb-4 text-sm leading-relaxed">
                  “{review.text}”
                </blockquote>
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-gradient-to-r ${review.gradient} rounded-full flex items-center justify-center mr-3`} aria-hidden="true">
                    <span className="text-white text-xs font-bold">{review.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Student ID: {review.studentId}</p>
                    <p className="text-gray-500 text-xs">Writer: {review.writer}</p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-8 h-8 rounded-full font-medium transition-colors duration-200 ${
                    currentPage === index 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === totalPages - 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Next
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Showing {currentPage * reviewsPerPage + 1} - {Math.min((currentPage + 1) * reviewsPerPage, allReviews.length)} of {allReviews.length} reviews
            </p>
          </div>
        </div>
      </section>
    );
  }
 
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen p-8" aria-label="Student Testimonials and FAQ">
      <Head>
        <meta name="keywords" content="reviews, testimonials, student feedback, essay writers, assignment writing service" />
      </Head>
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">What students say about us</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See real testimonials and frequently asked questions about our essay writing and academic support services.
          </p>
        </header>
        <div className="mb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                What our students say<br />
                about our expertise
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Discover the experiences from those who have trusted us to enhance 
                their academic journey. Browse through the ProEssayWorks reviews and 
                select your expert!
              </p>
              <div className="flex gap-4">
                <button onClick={handleOrderClick} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                  Get my assignment
                </button>
                <button 
                  onClick={goToReviews}
                  className="border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  View all testimonials
                </button>
              </div>
            </div>

            {/* Right Content - Testimonials */}
            <div className="lg:w-1/2 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full text-green-300 opacity-60" aria-hidden="true">
                  <path d="M10,50 Q50,10 90,50 Q50,90 10,50" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-8 -right-8">
                <div className="flex flex-col gap-2">
                  <div className="w-20 h-3 bg-green-300 rounded-full opacity-60"></div>
                  <div className="w-16 h-3 bg-green-400 rounded-full opacity-70"></div>
                </div>
              </div>

              {/* Testimonial Cards */}
              <div className="space-y-6">
                {/* First Testimonial */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transform rotate-1">
                  <div className="flex items-center mb-4">
                    {renderStars(5)}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">
                    "Exceptional service! The quality exceeded my expectations and the writer 
                    understood exactly what I needed. Will definitely use again for future projects."
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-3" aria-hidden="true">
                      <span className="text-white text-xs font-bold">SM</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Student ID: #892456</p>
                      <p className="text-gray-500 text-xs">Writer: Prof. Darwin Victor</p>
                      <p className="text-gray-400 text-xs">03/15/2024</p>
                    </div>
                  </div>
                </div>

                {/* Second Testimonial */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transform -rotate-1 ml-8">
                  <div className="flex items-center mb-4">
                    {renderStars(5)}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">
                    "Amazing turnaround time without compromising quality. The research was thorough 
                    and the writing style perfectly matched my requirements. Highly recommend!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-green-400 rounded-full flex items-center justify-center mr-3" aria-hidden="true">
                      <span className="text-white text-xs font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Student ID: #745123</p>
                      <p className="text-gray-500 text-xs">Writer: Cole Raphael</p>
                      <p className="text-gray-400 text-xs">03/12/2024</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating indicator */}
              <div className="absolute top-0 right-0 bg-white rounded-full px-3 py-1 shadow-sm border border-gray-200">
                <span className="text-gray-600 text-sm font-medium">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0">
            <div className="flex flex-col gap-2">
              <div className="w-24 h-4 bg-green-300 rounded-full opacity-60"></div>
              <div className="w-20 h-4 bg-green-400 rounded-full opacity-70"></div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">FAQ</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find clear answers to the most common questions students ask — everything you need to 
              know in one place.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800 pr-4">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}