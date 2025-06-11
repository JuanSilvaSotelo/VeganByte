import React from 'react';
import '../styles/PCEntrenamiento.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Import assets for the page
import heroImage from '../assets/entrenamiento/rectangle37.png'; // Main image for entrenamiento hero
import leafIcon from '../assets/entrenamiento/leaf_icon.svg'; // Decorative leaf icon
import principiantesImg from '../assets/entrenamiento/principiantes.png'; // Image for Principiantes
import intermedioImg from '../assets/entrenamiento/intermedio.png';     // Image for Intermedio
import expertosImg from '../assets/entrenamiento/expertos.png';         // Image for Expertos
import tavoImg from '../assets/entrenamiento/tavo_buitrago.png';        // Image for Tavo Buitrago
import annieImg from '../assets/entrenamiento/annie_pineda.png';         // Image for Annie Pineda

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
            <img src={heroImage} alt="Entrenamiento Madre Raíz" />
          </div>
          <div className="entrenamiento-hero-text-container">
            <img src={leafIcon} alt="" className="leaf-icon leaf-icon-top-left" />
            <img src={leafIcon} alt="" className="leaf-icon leaf-icon-top-right" />
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
            <img src={leafIcon} alt="" className="leaf-icon leaf-icon-bottom-left" />
            <img src={leafIcon} alt="" className="leaf-icon leaf-icon-bottom-right" />
          </div>
        </section>

        {/* Media Montaña Section */}
        <section className="entrenamiento-media-montana-section">
          <h2>Media Montaña</h2>
          <div className="entrenamiento-niveles-container">
            <div className="entrenamiento-nivel-item">
              <img src={principiantesImg} alt="Principiantes" />
              <h3>PRINCIPIANTES</h3>
            </div>
            <div className="entrenamiento-nivel-item">
              <img src={intermedioImg} alt="Intermedio" />
              <h3>INTERMEDIO</h3>
            </div>
            <div className="entrenamiento-nivel-item">
              <img src={expertosImg} alt="Expertos" />
              <h3>EXPERTOS</h3>
            </div>
          </div>
          <p className="info-text">N grupos de 1 o 2 sesiones (mínimo facturar $600000)</p>
          <button className="entrenamiento-contactanos-btn">Contáctanos</button>
        </section>

        {/* Testimonials Section */}
        <section className="entrenamiento-testimonials-section">
          <div className="entrenamiento-testimonial-item tavo-testimonial">
            <img src={tavoImg} alt="Tavo Buitrago" />
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
            <img src={annieImg} alt="Annie Pineda" />
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default PCEntrenamiento;