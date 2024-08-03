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
- **POST /api/blogs/:id**: Like a blog post by ID.

  ### Frontend

- 1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git


- 2. Navigate to the frontend directory:

   ```bash
  cd YOUR_REPOSITORY/frontend
   
- 3. Install dependencies:

   ```bash
   npm install

- 4. Start the development server

  ```bash
  npm run dev

The frontend will be available at http://localhost:5173.

# Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd YOUR_REPOSITORY/backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the backend directory and add the necessary environment variables:**

    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=30d
    ```

4. **Start the server:**

    ```bash
    npm start
    ```

The backend will be available at [http://localhost:3000](http://localhost:3000).

  

