// src/controllers/profitController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfit = async (req: Request, res: Response) => {
  try {
    let profit = await prisma.profit.findUnique({
      where: { id: 1 },
    });

    // If no profit entry exists, initialize it.
    if (!profit) {
      profit = await prisma.profit.create({
        data: { id: 1, total: 0 },
      });
    }

    res.status(200).json(profit);
  } catch (error) {
    console.error('Failed to get profit:', error);
    res.status(500).json({ error: 'Failed to retrieve profit.' });
  }
};
