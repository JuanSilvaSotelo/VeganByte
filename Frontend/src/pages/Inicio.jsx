import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Inicio() {
  return (
    <div className="madre-raiz-container">
      <Header />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-image">
          <img src="/images/hero-image.jpg" alt="Paisaje Madre Raíz" /> {/* Reemplaza con la ruta de tu imagen de fondo */}
          <div className="hero-overlay">
            <div className="logo-large">
              <img src="/images/madre-raiz-logo-large.png" alt="Madre Raíz Logo Grande" /> {/* Reemplaza con la ruta de tu logo grande */}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 1: VOLVER A LA TIERRA... */}
      <section className="section-one">
        <h2>VOLVER A LA TIERRA CON LOS PIES Y LOS SENTIDOS EN EL PRESENTE</h2>
        <div className="image-grid">
          <div className="image-item">
            <img src="/images/image1.jpg" alt="Imagen 1" /> {/* Reemplaza con la ruta de tu imagen */}
            <div className="logo-overlay">
              <img src="/images/madre-raiz-logo-small.png" alt="Madre Raíz Logo Pequeño" /> {/* Reemplaza con la ruta de tu logo pequeño */}
            </div>
          </div>
          <div className="image-item">
            <img src="/images/image2.jpg" alt="Imagen 2" /> {/* Reemplaza con la ruta de tu imagen */}
            <div className="logo-overlay">
              <img src="/images/madre-raiz-logo-small.png" alt="Madre Raíz Logo Pequeño" /> {/* Reemplaza con la ruta de tu logo pequeño */}
            </div>
          </div>
          <div className="image-item">
            <img src="/images/image3.jpg" alt="Imagen 3" /> {/* Reemplaza con la ruta de tu imagen */}
            <div className="logo-overlay">
              <img src="/images/madre-raiz-logo-small.png" alt="Madre Raíz Logo Pequeño" /> {/* Reemplaza con la ruta de tu logo pequeño */}
            </div>
          </div>
          <div className="image-item">
            <img src="/images/image4.jpg" alt="Imagen 4" /> {/* Reemplaza con la ruta de tu imagen */}
            <div className="logo-overlay">
              <img src="/images/madre-raiz-logo-small.png" alt="Madre Raíz Logo Pequeño" /> {/* Reemplaza con la ruta de tu logo pequeño */}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: VIVIR A LA TIERRA... */}
      <section className="section-two">
        <h2>VIVIR A LA TIERRA RECONECTANDO LA VIDA DE TODOS LOS ANIMALES</h2>
        <div className="circular-images">
          <div className="circular-image">
            <img src="/images/circular1.jpg" alt="Imagen Circular 1" /> {/* Reemplaza con la ruta de tu imagen */}
            <p>Te invitamos a esta experiencia para ti y para la tierra</p> {/* Reemplaza con tu texto */}
          </div>
          <div className="circular-image">
            <img src="/images/circular2.jpg" alt="Imagen Circular 2" /> {/* Reemplaza con la ruta de tu imagen */}
            <p>Te invitamos a esta experiencia para ti y para la tierra</p> {/* Reemplaza con tu texto */}
          </div>
          <div className="circular-image">
            <img src="/images/circular3.jpg" alt="Imagen Circular 3" /> {/* Reemplaza con la ruta de tu imagen */}
            <p>Te invitamos a esta experiencia para ti y para la tierra</p> {/* Reemplaza con tu texto */}
          </div>
        </div>
      </section>

      {/* Sección 3: VOLVER A LA TIERRA CONECTANDO NUESTRA ALMA */}
      <section className="section-three">
        <h2>VOLVER A LA TIERRA CONECTANDO NUESTRA ALMA</h2>
        <div className="full-width-image">
          <img src="/images/full-width.jpg" alt="Imagen Ancho Completo" /> {/* Reemplaza con la ruta de tu imagen */}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Inicio;