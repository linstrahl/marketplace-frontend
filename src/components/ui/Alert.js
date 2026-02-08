// src/components/ui/Alert.js
import './alert.css';

export default function Alert({ message, type = 'error' }) {
  return (
    <div className={`alert alert--${type}`}>
      {message}
    </div>
  );
}