import React from "react";
import { BottomNavigation } from "../components/BottomNavigation";
import Header from "../components/Header";

import ellipse3 from "../assets/images/ellipse-3.png";
import ellipse4 from "../assets/images/ellipse-4.png";
import fondo15 from "../assets/images/fondo-1-5.png";
import image4 from "../assets/images/image-4.png";
import image9 from "../assets/images/image-9.png";
import image10 from "../assets/images/image-10.png";
import image11 from "../assets/images/image-11.png";
import image12 from "../assets/images/image-12.png";
import image13 from "../assets/images/image-13.png";
import image14 from "../assets/images/image-14.png";
import image15 from "../assets/images/image-15.png";
import line4 from "../assets/images/line-4.svg";
import line27 from "../assets/images/line-27.svg";
import rectangle210 from "../assets/images/rectangle-210.png";
import rectangle211 from "../assets/images/rectangle-211.png";
import rectangle242 from "../assets/images/rectangle-242.png";
import rectangle243 from "../assets/images/rectangle-243.png";
import rectangle244 from "../assets/images/rectangle-244.png";
import rectangle245 from "../assets/images/rectangle-245.png";

export const Inicio = () => {
  return (
    <div>
    <Header />
    <main>
    <div className="Inicio">
      <div className="overlap">
        <img className="line" alt="Line" src={line27} />

        <div className="overlap-4">
          {[rectangle242, rectangle243, rectangle244, rectangle245].map((src, index) => (
            <img key={index} className={`rectangle-${index + 4}`} alt="Rectangle" src={src} />
          ))}
          {[image12, image13, image14, image15].map((src, index) => (
            <img key={index} className={`image-${index + 3}`} alt="Image" src={src} />
          ))}
          <img className="fondo" alt="Fondo" src={fondo15} />
        </div>

        <img className="rectangle-8" alt="Rectangle" src={rectangle211} />
        <img className="ellipse" alt="Ellipse" src={ellipse3} />
        <img className="ellipse-2" alt="Ellipse" src={ellipse4} />
        <img className="image-7" alt="Image" src={image9} />
        <img className="image-8" alt="Image" src={image10} />
      </div>

      <div className="overlap-5">
        <BottomNavigation
          bottomnavigationVariant="default"
          className="footer"
          overlapGroupClassName="bottom-navigation-instance"
        />
        <div className="text-wrapper-15">¿Necesitas ayuda?</div>
        <div className="text-wrapper-16">+57 311 265 0586</div>
        <div className="text-wrapper-17">CASAMADRERAIZ</div>
      </div>

      <p className="text-wrapper-18">
        Volver a la tierra respetando la vida de todos los animales
      </p>

      <div className="overlap-6">
        <p className="text-wrapper-19">
          Te invitamos a esta maravillosa experiencia para ti y toda tu familia
        </p>
      </div>

      <p className="text-wrapper-20">
        Te invitamos a esta maravillosa experiencia para ti y toda tu familia
      </p>

      <p className="text-wrapper-21">
        Te invitamos a esta maravillosa experiencia para ti y toda tu familia
      </p>

      <p className="text-wrapper-22">
        Volver a la tierra cultivando nuestro alimento
      </p>

      <div className="arrow-left">
        <div className="overlap-7">
          <img className="line-2" alt="Line" src={line4} />
          <img className="line-3" alt="Line" src={line4} />
        </div>
      </div>

      <div className="arrow-right">
        <div className="overlap-8">
          <img className="line-4" alt="Line" src={line4} />
          <img className="line-5" alt="Line" src={line4} />
        </div>
      </div>

      <p className="element-a-OS-REGALANDO">
        <span className="span">
          + 5 AÑOS
          <br />
        </span>
        <span className="text-wrapper-23">REGALANDO EXPERIENCIAS</span>
      </p>

      <p className="element-a-OS-velando-por">
        <span className="span">
          + 7 AÑOS
          <br />
        </span>
        <span className="text-wrapper-23">
          Velando por la protección de los animales
        </span>
      </p>
    </div>
    </main>
    </div>
  );
};

export default Inicio;