// src/pages/Products/ProductList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './product-list.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://marketplace-backend-99ea.onrender.com/api/products');
        console.log('✅ Produk diterima:', res.data); // ← log ini wajib muncul
        setProducts(res.data);
      } catch (err) {
        console.error('❌ Error:', err);
        setError('Gagal muat. Cek console & backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="products-page"><h2>Semua Produk</h2><p>Memuat...</p></div>;
  if (error) return <div className="products-page"><h2>Semua Produk</h2><p className="error-message">{error}</p></div>;
  if (products.length === 0) {
    console.warn('⚠️ products.length = 0 — padahal API mengembalikan data!');
    return <div className="products-page"><h2>Semua Produk</h2><p className="empty-message">Tidak ada produk (cek console)</p></div>;
  }

  return (
    <div className="products-page">
      <h2> </h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <div className="product-image">
              <img 
                src={`/images/${p.image.split('/').pop()}`} 
                alt={p.name}
                onError={e => e.target.src = '/images/default-product.jpg'}
              />
            </div>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-price">Rp {p.price.toLocaleString('id-ID')}</p>
            <Link to={`/products/${p._id}`} className="btn btn--secondary product-action-btn">
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}