import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import { resetPassword } from '../services/authService';
import '../styles/Login.css';



function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contrasenas no coinciden');
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(token, password);

      setSuccess(response.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al restablecer la contrasena');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="login-container">
          <h2>RESTABLECER CONTRASENA</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Nueva Contrasena"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmar Contrasena"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Procesando...' : 'Restablecer Contrasena'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ResetPassword;