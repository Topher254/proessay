"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebook, FaTwitter, FaLinkedin, FaArrowLeft } from 'react-icons/fa';

const WP_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/posts';

function estimateReadTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();
  
  const [post, setPost] = useState(null);
  const [cleanContent, setCleanContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${WP_API}?slug=${slug}&_embed=1`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch post: ${res.status}`);
        }
        
        const data = await res.json();

        if (data && data.length > 0) {
          const p = data[0];
          let content = p.content?.rendered || '';

          // Enhanced content cleaning
          const cleaned = content
            .replace(/color\s*:\s*#[0-9a-fA-F]{3,6}/gi, 'color: #111827')
            .replace(/color\s*:\s*rgba?\([^)]+\)/gi, 'color: #111827')
            .replace(/<span[^>]*style="[^"]*"[^>]*>/gi, '<span>')
            .replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>')
            .replace(/<div[^>]*style="[^"]*"[^>]*>/gi, '<div>')
            .replace(/opacity\s*:\s*[0-9.]+/gi, '')
            .replace(/filter\s*:\s*[^;"]*;?/gi, '')
            .replace(/style="[^"]*"/gi, '')
            .replace(/class="[^"]*"/gi, '');

          setPost(p);
          setCleanContent(cleaned);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        console.error('Failed to load post:', err);
        setError(err.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Post</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/blog')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h2>
          <button
            onClick={() => router.push('/blog')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Clean text for read-time estimation
  const plainText = cleanContent.replace(/<[^>]+>/g, '') || '';
  const readTime = estimateReadTime(plainText);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(post.title?.rendered || '');

  // Featured image
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/default-blog.jpg';

  // Author name
  const author =
    post._embedded?.author?.[0]?.name || 'ProEssayWorks Team';

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{post.title.rendered} | ProEssayWorks Blog</title>
        <meta 
          name="description" 
          content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 160) || `Read "${post.title.rendered}" on ProEssayWorks.`} 
        />
        <meta property="og:title" content={post.title.rendered} />
        <meta property="og:description" content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '').substring(0, 160) || ''} />
        <meta property="og:image" content={featuredImage} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Back to Blog */}
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <button 
                onClick={() => router.push('/blog')}
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group"
              >
                <FaArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </button>
            </div>

            {/* Hero Image */}
            {featuredImage && (
              <div className="mt-4 w-full overflow-hidden">
                <img
                  src={featuredImage}
                  alt={post.title.rendered}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover object-center"
                  onError={(e) => {
                    e.target.src = '/default-blog.jpg';
                  }}
                />
              </div>
            )}

            <div className="px-6 sm:px-8 py-8">
              {/* Title & Meta */}
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
              
              <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-3">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {author}
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(post.date)}
                </span>
                <span>•</span>
                <span className="flex items-center bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readTime} min read
                </span>
              </div>

              {/* Blog Content */}
              <article className="prose prose-lg max-w-none mb-12">
                <div 
                  className="text-gray-800 leading-relaxed space-y-6"
                  style={{
                    color: '#1a202c',
                    fontSize: '1.125rem',
                    lineHeight: '1.75'
                  }}
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                />
              </article>

              {/* Social Share Buttons */}
              <div className="border-t border-gray-200 pt-8 mb-12">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <span className="text-gray-700 font-medium">Share this article:</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                      <FaTwitter className="w-4 h-4" />
                      Twitter
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <FaFacebook className="w-4 h-4" />
                      Facebook
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-3">Need help with your essay?</h2>
                <p className="text-indigo-100 mb-6 text-lg">
                  Get expert writing assistance from ProEssayWorks. Our team is ready to help you succeed!
                </p>
                <button
                  onClick={() => router.push('/gethelp')}
                  className="inline-flex items-center justify-center bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg shadow-lg transition-colors"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Author Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white mr-4">
                    {author ? author.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{author}</p>
                    <p className="text-sm text-gray-600">Content Writer</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Expert writer at ProEssayWorks, dedicated to helping students achieve academic success through quality writing.
                </p>
              </div>

              {/* Meta Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Article Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Published</span>
                    <span className="font-medium text-gray-900">{formatDate(post.date)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Reading time</span>
                    <span className="font-medium text-gray-900">{readTime} min</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">
                      {post._embedded?.['wp:term']?.[0]?.[0]?.name || 'General'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-center text-white">
                <h4 className="font-bold text-lg mb-2">Need urgent help?</h4>
                <p className="text-indigo-100 text-sm mb-4">
                  24/7 support available for urgent assignments
                </p>
                <button
                  onClick={() => router.push('/gethelp')}
                  className="inline-block w-full bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  Get Help Now
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}