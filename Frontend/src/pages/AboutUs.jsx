import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BottomNavigation } from '../components/BottomNavigation';
import StarBlack from "../assets/Icons/StarBlack.png";
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-section">
      <Header />
    <div className="pc-quienes-somos-container">
      <div className="content-box">
        <div className="title-section">
          <img src={StarBlack} alt="estrella" className="star" />
          <h1>¿QUIÉNES SOMOS?</h1>
          <img src={StarBlack} alt="estrella" className="star" />
        </div>
        <p className="text-block-1">
        Somos una familia colombiana que migró hace unos pocos
        años de la ciudad al campo, al inicio como todo cambio,
        vino acompañado de miedo e incertidumbre. Sin embargo,
        poco a poco e inevitablemente fuimos descubriendo la
        magia de vivir en medio de la naturaleza, con el tiempo nos
        dimos cuenta que había sido la mejor decisión para
        encontrarnos con un regalo inigualable que nos tenía
        guardado la vida: un hogar en medio de la Cordillera de
        los Andes Boyacenses.
        </p>
        <p className="text-block-2">
        Al año de estar viviendo aquí, decidimos transformar este
        lugar en una Casa-Taller donde pudiéramos compartir con
        más personas las experiencias enriquecedoras de vivir aquí
        y así nació Casa madre raíz, un proyecto que busca
        recopilar en talleres y experiencias (de fines de semana o
        pasadias) los saberes y aprendizajes de cada uno de los
        integrantes de la casa en relación con la naturaleza y la
        vida de todos los seres que la habitamos, comprendiendo
        también que cada persona que nos visita es un mundo
        increíble por descubrir, del cual aprenderemos.
        </p>
      </div>
    </div>

      <Footer />
    </div>
  );
}

export default AboutUs;