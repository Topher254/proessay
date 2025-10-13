"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import BlogPostCard from './BlogPostCard';
import BlogCategoryFilter from './BlogCategoryFilter';
import NewsletterSignup from './NewsletterSignup';
import FeaturedPost from './FeaturedPost';

const WP_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/posts';

const BlogHomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [clickedPostId, setClickedPostId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`${WP_API}?per_page=12&_embed=1`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();

        if (!data || data.length === 0) {
          throw new Error('No blog posts found');
        }

        // Fetch featured images for each post
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            let imageUrl = '';
            if (post.featured_media) {
              try {
                const mediaRes = await fetch(
                  `https://proessayworks.com/myblog/wp-json/wp/v2/media/${post.featured_media}`
                );
                if (mediaRes.ok) {
                  const mediaData = await mediaRes.json();
                  imageUrl = mediaData.source_url;
                }
              } catch (e) {
                console.warn('Failed to fetch media for post:', post.id, e);
              }
            }
            
            return {
              _id: post.id,
              title: post.title.rendered,
              slug: { current: post.slug },
              publishedAt: post.date,
              excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, '').substring(0, 150) + '...',
              mainImage: { asset: { url: imageUrl } },
              category: post.categories?.[0] || 'general',
              author: post._embedded?.author?.[0]?.name || 'ProEssayWorks Team'
            };
          })
        );
        
        setPosts(postsWithImages);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to load blog posts. Please check your WordPress API endpoint.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle post click with red background effect
  const handlePostClick = (slug, postId) => {
    setClickedPostId(postId);
    // Navigate after a short delay to show the red background
    setTimeout(() => {
      router.push(`/blog/${slug}`);
    }, 300);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    // Filter logic would go here in a real implementation
    console.log('Filtering by category:', categoryId);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading blog posts...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the latest articles</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Blog Posts</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-gray-500 text-sm mb-6">
            This could be due to network issues or problems with the WordPress API.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Academic Insights Blog | Essay Writing Tips & Research Help</title>
        <meta name="description" content="Expert essay writing tips, research strategies, and academic advice to help students excel. Explore our blog for the latest in academic writing and study skills." />
        <meta property="og:title" content="Academic Insights Blog | Essay Writing Tips & Research Help" />
        <meta property="og:description" content="Expert essay writing tips, research strategies, and academic advice to help students excel. Explore our blog for the latest in academic writing and study skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://proessayworks.com/blog" />
        <meta name="keywords" content="writing tips, research paper writing, dissertation proposal writing service, pay for thesis, argumentative essay writing service, expository essay writing service, analytical essay writing service, essay for sale" />
      </Head>
      
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Academic Insights Blog
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Expert advice, writing tips, and research strategies to elevate your academic performance
            </p>
          </header>

          {/* Featured Post */}
          <section className="mb-16" aria-label="Featured Blog Post">
            {posts[0] && (
              <FeaturedPost 
                post={posts[0]}
                isClicked={clickedPostId === posts[0]._id}
                onClick={() => handlePostClick(posts[0].slug.current, posts[0]._id)} 
              />
            )}
          </section>

          {/* Category Filter */}
          <nav className="mb-12" aria-label="Blog Categories">
            <BlogCategoryFilter 
              categories={[
                { id: 'all', name: 'All Topics' },
                { id: 'writing-tips', name: 'Writing Tips' },
                { id: 'research', name: 'Research Methods' },
                { id: 'citation', name: 'Citation Guides' },
                { id: 'study-skills', name: 'Study Skills' },
                { id: 'career', name: 'Career Advice' },
              ]} 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange} 
            />
          </nav>

          {/* Blog Posts Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-label="Blog Posts">
            {posts.slice(1).map((post) => (
              <BlogPostCard 
                key={post._id}
                post={post}
                isClicked={clickedPostId === post._id}
                onClick={() => handlePostClick(post.slug.current, post._id)}
              />
            ))}
          </section>

          {/* Empty State */}
          {posts.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Blog Posts Found</h3>
              <p className="text-gray-600">Check back later for new articles and updates.</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <section className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto" aria-label="Newsletter Signup">
            <NewsletterSignup />
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogHomePage;