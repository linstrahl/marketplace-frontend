// src/context/CartContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : {};
  });

  // Simpan ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev[product._id];
      if (existing) {
        return {
          ...prev,
          [product._id]: {
            ...existing,
            quantity: existing.quantity + quantity
          }
        };
      } else {
        return {
          ...prev,
          [product._id]: {
            ...product,
            quantity
          }
        };
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCart(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity
      }
    }));
  };

  const getCartItems = () => Object.values(cart);
  const getTotalItems = () => Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartItems,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);