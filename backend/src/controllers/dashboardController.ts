// src/controllers/dashboardController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// For the main dashboard metrics
export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const totalProducts = await prisma.product.count();
    
    const products = await prisma.product.findMany();
    const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);

    const totalMovements = await prisma.stockMovement.count();

    res.json({
      totalProducts,
      totalStockValue,
      totalMovements,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard metrics' });
  }
};

// For the specific header value
export const getTotalStockValue = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    const totalStockValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    res.json({ totalStockValue });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch total stock value' });
  }
};
