import React from 'react';
import '../styles/PCEntrenamiento.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import assets for the page
import Ellipse5 from '../assets/entrenamiento/Ellipse-5.png'; // Main image for entrenamiento hero
import starlogo from '../assets/entrenamiento/star_logo.svg'; // Decorative leaf icon
import Rectangle37 from '../assets/entrenamiento/Rectangle-37.png'; // Image for Principiantes
import Ellipse6 from '../assets/entrenamiento/Ellipse-6.png'; // Image for Intermedio
import Ellipse7 from '../assets/entrenamiento/Ellipse-7.png'; // Image for Expertos
import Ellipse11  from '../assets/entrenamiento/Ellipse-11.png'; // Image for Tavo Buitrago
import Ellipse12 from '../assets/entrenamiento/Ellipse-12.png'; // Image for Annie Pineda

function PCEntrenamiento() {
  return (
    <div className="pc-entrenamiento-page">
      {/* Header Section */}
      <Header />

      {/* Main Content Section */}
      <main className="entrenamiento-main-content">
        {/* Hero Section for Entrenamiento */}
        <section className="entrenamiento-hero-section">
          <div className="entrenamiento-hero-image-container">
            <img src={Rectangle37} alt="Entrenamiento Madre Raíz" />
          </div>
          <div className="entrenamiento-hero-text-container">
            <img src={starlogo} alt="" className="leaf-icon leaf-icon-top-left" />
            <img src={starlogo} alt="" className="leaf-icon leaf-icon-top-right" />
            <h2>ENTRENAMIENTO</h2>
            <p>
              Entrenamientos dirigidos por Tavo Buitrago y Annie Pineda, dos de
              los atletas más importantes del país en trail running y ciclismo de montaña,
              amplia experiencia en la preparación física de deportistas a
              nivel nacional e internacional con el fin de potenciar en
              ellos todas sus capacidades físicas brindándoles las
              herramientas y conocimientos propios para que sean mucho más
              que atletas.
            </p>
            <img src={starlogo} alt="" className="leaf-icon leaf-icon-bottom-left" />
            <img src={starlogo} alt="" className="leaf-icon leaf-icon-bottom-right" />
          </div>
        </section>

        {/* Media Montaña Section */}
        <section className="entrenamiento-media-montana-section">
          <h2>Media Montaña</h2>
          <div className="entrenamiento-niveles-container">
            <div className="entrenamiento-nivel-item">
              <img src={Ellipse5} alt="Principiantes" />
              <h3>PRINCIPIANTES</h3>
            </div>
            <div className="entrenamiento-nivel-item">
              <img src={Ellipse6} alt="Intermedio" />
              <h3>INTERMEDIO</h3>
            </div>
            <div className="entrenamiento-nivel-item">
              <img src={Ellipse7} alt="Expertos" />
              <h3>EXPERTOS</h3>
            </div>
          </div>
          <p className="info-text">N grupos de 1 o 2 sesiones (mínimo facturar $600000)</p>
          <button className="entrenamiento-contactanos-btn">Contáctanos</button>
        </section>

        {/* Testimonials Section */}
        <section className="entrenamiento-testimonials-section">
          <div className="entrenamiento-testimonial-item tavo-testimonial">
            <img src={Ellipse11} alt="Tavo Buitrago" />
            <div className="entrenamiento-testimonial-text">
              <h3>TAVO BUITRAGO</h3>
              <p>
                Compartiremos rutas en Sotaquirá, probablemente uno de los
                pueblos más aptos en Colombia para la práctica del atletismo en montaña,
                cuenta con todos los ingredientes para vivir entrenamientos a todos los niveles.
                Justo detrás del pueblo está gran parte de la cordillera oriental
                de los Andes Colombianos, toda su cresta limita con las
                montañas boyacenses y santandereanas.
              </p>
            </div>
          </div>

          <div className="entrenamiento-testimonial-item annie-testimonial">
            <div className="entrenamiento-testimonial-text">
              <h3>ANNIE PINEDA</h3>
              <p>
                Podremos recorrer todo tipo de senderos, inclinaciones, tipos
                de terrenos técnicos y altitudes entre los 2500 y 3900 msnm.
                También es necesario un especial entrenar aquí, por las instalaciones de Casa
                Madre Raíz, por la seguridad constante y la poca frecuencia
                del ser humano por sus caminos mientras disfrutamos de paisajes paradisíacos.
              </p>
            </div>
            <img src={Ellipse12} alt="Annie Pineda" />
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PCEntrenamiento;