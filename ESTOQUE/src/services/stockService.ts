import { StockMovement } from '../types/StockMovement';
import { API_URL } from '../config/api';

export const getStockMovements = async (): Promise<StockMovement[]> => {
    try {
      const response = await fetch(`${API_URL}/stock-movements`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock movements');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching stock movements:', error);
      throw error;
    }
};
