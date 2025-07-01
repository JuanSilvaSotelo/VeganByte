import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/authService';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    usuario: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Usar el servicio de autenticación para iniciar sesión
      await loginAdmin(credentials);
      
      // Redireccionar al panel de administración
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError(
        error.response?.data?.error ||
        'Error al iniciar sesión. Por favor, verifica tus credenciales.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Acceso Administrativo</h2>
        <p className="admin-login-subtitle">Ingresa tus credenciales para acceder al panel de administración</p>
        
        {error && <div className="admin-login-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              required
              placeholder="Nombre de usuario"
            />
          </div>
          
          <div className="admin-form-group">
            <label htmlFor="contrasena">Contrasena</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={credentials.contrasena}
              onChange={handleChange}
              required
              placeholder="Contrasena"
            />
          </div>
          
          <button 
            type="submit" 
            className="admin-login-button" 
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;