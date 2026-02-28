import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { ProfitProvider } from './contexts/ProfitContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <ThemeProvider>
        <ProfitProvider>
          <App />
        </ProfitProvider>
      </ThemeProvider>
    </CartProvider>
  </React.StrictMode>
);
