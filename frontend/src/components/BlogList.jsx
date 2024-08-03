import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      setBlogs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
            <h5>Posted By {blog.user.username}</h5>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
          </Link>
          <p>{blog.content}</p>
          <p>Likes {blog.like}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
