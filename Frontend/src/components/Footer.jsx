import React from 'react';
import logo from '../assets/LOGO CMR.png'; // Asegúrate que esta es la ruta correcta al logo principal
import whatsappIcon from '../assets/whatsapp.png'; // Asegúrate que esta es la ruta correcta al icono de WhatsApp
import instagramIcon from '../assets/instagram.png'; // Asegúrate que esta es la ruta correcta al icono de Instagram
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-background"></div>
            <div className="footer-content">
                <div className="footer-left">
                    <img src={logo} alt="Casa Madre Raiz Logo" className="footer-logo" />
                </div>
                <div className="footer-right">
                    <span className="help-text">¿Necesitas ayuda?</span>
                    <div className="contact-info">
                        <img src={whatsappIcon} alt="WhatsApp" className="icon" />
                        <span className="phone-number">+57 311 265 0586</span>
                    </div>
                    <div className="contact-info">
                        <img src={instagramIcon} alt="Instagram" className="icon" />
                        <span className="instagram-user">CASAMADRERAIZ</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;