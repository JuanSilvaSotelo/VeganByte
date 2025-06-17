import React from 'react';
import '../styles/PCBlog.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BLOG_1 from '../assets/blog/BLOG_1.jpg';
import BLOG_2 from '../assets/blog/BLOG_2.jpg';
import BLOG_3 from '../assets/blog/BLOG_3.jpg';

function PCBlog() {
  return (
    <div className="pc-blog-container">
      <Header />
      <div className="leaf-left-top"></div>
      <div className="leaf-left-middle"></div>
      <div className="leaf-left-bottom"></div>
      <div className="leaf-right-top"></div>
      <div className="leaf-right-middle"></div>
      <div className="leaf-right-bottom"></div>
      <section className="blog-hero">
        <h1>Blog Madre Raíz</h1>
      </section>
      <main className="blog-main">
        <article className="blog-post">
          <img src={BLOG_1} alt="Entrenamiento" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>Disfruta de nuestro maravilloso trainning camp desde el 29 de Junio hasta el el 01 de Julio</h2>
            <img src={"HeartIcon"} alt="Heart" className="heart-icon" />
          </div>
        </article>
        <article className="blog-post">
          <img src={BLOG_2} alt="Huerta" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>Acompañanos a esta nueva aventura con la nauturaleza con LA CASA DE LOS FRAILEJONES</h2>
            <img src={"HeartIcon"} alt="Heart" className="heart-icon" />
          </div>
        </article>
        <article className="blog-post">
          <img src={BLOG_3} alt="Senderismo" className="blog-post-img" />
          <div className="blog-post-content">
            <h2>Te invitamos a visitar con nosotros la hermosa CASCADA CHONTALES</h2>
            <img src={"HeartIcon"} alt="Heart" className="heart-icon" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default PCBlog;