import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import EditBlogForm from './EditBlogForm'; // Import the EditBlogForm component

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [user, setUser] = useState(null); // Assuming you have a way to set the logged-in user
  const [isEditing, setIsEditing] = useState(false);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`);
      setBlog(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUser = async () => {
    try {
      // Assuming you have an endpoint to fetch the logged-in user's info
      const response = await axios.get('/api/users/me', { withCredentials: true });
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`/api/blogs/${id}/like`, {}, {
        withCredentials: true
      });
      fetchBlog(); // Refresh blog data after liking
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${id}`, {
        withCredentials: true
      });
      // Redirect or show a success message after deletion
      window.location.href = '/'; // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting blog:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchUser(); // Fetch user info when component mounts
  }, [id]);

  if (!blog || !user) return <div>Loading...</div>; // Ensure both blog and user are loaded

  const hasUserLiked = blog.likedBy.includes(user._id);
  const isOwner = blog.user._id === user._id;

  return (
    <div className="container">
      <h3>{blog.user.username}</h3>  
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <button onClick={handleLike} disabled={hasUserLiked}>
        {hasUserLiked ? 'Liked' : 'Like'} ({blog.like})
      </button>
      {isOwner && ( // Show edit and delete buttons if user is the blog owner
        <>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel Edit' : 'Edit'}
          </button>
          {isEditing && (
            <EditBlogForm blog={blog} fetchBlog={fetchBlog} setIsEditing={setIsEditing} />
          )}
          <button onClick={handleDelete} className="delete-button">
            Delete Blog
          </button>
        </>
      )}
      {!isEditing && (
        <div className="comment-section">
          <h3>Comments</h3>
          {blog.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.content}</p>
              <small>by {comment.user.username}</small>
            </div>
          ))}
          <CommentForm blogId={id} fetchBlog={fetchBlog} />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
