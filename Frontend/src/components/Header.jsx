import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';
import image4 from "../assets/images/image-4.png";

function Header() {
    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="Logo" />
                <span> Casa taller Madre Raíz</span>
            </div>
            <nav>
                <Link to="/login" className="mx-2">Iniciar Sesión</Link>
                <Link to="/register" className="mx-2">Registrarse</Link>
            </nav>
            <nav>
                <Link to="/" className="mx-2">Inicio</Link>
                <a href="#" className="mx-2">Quienes Somos</a>
                <a href="#" className="mx-2">Galería</a>
                <a href="#" className="mx-2">Blog</a>
                <a href="#" className="mx-2">
                    <img className="calendar" alt="calendar" src={image4} />
                </a>
            </nav>
        </header>
    );
}

export default Header;