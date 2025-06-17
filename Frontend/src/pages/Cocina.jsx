import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BottomNavigation } from '../components/BottomNavigation';
import '../styles/Cocina.css';

import StarBlack from "../assets/Icons/StarBlack.png";
import hojas from "../assets/Icons/natural_food1.svg";
import ImagenPrincipal from "../assets/cocina/IMG_PRINCIPAL_COCINA.jpg";
import imagen1 from "../assets/cocina/IMAGE_1_COCINA.jpg";
import imagen2 from "../assets/cocina/IMAGE_2_COCINA.jpg";
import imagen3 from "../assets/cocina/IMAGE_3_COCINA.jpg";
import embutidos from "../assets/cocina/EMBUTIDOS.jpg";
import Proteinas from "../assets/cocina/PROTEINAS_VEGETALES.jpg";
import tortas from "../assets/cocina/TORTA_SIN_GLUTEN.jpeg";
import panes from "../assets/cocina/PAN_VEGANO.jpg";
import leches from "../assets/cocina/LECHES.jpeg";
import sopas from "../assets/cocina/SOPAS_TRADICIONALES.jpg";
import Desayuno from "../assets/cocina/BASICOS_DEL_DESAYUNO.jpg";
import finalImage from "../assets/cocina/COCINA_IMAGEN_ABAJO.jpg";


const Cocina = () => {
  return (
    <div>
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <section className="cocina-hero-section">
        <div className="hero-content">
          <img src={StarBlack} alt="estrella" className="star" />
          <h1>Cocina a base de plantas</h1>
          <img src={StarBlack} alt="estrella" className="star" />
        </div>
        <div>
        <img src={ImagenPrincipal} alt="Cocina" className='image-principal'/>
        <div className='decoration-cocina'>
        <img src={hojas} alt="hojas" className='decoration decoration1'/>
        <img src={hojas} alt="hojas" className='decoration decoration2'/>
        <img src={hojas} alt="hojasla" className='decoration decoration3'/>
        <img src={hojas} alt="hojas" className='decoration decoration4'/>
        </div>
        <p className='inicial-text'>INCLUYE<br/>
          Todos los insumos para los talleres.<br/>
          Si deseas llevar las preparaciones del taller<br/>
          $30.000 adicionales</p> 
        </div>
      </section>
      {/* Section Two */}
      <section className="section-two">
        <div className="section-two-images">
          <img src={imagen1} alt="Image One" id='image1'/>
          <img src={imagen2} alt="Image Two" id='image2'/>
          <img src={imagen3} alt="Image Three" id='image3'/>
        </div>
        <p className="section-two-text">
        La magia de la cocina de Alicia no solo se saborea, sino que deja una huella imborrable en quienes tienen la dicha de probarla. Con años de experiencia perfeccionando recetas tradicionales y explorando las posibilidades de la alimentación a base de plantas, Alicia ha conquistado corazones y paladares con su sazón inigualable.<br /><br /> 
        Sus clases de cocina son más que una enseñanza culinaria, son una experiencia enriquecedora donde aprenderás a transformar ingredientes de nuestra tierra en platos extraordinarios. Ven y descubre cómo la pasión por la cocina casera puede cambiar tu forma de ver la comida.
        </p>
      </section>

      {/* Módulos Section */}
      <section className="modules-section">
        <h2>Módulos</h2>
        <p className="modules-duration">Duración de cada módulo 2hrs</p>
        <div className="module-grid">
          <div className="module-item">
            <img src={embutidos} alt="Embutidos" />
            <div className="module-text">
              <h3>EMBUTIDOS</h3>
              <p>Sabores intensos y texturas irresistibles, sin ingredientes de origen animal. Perfectos para acompañar tus platos favoritos con el auténtico gusto que te encanta.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={Proteinas} alt="Proteínas Vegetales" />
            <div className="module-text">
              <h3>PROTEÍNAS VEGETALES</h3>
              <p>Ofrecemos una variedad de opciones llenas de sabor, textura y calidad, pensadas para quienes buscan alternativas saludables sin renunciar al placer de comer bien.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={tortas} alt="Tortas Sin Gluten" />
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
            <img src={leches} alt="Leches Vegetales" />
            <div className="module-text">
              <h3>LECHES VEGETALES</h3>
              <p>Desde almendras hasta avena, nuestras leches son una alternativa deliciosa y nutritiva para todos tus batidos, cafés y recetas.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={sopas} alt="Sopas Tradicionales" />
            <div className="module-text">
              <h3>SOPAS TRADICIONALES</h3>
              <p>Reconfortantes y llenas de sabor, hechas con ingredientes frescos y recetas caseras. Perfectas para nutrir el cuerpo y el alma.</p>
            </div>
          </div>
          <div className="module-item">
            <img src={Desayuno} alt="Básicos del Desayuno" />
            <div className="module-text">
              <h3>BÁSICOS DEL DESAYUNO</h3>
              <p>Un desayuno completo sin sacrificios: combina nuestros panes frescos con quesos veganos cremosos y acompaña con una leche vegetal a tu elección.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="final-content">
        <div className="final-section">
          <h2 classname="final-text"> Lo que más nos mueve en
              Casa Madre Raíz es mostrar que se puede vivir respetando y no siendo parte de la explotación
              de todos los demás animales, por eso en este taller queremos educar sobre veganismo a
              través de la alimentación, que cada uno de nuestros participantes se pueda llevar el mensaje
              de que es un mundo increíble que vale toda la pena descubrir, seguir explorando y eligiendo.</h2>
              <img src={finalImage} alt="Imagen final" className="final-section-image" />
          <a href="https://wa.link/v6qfvb" className="contact-button">Mas Detalles</a>
          </div>
          </section>
      <Footer />
    </div>
  );
};

export default Cocina;