import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBlogForm.css'; // Import the CSS file

const CreateBlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setTitle('');
      setContent('');
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setContent(newTitle);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const blogData = {
      title,
      content,
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/blogs', blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Blog created successfully:', response.data);
    } catch (error) {
      console.error('Error creating blog:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-blog-form">
      <div className="form-group">
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Content"
          required
          className="form-input"
        ></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="submit-button">
        {isSubmitting ? 'Creating...' : 'Create Blog'}
      </button>
    </form>
  );
};

export default CreateBlogForm;
