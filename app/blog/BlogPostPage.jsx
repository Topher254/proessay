import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const WP_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/posts';

function estimateReadTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200)); // 200 wpm average
}

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [cleanContent, setCleanContent] = useState('');

  useEffect(() => {
    fetch(`${WP_API}?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const content = data[0].content.rendered;

          // Clean inline color styles that make text faded
          const cleaned = content
            .replace(/color\s*:\s*#[0-9a-fA-F]{3,6}/gi, 'color:#111827') // Replace light hex colors
            .replace(/color\s*:\s*rgba?\([^)]+\)/gi, 'color:#111827') // Replace rgba values
            .replace(/<span[^>]*style="[^"]*"[^>]*>/gi, '<span>') // Remove inline span styles
            .replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>'); // Remove inline p styles

          setPost(data[0]);
          setCleanContent(cleaned);
        }
      });
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  const plainText = cleanContent.replace(/<[^>]+>/g, '') || '';
  const readTime = estimateReadTime(plainText);
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title.rendered);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{post.title.rendered} | ProEssayWorks Blog</title>
        <meta name="description" content={`Read "${post.title.rendered}" on ProEssayWorks`} />
      </Helmet>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl shadow p-4 md:p-8">
          {/* Back to Blog */}
          <div className="pt-8 flex items-center gap-4">
            <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Hero Image */}
          {post.featured_media_url && (
            <div className="h-64 md:h-96 w-full overflow-hidden mt-4 rounded-2xl">
              <img
                src={post.featured_media_url}
                alt={post.title.rendered}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <div className="py-8">
            {/* Title & Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {post.title.rendered}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>

            {/* Blog Content (prose removed, custom readable styles added) */}
            <article
              className="max-w-none mb-12 text-gray-900 text-[1.05rem] leading-7 space-y-5"
              style={{
                color: '#111827',
                fontSize: '1.05rem',
                lineHeight: '1.75rem',
                filter: 'none',
                opacity: 1,
                background: 'transparent',
              }}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            {/* Call to Action */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center mb-12">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Need help with your essay?</h2>
              <p className="text-gray-700 mb-4">
                Get expert writing assistance from{' '}
                <a href="https://proessayworks.com" className="text-indigo-700 font-semibold">ProEssayWorks</a>.
                Our team is ready to help you succeed!
              </p>
              <Link
                to="/gethelp"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-16 self-start">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700 mr-4 overflow-hidden">
                {post.author?.name ? post.author.name[0] : 'A'}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.author?.name || 'ProEssayWorks Team'}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="mb-6 text-sm text-gray-500">
              <div>Published: {post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
              <div>Read time: {readTime} min</div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-500 text-sm">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-600"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-700 hover:text-indigo-900"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Sidebar CTA */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <h4 className="font-semibold text-indigo-800 mb-2">Need urgent help?</h4>
              <Link
                to="/gethelp"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors"
              >
                Order Now
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogPostPage;
