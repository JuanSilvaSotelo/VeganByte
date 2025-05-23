import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/react.svg';
import image4 from "../assets/images/image-4.png";
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
                <h2 className="logo-text">madre<br/>raíz</h2>
            </div>
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
            </nav>
            <nav className="main-nav">
                <Link to="/" className={location.pathname === '/' ? 'active mx-2' : 'mx-2'}>Inicio</Link>
                <Link to="/quienes-somos" className={location.pathname === '/quienes-somos' ? 'active mx-2' : 'mx-2'}>Quienes Somos</Link>
                <Link to="/galeria" className={location.pathname === '/galeria' ? 'active mx-2' : 'mx-2'}>Galería</Link>
                <Link to="/blog" className={location.pathname === '/blog' ? 'active mx-2' : 'mx-2'}>Blog</Link>
                <Link to="/calendar" className={location.pathname === '/calendar'? 'active mx-2' : 'mx-2'}>
                    <img className="calendar" alt="calendar" src={image4} />
                </Link>
            </nav>
        </header>
    );
}

export default Header;