import React, { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Subscribing email:', email);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated with Academic Insights</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter and receive the latest writing tips, research strategies, and academic resources directly to your inbox.
      </p>
      
      {subscribed ? (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium">Thank you for subscribing!</p>
          <p>Check your email for our welcome message.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md border border-gray-300 text-black placeholder:text-gray-500"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
      
      <p className="text-xs text-gray-500 mt-4">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterSignup;