import { API_URL } from '../config/api';

export const getProfit = async () => {
  try {
    const response = await fetch(`${API_URL}/profit`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get profit');
    }
    return await response.json();
  } catch (error) {
    console.error('Error getting profit:', error);
    throw error;
  }
};
