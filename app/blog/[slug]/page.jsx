"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';

const WP_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/posts';
const WP_MEDIA_API = 'https://proessayworks.com/myblog/wp-json/wp/v2/media/';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    fetch(`${WP_API}?slug=${slug}`)
      .then(res => res.json())
      .then(async data => {
        if (data && data.length > 0) {
          setPost(data[0]);
          if (data[0].featured_media) {
            // Fetch the featured image URL
            const mediaRes = await fetch(`${WP_MEDIA_API}${data[0].featured_media}`);
            const mediaData = await mediaRes.json();
            setFeaturedImage(mediaData.source_url);
          }
        }
      });
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  const plainText = post.content?.rendered?.replace(/<[^>]+>/g, '') || '';
  const readTime = Math.max(1, Math.round(plainText.split(/\s+/).length / 200));

  return (
    <>
      <Head>
        <title>{post.title.rendered} | ProEssayWorks Blog</title>
        <meta name="description" content={post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || ''} />
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => router.back()} className="text-indigo-600 hover:underline mb-4">&larr; Back to Blog</button>
          {featuredImage && (
            <img src={featuredImage} alt={post.title.rendered} className="w-full h-80 object-cover rounded-2xl mb-8" />
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
            {post.title.rendered}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
            <span>{post.date ? new Date(post.date).toLocaleDateString() : ''}</span>
            <span>•</span>
            <span>{readTime} min read</span>
          </div>
          <article className="prose prose-indigo max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </main>
    </>
  );
}
