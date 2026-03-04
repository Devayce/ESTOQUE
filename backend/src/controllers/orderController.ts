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
        const result = await prisma.$transaction(async (tx) => {
            // 1. Create the Order record
            const order = await tx.order.create({
                data: {
                    customerName,
                    discount,
                    total,
                    items: {
                        create: items.map(item => ({
                            productId: item.product.id,
                            quantity: item.quantity,
                            price: item.product.price, // Price at time of sale
                        })),
                    },
                },
                include: {
                    items: true, // Include the created items in the response
                }
            });

            let accumulatedProfit = 0;

            for (const item of items) {
                const productId = item.product.id;
                const salePrice = item.product.price;
                const quantitySold = item.quantity;

                // 2. Find the product and check stock
                const product = await tx.product.findUnique({
                    where: { id: productId },
                });

                if (!product) {
                    throw new Error(`Product with id ${productId} not found.`);
                }
                if (product.stock < quantitySold) {
                    throw new Error(`Insufficient stock for product ${product.name}.`);
                }

                // 3. Find cost basis to calculate profit
                const lastEntry = await tx.stockMovement.findFirst({
                    where: { productId: productId, type: 'entry' },
                    orderBy: { date: 'desc' },
                });
                const costPrice = lastEntry?.unitPrice || 0;
                
                // 4. Calculate profit and update stock
                accumulatedProfit += (salePrice - costPrice) * quantitySold;

                await tx.product.update({
                    where: { id: productId },
                    data: { stock: { decrement: quantitySold } },
                });

                // 5. Create "exit" stock movement
                await tx.stockMovement.create({
                    data: {
                        productId: productId,
                        type: 'exit',
                        quantity: quantitySold,
                        unitPrice: salePrice,
                    },
                });
            }

            const finalProfit = accumulatedProfit * (1 - (discount || 0) / 100);

            // 6. Update global profit
            await tx.profit.upsert({
                where: { id: 1 },
                update: { total: { increment: finalProfit } },
                create: { id: 1, total: finalProfit },
            });

            return { order, profitFromSale: finalProfit };
        });

        res.status(201).json({ 
            message: 'Order created successfully!',
            order: result.order,
            profitFromSale: result.profitFromSale 
        });

    } catch (error) {
        console.error('Order creation failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        res.status(500).json({ error: 'Failed to create order.', details: errorMessage });
    }
};

// We will keep a simple getOrders for now, but it should be properly implemented
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                items: {
                    include: {
                        product: true, // Include the full product details for each order item
                    },
                },
            },
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Failed to get orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders.' });
    }
}
