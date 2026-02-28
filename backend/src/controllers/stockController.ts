// src/controllers/stockController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createStockMovement = async (req: Request, res: Response) => {
  try {
    const { productId, type, quantity, unitPrice } = req.body;

    if (!productId || !type || quantity == null || unitPrice == null) {
      return res.status(400).json({ error: 'Missing required fields: productId, type, quantity, unitPrice' });
    }

    if (type !== 'entry' && type !== 'exit') {
        return res.status(400).json({ error: 'Invalid movement type. Must be "entry" or "exit".' });
    }

    const product = await prisma.product.findUnique({
        where: { id: parseInt(productId, 10) },
    });

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (type === 'exit' && product.stock < quantity) {
        return res.status(400).json({ error: 'Insufficient stock for this exit movement.' });
    }

    // Use a transaction to ensure both operations succeed or fail together
    const [, newMovement] = await prisma.$transaction([
        prisma.product.update({
            where: { id: parseInt(productId, 10) },
            data: {
                stock: {
                    [type === 'entry' ? 'increment' : 'decrement']: parseInt(quantity, 10),
                },
            },
        }),
        prisma.stockMovement.create({
            data: {
                productId: parseInt(productId, 10),
                type,
                quantity: parseInt(quantity, 10),
                unitPrice: parseFloat(unitPrice),
            },
        }),
    ]);

    res.status(201).json(newMovement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create stock movement' });
  }
};
