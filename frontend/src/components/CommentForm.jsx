import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ blogId, fetchBlog }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/comments/${blogId}`, { content }, {
        withCredentials: true
      });
      setContent('');
      fetchBlog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Add a comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
