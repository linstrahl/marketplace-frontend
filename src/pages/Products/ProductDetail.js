// src/pages/Products/ProductDetail.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import './product-detail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://marketplace-backend-99ea.onrender.com/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('❌ Error fetching product:', err);
        alert('Produk tidak ditemukan');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // Tampilkan notifikasi sukses
      const notification = document.createElement('div');
      notification.textContent = '✅ Produk ditambahkan ke keranjang!';
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        animation: fadeInOut 3s ease;
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
  };

  const handleCheckout = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <div className="container">
          <h1>Memuat Produk...</h1>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h1>Produk Tidak Ditemukan</h1>
          <button onClick={() => navigate('/products')} className="btn btn--primary">
            Kembali ke Produk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-grid">
          {/* Gambar besar */}
          <div className="product-image-large">
            <img 
              src={`/images/${product.image.split('/').pop()}`} 
              alt={product.name}
              onError={(e) => e.target.src = '/images/default-product.jpg'}
            />
          </div>

          {/* Info produk */}
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">Rp {product.price.toLocaleString('id-ID')}</p>
            
            <div className="product-stock">
              <span className="stock-badge in-stock">Tersedia</span>
            </div>

            <div className="product-description">
              <h3>Deskripsi</h3>
              <p>{product.description || 'Deskripsi produk belum tersedia.'}</p>
            </div>

            <div className="product-specs">
              <h3>Spesifikasi</h3>
              <ul>
                <li>Berat: 200g</li>
                <li>Warna: Hitam</li>
                <li>Garansi: 1 Tahun</li>
                <li>Stok: Tersedia</li>
              </ul>
            </div>

            {/* Quantity selector */}
            <div className="quantity-selector">
              <label>Jumlah:</label>
              <div className="quantity-input">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val >= 1) {
                      setQuantity(val);
                    }
                  }}
                />
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="product-actions">
              <button className="btn btn--primary" onClick={handleAddToCart}>
                Tambah ke Keranjang
              </button>
              <button className="btn btn--secondary" onClick={handleCheckout}>
                Checkout Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}