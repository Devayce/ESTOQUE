import { Request, Response } from 'express';
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

// This interface will be useful for typing the items in the request body
interface OrderItem {
    product: Product;
    quantity: number;
}

export const createOrder = async (req: Request, res: Response) => {
    const { items, customerName, discount, total } = req.body as {
        items: OrderItem[];
        customerName: string;
        discount: number;
        total: number;
    };

    if (!items || items.length === 0 || !customerName || total == null) {
        return res.status(400).json({ error: 'Missing required order information.' });
    }

    try {
        const totalProfitFromSale = await prisma.$transaction(async (tx) => {
            let accumulatedProfit = 0;

            for (const item of items) {
                const productId = item.product.id;
                const salePrice = item.product.price;
                const quantitySold = item.quantity;

                // 1. Find the product and check stock
                const product = await tx.product.findUnique({
                    where: { id: productId },
                });

                if (!product) {
                    throw new Error(`Product with id ${productId} not found.`);
                }
                if (product.stock < quantitySold) {
                    throw new Error(`Insufficient stock for product ${product.name}.`);
                }

                // 2. Find the last "entry" movement to determine the cost basis
                const lastEntry = await tx.stockMovement.findFirst({
                    where: {
                        productId: productId,
                        type: 'entry',
                    },
                    orderBy: {
                        date: 'desc',
                    },
                });

                // If no entry, we can't determine profit. Assume cost is 0 or handle as an error.
                // For this logic, we'll assume cost is 0 if no entry is found.
                const costPrice = lastEntry?.unitPrice || 0;
                
                // 3. Calculate profit for this item
                const profitPerItem = salePrice - costPrice;
                accumulatedProfit += profitPerItem * quantitySold;

                // 4. Update product stock
                await tx.product.update({
                    where: { id: productId },
                    data: {
                        stock: {
                            decrement: quantitySold,
                        },
                    },
                });

                // 5. Create the "exit" stock movement
                await tx.stockMovement.create({
                    data: {
                        productId: productId,
                        type: 'exit',
                        quantity: quantitySold,
                        unitPrice: salePrice, // The price it was sold at
                    },
                });
            }

            // After iterating all items, apply discount to profit if necessary.
            // A simple approach is to reduce profit by the same percentage as the discount.
            const finalProfit = accumulatedProfit * (1 - (discount || 0) / 100);

            // 6. Update the global profit
            await tx.profit.upsert({
                where: { id: 1 },
                update: {
                    total: {
                        increment: finalProfit,
                    },
                },
                create: {
                    id: 1,
                    total: finalProfit,
                },
            });

            return finalProfit;
        });

        res.status(201).json({ 
            message: 'Order created successfully!',
            profitFromSale: totalProfitFromSale 
        });

    } catch (error) {
        console.error('Order creation failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        res.status(500).json({ error: 'Failed to create order.', details: errorMessage });
    }
};

// We will keep a simple getOrders for now, but it should be properly implemented
export const getOrders = async (req: Request, res: Response) => {
    res.status(501).json({ message: 'Not implemented yet.' });
}
