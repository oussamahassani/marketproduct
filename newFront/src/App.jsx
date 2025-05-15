import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Accueil from './pages/Accueil';
import Electronics from "./pages/Electronics";
import FashionProducts from './pages/FashionProducts';
import ProductPage from './pages/ProductPage';
import Header from './pages/Header';
import StockSubcategoryPage from './admin/ElectroniqueStock'
import AdminDashboard from './admin/AdminDashboard';
import LoginAdmin from './admin/LoginAdmin';
import StockElectronique from './admin/ElectroniqueStock';
import ModeStock from './admin/ModeStock'
import { CartProvider } from "./pages/CartContext"; // adapte le chemin selon ton projet
import CartPage from './pages/CartPage'; // ajoute cette ligne en haut
import UserList from './admin/UserList'; 
import './App.css';
import ProductsList from './pages/ProductsList';
import Commande from './pages/Commande'; // ajuste le chemin si nécessaire
import CommandesAdmin from './admin/CommandesAdmin';
import OrderConfirmation from './pages/OrderConfirmation';
import { OrderProvider } from "./pages/OrderContext"; // <-- ✅ ajoute ceci

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
      <Route path="/admin" element={<LoginAdmin />} />
      <Route path="/products" element={<ProductsList />} />
      <Route
        path="/admin/dashboard"
        element={ <AdminDashboard /> }
      />
      <Route path="/stock/mode" element={<ModeStock />} />

       <Route path="/stock/:categoryName" element={<StockSubcategoryPage />} />
       <Route path="/stock/:category" element={<StockElectronique />} />
       <Route path="/admin/users" element={<UserList />} />
       <Route path="/cart" element={<CartPage />} />
         <Route path="/commande" element={<Commande />} />
         <Route path="/order-confirmation" element={<OrderConfirmation />} />

        <Route path="/admin/commandes" element={<CommandesAdmin />} /> {/* Route pour les commandes */}

    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <OrderProvider> {/* ✅ Le provider doit entourer toute l'app */}
        <CartProvider>
           {/* Facultatif, mais si global tu peux le mettre ici */}
          <AppRoutes />
        </CartProvider>
      </OrderProvider>
    </Router>
  );
};

export default App;


