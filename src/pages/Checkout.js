// src/pages/Checkout.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './checkout.css';

export default function Checkout() {
  const { getCartItems, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'transfer'
  });

  const items = getCartItems();
  const total = getTotalPrice();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect ke halaman success (cart akan dihapus di halaman success)
    navigate('/checkout-success');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-grid">
          {/* Form Pengiriman */}
          <div className="checkout-form">
            <h2>Informasi Pengiriman</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Alamat Lengkap</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Nomor Telepon</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <h2>Metode Pembayaran</h2>
              <div className="payment-methods">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleChange}
                  />
                  Transfer Bank
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  Bayar di Tempat (COD)
                </label>
              </div>
              
              <button type="submit" className="btn btn--primary btn--full">
                Konfirmasi Pembayaran
              </button>
            </form>
          </div>

          {/* Ringkasan Pesanan */}
          <div className="order-summary">
            <h2>Ringkasan Pesanan</h2>
            <div className="summary-items">
              {items.map(item => (
                <div key={item._id} className="summary-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}