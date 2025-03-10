import React from 'react';
import logo from '../assets/react.svg';

function Footer() {
    return (
        <footer>
            <div className="footer-left">
                <span>CASA TALLER</span>
                <img src={logo} alt="Logo" />
            </div>
            <div className="footer-right">
                <span>¿Necesitas ayuda?</span>
                <span>+57 311 265 0586</span>
            </div>
        </footer>
    );
}

export default Footer;