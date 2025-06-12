import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import image4 from "../assets/images/image-4.png";
import LogoEmpresa from "../assets/images/LogoEmpresa.png";
import LogoEmpresa2 from "../assets/images/LogoEmpresa2.png";
import { isUserAuthenticated, getUserEmail, logoutUser } from '../services/authService';
import '../styles/Header.css';

function Header() {
    const isAuthenticated = isUserAuthenticated();
    const userEmail = getUserEmail();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    
    // Verificar si estamos en la página de inicio
    const isHomePage = location.pathname === '/';
    
    // Efecto para detectar el scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const handleLogout = () => {
        logoutUser();
        window.location.reload(); // Recargar la página para actualizar el estado
    };
    
    // Determinar las clases del header basado en la página y el scroll
    const headerClasses = `site-header ${isHomePage ? 'home-header' : ''} ${scrolled ? 'scrolled' : ''}`;
    
    return (
        <header className={headerClasses}>
            <div className="logo-container">
                <Link to="/">
                    {scrolled ? (
                        <img src={LogoEmpresa2} alt="Logo" className="logo"/>
                    ) : (
                        <img src={LogoEmpresa} alt="Logo" className="logo"/>
                    )}
                </Link>
            </div>
            <nav className="main-nav">
                <Link to="/about-us" className={location.pathname === '/about-us' ? 'active mx-2' : 'mx-2'}>Quienes Somos</Link>
                <div className="dropdown">
                    <span className="dropbtn">Servicios <i className="arrow down"></i></span>
                    <div className="dropdown-content">
                        <Link to="/servicios/cocina">Cocina</Link>
                        <Link to="/servicios/huerta">Huerta</Link>
                        <Link to="/servicios/senderismo">Senderismo</Link>
                        <Link to="/servicios/entrenamiento">Entrenamiento</Link>
                    </div>
                </div>
                <div className="dropdown">
                    <span className="dropbtn">Social <i className="arrow down"></i></span>
                    <div className="dropdown-content">
                        <Link to="/social/galeria">Galería</Link>
                        <Link to="/social/blog">Blog</Link>
                    </div>
                </div>
                <Link to="/calendar" className={location.pathname === '/calendar' ? 'active mx-2' : 'mx-2'}>Calendario</Link>
            </nav>
            <nav className="auth-nav">
                {isAuthenticated ? (
                    <div className="user-info">
                        <span className="user-email">{userEmail}</span>
                        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="mx-2">Iniciar Sesión</Link>
                        <Link to="/register" className="mx-2">Registrarse</Link>
                    </>
                )}
                <Link to="/calendar" className={location.pathname === '/calendar' ? 'active' : ''}>
                    <img className="calendar" alt="calendar" src={image4} />
                </Link>
            </nav>
        </header>
    );
}

export default Header;