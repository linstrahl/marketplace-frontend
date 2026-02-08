// src/pages/Auth/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Alert from '../../components/ui/Alert';
import { login } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ← tambahkan ini
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // ← aktifkan loading
    try {
      const { token, user } = await login(email, password);
      loginContext(user, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau password salah');
    } finally {
      setLoading(false); // ← matikan loading
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login ke Nexora</h1>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            required
            autoComplete="username"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            showToggle={true}
          />
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            disabled={loading} // ← nonaktifkan saat loading
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
        <p className="auth-footer">
          Belum punya akun?{' '}
          <a href="/register" className="auth-link">Daftar sekarang</a>
        </p>
      </div>
    </div>
  );
}