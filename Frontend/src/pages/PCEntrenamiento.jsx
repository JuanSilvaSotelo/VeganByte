import React from 'react';
import '../styles/PCEntrenamiento.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import assets for the page
import StarBlack from "../assets/Icons/StarBlack.png";
import hojas from "../assets/Icons/natural_food1.svg";

import PrincipalEntrenamiento from '../assets/entrenamiento/PRINCIPAL_ENTRENAMIENTO.jpg';
import EntrenaPrincipiante from "../assets/entrenamiento/PRINCIPIANTES_ENTRENAMIENTO.jpg";
import EntrenaMedio from "../assets/entrenamiento/MEDIO_ENTRENAMIENTO.jpg";
import EntrenaExperto from "../assets/entrenamiento/EXPERTO_ENTRENAMIENTO.jpg";
import Tavo from "../assets/entrenamiento/TAVO-BUITRAGO.jpg";
import Anna from "../assets/entrenamiento/ANNA-PINEDA.jpg";



function PCEntrenamiento() {
  return (
    <div className="pc-entrenamiento-page">
      {/* Header Section */}
      <Header />

      <section className="entrenamiento-hero-section">
        <div className="hero-content-entrenamiento">
          <img src={StarBlack} alt="estrella" className="star" />
          <h1>Entrenamiento</h1>
          <img src={StarBlack} alt="estrella" className="star" />
        </div>
        <div>
        <img src={PrincipalEntrenamiento} alt="Entrnamiento inicial" className='entrenamiento-image1'/>
        <div className='decoration-entrenamiento'>
        <img src={hojas} alt="hojas" className='decorationE decoration1'/>
        <img src={hojas} alt="hojas" className='decorationE decoration2'/>
        <img src={hojas} alt="hojasla" className='decorationE decoration3'/>
        <img src={hojas} alt="hojas" className='decorationE decoration4'/>
        </div>
        <p className='entrenamiento-textInicial'>Entrenamientos dirigidos por Tavo Buitrago y Annie Pineda, dos de <br />
          los atletas más importantes del país en Trail running y montaña,<br />
          múltiples ganadores de competencias a nivel nacional e<br />
          internacional con gran trayectoria en baja, media y alta montaña;<br />
          quienes te compartirán toda su experiencia y conocimientos<br />
          dirigidos primero al ser humano, antes que al atleta.</p> 
        </div>
      </section>

        {/* Media Montaña Section */}
        <section className="entrenamiento-media-montana-section">
          <h2>Media Montaña</h2>
          <div className="entrenamiento-niveles-container">
            <div className="entrenamiento-nivel-item">
              <div className="image-wrapper">
                <img src={EntrenaPrincipiante} alt="Principiantes" className='principiantes'/>
                <div className="overlay-text">
                  <p>Principiantes</p>
                </div>
              </div>
            </div>
            <div className="entrenamiento-nivel-item">
              <div className="image-wrapper">
                <img src={EntrenaMedio} alt="Intermedio" className='intermedios' />
                <div className="overlay-text">
                  <p>Intermedios</p>
                </div>
              </div>
            </div>
            <div className="entrenamiento-nivel-item">
              <div className="image-wrapper">
                <img src={EntrenaExperto} alt="Expertos" className='expertos' />
                <div className="overlay-text">
                  <p>Expertos</p>
                </div>
              </div>
            </div>
          </div>
          <p className="info-text">$120.000 por 1 o 2 personas (Persona adicional: $60.000)</p>
          <a href="https://wa.link/v6qfvb" className="entrenamiento-contactanos-btn">Mas detalles</a>
        </section>

        {/* Testimonials Section */}
        <section className="entrenamiento-testimonials-section">
          <div className="entrenamiento-testimonial-item tavo-testimonial">
            <img src={Tavo} alt="Tavo Buitrago" />
            <div className="entrenamiento-testimonial-text">
              <h3>TAVO BUITRAGO</h3>
              <p>
              Compartiremos rutas en Sotaquirá, probablemente uno de los pueblos más aptos en Colombia
              para la práctica del atletismo en montaña, cuenta con todos los ingredientes para vivir
              entrenamientos a todos los niveles. Justo detrás del pueblo está gran parte de la cordillera oriental
              de los Andes Colombianos, toda su cresta limita con las montañas boyacenses y santandereanas.
              </p>
            </div>
          </div>

          <div className="entrenamiento-testimonial-item annie-testimonial">
            <div className="entrenamiento-testimonial-text">
              <h3>ANNIE PINEDA</h3>
              <p>
              Podremos recorrer todo tipo de senderos, inclinaciones, tipos de terrenos técnicos y altitudes entre
              los 2500 y 3900 msnm. También es realmente especial entrenar aquí, por las instalaciones de Casa
              Madre Raíz, por la seguridad constante y la poca frecuencia del ser humano por sus caminos
              mientras disfrutamos de paisajes paradisíacos.
              </p>
            </div>
            <img src={Anna} alt="Anna Pineda" />
          </div>
        </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PCEntrenamiento;