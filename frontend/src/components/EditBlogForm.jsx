import React, { useState } from 'react';
import axios from 'axios';

const EditBlogForm = ({ blog, fetchBlog, setIsEditing }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.patch(`/api/blogs/${blog._id}`, { title, content }, {
        withCredentials: true
      });
      fetchBlog(); // Refresh blog data after editing
      setIsEditing(false); // Close the edit form
    } catch (error) {
      console.error('Error updating blog:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-blog-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Blog'}
      </button>
    </form>
  );
};

export default EditBlogForm;
