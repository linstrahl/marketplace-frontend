// src/pages/CheckoutSuccess.js
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './checkout-success.css';

export default function CheckoutSuccess() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Hapus semua item dari cart saat halaman dimuat
  useEffect(() => {
    Object.keys(cart).forEach(productId => {
      removeFromCart(productId);
    });
  }, [cart, removeFromCart]);

  return (
    <div className="checkout-success">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✅</div>
          <h1>Pesanan Berhasil!</h1>
          <p>Terima kasih telah berbelanja di Nexora. Pesanan Anda sedang diproses.</p>
          
          <div className="summary-card">
            <h3>Ringkasan Pesanan</h3>
            <p>Pembayaran berhasil dikonfirmasi</p>
            <p>Estimasi pengiriman: 2-3 hari kerja</p>
          </div>

          <Link to="/" className="btn btn--primary">
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}