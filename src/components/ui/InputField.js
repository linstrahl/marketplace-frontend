// src/components/ui/InputField.js
import { useState } from 'react';
import './form.css';

export default function InputField({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  required = false,
  showToggle = false
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const inputType = showToggle && type === 'password' 
    ? (isVisible ? 'text' : 'password') 
    : type;

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrapper">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="form-input"
          autoComplete={type === 'password' ? 'new-password' : 'on'}
        />
        {showToggle && type === 'password' && (
          <button
            type="button"
            className="toggle-password-btn"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
          >
            {isVisible ? '👁️‍🗨️' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
}