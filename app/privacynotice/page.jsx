"use client";

import Head from "next/head";

const PrivacyNoticePage = () => {
  return (
    <>
      <Head>
        <title>Privacy Notice | ProEssayWorks</title>
        <meta name="description" content="Read the ProEssayWorks Privacy Notice. Learn how we protect your personal data and privacy when you use our essay writing and academic services." />
        <meta property="og:title" content="Privacy Notice | ProEssayWorks" />
        <meta property="og:description" content="Read the ProEssayWorks Privacy Notice. Learn how we protect your personal data and privacy when you use our essay writing and academic services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/privacy" />
        <meta name="keywords" content="privacy, data protection, plagiarism checker, personal information" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'PrivacyPolicy',
              'name': 'Privacy Notice',
              'url': 'https://proessayworks.com/privacy',
              'description': 'Read the ProEssayWorks Privacy Notice. Learn how we protect your personal data and privacy when you use our essay writing and academic services.'
            }),
          }}
        />
      </Head>
      <div className="max-w-4xl mx-auto text-white w-full px-4 py-8 sm:rounded-xl sm:shadow-md sm:p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Notice</h1>
        
        <div className="prose prose-indigo">
          <p className="text-gray-600 mb-4">Effective date: June 14, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p>
              We collect personal information when you register, place an order, or contact us. 
              This may include:
            </p>
            <ul className="list-disc pl-5">
              <li>Name and contact information</li>
              <li>Academic institution and level</li>
              <li>Payment information</li>
              <li>Order details and requirements</li>
              <li>Communication history</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. How We Use Information</h2>
            <p>
              We use your information to:
            </p>
            <ul className="list-disc pl-5">
              <li>Process and fulfill your orders</li>
              <li>Communicate about your orders</li>
              <li>Improve our services</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
            <p>
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-5">
              <li>SSL encryption for data transmission</li>
              <li>Secure payment processing</li>
              <li>Restricted access to personal data</li>
              <li>Regular security audits</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary for business purposes or as 
              required by law. Order details are kept for 7 years for tax and compliance purposes.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-5">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to certain processing activities</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Changes to This Notice</h2>
            <p>
              We may update this Privacy Notice periodically. Significant changes will be communicated 
              through our website or directly to users.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyNoticePage;