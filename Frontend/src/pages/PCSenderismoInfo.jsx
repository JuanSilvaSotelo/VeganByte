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
                <img src={CascadaChontales} alt="Principiantes" className='principiantes'/>
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
                <img src={CascadaJungla} alt="Intermedio" className='intermedios' />
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
                <img src={LagunaSeca} alt="Expertos" className='expertos' />
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

        {/* Testimonials Section */}
        <section className="senderismo-testimonials-section">
          <div className="senderismo-testimonial-item tavo-testimonial">
            <img src={"Tavo"} alt="Tavo Buitrago" />
            <div className="senderismo-testimonial-text">
              <h3>TAVO BUITRAGO</h3>
              <p>
              Compartiremos rutas en Sotaquirá, probablemente uno de los pueblos más aptos en Colombia
              para la práctica del atletismo en montaña, cuenta con todos los ingredientes para vivir
              senderismos a todos los niveles. Justo detrás del pueblo está gran parte de la cordillera oriental
              de los Andes Colombianos, toda su cresta limita con las montañas boyacenses y santandereanas.
              </p>
            </div>
          </div>

          <div className="senderismo-testimonial-item annie-testimonial">
            <div className="senderismo-testimonial-text">
              <h3>ANNIE PINEDA</h3>
              <p>
              Podremos recorrer todo tipo de senderos, inclinaciones, tipos de terrenos técnicos y altitudes entre
              los 2500 y 3900 msnm. También es realmente especial entrenar aquí, por las instalaciones de Casa
              Madre Raíz, por la seguridad constante y la poca frecuencia del ser humano por sus caminos
              mientras disfrutamos de paisajes paradisíacos.
              </p>
            </div>
            <img src={"Anna"} alt="Anna Pineda" />
          </div>
        </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PCSenderismo;