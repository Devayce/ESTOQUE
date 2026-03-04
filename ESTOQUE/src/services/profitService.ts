import { API_URL } from '../config/api';

export const getProfit = async () => {
  try {
    const response = await fetch(`${API_URL}/profit`);
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      let errorData;
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      }
      throw new Error(
        errorData?.message || `Failed to get profit: ${response.statusText}`
      );
    }

    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    // Handle cases where the response is successful but not JSON.
    return { total: 0 };
  } catch (error) {
    console.error('Error getting profit:', error);
    throw error;
  }
};
