// src/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext'; // ← tambahkan ini
import Navbar from './components/layout/Navbar';
import AppRouter from './routes/AppRouter';
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* ← wrap dengan CartProvider */}
        <BrowserRouter>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <AppRouter />
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;