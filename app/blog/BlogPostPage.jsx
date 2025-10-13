import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

const WP_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/posts';

function estimateReadTime(text) {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200)); // 200 wpm average
}

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [cleanContent, setCleanContent] = useState('');

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${WP_API}?slug=${slug}&_embed`);
        const data = await res.json();

        if (data && data.length > 0) {
          const p = data[0];
          let content = p.content?.rendered || '';

          // 🔹 Clean faded inline styles
          const cleaned = content
            .replace(/color\s*:\s*#[0-9a-fA-F]{3,6}/gi, 'color:#111827')
            .replace(/color\s*:\s*rgba?\([^)]+\)/gi, 'color:#111827')
            .replace(/<span[^>]*style="[^"]*"[^>]*>/gi, '<span>')
            .replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>')
            .replace(/opacity\s*:\s*[0-9.]+/gi, '') // Remove opacity styles
            .replace(/filter\s*:\s*[^;"]*;?/gi, ''); // Remove CSS filters

          setPost(p);
          setCleanContent(cleaned);
        }
      } catch (err) {
        console.error('Failed to load post:', err);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) return <div className="min-h-screen flex justify-center items-center text--600">Loading...</div>;

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{post.title.rendered} | ProEssayWorks Blog</title>
        <meta name="description" content={`Read "${post.title.rendered}" on ProEssayWorks.`} />
      </Head>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl shadow p-4 md:p-8">
          {/* Back to Blog */}
          <div className="pt-8 flex items-center gap-4">
            <Link href="/blog" className="text-red-600 hover:text-indigo-800 text-sm font-medium flex items-center">
             <ArrowLeft/>
              Back to Blog
            </Link>
          </div>

          {/* Hero Image */}
          {featuredImage && (
            <div className="h-64 md:h-96 w-full overflow-hidden mt-4 rounded-2xl">
              <img
                src={featuredImage}
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
              <span className='bg-red-500 text-red-600'>{readTime} min read</span>
            </div>

            {/* Blog Content */}
            <article
              className="max-w-none mb-12  text-[1.05rem] leading-7 space-y-5 bg-white text-red-500 rounded-xl shadow p-6"
              style={{
                color: '#1a202c', // Tailwind gray-900
                background: 'white',
                WebkitTextFillColor: '#1a202c',
                msTextFillColor: '#1a202c',
              }}
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />

            {/* Call to Action */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center mb-12">
              <h2 className="text-xl font-bold text-indigo-800 mb-2">Need help with your essay?</h2>
              <p className="text-gray-700 mb-4">
                Get expert writing assistance from{' '}
                <a href="https://proessayworks.com" className="text-indigo-700 font-semibold">
                  ProEssayWorks
                </a>. Our team is ready to help you succeed!
              </p>
              <Link
                href="/gethelp"
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
                {author ? author[0] : 'A'}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="mb-6 text-sm text-gray-500">
              <div>Published: {post.date ? new Date(post.date).toLocaleDateString() : ''}</div>
              <div>Read in: {readTime} min</div>
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
                href="/gethelp"
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
}
