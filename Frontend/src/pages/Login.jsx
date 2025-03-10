import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
    return (
        <div>
            <Header />
            <main>
                <div className="login-container">
                    <h2>INICIAR SESIÓN</h2>
                    <Input label="Usuario" type="text" />
                    <Input label="Contraseña" type="password" />
                    <Button>Ingresar</Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Login;