// src/pages/Auth/Register.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import Alert from '../../components/ui/Alert';
import { register } from '../../services/auth'; // ← SESUAIKAN INI
import { useAuth } from '../../context/AuthContext';
import './auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      const { token, user } = await register(email, password); // ← SESUAIKAN INI
      login(user, token);
      navigate('/');
    } catch (err) {
      let message = 'Registrasi gagal';
      if (err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.response?.data?.errors?.length > 0) {
        message = err.response.data.errors[0].msg;
      }
      setError(message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Daftar Akun</h1>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleSubmit} className="auth-form">
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh@email.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            showToggle={true}
          />
          <InputField
            label="Konfirmasi Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            showToggle={true}
          />
          <Button type="submit" variant="primary" fullWidth>
            Daftar
          </Button>
        </form>
        <p className="auth-footer">
          Sudah punya akun?{' '}
          <a href="/login" className="auth-link">Masuk</a>
        </p>
      </div>
    </div>
  );
}