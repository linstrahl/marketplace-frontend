// src/components/ui/ProductCard.js
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const hasDiscount = product.discount?.percentage;

  return (
    <div className="product-card">
      {hasDiscount && (
        <div className="badge badge--discount">
          -{product.discount.percentage}%
        </div>
      )}
      {product.isBestSeller && (
        <div className="badge badge--best">
          Best Seller
        </div>
      )}

      <div className="product-image">
        <img 
          src={`/images/${product.image.split('/').pop()}`} 
          alt={product.name}
          onError={(e) => e.target.src = '/images/default-product.jpg'}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="rating-stars">⭐⭐⭐⭐☆</div>
          <span className="rating-text">4.2 (128)</span>
        </div>

        <p className="product-price">
          {hasDiscount ? (
            <>
              <span className="price-original">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
              <span className="price-discount">Rp {product.price.toLocaleString('id-ID')}</span>
            </>
          ) : (
            <span className="price">Rp {product.price.toLocaleString('id-ID')}</span>
          )}
        </p>

        <button className="btn btn--secondary btn--small">
          + Keranjang
        </button>
      </div>
    </div>
  );
}