import React, { useState } from 'react';
import axios from 'axios';

const BlogForm = ({ fetchBlogs }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs', { title, content }, {
        withCredentials: true
      });
      setTitle('');
      setContent('');
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default BlogForm;
