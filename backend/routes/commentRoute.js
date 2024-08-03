import express from 'express';
import { createComment, deleteComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id')
    .post(protect, createComment)
    .delete(protect, deleteComment);

export default router;