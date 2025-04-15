import React from "react";
import Header from "../components/Header";
import { BottomNavigation } from "../components/BottomNavigation";
import '../styles/Inicio.css';

// Importación de imágenes
import fondo15 from "../assets/images/fondo-1-5.png";
import image4 from "../assets/images/image-4.png";
import image9 from "../assets/images/image-9.png";
import image10 from "../assets/images/image-10.png";
import image11 from "../assets/images/image-11.png";
import image12 from "../assets/images/image-12.png";
import image13 from "../assets/images/image-13.png";
import image14 from "../assets/images/image-14.png";
import image15 from "../assets/images/image-15.png";
import line4 from "../assets/images/line-4.svg";
import { Link } from "react-router-dom";

export const Inicio = () => {
  return (
    <div className="inicio-page">
      {/* Usar el componente Header */}
      <Header />
      
      {/* Banner Principal */}
      <section className="hero-section">
        <img src={fondo15} alt="Paisaje Madre Raíz" className="hero-image" />
      </section>

      {/* Título principal */}
      <div className="main-title-container">
        <h1 className="hero-title">VOLVER A LA TIERRA CON LOS PIES Y LOS<br/>SENTIDOS EN EL PRESENTE</h1>
      </div>

      {/* Sección 1: Experiencias en la naturaleza */}
      <section className="experience-section">
        <div className="section-content">
          <div className="image-grid">
            <div className="image-item">
              <img src={image9} alt="Persona en la naturaleza" className="circular-image" />
            </div>
            <div className="image-item">
              <img src={image10} alt="Comida vegana" className="circular-image" />
            </div>
            <div className="image-item">
              <img src={image11} alt="Paisaje natural" className="circular-image" />
            </div>
            <div className="image-item">
              <img src={image12} alt="Actividades al aire libre" className="circular-image" />
            </div>
          </div>
          <div className="center-logo">
            <div className="logo-container">
              <h2>madre<br/>raíz</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Respetando la vida animal */}
      <section className="animal-respect-section">
        <h2 className="section-title">VOLVER A LA TIERRA RESPETANDO LA<br/>VIDA DE TODOS LOS ANIMALES</h2>
        
        <div className="circular-images-container">
          <div className="circular-image-item">
            <img src={image13} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={image14} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={image15} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Cultivando alimentos */}
      <section className="food-section">
        <h2 className="section-title">VOLVER A LA TIERRA CULTIVANDO<br/>NUESTRO ALIMENTO</h2>
        <div className="food-image-container">
          <img src={image12} alt="Cultivo de alimentos" className="food-image" />
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-icon">😊</div>
          <div className="stat-text">
            <span className="stat-number">+ 5 AÑOS</span>
            <span className="stat-description">REGALANDO EXPERIENCIAS</span>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🐾</div>
          <div className="stat-text">
            <span className="stat-number">+ 7 AÑOS</span>
            <span className="stat-description">VELANDO POR LA PROTECCIÓN DE LOS ANIMALES</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p className="footer-title">CASA TALLER</p>
            <p className="footer-logo-text">madre•raíz</p>
          </div>
          <div className="footer-right">
            <p className="contact-title">¿Necesitas ayuda?</p>
            <p className="contact-phone">+57 311 265 0586</p>
            <p className="contact-email">CASAMADRERAIZ</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;