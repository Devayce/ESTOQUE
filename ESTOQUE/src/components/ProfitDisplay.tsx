import { useState } from 'react';
import { useProfit } from '../contexts/ProfitContext';

const ProfitDisplay = () => {
  const { totalProfit } = useProfit();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="profit-display">
      <span>Lucro Total:</span>
      <span className={isVisible ? '' : 'blurred-text'}>
        R$ {totalProfit.toFixed(2)}
      </span>
      <button onClick={toggleVisibility} className="visibility-toggle">
        {isVisible ? '🙈' : '👁️'}
      </button>
    </div>
  );
};

export default ProfitDisplay;
