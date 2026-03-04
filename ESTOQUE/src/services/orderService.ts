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
      const contentType = response.headers.get('content-type');
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      }
      throw new Error(
        errorData?.message || `Failed to save order: ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    // Handle cases where the response is successful but not JSON.
    // This might need adjustment based on what the API actually returns on success.
    return {};
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
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      }
      throw new Error(
        errorData?.message || `Failed to fetch orders: ${response.statusText}`
      );
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
