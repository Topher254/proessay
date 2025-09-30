"use client";

import Head from "next/head";

const MoneyBackPromisePage = () => {
  return (
    <>
      <Head>
        <title>Money-Back Promise | ProEssayWorks</title>
        <meta name="description" content="Learn about the ProEssayWorks money-back guarantee. We stand behind our essay writing services with a comprehensive refund policy for your peace of mind." />
        <meta property="og:title" content="Money-Back Promise | ProEssayWorks" />
        <meta property="og:description" content="Learn about the ProEssayWorks money-back guarantee. We stand behind our essay writing services with a comprehensive refund policy for your peace of mind." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/money-back" />
        <meta name="keywords" content="refund, money back, guarantee, essay for sale, service agreement" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': 'Money-Back Promise',
              'url': 'https://proessayworks.com/money-back',
              'description': 'Learn about the ProEssayWorks money-back guarantee. We stand behind our essay writing services with a comprehensive refund policy for your peace of mind.'
            }),
          }}
        />
      </Head>
      <div className="max-w-4xl mx-auto py-4">
        <h1 className="text-3xl font-bold text-white mb-6">Money-Back Promise</h1>
        
        <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
          <div className="flex items-start">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2 text-black">Our Guarantee</h2>
              <p className="text-black">
                We stand behind the quality of our work. If you're not satisfied with our service, 
                we offer a comprehensive money-back guarantee.
              </p>
            </div>
          </div>
        </div>
        
        <div className="prose prose-indigo">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Refund Eligibility</h2>
            <p>
              Refunds may be requested under the following circumstances:
            </p>
            <ul className="list-disc pl-5">
              <li>Late delivery without prior notification</li>
              <li>Failure to follow specific instructions</li>
              <li>Plagiarism exceeding 15% (verified by plagiarism report)</li>
              <li>Quality issues that cannot be resolved through revisions</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Refund Process</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Submit a refund request within 30 days of order completion</li>
              <li>Provide detailed explanation and supporting evidence</li>
              <li>Our quality team will review within 3 business days</li>
              <li>If approved, refund will be processed within 10 business days</li>
            </ol>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Partial Refunds</h2>
            <p>
              In cases where the work is partially acceptable, we may offer partial refunds based on:
            </p>
            <ul className="list-disc pl-5">
              <li>The percentage of work meeting requirements</li>
              <li>Severity of quality issues</li>
              <li>Timeliness of delivery</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Non-Refundable Situations</h2>
            <p>
              Refunds are not available for:
            </p>
            <ul className="list-disc pl-5">
              <li>Change of mind after order completion</li>
              <li>Poor grades resulting from user's own submission choices</li>
              <li>Failure to request revisions before submission</li>
              <li>Violations of our terms of service</li>
            </ul>
          </section>
          
          <section className="mb-8 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">Important Note</h2>
            <p className="text-yellow-700">
              Our Money-Back Promise does not constitute permission to use our services for 
              dishonesty. We encourage ethical use of our materials as references and learning aids.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default MoneyBackPromisePage;