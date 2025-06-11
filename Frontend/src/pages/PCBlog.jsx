import React from 'react';
import '../styles/PCBlog.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondo from '../assets/Fondo.png';
import rectangle240 from '../assets/images/Rectangle-240.jpg';
import rectangle242 from '../assets/images/Rectangle-242.jpg';
import rectangle243 from '../assets/images/Rectangle-243.jpg';

function PCBlog() {
  return (
    <div className="pc-blog-container">
      <Header />
      <section className="blog-hero" style={{ backgroundImage: `url(${fondo})` }}>
        <h1>Blog Madre Raíz</h1>
        <p>Recetas, consejos y novedades sobre cocina basada en plantas y vida saludable.</p>
      </section>
      <main className="blog-main">
        <article className="blog-post">
          <img src={rectangle240} alt="Receta 1" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>Receta: Ensalada de Quinoa y Aguacate</h2>
            <p>Descubre cómo preparar una deliciosa y nutritiva ensalada de quinoa con aguacate, perfecta para cualquier ocasión.</p>
            <a href="#" className="blog-read-more">Leer más</a>
          </div>
        </article>
        <article className="blog-post">
          <img src={rectangle242} alt="Receta 2" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>Consejos para una Alimentación Saludable</h2>
            <p>Te compartimos los mejores consejos para mantener una dieta equilibrada y saludable basada en plantas.</p>
            <a href="#" className="blog-read-more">Leer más</a>
          </div>
        </article>
        <article className="blog-post">
          <img src={rectangle243} alt="Receta 3" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>¿Por qué elegir productos locales?</h2>
            <p>Conoce los beneficios de consumir productos locales y cómo impacta positivamente en tu salud y el medio ambiente.</p>
            <a href="#" className="blog-read-more">Leer más</a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default PCBlog;