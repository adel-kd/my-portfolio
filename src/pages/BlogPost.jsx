import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import { useBlog } from '../contexts/BlogContext';

const BlogPost = () => {
  const { slug } = useParams();
  const { getPostBySlug } = useBlog();
  const navigate = useNavigate();

  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Blog
        </button>

        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString()}
              <Clock className="h-4 w-4 ml-6 mr-2" />
              {post.readingTime} min read
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br />').replace(/#{1,6}\s/g, match => {
                    const level = match.trim().length;
                    return `<h${level} class="text-${4-level}xl font-bold text-gray-900 dark:text-white mt-8 mb-4">`;
                  }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* This would be implemented with related posts logic */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Related articles will be shown here based on tags and content similarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;