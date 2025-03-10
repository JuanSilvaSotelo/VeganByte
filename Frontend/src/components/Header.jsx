import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/react.svg';

function Header() {
    return (
        <header>
            <div className="logo-container">
                <img src={logo} alt="Logo" />
                <span>madre * raíz</span>
            </div>
            <nav>
                <Link to="/" className="mx-2">Inicio</Link>
                <a href="#" className="mx-2">Quienes Somos</a>
                <a href="#" className="mx-2">Galería</a>
                <a href="#" className="mx-2">Blog</a>
                <a href="#" className="mx-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 240 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </a>
                <Link to="/login" className="mx-2">Iniciar Sesión</Link>
                <Link to="/register" className="mx-2">Registrarse</Link>
            </nav>
        </header>
    );
}

export default Header;