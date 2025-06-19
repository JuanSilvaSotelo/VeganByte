import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../../src/styles/styles.css'; // Importa el archivo CSS

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState('Verificando...');
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
          setVerificationStatus('Token de verificación no encontrado.');
          return;
        }

        // Assuming your backend verification endpoint is /api/v1/auth/verify-email
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify-email?token=${token}`);
        
        if (response.status === 200) {
          setVerificationStatus('¡Correo electrónico verificado exitosamente!');
        } else {
          setVerificationStatus('Error al verificar el correo electrónico.');
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setVerificationStatus(`Error: ${error.response.data.message}`);
        } else {
          setVerificationStatus('Error al verificar el correo electrónico. Por favor, inténtalo de nuevo más tarde.');
        }
      }
    };

    verifyToken();
  }, [location]);

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-success-subtle">
      <div className="card p-4 shadow-lg text-center">
        <h2 className="card-title text-success mb-4">Verificación de Correo Electrónico</h2>
        <p className="card-text fs-5 mb-4">{verificationStatus}</p>
        {verificationStatus === '¡Correo electrónico verificado exitosamente!' && (
          <Link to="/" className="btn btn-success mt-3">Ir a la página de inicio</Link>
        )}
        {verificationStatus.startsWith('Error') && (
          <Link to="/register" className="btn btn-primary mt-3">Volver a Registrarse</Link>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;