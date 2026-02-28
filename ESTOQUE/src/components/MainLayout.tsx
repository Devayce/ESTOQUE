
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import ProfitDisplay from './ProfitDisplay';

const MainLayout: React.FC = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <NavLink to="/home" className="logo-link">Estoque App</NavLink>
            <div className="nav-right">
              <ul>
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/add">Add Item</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/order">Pedidos</NavLink>
                </li>
                <li>
                  <NavLink to="/history">Histórico</NavLink>
                </li>
              </ul>
              <ProfitDisplay />
              <ThemeToggleButton />
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <p className="footer-title">ESTOQUE</p>
            <div className="footer-info">
              <p>Emerson Garcia</p>
              <p>Unifort</p>
              <p>99981287103</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
