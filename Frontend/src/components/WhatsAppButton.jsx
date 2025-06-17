import React from 'react';
import '../styles/WhatsAppButton.css';
import IconWhatsapp from '../assets/Icons/IconWhatsapp.png';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.link/v6qfvb"
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={IconWhatsapp} alt="WhatsApp" className="whatsapp-icon" />
      <span className="whatsapp-text">Escríbenos...</span>
    </a>
  );
};

export default WhatsAppButton;