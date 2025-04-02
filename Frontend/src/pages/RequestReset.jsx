import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      const response = await axios.post(`${API_URL}/api/password/request-reset`, {
        email
      });

      setSuccess(response.data.message);
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