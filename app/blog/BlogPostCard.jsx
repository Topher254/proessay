import React from 'react';
import Link from 'next/link';

const BlogPostCard = ({ post, onClick }) => {
  // Map image names to CSS classes
  const imageClasses = {
    'research-paper': 'bg-gradient-to-r from-indigo-400 to-indigo-500',
    'apa-guide': 'bg-gradient-to-r from-green-400 to-teal-500',
    'assignments': 'bg-gradient-to-r from-yellow-400 to-orange-500',
    'proofreading': 'bg-gradient-to-r from-purple-400 to-pink-500',
    'thesis': 'bg-gradient-to-r from-red-400 to-pink-500',
    'ethics': 'bg-gradient-to-r from-indigo-400 to-purple-500',
  };
  
  // Map categories to colors
  const categoryColors = {
    'writing-tips': 'bg-indigo-100 text-indigo-800',
    'research': 'bg-green-100 text-green-800',
    'citation': 'bg-yellow-100 text-yellow-800',
    'study-skills': 'bg-purple-100 text-purple-800',
    'career': 'bg-red-100 text-red-800',
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {/* Show image if available */}
      {post.mainImage?.asset?.url && (
        <img src={post.mainImage.asset.url} alt={post.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
        <p className="text-xs text-gray-500 mb-4">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</p>
        <Link
          href={`/blog/post/${post.slug.current}`}
          className="mt-auto inline-flex items-center text-indigo-600 font-semibold hover:underline group"
          onClick={e => e.stopPropagation()}
        >
          Learn More
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;