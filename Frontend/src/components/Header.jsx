import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import star from "../assets/Icons/ESTRELLA_LOGO.png";
import LogoEmpresa from "../assets/Icons/LogoEmpresa.png";
import LogoEmpresa2 from "../assets/Icons/LogoEmpresa2.png";
import { isUserAuthenticated, getUserEmail, logoutUser } from '../services/authService';
import '../styles/Header.css';

function Header() {
    const isAuthenticated = isUserAuthenticated();
    const userEmail = getUserEmail();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <header className={headerClasses}>
            <div className="header-top">
                <nav className={`auth-nav ${scrolled ? 'scrolled-text' : ''}`}>
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
                </nav>
            </div>
            <div className="header-bottom">
                <div className="logo-container">
                    <Link to="/">
                        {scrolled ? (
                            <img src={LogoEmpresa2} alt="Logo" className="logo"/>
                        ) : (
                            <img src={LogoEmpresa} alt="Logo" className="logo"/>
                        )}
                    </Link>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                    <div className="hamburger"></div>
                </div>
                <nav className={`main-nav ${scrolled ? 'scrolled-text' : ''} ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/about-us"  id="dropbtn" className={location.pathname === '/about-us' ? 'active mx-2' : 'mx-2'}>● Quienes Somos</Link>
                    <div className="dropdown">
                        <span className="dropbtn">● Servicios <i className="arrow down"></i></span>
                        <div className="dropdown-content">
                            <Link to="/servicios/cocina"><img src={star} alt="Logo" className='star'></img> Cocina</Link>
                            <Link to="/servicios/huerta"><img src={star} alt="Logo" className='star'></img> Huerta</Link>
                            <Link to="/servicios/senderismo"><img src={star} alt="Logo" className='star'></img> Senderismo</Link>
                            <Link to="/servicios/entrenamiento"><img src={star} alt="Logo" className='star'></img> Entrenamiento</Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <span className="dropbtn">● Social <i className="arrow down"></i></span>
                        <div className="dropdown-content">
                            <Link to="/social/galeria"><img src={star} alt="Logo" className='star'></img> Galería</Link>
                            <Link to="/social/blog"><img src={star} alt="Logo" className='star'></img> Blog</Link>
                        </div>
                    </div>
                    <Link to="/calendar"  id="dropbtn" className={location.pathname === '/calendar' ? 'active mx-2' : 'mx-2'}> ● Calendario</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;