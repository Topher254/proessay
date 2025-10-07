import Image from 'next/image';


const FeaturedPost = ({ post, onClick }) => {
  // Use the actual featured image if available, otherwise fallback
  const imageUrl = post.mainImage?.asset?.url || '/research.png';
  return (
    <div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="md:flex">
        {/* Featured image */}
        <div className="md:w-2/5 bg-gradient-to-r from-indigo-500 to-purple-600 min-h-64 md:min-h-96 relative">
          <Image
            src={imageUrl}
            alt={post.title + ' - Featured academic blog post image'}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="p-8 md:w-3/5">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Featured
            </span>
            <span className="ml-3 text-sm text-gray-500">{post.readTime}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-black mb-4 hover:text-black transition-colors">
            {post.title}
          </h2>
          
          <p className="text-lg text-black mb-6">{post.excerpt}</p>
          
          <div className="flex items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-900">{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;