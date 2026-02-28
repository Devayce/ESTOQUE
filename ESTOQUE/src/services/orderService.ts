import { CartItem } from '../contexts/CartContext';
import { API_URL } from '../config/api';

export interface OrderPayload {
  items: CartItem[];
  discount: number;
  total: number;
  customerName: string;
}

export const saveOrder = async (orderData: OrderPayload) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving order:', error);
    throw error;
  }
};

export interface Order {
  id: number;
  customerName: string;
  date: string;
  total: number;
  discount: number;
  items: Array<{
    product: { id: number; name: string; price: number };
    quantity: number;
  }>;
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
