import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { getProfit } from '../services/profitService';

interface ProfitContextType {
  totalProfit: number;
  fetchProfit: () => void;
}

const ProfitContext = createContext<ProfitContextType | undefined>(undefined);

export const ProfitProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [totalProfit, setTotalProfit] = useState(0);

  const fetchProfit = useCallback(async () => {
    try {
      const profitData = await getProfit();
      setTotalProfit(profitData.total || 0);
    } catch (error) {
      console.error("Failed to fetch profit:", error);
      // Optionally set profit to a default/error state
      setTotalProfit(0);
    }
  }, []);

  // Fetch on initial load
  useEffect(() => {
    fetchProfit();
  }, [fetchProfit]);

  return (
    <ProfitContext.Provider value={{ totalProfit, fetchProfit }}>
      {children}
    </ProfitContext.Provider>
  );
};

export const useProfit = () => {
  const context = useContext(ProfitContext);
  if (context === undefined) {
    throw new Error('useProfit must be used within a ProfitProvider');
  }
  return context;
};

