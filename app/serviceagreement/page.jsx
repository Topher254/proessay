"use client";

import Head from "next/head";

const ServiceAgreementPage = () => {
  return (
    <>
      <Head>
        <title>Service Agreement | American Academic Consulting Group</title>
        <meta name="description" content="Read the American Academic Consulting Group Service Agreement. Understand the terms and conditions for using our essay writing and academic support services." />
        <meta property="og:title" content="Service Agreement | American Academic Consulting Group" />
        <meta property="og:description" content="Read the American Academic Consulting Group Service Agreement. Understand the terms and conditions for using our essay writing and academic support services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://American Academic Consulting Group.com/service-agreement" />
        <meta name="keywords" content="service agreement, terms, conditions, refund, money back" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': 'Service Agreement',
              'url': 'https://American Academic Consulting Group.com/service-agreement',
              'description': 'Read the American Academic Consulting Group Service Agreement. Understand the terms and conditions for using our essay writing and academic support services.'
            }),
          }}
        />
      </Head>
      <div className="max-w-4xl mx-auto text-white w-full px-4 py-8 sm:rounded-xl sm:shadow-md sm:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Service Agreement</h1>
        
        <div className="prose prose-indigo">
          <p className="text-gray-600 mb-4">Last updated: June 14, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p>
              By using American Academic Consulting Group services, you agree to be bound by these Terms of Service. 
              This agreement constitutes a legally binding contract between you and American Academic Consulting Group.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Services Provided</h2>
            <p>
              American Academic Consulting Group provides custom academic writing services including but not limited to:
            </p>
            <ul className="list-disc pl-5">
              <li>Essay writing</li>
              <li>Research papers</li>
              <li>Dissertations and theses</li>
              <li>Editing and proofreading</li>
              <li>Citation and formatting assistance</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
            <p>
              Users agree to provide accurate and complete information when placing orders. 
              American Academic Consulting Group services are for research and reference purposes only. 
              Users are solely responsible for how they utilize the materials provided.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Payment Terms</h2>
            <p>
              All payments must be made in full before work begins. We accept major credit cards 
              and PayPal. Prices are determined based on academic level, deadline, and complexity.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Revision Policy</h2>
            <p>
              Free revisions are available within 14 days of order completion, provided the revision 
              request aligns with the original instructions. Major changes to requirements may incur 
              additional charges.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Copyright</h2>
            <p>
              All original work remains the property of American Academic Consulting Group until full payment is received. 
              Upon complete payment, users receive a non-exclusive license to use the material.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default ServiceAgreementPage;