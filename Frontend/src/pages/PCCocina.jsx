import React from 'react';
import '../styles/PCCocina.css';
import logoEmpresa from '../assets/images/LogoEmpresa.png';
import fondoHero from '../assets/images/fondo-1-5.png';
import naturalFood from '../assets/images/natural_food1.svg';
import instagramIcon from '../assets/images/instagram_icon.svg';
import whatsappIcon from '../assets/images/whatsapp_icon.svg';

function PCCocina() {
  return (
    <div className="pc-cocina-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img src={logoEmpresa} alt="Madre Raíz" className="logo" />
          <nav className="nav">
            <a href="#inicio">Inicio</a>
            <a href="#quienes-somos">Quienes Somos</a>
            <a href="#galeria">Galería</a>
            <a href="#blog">Blog</a>
          </nav>
          <div className="auth-buttons">
            <button className="login-btn">Iniciar Sesión</button>
            <button className="register-btn">Registrarse</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="herosection">
        <div className="hero-content">
          <div className="hero-text">
            <h1>COCINA A BASE DE PLANTAS</h1>
            <div className="hero-description">
              <p>Cocina vegana con productos orgánicos y locales que nutren el cuerpo y el alma, creando experiencias gastronómicas únicas y sostenibles.</p>
            </div>
          </div>
          <div className="hero-image">
            <img src={fondoHero} alt="Cocina vegana" />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <div className="info-images">
            <div className="info-image-grid">
              <img src={naturalFood} alt="Comida natural 1" />
              <img src={naturalFood} alt="Comida natural 2" />
              <img src={naturalFood} alt="Comida natural 3" />
              <img src={naturalFood} alt="Comida natural 4" />
            </div>
          </div>
          <div className="info-text">
            <p>La pasión y la cocina casera de Ana Cristina nos inspiran a crear platos únicos y deliciosos que nutren el cuerpo y el alma.</p>
            <p>20 años de experiencia nos han permitido perfeccionar nuestras recetas y técnicas, ofreciendo una experiencia gastronómica única.</p>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="modules-section">
        <h2>Módulos</h2>
        <p className="modules-subtitle">Descubre nuestros cursos especializados</p>
        
        <div className="modules-grid">
          {/* Postres */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Postres" />
            </div>
            <h3>POSTRES</h3>
            <p>Sabores intensos y texturas irresistibles, sin azúcar refinada ni gluten. Endulza tu vida de manera saludable.</p>
          </div>

          {/* Platillos Vegetales */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Platillos Vegetales" />
            </div>
            <h3>PLATILLOS VEGETALES</h3>
            <p>Alternativas innovadoras a los platillos de siempre, sin carnes pero con sabores únicos que te sorprenderán.</p>
          </div>

          {/* Tortas sin Gluten */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Tortas sin Gluten" />
            </div>
            <h3>TORTAS SIN GLUTEN</h3>
            <p>Deliciosas tortas sin gluten que no sacrifican sabor ni textura. Perfectas para celebraciones especiales.</p>
          </div>

          {/* Panes */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Panes" />
            </div>
            <h3>PANES</h3>
            <p>Con masa madre y harinas alternativas, nuestros panes son nutritivos y deliciosos para acompañar cualquier comida.</p>
          </div>

          {/* Leches Vegetales */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Leches Vegetales" />
            </div>
            <h3>LECHES VEGETALES</h3>
            <p>Desde almendras hasta avena, aprende a hacer leches vegetales cremosas y nutritivas en casa.</p>
          </div>

          {/* Sopas Tradicionales */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Sopas Tradicionales" />
            </div>
            <h3>SOPAS TRADICIONALES</h3>
            <p>Reconfortantes y llenas de sabor, hechas con ingredientes frescos y técnicas ancestrales de preparación.</p>
          </div>

          {/* Básicos del Chef */}
          <div className="module-card">
            <div className="module-icon">
              <img src={naturalFood} alt="Básicos del Chef" />
            </div>
            <h3>BÁSICOS DEL CHEF</h3>
            <p>Los elementos esenciales para dominar la cocina vegana: técnicas, ingredientes y secretos profesionales.</p>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="chef-section">
        <div className="chef-content">
          <div className="chef-image">
            <img src={naturalFood} alt="Chef Ana" />
          </div>
          <div className="chef-text">
            <p>En este viaje nos acompaña Ana Cristina Parra, chef especializada en cocina vegana con más de 20 años de experiencia. Su pasión por los ingredientes naturales y las técnicas ancestrales la han convertido en una referencia en la gastronomía sostenible.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logoEmpresa} alt="Madre Raíz" />
            <h3>madre raíz</h3>
          </div>
          <div className="footer-contact">
            <p>¿Necesitas ayuda?</p>
            <p>+57 311 265 0586</p>
            <div className="social-icons">
              <img src={instagramIcon} alt="Instagram" />
              <img src={whatsappIcon} alt="WhatsApp" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PCCocina;