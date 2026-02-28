// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import stockRoutes from './stockRoutes';
import dashboardRoutes from './dashboardRoutes';
import orderRoutes from './orderRoutes';
import profitRoutes from './profitRoutes';

const router = Router();

router.use('/user', userRoutes);
router.use('/products', productRoutes);
router.use('/stock-movements', stockRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/orders', orderRoutes);
router.use('/profit', profitRoutes);

export default router;
