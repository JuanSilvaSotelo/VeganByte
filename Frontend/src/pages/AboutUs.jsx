import React from 'react';
import '../styles/AboutUs.css'; // Asumiendo que crearás un archivo CSS para esta página

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>Quienes Somos</h1>
      <p>
        Entrenamientos dirigidos por Tavo Buitrago y Annie Pineda, dos de los
        atletas más importantes del país en Trail running y montaña,
        múltiples ganadores de competencias a nivel nacional e
        internacional con gran trayectoria en baja, media y alta montaña;
        quienes te compartirán toda su experiencia y conocimientos
        dirigidos primero al ser humano, antes que al atleta.
      </p>
      <h2>Media Montaña</h2>
      <p>
        Podremos recorrer todo tipo de senderos, inclinaciones, tipos de
        terrenos técnicos y altitudes entre los 2500 y 3900 msnm. También es
        realmente especial entrenar aquí, por las instalaciones de Casa Madre
        Raíz, por la seguridad constante y la poca frecuencia del ser humano
        por sus caminos mientras disfrutamos de paisajes paradisíacos.
      </p>
      <p>
        Compartiremos rutas en Sotaquirá, probablemente uno de los pueblos más aptos en Colombia
        para la práctica del atletismo en montaña, cuenta con todos los ingredientes para vivir
        entrenamientos a todos los niveles. Justo detrás del pueblo está gran parte de la cordillera oriental
        de los Andes Colombianos, toda su cresta limita con las montañas boyacenses y santandereanas.
      </p>
      <p>$120.000 por 1 o 2 personas (Persona adicional: $60.000)</p>
      {/* Aquí se pueden añadir más elementos como imágenes, iconos, etc. */}
      {/* Para los elementos como "principiantes", "intermedio", "expertos", "tavo buitrago", "annie pineda" y los rectángulos/círculos, se necesitará más trabajo de maquetación y CSS. */}
    </div>
  );
}

export default AboutUs;