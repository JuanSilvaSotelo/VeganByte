// Página principal de inicio para la aplicación VeganByte
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BottomNavigation } from "../components/BottomNavigation";
import '../styles/Inicio.css';

// Importación de imágenes utilizadas en la página
import LogoEmpresa2 from "../assets/Icons/LogoEmpresa2.png";
import RecorrerS from "../assets/images/RecorrerSenderos.png";
import CuidadoAnimal from "../assets/images/CuidadoAnimal.png";
import Principal from "../assets/images/Principal.jpg";
import Entrenamiento from "../assets/images/Entrenamiento.jpg";
import Huerta from "../assets/images/Huerta.jpg";
import Cocina from "../assets/images/Cocina.png";
import Senderismo from "../assets/images/Senderismo.jpg";
import Cascada from "../assets/images/Cascada.png";
import Caminata from "../assets/images/Caminata.png";
import IconCocina from "../assets/Icons/IconCocina.png";
import IconEntrenamiento from "../assets/Icons/IconEntrenamiento.png";
import IconHuerto from "../assets/Icons/IconHuerto.png";
import IconSenderismo from "../assets/Icons/IconSenderismo.png"
import IconMascota from "../assets/Icons/IconMascotas.png"
import IconCliente from "../assets/Icons/IconSatisfaccion_clientes.png"
import { Link } from "react-router-dom";

// Componente principal de la página de inicio
export const Inicio = () => {
  return (
    <div className="inicio-page">
      {/* Encabezado de la página */}
      <Header />
      
      {/* Banner principal con imagen destacada */}
      <section className="hero-section">
        <img src={Principal} alt="Paisaje Madre Raíz" className="hero-image" />
      </section>

      {/* Título principal de la página */}
      <div className="main-title-container">
        <h1 className="hero-title">VOLVER A LA TIERRA CON LOS PIES Y LOS<br/>SENTIDOS EN EL PRESENTE</h1>
      </div>

      {/* Sección 1: Experiencias en la naturaleza */}
      <section className="experience-section-custom">
        <div className="experience-bg-icons">
          <img src={IconHuerto} alt="icono 1" className="bg-icon bg-icon-1" />
          <img src={IconEntrenamiento} alt="icono 2" className="bg-icon bg-icon-2" />
          <img src={IconCocina} alt="icono 3" className="bg-icon bg-icon-3" />
          <img src={IconSenderismo} alt="icono 4" className="bg-icon bg-icon-4" />
        </div>
        <div className="experience-grid">
          <div className="experience-item">
            <img src={Huerta} alt="Experiencia 1" className="experience-img" />
            <Link to="/servicios/huerta" className="experience-overlay">
              <span>HUERTA</span>
            </Link>
          </div>
          <div className="experience-item">
            <img src={Entrenamiento} alt="Experiencia 2" className="experience-img" />
            <Link to="/servicios/entrenamiento" className="experience-overlay">
              <span>ENTRENAMIENTO</span>
            </Link>
          </div>
          <div className="experience-item">
            <img src={Cocina} alt="Experiencia 3" className="experience-img" />
            <Link to="/servicios/cocina" className="experience-overlay">
              <span>COCINA</span>
            </Link>
          </div>
          <div className="experience-item">
            <img src={Senderismo} alt="Experiencia 4" className="experience-img" />
            <Link to="/servicios/senderismo" className="experience-overlay">
              <span>SENDERISMO</span>
            </Link>
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
            <img src={Cascada} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Te invitamos a esta maravillosa experiencia para ti y toda tu familia</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={RecorrerS} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Vive la emoción de recorrer senderos espectaculares y únete a esta aventura al aire libre, disfrutando cada paso en plena naturaleza.</p>
            </div>
          </div>
          <div className="circular-image-item">
            <img src={CuidadoAnimal} alt="Experiencia con animales" className="circular-image large" />
            <div className="image-caption">
              <p>Únete a esta aventura comprometida con el cuidado animal. Juntos, aprenderemos a respetar, proteger y convivir con los seres que nos rodean.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Cultivando alimentos */}
      <section className="senderismo-section">
        <h2 className="section-title">VOLVER A LA TIERRA CULTIVANDO<br/>NUESTRO ALIMENTO</h2>
        <div className="sdenderismo-image-container">
          <img src={Caminata} alt="Caminata" className="senderismo-image" />
        </div>
      </section>

      {/* Sección de estadísticas de la organización */}
      <section className="stats-section">
        <div className="stat-item">
        <img src={IconCliente} alt="Caminata" className="star-icon" />
          <div className="stat-text">
            <span className="stat-number">+ 5 AÑOS</span>
            <span className="stat-description">REGALANDO EXPERIENCIAS</span>
          </div>
        </div>
        <div className="stat-item">
        <img src={IconMascota} alt="Caminata" className="star-icon" />
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