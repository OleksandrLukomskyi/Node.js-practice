import express from 'express';
import authMiddleware from '../middleware/auth.js';
import authRoutes from './auth.js';
import bookRoutes from './books.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/books', authMiddleware, bookRoutes);

export default router;
