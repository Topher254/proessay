import React from 'react';
import { Shield, Clock, DollarSign, CreditCard, FileText, Award } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// SEO Keywords: privacy, scholarship essay writing service, urgent homework, assignment support, academic integrity, refund, money back, plagiarism checker

export default function Benefits() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/gethelp"); // Navigate to /gethelp route
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-8" aria-label="Benefits of ProEssayWorks">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl font-bold rotate-90 text-green-400 mr-3" aria-hidden="true">✏️</div>
            <h1 className="text-3xl font-bold text-gray-800">
              Discover our premium services: why choose excellence
            </h1>
          </div>
        </header>
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Top Row */}
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Privacy first approach">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Privacy first approach
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Your data remains completely confidential with our advanced encryption protocols. We implement military-grade security measures to ensure your information stays protected. Every interaction is secured with end-to-end encryption, giving you complete peace of mind.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Round-the-clock assistance">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Clock className="w-8 h-8 text-indigo-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Round-the-clock assistance
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Our dedicated support team is available around the clock to assist you. Whether it's a quick question or complex troubleshooting, our experts are ready to help. Experience instant responses and personalized solutions whenever you need them.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Transparent pricing model">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-purple-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Transparent pricing model
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              No hidden fees or surprise charges - our pricing structure is completely transparent. You get premium quality services at competitive rates with clear billing. Every feature is included upfront, so you know exactly what you're paying for.
            </p>
          </article>
          {/* Bottom Row */}
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Secure payment gateway">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-gray-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Secure payment gateway
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Process payments through our PCI-compliant secure gateway with multiple payment options. Your financial information is protected with bank-level security protocols. Enjoy flexible payment methods with instant confirmation and detailed receipts.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Comprehensive content solutions">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Comprehensive content solutions
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              From technical documentation to creative content, our skilled professionals handle diverse project requirements. Every piece is crafted with attention to detail and industry best practices. Get exactly what you need, delivered on time and beyond expectations.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow" aria-label="Quality assurance guarantee">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-indigo-600" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Quality assurance guarantee
            </h2>
            <p className="text-gray-600 text-center leading-relaxed">
              Every deliverable undergoes rigorous quality checks by our expert reviewers. We provide detailed quality reports and authenticity verification for complete transparency. Our commitment to excellence ensures you receive only the highest standard of work.
            </p>
          </article>
        </div>
        {/* CTA Button */}
        <div className="text-center">
          <button  onClick={handleOrderClick} className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl">
            Start your journey today
          </button>
        </div>
      </div>
    </section>
  );
}