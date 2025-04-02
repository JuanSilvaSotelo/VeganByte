import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdminAuthenticated, getAdminToken } from '../../services/authService';
import { jwtDecode } from 'jwt-decode'; // Cambiar esta línea

/**
 * Componente para proteger rutas administrativas
 * Verifica la autenticación y la validez del token JWT
 */
const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = () => {
      try {
        // Verificar si existe un token
        if (!isAdminAuthenticated()) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Obtener el token y verificar su validez
        const token = getAdminToken();
        const decodedToken = jwtDecode(token); // Actualizar esta línea
        
        // Verificar si el token ha expirado
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expirado, limpiar localStorage
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminName');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (isLoading) {
    // Mostrar un indicador de carga mientras se verifica el token
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el contenido protegido
  return children;
};

export default ProtectedAdminRoute;