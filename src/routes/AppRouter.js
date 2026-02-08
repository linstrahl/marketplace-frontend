// src/routes/AppRouter.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ProductList from '../pages/Products/ProductList';
import ProductDetail from '../pages/Products/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import CheckoutSuccess from '../pages/CheckoutSuccess'; // ← tambahkan ini
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function AppRouter() {
  return (
    <Routes>
      {/* Publik */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} /> {/* ← tambahkan ini */}

      {/* Terlindungi */}
      <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}