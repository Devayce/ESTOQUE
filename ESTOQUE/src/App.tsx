import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AddItemPage from './pages/AddItemPage';
import DashboardPage from './pages/DashboardPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
// imports cleaned: stock movements handled inside Dashboard and ProfitContext
import LoginPage from './pages/LoginPage';
import MainLayout from './components/MainLayout';

import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  useEffect(() => {
    // App-level side-effects can go here if needed; profit is provided by ProfitProvider
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/add" element={<AddItemPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/history" element={<OrderHistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;