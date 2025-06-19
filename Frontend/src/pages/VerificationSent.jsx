import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/VerificationSent.css'; // You might want to create this CSS file

function VerificationSent() {
  return (
    <div>
      <Header />
      <main className="verification-sent-main">
        <div className="verification-sent-container">
          <h2>¡Registro Exitoso!</h2>
          <p>Se ha enviado un enlace de verificación a su correo electrónico.</p>
          <p>Por favor, revise su bandeja de entrada (y la carpeta de spam) para activar su cuenta.</p>
          <p>Una vez verificada, podrá <Link to="/login">iniciar sesión aquí</Link>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default VerificationSent;