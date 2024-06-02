import express from 'express';
import UserController from '../controllers/user.js';
import uploadMiddleware from '../middleware/upload.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/verify/:token', UserController.verify);
router.get('/avatar', authMiddleware, UserController.getAvatar);
router.patch(
  '/avatar',
  uploadMiddleware.single('avatar'),
  UserController.uploadAvatar
);

export default router;
