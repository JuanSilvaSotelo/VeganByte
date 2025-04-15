import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import { requestPasswordReset } from '../services/authService';
import '../styles/Login.css';

function RequestReset() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const response = await requestPasswordReset(email);

      setSuccess(response.message);
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <div className="login-container">
          <h2>RESTABLECER CONTRASEÑA</h2>
          <p className="reset-description">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Enlace'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default RequestReset;