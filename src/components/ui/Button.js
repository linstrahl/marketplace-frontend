// src/components/ui/Button.js
import './button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  fullWidth = false 
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${fullWidth ? 'btn--full' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}