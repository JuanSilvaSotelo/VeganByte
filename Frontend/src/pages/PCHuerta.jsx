import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/PCHuerta.css';

import PrincipalHuerta from '../assets/huerta/PRINCIPAL_HUERTA.jpg';
import StarBlack from '../assets/Icons/StarBlack.png';

function PCHuerta() {
  return (
    <div className="pc-huerta-container">
      <Header />
        <section className="huerta-section">
          <div className="hero-huerta">
            <img src={StarBlack} alt="estrella" className="star" />
            <h1>HUERTA ORGÁNICA</h1>
            <img src={StarBlack} alt="estrella" className="star" />
          </div>
        </section>

        <section className="huerta-intro-section">
          <div className="huerta-image-wrapper">
            <img src={PrincipalHuerta} alt="Huerta Orgánica" className="huerta-main-image" />
          </div>
          <div className="huerta-text-block">
            <img src={"hojaImage"} alt="Hoja Decorativa" className="hoja-top-right" />
            <p>
              EN ESTE TALLER, EXPLORAMOS LA ÍNTIMA CONEXIÓN ENTRE LOS ALIMENTOS Y EL
              SUELO, PROFUNDIZANDO EN DIVERSOS MÉTODOS DE SIEMBRA. ADEMÁS, NOS
              SUMERGIMOS EN UNA EXPERIENCIA PRÁCTICA QUE INVOLUCRA LA SIEMBRA DE
              PLANTULAS DE HORTALIZAS, LA COSECHA DE PRODUCTOS FRESCOS Y LAS TAREAS
              COTIDIANAS QUE CONFORMAN LA RUTINA DE UNA HUERTA. CONECTAMOS
              APASIONADAMENTE SOBRE LA RESILIENCIA DE LA AGRICULTURA ORGÁNICA EN
              LA PRESERVACIÓN DE NUESTRO PLANETA Y DESCUBRIMOS CÓMO CADA UNO DE
              NOSOTROS PUEDE ACERCARSE A ESTA PRÁCTICA DIRECTAMENTE DESDE
              NUESTRAS DECISIONES DIARIAS.
            </p>
            <img src={"hojaImage"} alt="Hoja Decorativa" className="hoja-bottom-left" />
          </div>
        </section>

        <section className="huerta-basics-section">
          <h2>BÁSICOS DE LA HUERTA ORGÁNICA</h2>
          <div className="basics-content">
            <div className="basics-text">
              <img src={"arbolImage"} alt="Árbol" className="arbol-icon" />
              <p>Duración del Taller 2 hr</p>
              <p>$120.000 por 1 o 2 personas (Persona adicional: $60.000)</p>
              <img src={"arbolImage"} alt="Árbol" className="arbol-icon" />
            </div>
            <div className="basics-image-wrapper">
              <img src={"paisajeImage"} alt="Paisaje" className="paisaje-image" />
            </div>
          </div>
          <button className="contact-button">Contáctanos</button>
        </section>
      <Footer />
    </div>
  );
}

export default PCHuerta;