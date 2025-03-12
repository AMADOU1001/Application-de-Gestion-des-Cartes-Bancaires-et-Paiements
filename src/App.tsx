import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/dashboard/Dashboard';
import CardsPage from './pages/cards/CardsPage';
import TransactionsPage from './pages/transactions/TransactionsPage';
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage';
import DisputesPage from './pages/disputes/DisputesPage';
import LoyaltyPage from './pages/loyalty/LoyaltyPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" replace />} />
          <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" replace />} />
          <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="cards" element={<CardsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="disputes" element={<DisputesPage />} />
            <Route path="loyalty" element={<LoyaltyPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>;
}