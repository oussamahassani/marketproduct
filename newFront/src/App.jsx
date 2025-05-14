import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Accueil from './pages/Accueil';
import Electronics from "./pages/Electronics";
import FashionProducts from './pages/FashionProducts';
import ProductPage from './pages/ProductPage';
import Header from './pages/Header';
import StockSubcategoryPage from './admin/StockSubcategoryPage'
import AdminDashboard from './admin/AdminDashboard';
import LoginAdmin from './admin/LoginAdmin';
import ProductsList from './pages/ProductsList';
import './App.css';

const AppRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAdmin(auth === "true");
  }, []);
  

  return (
    <Routes>
    <Route path="/" element={<Accueil />} />
    <Route path="/login" element={<Login />} />
    <Route path="/electronics" element={<Electronics />} />
    <Route path="/fashion" element={<FashionProducts />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/admin" element={<LoginAdmin />} />
    <Route path="/products" element={<ProductsList />} />
    <Route
      path="/admin/dashboard"
      element={ <AdminDashboard /> }
    />
     <Route path="/stock/:category/:subcategory" element={<StockSubcategoryPage />} />

  </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;
