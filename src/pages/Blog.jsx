import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';
import PushNotificationButton from '../components/PushNotificationButton';

const Blog = () => {
  const { posts, searchPosts, getPostsByTag, getAllTags } = useBlog();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const publishedPosts = posts.filter(post => post.published);
  const tags = getAllTags();

  const filteredPosts = searchQuery
    ? searchPosts(searchQuery)
    : selectedTag
    ? getPostsByTag(selectedTag)
    : publishedPosts;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Thoughts, insights, and tutorials about web development, programming, 
            and technology trends from my journey as a developer.
          </p>
        </div>

        {/* Push Notification Settings */}
        <div className="mb-12">
          <PushNotificationButton />
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedTag('');
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value);
              setSearchQuery('');
            }}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  {post.readingTime} min read
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <button onClick={() => navigate(`/blog/${post.slug}`)}>
                    {post.title}
                  </button>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-full cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors duration-200"
                      onClick={() => {
                        setSelectedTag(tag);
                        setSearchQuery('');
                      }}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <button
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Read more →
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No articles found matching your search criteria.
            </p>
          </div>
        )}

        {/* Popular Tags */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Topics
          </h2>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;