const FeaturedPost = ({ post, onClick, isClicked }) => {
  const imageUrl = post.mainImage?.asset?.url || '/research.png';
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isClicked ? 'bg-red-50 border-2 border-red-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="md:flex">
        {/* Featured image */}
        <div className="md:w-2/5 min-h-64 md:min-h-96 relative">
          <img
            src={imageUrl}
            alt={post.title + ' - Featured academic blog post image'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/research.png';
            }}
          />
        </div>
        
        <div className="p-8 md:w-3/5">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Featured
            </span>
            <span className="ml-3 text-sm text-gray-500">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-indigo-600 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold mr-3">
                {post.author ? post.author.charAt(0) : 'P'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">ProEssayWorks Team</p>
                <p className="text-sm text-gray-500">Expert Writers</p>
              </div>
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Read Full Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;