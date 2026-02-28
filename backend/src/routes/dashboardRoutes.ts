// src/routes/dashboardRoutes.ts
import { Router } from 'express';
import { getDashboardMetrics, getTotalStockValue } from '../controllers/dashboardController';

const router = Router();

// This matches GET /api/dashboard/
router.get('/', getDashboardMetrics); 
// This matches GET /api/dashboard/financial/total-value
router.get('/financial/total-value', getTotalStockValue);

export default router;
