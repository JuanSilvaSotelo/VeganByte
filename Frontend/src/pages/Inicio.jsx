// Página principal de inicio para la aplicación VeganByte
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Entrenamiento from "./PCEntrenamiento";
import { BottomNavigation } from "../components/BottomNavigation";
import '../styles/Inicio.css';

// Importación de imágenes utilizadas en la página
import LogoEmpresa2 from "../assets/images/LogoEmpresa2.png";
import ellipse3 from "../assets/images/ellipse-3.png";
import ellipse4 from "../assets/images/ellipse-4.png";
import image1 from "../assets/images/image-1.jpg";
import image12 from "../assets/images/image-12.png";
import image13 from "../assets/images/image-13.png";
import image14 from "../assets/images/image-14.png";
import image15 from "../assets/images/image-15.png";
import rectangle240 from "../assets/images/rectangle-240.jpg";
import rectangle242 from "../assets/images/rectangle-242.jpg";
import rectangle243 from "../assets/images/rectangle-243.jpg";
import rectangle245 from "../assets/images/rectangle-245.png";
import rectangle211 from "../assets/images/rectangle-211.png";
import rectangle210 from "../assets/images/rectangle-210.png";
import { Link } from "react-router-dom";

// Componente principal de la página de inicio
export const Inicio = () => {
  return (
    <div className="inicio-page">
      {/* Encabezado de la página */}
      <Header />
      
      {/* Banner principal con imagen destacada */}
      <section className="hero-section">
        <img src={image1} alt="Paisaje Madre Raíz" className="hero-image" />
      </section>

      {/* Título principal de la página */}
      <div className="main-title-container">
        <h1 className="hero-title">VOLVER A LA TIERRA CON LOS PIES Y LOS<br/>SENTIDOS EN EL PRESENTE</h1>
      </div>

      {/* Sección 1: Experiencias en la naturaleza */}
      <section className="experience-section-custom">
        <div className="experience-bg-icons">
          <img src={image12} alt="icono 1" className="bg-icon bg-icon-1" />
          <img src={image13} alt="icono 2" className="bg-icon bg-icon-2" />
          <img src={image14} alt="icono 3" className="bg-icon bg-icon-3" />
          <img src={image15} alt="icono 4" className="bg-icon bg-icon-4" />
        </div>
        <div className="experience-grid">
          <div className="experience-item">
            <img src={rectangle240} alt="Experiencia 1" className="experience-img" />
            <div className="experience-overlay">
              <span><Link to="/pc-entrenamiento">ENTRENAMIENTO</Link></span>
            </div>
          </div>
          <div className="experience-item">
            <img src={rectangle242} alt="Experiencia 2" className="experience-img" />
            <div className="experience-overlay">
              <span><Link to="/pc-entrenamiento">ENTRENAMIENTO</Link></span>
            </div>
          </div>
          <div className="experience-item">
            <img src={rectangle243} alt="Experiencia 3" className="experience-img" />
            <div className="experience-overlay">
              <span>Texto 3</span>
            </div>
          </div>
          <div className="experience-item">
            <img src={rectangle245} alt="Experiencia 4" className="experience-img" />
            <div className="experience-overlay">
              <span>Texto 4</span>
            </div>
          </div>
          <div className="experience-center-logo">
            <div className="logo-container">
            <img src={LogoEmpresa2} alt="Logo" className="logo"/>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Respetando la vida animal */}
      <section className="animal-respect-section">
        <h2 className="section-title">VOLVER A LA TIERRA RESPETANDO LA<br/>VIDA DE TODOS LOS ANIMALES</h2>
        
        <div className="circular-images-container">
          <div className="circular-image-item">
            <img src={rectangle211} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={ellipse3} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={ellipse4} alt="Experiencia con animales" className="circular-image large" />
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
          <img src={rectangle210} alt="Cultivo de alimentos" className="food-image" />
        </div>
      </section>

      {/* Sección de estadísticas de la organización */}
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

      {/* Pie de página con información de contacto */}
      <section>
      <Footer />
      </section>
    </div>
  );
};

export default Inicio;