import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import './Homepage.css';
import CreateBlogForm from '../components/CreateBlogForm';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="nav-links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </nav>
      </header>
      <h1>Home Page</h1>
      <CreateBlogForm/>
      <BlogList />
    </div>
  );
};

export default HomePage;
