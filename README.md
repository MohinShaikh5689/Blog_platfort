# Blog Management System

A full-stack blog management application with features for creating, editing, liking, and deleting blog posts. The application uses the MERN stack (MongoDB, Express, React, Node.js) and includes user authentication and authorization.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Blog Management**: Users can create, edit, like, and delete blog posts.
- **Comments**: Users can add comments to blog posts.
- **Likes**: Users can like blog posts.
- **Protected Routes**: Only the owner of a blog post can edit or delete it.

## Technologies

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Custom CSS

# Usage

## Frontend

- **Homepage**: View a list of all blog posts.
- **Blog Page**: View details of a single blog post, including comments and like options.
- **Create Blog**: Use the form to create a new blog post.
- **Edit Blog**: If you are the owner, you can edit or delete your blog posts.

## Backend Endpoints

- **POST /api/users/signup**: Create a new user.
- **POST /api/users/login**: Log in and receive a JWT token.
- **GET /api/users/me**: Get the current logged-in user’s details.
- **POST /api/blogs**: Create a new blog post.
- **GET /api/blogs/:id**: Get a blog post by ID.
- **PATCH /api/blogs/:id**: Update a blog post by ID.
- **DELETE /api/blogs/:id**: Delete a blog post by ID.
- **POST /api/blogs/:id/like**: Like a blog post by ID.

- 1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
