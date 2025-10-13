import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated with Academic Insights</h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Subscribe to our newsletter and receive the latest writing tips, research strategies, and academic resources directly to your inbox.
      </p>
      
      {subscribed ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium">Thank you for subscribing!</p>
          <p className="text-sm">Check your email for our welcome message.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500"
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`font-medium px-6 py-3 rounded-lg transition duration-300 whitespace-nowrap ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subscribing...
              </div>
            ) : (
              'Subscribe'
            )}
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