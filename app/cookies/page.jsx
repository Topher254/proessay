import React from 'react';
import Head from "next/head";

const CookieNoticePage = () => {
  return (
    <>
      <Head>
        <title>Cookie Notice | ProEssayWorks</title>
        <meta name="description" content="Read the ProEssayWorks Cookie Notice. Learn how we use cookies to enhance your experience on our essay writing and academic support website." />
        <meta name="keywords" content="privacy, cookies, plagiarism checker, cookie policy" />
        <meta property="og:title" content="Cookie Notice | ProEssayWorks" />
        <meta property="og:description" content="Read the ProEssayWorks Cookie Notice. Learn how we use cookies to enhance your experience on our essay writing and academic support website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/cookies" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              'name': 'Cookie Notice',
              'url': 'https://proessayworks.com/cookies',
              'description': 'Read the ProEssayWorks Cookie Notice. Learn how we use cookies to enhance your experience on our essay writing and academic support website.'
            }),
          }}
        />
      </Head>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">Cookie Notice</h1>
        
        <div className="prose prose-indigo">
          <p className="text-gray-600 mb-4">Last updated: June 14, 2025</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. 
              They help websites remember information about your visit and preferences.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
            <p>
              We use cookies for:
            </p>
            <ul className="list-disc pl-5">
              <li>
                <strong>Essential Operations:</strong> Necessary for site functionality
              </li>
              <li>
                <strong>Preferences:</strong> Remembering your settings
              </li>
              <li>
                <strong>Analytics:</strong> Understanding how visitors use our site
              </li>
              <li>
                <strong>Marketing:</strong> Showing relevant advertising
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Session Cookies</td>
                    <td className="px-4 py-3">Maintain user session</td>
                    <td className="px-4 py-3">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Authentication Cookies</td>
                    <td className="px-4 py-3">Identify logged-in users</td>
                    <td className="px-4 py-3">Persistent (1 month)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Preference Cookies</td>
                    <td className="px-4 py-3">Remember user settings</td>
                    <td className="px-4 py-3">Persistent (1 year)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap">Analytics Cookies</td>
                    <td className="px-4 py-3">Track website usage</td>
                    <td className="px-4 py-3">Persistent (2 years)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-5">
              <li>See what cookies are stored</li>
              <li>Delete individual cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
            </ul>
            <p className="mt-4">
              Note: Disabling essential cookies may impact website functionality.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Cookies</h2>
            <p>
              We use services that may set cookies, including:
            </p>
            <ul className="list-disc pl-5">
              <li>Google Analytics for website statistics</li>
              <li>Advertising platforms for relevant ads</li>
              <li>Payment processors for transaction security</li>
            </ul>
            <p className="mt-4">
              These third parties have their own privacy policies.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default CookieNoticePage;