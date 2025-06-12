import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/Cocina.css';
import imageOne from '../assets/PC Cocina.png';
import imageTwo from '../assets/PC Cocina.png';
import imageThree from '../assets/Rectangle 55.png';
import embuditos from '../assets/embuditos.png';
import proteinasVegetales from '../assets/proteinas-vegetales.png';
import tortasSinGluten from '../assets/tortas-sin-gluten.png';
import panes from '../assets/panes.png';
import lechesVegetales from '../assets/leches-vegetales.png';
import sopasTradicionales from '../assets/sopas-tradicionales.png';
import basicosDesayuno from '../assets/basicos-desayuno.png';

const Cocina = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <section className="cocina-hero-section">
        <div className="hero-content">
          <h1>COCINA</h1>
          <p>En Casa Madre Raíz, la cocina es el corazón de nuestro hogar, donde la tradición se fusiona con la innovación para crear experiencias culinarias inolvidables. Aquí, cada plato es una celebración de la vida, preparado con amor y conciencia, utilizando ingredientes frescos y de temporada que nutren tanto el cuerpo como el alma.</p>
          <button className="hero-button">¡Quiero aprender!</button>
        </div>
      </section>
      {/* Section Two */}
      <section className="section-two">
        <div className="section-two-images">
          <img src={imageOne} alt="Image One" />
          <img src={imageTwo} alt="Image Two" />
          <img src={imageThree} alt="Image Three" />
        </div>
        <p className="section-two-text">
          La sazón y la cocina casera de Alicia (Madre de la casa) ha sido una gran experiencia que ha dejado un recuerdo inolvidable en nuestros visitantes y los 2 comentarios que más se han repetido:
          "Si yo comiera así todos los días, cambiaría mis hábitos alimenticios ya mismo" y "Jamás creí que la alimentación a base de plantas pudiera ser tan deliciosa, llena de sabores y oportunidades".
        </p>
      </section>

      {/* Módulos Section */}
      <section className="modules-section">
        <h2>Módulos</h2>
        <p className="modules-duration">Duración de cada módulo 2hrs</p>
        <div className="module-grid">
          <div className="module-item">
            <img src={embuditos} alt="Embuditos" />
            <div className="module-text">
              <h3>EMBUTIDOS</h3>
              <p>Sabores intensos y texturas irresistibles, sin ingredientes de origen animal. Perfectos para acompañar tus platos favoritos con el auténtico gusto que te encanta.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={proteinasVegetales} alt="Proteínas Vegetales" />
            <div className="module-text">
              <h3>PROTEÍNAS VEGETALES</h3>
              <p>Ofrecemos una variedad de opciones llenas de sabor, textura y calidad, pensadas para quienes buscan alternativas saludables sin renunciar al placer de comer bien.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={tortasSinGluten} alt="Tortas Sin Gluten" />
            <div className="module-text">
              <h3>TORTAS SIN GLUTEN</h3>
              <p>Dulces y esponjosas, creadas con ingredientes naturales para que disfrutes sin preocupaciones. Perfectas para cualquier ocasión.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={panes} alt="Panes" />
            <div className="module-text">
              <h3>PANES</h3>
              <p>Con una combinación única, nuestros panes son un deleite para el desayuno o la cena, con el equilibrio perfecto entre suavidad y sabor.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={lechesVegetales} alt="Leches Vegetales" />
            <div className="module-text">
              <h3>LECHES VEGETALES</h3>
              <p>Desde almendras hasta avena, nuestras leches son una alternativa deliciosa y nutritiva para todos tus batidos, cafés y recetas.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={sopasTradicionales} alt="Sopas Tradicionales" />
            <div className="module-text">
              <h3>SOPAS TRADICIONALES</h3>
              <p>Reconfortantes y llenas de sabor, hechas con ingredientes frescos y recetas caseras. Perfectas para nutrir el cuerpo y el alma.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={basicosDesayuno} alt="Básicos del Desayuno" />
            <div className="module-text">
              <h3>BÁSICOS DEL DESAYUNO</h3>
              <p>Un desayuno completo sin sacrificios: combina nuestros panes frescos con quesos veganos cremosos y acompaña con una leche vegetal a tu elección.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <BottomNavigation />
      <Footer />
    </div>
  );
};

export default Cocina;