import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const [formData, setFormData] = useState({
    Usuario: '',
    Contraseña: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const response = await axios.post('/api/auth/login', formData);

      if (response.status === 200) {
        const { token } = response.data;
        sessionStorage.setItem('token', token); 
        history.push('/'); 
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                          err.message || 
                          "Error al iniciar sesión";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Header />
      <main>
        <div className="login-container">
          <h2>INICIAR SESIÓN</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <Input
              label="Usuario (Email o Documento)"
              name="Usuario"
              type="text"
              value={formData.Usuario}
              onChange={handleChange}
              required
            />
            <Input
              label="Contraseña"
              name="Contraseña"
              type="password"
              value={formData.Contraseña}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;