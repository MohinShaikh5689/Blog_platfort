import express from 'express';
import { signup, login, logout, me } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, me);

export default router;
