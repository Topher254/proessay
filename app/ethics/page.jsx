"use client";

import Head from "next/head";

const EthicsCodePage = () => {
  return (
    <>
      <Head>
        <title>Academic Ethics Code | ProEssayWorks</title>
        <meta name="description" content="Read the ProEssayWorks Ethics Code. We uphold academic integrity and ethical standards in all our essay writing and academic support services." />
        <meta name="keywords" content="academic integrity, ethics, plagiarism checker, writing policy" />
        <meta property="og:title" content="Academic Ethics Code | ProEssayWorks" />
        <meta property="og:description" content="Read the ProEssayWorks Ethics Code. We uphold academic integrity and ethical standards in all our essay writing and academic support services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/ethics" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': 'Academic Ethics Code',
              'url': 'https://proessayworks.com/ethics',
              'description': 'Read the ProEssayWorks Ethics Code. We uphold academic integrity and ethical standards in all our essay writing and academic support services.'
            }),
          }}
        />
      </Head>
      <div className="max-w-4xl mx-auto text-white w-full px-4 py-8 sm:rounded-xl sm:shadow-md sm:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Ethics Code</h1>
        
        <div className="bg-white rounded-lg p-6 mb-8 border border-indigo-100 shadow">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl text-black font-semibold mb-2">Our Commitment</h2>
              <p className="text-gray-700">
                At ProEssayWorks, we uphold the highest ethical standards in academic support. 
                We are committed to promoting learning while maintaining academic integrity.
              </p>
            </div>
          </div>
        </div>
        
        <div className="prose prose-indigo">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Academic Integrity</h2>
            <p>
              We strictly prohibit:
            </p>
            <ul className="list-disc pl-5">
              <li>Submitting our work as one's own</li>
              <li>Plagiarism in any form</li>
              <li>Assistance with high-stakes exams</li>
              <li>Violation of institutional honor codes</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Appropriate Use of Services</h2>
            <p>
              Our services are intended for:
            </p>
            <ul className="list-disc pl-5">
              <li>Learning and research purposes</li>
              <li>Reference and sample materials</li>
              <li>Improving writing skills</li>
              <li>Understanding complex topics</li>
              <li>Developing proper citation practices</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Writer Ethics</h2>
            <p>
              Our writers must:
            </p>
            <ul className="list-disc pl-5">
              <li>Produce 100% original work</li>
              <li>Properly cite all sources</li>
              <li>Adhere to academic standards</li>
              <li>Maintain strict confidentiality</li>
              <li>Refuse requests violating academic integrity</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
            <p>
              Users agree to:
            </p>
            <ul className="list-disc pl-5">
              <li>Use materials ethically as learning aids</li>
              <li>Properly cite our work if referenced</li>
              <li>Not submit our work as their own</li>
              <li>Comply with their institution's policies</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Anti-Plagiarism Measures</h2>
            <p>
              We implement:
            </p>
            <ul className="list-disc pl-5">
              <li>Mandatory plagiarism checks for all orders</li>
              <li>Strict consequences for plagiarizing writers</li>
              <li>Education on proper citation practices</li>
              <li>Free plagiarism reports upon request</li>
            </ul>
          </section>
          
          <section className="mb-8 bg-green-50 p-4 rounded-lg border border-green-100">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Educational Purpose</h2>
            <p className="text-green-700">
              Our ultimate goal is to support students in their educational journey. We encourage 
              users to engage with our materials as learning tools to enhance their own academic skills.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default EthicsCodePage;