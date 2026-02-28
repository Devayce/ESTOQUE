// src/routes/stockRoutes.ts
import { Router } from 'express';
import { createStockMovement } from '../controllers/stockController';

const router = Router();

router.post('/', createStockMovement);

export default router;
