import React from "react";
import BlogDetails from "../components/BlogDetails";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();

  return (
    <div>
      <BlogDetails id={id} />
    </div>
  );
};

export default BlogPage;
