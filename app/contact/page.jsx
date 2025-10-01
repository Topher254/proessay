"use client";

import { useState } from 'react';
import Head from 'next/head';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();

    const mailtoLink = `mailto:admin@proessayWorks.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <>
      <Head>
        <title>Contact ProEssayWorks | Essay Writing Help</title>
        <meta name="description" content="Contact ProEssayWorks for expert essay writing, editing, and academic support. Reach us by email, phone, or WhatsApp for fast, friendly help." />
        <meta name="keywords" content="essay writing help, urgent homework, support, do my assignment, do my coursework, contact" />
        <meta property="og:title" content="Contact ProEssayWorks | Essay Writing Help" />
        <meta property="og:description" content="Contact ProEssayWorks for expert essay writing, editing, and academic support. Reach us by email, phone, or WhatsApp for fast, friendly help." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/contact" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ContactPage',
              'url': 'https://proessayworks.com/contact',
              'contactOption': [
                'https://proessayworks.com/',
                'mailto:admin@proessayWorks.com',
                'tel:+19149016306'
              ],
              'description': 'Contact ProEssayWorks for expert essay writing, editing, and academic support.'
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-indigo-100 via-indigo-300 to-indigo-200 py-12 px-4 flex items-center justify-center">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-indigo-800 mb-6">Get in Touch</h1>
            <div className="space-y-6 text-lg">
              <div>
                <span className="font-semibold text-indigo-700">Email:</span>
                <p className="text-gray-800">admin@proessayWorks.com</p>
              </div>
              <div>
                <span className="font-semibold text-indigo-700">Phone / WhatsApp:</span>
                <p className="text-gray-800">+1 (914) 901-6306</p>
              </div>
              <div>
                <span className="font-semibold text-indigo-700">Hours:</span>
                <p className="text-gray-800">All Days. Any Time</p>
                <p className="text-gray-600 text-sm">Feel free to talk to us</p>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleSend}>
              <div>
                <label htmlFor="name" className="block text-indigo-700 mb-1 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                  required
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-indigo-700 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-indigo-700 mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                  required
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-indigo-700 mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black placeholder:text-gray-500 bg-indigo-50"
                  required
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
