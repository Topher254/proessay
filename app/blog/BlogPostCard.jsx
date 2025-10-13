const BlogPostCard = ({ post, onClick, isClicked }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col ${
        isClicked ? 'bg-red-50 border-2 border-red-200' : ''
      }`}
      onClick={onClick}
    >
      {/* Show image if available */}
      {post.mainImage?.asset?.url ? (
        <div className="h-48 overflow-hidden">
          <img
            src={post.mainImage.asset.url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div 
            className="hidden w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold"
          >
            {post.title.charAt(0)}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
          {post.title.charAt(0)}
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
            Read More
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;