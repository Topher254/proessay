import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import sanityClient from '../../sanityClient';
import { PortableText } from '@portabletext/react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function estimateReadTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200)); // 200 wpm average
}

// Helper to extract headings from PortableText blocks
function extractHeadings(blocks) {
  if (!blocks) return [];
  return blocks
    .filter(block => block._type === 'block' && /^h[2-4]$/.test(block.style))
    .map(block => ({
      text: block.children.map(child => child.text).join(' '),
      level: parseInt(block.style.replace('h', ''), 10),
      key: block._key,
    }));
}

// Custom PortableText component to add anchors to headings
const PortableTextWithAnchors = ({ value }) => {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h2: ({ children, node }) => {
            const id = node._key;
            return <h2 id={id} className="scroll-mt-32">{children}</h2>;
          },
          h3: ({ children, node }) => {
            const id = node._key;
            return <h3 id={id} className="scroll-mt-32">{children}</h3>;
          },
          h4: ({ children, node }) => {
            const id = node._key;
            return <h4 id={id} className="scroll-mt-32">{children}</h4>;
          },
        },
      }}
    />
  );
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        publishedAt,
        body,
        mainImage{
          asset->{_id, url}
        },
        author->{name, image},
        excerpt
      }`,
      { slug }
    ).then(setPost);
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  // Estimate read time from body text
  const plainText = post.body ? post.body.map(block => block.children ? block.children.map(child => child.text).join(' ') : '').join(' ') : '';
  const readTime = estimateReadTime(plainText);

  // Social share URLs
  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(post.title);

  // Extract TOC headings
  const toc = extractHeadings(post.body);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb and Back Link */}
          <div className="pt-8 flex items-center gap-4">
            <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>
          </div>
          {/* Hero Section */}
          {post.mainImage?.asset?.url && (
            <div className="h-64 md:h-96 w-full overflow-hidden mt-4 rounded-2xl">
              <img
                src={post.mainImage.asset.url}
                alt={post.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}
          <div className="py-8">
            {/* Title and Meta */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
              <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
            {/* TOC just below title/meta */}
            {toc.length > 0 && (
              <div className="mb-8 bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                <h3 className="text-md font-bold text-gray-900 mb-2">Table of Contents</h3>
                <ul className="space-y-2 text-sm">
                  {toc.map(item => (
                    <li key={item.key} className={`pl-${(item.level - 2) * 4}`}>
                      <a
                        href={`#${item.key}`}
                        className="text-indigo-700 hover:underline block truncate"
                        onClick={e => {
                          e.preventDefault();
                          const el = document.getElementById(item.key);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Content */}
            <article className="prose prose-indigo max-w-none mb-12">
              <PortableTextWithAnchors value={post.body} />
            </article>
            {/* Call to Action */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center mb-12">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Need help with your essay?</h2>
              <p className="text-gray-700 mb-4">Get expert writing assistance from ProEssayWorks. Our team is ready to help you succeed!</p>
              <Link to="/gethelp" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors">Order Now</Link>
            </div>
            {/* Related Posts Placeholder */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Related posts can be fetched and rendered here in the future */}
                <div className="bg-gray-100 rounded-xl p-6 text-gray-400 text-center">Coming soon...</div>
                <div className="bg-gray-100 rounded-xl p-6 text-gray-400 text-center">Coming soon...</div>
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-16 self-start">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-700 mr-4 overflow-hidden">
                {post.author?.image?.asset?.url
                  ? <img src={post.author.image.asset.url} alt={post.author.name} className="w-12 h-12 rounded-full object-cover" />
                  : (post.author?.name ? post.author.name[0] : 'A')}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.author?.name || 'ProEssayWorks Team'}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            {/* Meta Info */}
            <div className="mb-6 text-sm text-gray-500">
              <div>Published: {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</div>
              <div>Read time: {readTime} min</div>
            </div>
            {/* Social Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-500 text-sm">Share:</span>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-indigo-700 hover:text-indigo-900">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            {/* Sidebar CTA */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center">
              <h4 className="font-semibold text-indigo-800 mb-2">Need urgent help?</h4>
              <Link to="/gethelp" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors">Order Now</Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogPostPage;