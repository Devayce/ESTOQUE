// src/controllers/userController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Since there is no auth, we'll return a hardcoded mock user.
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // In a real app, you'd get the user ID from the request (e.g., req.user.id)
    // For now, we'll just create or find a mock user.
    const user = await prisma.user.upsert({
      where: { cpf: '123.456.789-00' },
      update: {},
      create: {
        cpf: '123.456.789-00',
        email: 'mockuser@email.com',
        name: 'Mock User',
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};
