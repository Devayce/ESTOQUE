// src/routes/profitRoutes.ts
import { Router } from 'express';
import { getProfit } from '../controllers/profitController';

const router = Router();

router.get('/profit', getProfit);

export default router;
