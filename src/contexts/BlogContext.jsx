import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const BlogContext = createContext(undefined);

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

// Sample blog posts for demonstration
const samplePosts = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React and Node.js',
    slug: 'building-modern-web-applications',
    content: `# Building Modern Web Applications with React and Node.js

In today's rapidly evolving web development landscape, creating robust and scalable applications requires a solid understanding of modern technologies and best practices. This comprehensive guide will walk you through the process of building a full-stack web application using React for the frontend and Node.js for the backend.

## Getting Started with the MERN Stack

The MERN stack (MongoDB, Express.js, React, Node.js) has become one of the most popular choices for web development due to its flexibility and JavaScript-centric approach. Let's explore each component:

### Frontend with React

React's component-based architecture makes it perfect for building interactive user interfaces. Here are some key concepts:

- **Components**: Reusable pieces of UI
- **State Management**: Managing application state with hooks
- **Routing**: Navigation between different views
- **Styling**: Modern CSS-in-JS or utility-first approaches

### Backend with Node.js

Node.js provides a powerful runtime for server-side JavaScript:

- **Express.js**: Fast and minimalist web framework
- **REST APIs**: Building scalable API endpoints
- **Authentication**: JWT and session management
- **Database Integration**: Working with MongoDB and other databases

## Best Practices for Modern Web Development

1. **Code Organization**: Maintain clean, modular code structure
2. **Error Handling**: Implement comprehensive error handling
3. **Testing**: Write unit and integration tests
4. **Performance**: Optimize for speed and user experience
5. **Security**: Follow security best practices

## Conclusion

Building modern web applications is an exciting journey that combines creativity with technical expertise. By following these principles and continuously learning, you'll be able to create applications that users love and businesses depend on.`,
    excerpt: 'A comprehensive guide to building modern web applications using React and Node.js, covering best practices and the MERN stack.',
    tags: ['React', 'Node.js', 'Web Development', 'JavaScript'],
    publishedAt: '2024-01-15',
    published: true,
    readingTime: 8
  },
  {
    id: '2',
    title: 'Mastering REST APIs and Database Design',
    slug: 'mastering-rest-apis-database-design',
    content: `# Mastering REST APIs and Database Design

Creating well-designed REST APIs and efficient database schemas is crucial for building scalable web applications. This article explores best practices and common patterns.

## REST API Design Principles

REST (Representational State Transfer) is an architectural style that defines constraints for creating web services. Here are the key principles:

### 1. Resource-Based URLs
- Use nouns, not verbs: \`/users\` instead of \`/getUsers\`
- Use plural nouns: \`/users\` instead of \`/user\`
- Nested resources: \`/users/123/posts\`

### 2. HTTP Methods
- **GET**: Retrieve data
- **POST**: Create new resources
- **PUT**: Update entire resource
- **PATCH**: Partial updates
- **DELETE**: Remove resources

### 3. Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request
- **401**: Unauthorized
- **404**: Not Found
- **500**: Server Error

## Database Design Best Practices

### Normalization
Organize data to reduce redundancy and improve data integrity:

1. **First Normal Form (1NF)**: Atomic values
2. **Second Normal Form (2NF)**: Full functional dependency
3. **Third Normal Form (3NF)**: Transitive dependency elimination

### Indexing
Strategic indexing improves query performance:
- Index frequently queried columns
- Composite indexes for multi-column queries
- Avoid over-indexing

### Relationships
- **One-to-One**: User profiles
- **One-to-Many**: User posts
- **Many-to-Many**: Users and roles

## Conclusion

Mastering REST APIs and database design is essential for building robust backend systems. Focus on consistency, performance, and maintainability.`,
    excerpt: 'Learn the fundamentals of REST API design and database architecture for building scalable backend systems.',
    tags: ['API', 'Database', 'Backend', 'REST'],
    publishedAt: '2024-01-10',
    published: true,
    readingTime: 6
  },
  {
    id: '3',
    title: 'Modern Authentication with JWT and Security Best Practices',
    slug: 'modern-authentication-jwt-security',
    content: `# Modern Authentication with JWT and Security Best Practices

Authentication is a critical component of modern web applications. This guide covers JSON Web Tokens (JWT) and essential security practices.

## Understanding JWT

JSON Web Tokens are a compact, URL-safe means of representing claims between two parties. They consist of three parts:

1. **Header**: Token type and signing algorithm
2. **Payload**: Claims and user data
3. **Signature**: Verification signature

### JWT Structure
\`\`\`
header.payload.signature
\`\`\`

## Implementation Best Practices

### 1. Secure Token Storage
- Use httpOnly cookies for web applications
- Implement proper token expiration
- Use refresh tokens for long-term sessions

### 2. Security Measures
- Always use HTTPS in production
- Implement rate limiting
- Validate all inputs
- Use environment variables for secrets

### 3. Role-Based Access Control
- Define clear user roles
- Implement middleware for authorization
- Use least privilege principle

## Common Security Vulnerabilities

### 1. XSS (Cross-Site Scripting)
- Sanitize user inputs
- Use Content Security Policy
- Escape HTML content

### 2. CSRF (Cross-Site Request Forgery)
- Use CSRF tokens
- Implement SameSite cookies
- Validate referer headers

### 3. SQL Injection
- Use parameterized queries
- Implement input validation
- Use ORM/ODM tools

## Conclusion

Security should be considered from the beginning of development. Regular security audits and staying updated with best practices are essential for protecting user data.`,
    excerpt: 'A comprehensive guide to implementing secure authentication with JWT and protecting your applications from common vulnerabilities.',
    tags: ['Authentication', 'Security', 'JWT', 'Web Security'],
    publishedAt: '2024-01-05',
    published: true,
    readingTime: 10
  }
];

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const { addBlogNotification } = useNotification();

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(samplePosts);
      localStorage.setItem('blogPosts', JSON.stringify(samplePosts));
    }
  }, []);

  const savePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
  };

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString().split('T')[0]
    };
    const newPosts = [...posts, newPost];
    savePosts(newPosts);
    
    // Show notification if post is published
    if (newPost.published) {
      addBlogNotification(newPost.title);
    }
  };

  const updatePost = (id, updatedPost) => {
    const existingPost = posts.find(post => post.id === id);
    const newPosts = posts.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    );
    savePosts(newPosts);
    
    // Show notification if post was just published
    if (existingPost && !existingPost.published && updatedPost.published) {
      addBlogNotification(updatedPost.title || existingPost.title);
    }
  };

  const deletePost = (id) => {
    const newPosts = posts.filter(post => post.id !== id);
    savePosts(newPosts);
  };

  const getPostBySlug = (slug) => {
    return posts.find(post => post.slug === slug && post.published);
  };

  const searchPosts = (query) => {
    return posts.filter(post => 
      post.published && (
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    );
  };

  const getPostsByTag = (tag) => {
    return posts.filter(post => 
      post.published && post.tags.includes(tag)
    );
  };

  const getAllTags = () => {
    const tags = new Set();
    posts.forEach(post => {
      if (post.published) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  };

  return (
    <BlogContext.Provider value={{
      posts,
      addPost,
      updatePost,
      deletePost,
      getPostBySlug,
      searchPosts,
      getPostsByTag,
      getAllTags
    }}>
      {children}
    </BlogContext.Provider>
  );
};