import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BottomNavigation } from '../components/BottomNavigation';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-section">
      <Header />
    <div className="pc-quienes-somos-container">
      <div className="content-box">
        <div className="title-section">
          <span className="star">*</span>
          <h1>¿QUIÉNES SOMOS?</h1>
          <span className="star">*</span>
        </div>
        <p className="text-block-1">
          La sazón y la cocina casera de Alicia (Madre de la casa) ha sido una
          gran experiencia que ha dejado un recuerdo inolvidable en nuestros
          visitantes y los 2 comentarios que más se han repetido:
          "Si yo comiera así todos los días, cambiaría mis hábitos alimenticios
          ya mismo" y "Jamás creí que la alimentación a base de plantas
          pudiera ser tan deliciosa, llena de sabores y oportunidades".
        </p>
        <p className="text-block-2">
          Lo que más nos mueve en Casa Madre Raíz es mostrar que se puede vivir
          respetando y no siendo parte de la explotación de todos los demás
          animales, por eso en este taller queremos educar sobre veganismo a
          través de la alimentación, que cada uno de nuestros participantes se
          pueda llevar el mensaje de que es un mundo increíble que vale toda la
          pena descubrir, seguir explorando y eligiendo.
        </p>
      </div>
    </div>

      <Footer />
    </div>
  );
}

export default AboutUs;