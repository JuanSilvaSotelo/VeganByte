import React from 'react';
import '../styles/PCSenderismo.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import assets for the page
import StarBlack from "../assets/Icons/StarBlack.png";
import hojas from "../assets/Icons/natural_food1.svg";

import Principalsenderismo from '../assets/senderismo/IMG_PRINCIPAL_SENDERISMO.jpg';
import CasaFrailejones from '../assets/senderismo/CasaFrailejones.jpg';
import CascadaChontales from '../assets/senderismo/CascadaChontales.jpg';
import CascadaJungla from '../assets/senderismo/CascadaJungla.jpg';
import LagunaNegra from '../assets/senderismo/LagunaNegra.jpg';
import LagunaRica from '../assets/senderismo/LagunaRica.jpg';
import LagunaSeca from '../assets/senderismo/LagunaSeca.jpg';
import VeredaAvendaños from '../assets/senderismo/VeredaAvendaños.jpg';

function PCSenderismo() {
  return (
    <div className="senderismo-page">
      {/* Header Section */}
      <Header />

      <section className="senderismo-hero-section">
        <div className="hero-content-senderismo">
          <img src={StarBlack} alt="estrella" className="star" />
          <h1>Senderismo</h1>
          <img src={StarBlack} alt="estrella" className="star" />
        </div>
        <div>
        <img src={Principalsenderismo} alt="senderismo inicial" className='senderismo-image1'/>
        <div className='decoration-senderismo'>
        <img src={hojas} alt="hojas" className='decorationE decoration1'/>
        <img src={hojas} alt="hojas" className='decorationE decoration2'/>
        <img src={hojas} alt="hojasla" className='decorationE decoration3'/>
        <img src={hojas} alt="hojas" className='decorationE decoration4'/>
        </div>
        <p className='senderismo-textInicial'>senderismos dirigidos por Tavo Buitrago y Annie Pineda, dos de <br />
          los atletas más importantes del país en Trail running y montaña,<br />
          múltiples ganadores de competencias a nivel nacional e<br />
          internacional con gran trayectoria en baja, media y alta montaña;<br />
          quienes te compartirán toda su experiencia y conocimientos<br />
          dirigidos primero al ser humano, antes que al atleta.</p> 
        </div>
      </section>

        {/* Media Montaña Section */}
        <section className="senderismo-media-montana-section">
          <h2>Media Montaña</h2>
          <div className="senderismo-niveles-container">
            <div className="senderismo-nivel-item">
              <div className="image-wrapper">
               <img src={CascadaChontales} alt="Principiantes" className='CascadaChontales'/>
                <div className="overlay-text">
                  <p>Cascada Chontales</p>
                </div>
              </div>
              <div className='media-text'>
                <p>Desplazamiento (1hr en carro)<br />
                    Caminata (1hr 30 min aprox)<br /><br />

                    $110.000 por 1 o 2 personas<br />
                    (Persona adicional: $55.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
            <div className="senderismo-nivel-item">
              <div className="image-wrapper">
              <img src={CascadaJungla} alt="Intermedio" className='CascadaJungla' />
                <div className="overlay-text">
                  <p>Cascada + Jungla</p>
                </div>
              </div>
              <div className='media-text'>
                <p>Desplazamiento (1hr en carro)<br />
                  Caminata (1hr 30 min aprox)<br /><br />

                  $130.000 por 1 o 2 personas<br />
                  (Persona adicional: $65.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
            <div className="senderismo-nivel-item">
              <div className="image-wrapper">
                <img src={LagunaSeca} alt="Expertos" className='LagunaSeca' />
                <div className="overlay-text">
                  <p>Laguna Seca</p>
                </div>
              </div>
              <div className='media-text'>
                <p>Desplazamiento (1hr en carro)<br />
                  Caminata (1hr 30 min aprox)<br /><br />

                  $130.000 por 1 o 2 personas<br />
                  (Persona adicional: $65.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
          </div>
        </section>

        {/* Alta montaña Section */}
        <section className="senderismo-altaMontana">
          <h2>Alta Montaña</h2>
          <div className="senderismo-niveles-container">
            <div className="senderismo-item">
              <div className="wrapper-image">
                <img src={LagunaRica} alt="Principiantes" className='LagunaRica'/>
                <div className="overlayText">
                  <p>Laguna Rica</p>
                </div>
              </div>
              <div className='textMedia'>
                <p>Ida y vuelta (2hr en carro)<br />
                    Caminata (7hr aprox)<br /><br />

                    $280.000 por 1 o 2 personas<br />
                    (Persona adicional: $140.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
            <div className="senderismo-item">
              <div className="wrapper-image">
                <img src={LagunaNegra} alt="Intermedio" className='LagunaNegra' />
                <div className="overlayText">
                  <p>Laguna Negra</p>
                </div>
              </div>
              <div className='textMedia'>
                <p>Ida y vuelta (2hr en carro)<br />
                  Caminata (8hr 30 min aprox)<br /><br />

                  $280.000 por 1 o 2 personas<br />
                  (Persona adicional: $140.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
            <div className="senderismo-item">
              <div className="wrapper-image">
                <img src={VeredaAvendaños} alt="Expertos" className='VeredaAvendaños' />
                <div className="overlayText">
                  <p>Vereda Avendaños</p>
                </div>
              </div>
              <div className='textMedia'>
                <p>Ida y vuelta (2hr en carro)<br />
                  Caminata (10hr aprox)<br /><br />

                  $300.000 por 1 o 2 personas<br />
                  (Persona adicional: $150.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
            <div className="senderismo-item">
              <div className="wrapper-image">
                <img src={CasaFrailejones} alt="Intermedio" className='CasaFrailejones' />
                <div className="overlayText">
                  <p>Casa Frailejones</p>
                </div>
              </div>
              <div className='textMedia'>
                <p>Ida y vuelta (2hr en carro)<br />
                  Caminata (4hr 30 min aprox)<br /><br />

                  $190.000 por 1 o 2 personas<br />
                  (Persona adicional: $95.000)</p>
                </div>
                <a href="https://wa.link/v6qfvb" className="senderismo-contactanos-btn">Mas detalles</a>
            </div>
          </div>
        </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PCSenderismo;