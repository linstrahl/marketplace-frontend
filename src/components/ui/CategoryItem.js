// src/components/ui/CategoryItem.js
import { Link } from 'react-router-dom';
import './CategoryItem.css';

export default function CategoryItem({ icon, label, href }) {
  return (
    <Link to={href} className="category-item">
      <div className="category-icon">{icon}</div>
      <span className="category-label">{label}</span>
    </Link>
  );
}