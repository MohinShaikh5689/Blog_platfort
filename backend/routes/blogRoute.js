import express from 'express';
import { createBlog, getBlogs, editBlog, deleteBlog, getBlogById, likeBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/')
    .post(protect, createBlog)
    .get(getBlogs)

router.route('/:id')
    .get(getBlogById)
    .patch(protect, editBlog)
    .delete(protect, deleteBlog)
    .post(protect, likeBlog); 

  

export default router;