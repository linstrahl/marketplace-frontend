// src/pages/Cart.js
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './cart.css';

export default function Cart() {
  const { cart, getCartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const items = getCartItems();
  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <h2>Keranjang Anda Kosong</h2>
          <p>Tambahkan produk dari halaman produk.</p>
          <Link to="/products" className="btn btn--primary">Jelajahi Produk</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1>Keranjang Belanja</h1>
        
        <div className="cart-grid">
          {/* Daftar Produk */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img 
                    src={`/images/${item.image.split('/').pop()}`} 
                    alt={item.name}
                    onError={(e) => e.target.src = '/images/default-product.jpg'}
                  />
                </div>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <input 
                    type="number" 
                    min="1" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value) || 1)}
                  />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <div className="cart-item-total">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item._id)}
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Ringkasan */}
          <div className="cart-summary">
            <h2>Rincian Pesanan</h2>
            <div className="summary-row">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <button 
              className="btn btn--primary btn--full"
              onClick={() => navigate('/checkout')}
            >
              Lanjut ke Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}