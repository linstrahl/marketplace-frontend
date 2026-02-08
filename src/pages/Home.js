// src/pages/Home.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ui/ProductCard';
import CategoryItem from '../components/ui/CategoryItem';
import PromoBanner from '../components/ui/PromoBanner';
import './home.css';

// Mock icons (ganti dengan SVG real nanti)
const IconElectronics = () => <span>🔌</span>;
const IconAudio = () => <span>🎧</span>;
const IconAccessories = () => <span>📱</span>;
const IconLaptop = () => <span>💻</span>;
const IconSmartphone = () => <span>📱</span>;
const IconGaming = () => <span>🎮</span>;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const enriched = res.data.map(p => ({
          ...p,
          discount: p.price < 1000000 ? { percentage: 15 } : null,
          isBestSeller: ['Wireless Mouse', 'Mechanical Keyboard'].includes(p.name),
          originalPrice: p.price * 1.15
        }));
        setProducts(enriched.slice(0, 8));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { icon: <IconElectronics />, label: 'Elektronik', href: '/kategori/elektronik' },
    { icon: <IconAudio />, label: 'Audio', href: '/kategori/audio' },
    { icon: <IconAccessories />, label: 'Aksesoris', href: '/kategori/aksesoris' },
    { icon: <IconLaptop />, label: 'Laptop', href: '/kategori/laptop' },
    { icon: <IconSmartphone />, label: 'Smartphone', href: '/kategori/smartphone' },
    { icon: <IconGaming />, label: 'Gaming', href: '/kategori/gaming' },
  ];

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="container">
          <h1>Selamat Datang di Nexora</h1>
          <p className="hero-subtitle">
            Belanja teknologi masa depan dengan mudah, aman, dan profesional.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn--primary">
              Mulai Belanja
            </Link>
            <Link to="/promo" className="btn btn--outline">
              Lihat Promo
            </Link>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Kategori Populer</h2>
          <div className="category-grid">
            {categories.map((cat, i) => (
              <CategoryItem key={i} {...cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Produk Populer */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Produk Populer</h2>
            <Link to="/produk/populer" className="section-link">Lihat Semua →</Link>
          </div>
          <div className="products-grid">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="product-card skeleton"></div>
              ))
            ) : (
              products.slice(0, 4).map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Produk Terbaru */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🆕 Produk Terbaru</h2>
            <Link to="/produk/terbaru" className="section-link">Lihat Semua →</Link>
          </div>
          <div className="products-grid">
            {products.length > 4 ? (
              products.slice(4, 8).map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="empty-message">Belum ada produk terbaru.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Nexora</h3>
              <p>Platform belanja digital yang tenang, profesional, dan mudah digunakan.</p>
            </div>
            <div className="footer-col">
              <h4>Tentang</h4>
              <ul>
                <li><a href="#">Tentang Kami</a></li>
                <li><a href="#">Karir</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Bantuan</h4>
              <ul>
                <li><a href="#">Pusat Bantuan</a></li>
                <li><a href="#">Kebijakan Privasi</a></li>
                <li><a href="#">Syarat & Ketentuan</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Ikuti Kami</h4>
              <div className="social-links">
                <a href="#">𝕏</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}