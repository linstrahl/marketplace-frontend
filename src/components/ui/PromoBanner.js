// src/components/ui/PromoBanner.js
import './PromoBanner.css';

export default function PromoBanner() {
  const banners = [
    { text: 'Diskon 50%', bg: 'bg-blue' },
    { text: 'Gratis Ongkir', bg: 'bg-green' },
    { text: 'Member Sale', bg: 'bg-purple' },
  ];

  return (
    <div className="promo-banner">
      {banners.map((item, i) => (
        <div key={i} className={`promo-item ${item.bg}`}>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}