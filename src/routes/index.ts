import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import bookRoutes from './books';

// /api/v1
const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/books', bookRoutes);

export default router;
