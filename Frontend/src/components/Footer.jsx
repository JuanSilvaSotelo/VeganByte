import React from 'react';
import logo from '../assets/react.svg'; // Asegúrate que esta es la ruta correcta al logo principal
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-left">
                    <span className="brand-name">CASAMADRERAIZ</span>
                    {/* <img src={instagramLogo} alt="Instagram" className="instagram-logo" /> */}
                    <img src={logo} alt="Casa Madre Raiz Logo" className="footer-logo" />
                </div>
                <div className="footer-right">
                    <span className="help-text">¿Necesitas ayuda?</span>
                    <span className="phone-number">+57 311 265 0586</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;