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
  const router = useRouter();

  useEffect(() => {
    fetch(WP_API)
      .then(res => res.json())
      .then(async data => {
        // Fetch featured images for each post
        const postsWithImages = await Promise.all(data.map(async post => {
          let imageUrl = '';
          if (post.featured_media) {
            try {
              const mediaRes = await fetch(`https://proessayworks.com/myblog/wp-json/wp/v2/media/${post.featured_media}`);
              const mediaData = await mediaRes.json();
              imageUrl = mediaData.source_url;
            } catch (e) {}
          }
          return {
            _id: post.id,
            title: post.title.rendered,
            slug: { current: post.slug },
            publishedAt: post.date,
            excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
            mainImage: { asset: { url: imageUrl } },
          };
        }));
        setPosts(postsWithImages);
      });
  }, []);

  // Handle post click
  const handlePostClick = (slug) => {
    router.push(`/blog/${slug}`);
  };

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
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Academic Insights Blog
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto">
              Expert advice, writing tips, and research strategies to elevate your academic performance
            </p>
          </header>
          <section className="mb-16" aria-label="Featured Blog Post">
            {posts[0] && (
              <FeaturedPost 
                post={posts[0]}
                onClick={() => handlePostClick(posts[0].slug.current)} 
              />
            )}
          </section>
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
              selectedCategory="all"
              onCategoryChange={() => {}} 
            />
          </nav>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" aria-label="Blog Posts">
            {posts.map((post) => (
              <BlogPostCard 
                key={post._id}
                post={post}
                onClick={() => handlePostClick(post.slug.current)}
              />
            ))}
          </section>
          <section className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto" aria-label="Newsletter Signup">
            <NewsletterSignup />
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogHomePage;