import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    tipo_Documento: 'Cedula de ciudadania',
    Numero_documento: '',
    Sexo: 'Masculino',
    Correo: '',
    ConfirmarCorreo: '',
    Contacto: '',
    fecha_Nacimiento: '',
    Direccion: '',
    Contraseña: '',
    ConfirmarContraseña: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.Correo !== formData.ConfirmarCorreo) {
      return setError('Los correos no coinciden');
    }

    if (formData.Contraseña !== formData.ConfirmarContraseña) {
      return setError('Las contraseñas no coinciden');
    }

    try {
      setLoading(true);
      const { ConfirmarCorreo, ConfirmarContraseña, ...userData } = formData;
      
      const response = await axios.post('/api/auth/register', userData);
      
      if (response.status === 201) {
        setSuccess('¡Registro exitoso! Por favor inicia sesión');
        setFormData({
          Nombre: '',
          Apellido: '',
          tipo_Documento: 'Cedula de ciudadania',
          Numero_documento: '',
          Sexo: 'Masculino',
          Correo: '',
          ConfirmarCorreo: '',
          Contacto: '',
          fecha_Nacimiento: '',
          Direccion: '',
          Contraseña: '',
          ConfirmarContraseña: ''
        });
      }
    } catch (err) {
        const errorMessage = err.response?.data?.error?.message || 
                            err.message || 
                            "Error en el registro";
        setError(errorMessage); 
      }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Header />
      <main>
        <div className="register-container">
          <h2 className='register'>REGISTRARSE</h2>
          
          {error && (<div className="error-message">{error} {}</div>)}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <Input
                label="Nombres"
                name="Nombre"
                type="text"
                value={formData.Nombre}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellidos"
                name="Apellido"
                type="text"
                value={formData.Apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <Input
                label="Correo Electrónico"
                name="Correo"
                type="email"
                value={formData.Correo}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirmar Correo"
                name="ConfirmarCorreo"
                type="email"
                value={formData.ConfirmarCorreo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="input-container">
                <label htmlFor="tipo_Documento">Tipo de Documento</label>
                <select
                  id="tipo_Documento" // Agregamos un id para el label
                  name="tipo_Documento"
                  value={formData.tipo_Documento}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Cedula de ciudadania">Cédula</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula extranjero">Cédula Extranjera</option>
                </select>
              </div>
              <Input
                    label="Numero de documento"
                    name="Numero_documento"
                    type="number"
                    value={formData.Numero_documento}
                    onChange={handleChange}
                    min="100000"
                    max="9999999999"
                    required
                />
            </div>

            <div className="row">
            <div className="input-container">
                <label htmlFor="Sexo">Sexo</label>
                <select
                  id="Sexo" // Agregamos un id para el label
                  name="Sexo"
                  value={formData.Sexo}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <Input
                label="Fecha de Nacimiento"
                name="fecha_Nacimiento"
                type="date"
                value={formData.fecha_Nacimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
            <Input
                label="Teléfono"
                name="Contacto"
                type="tel"
                value={formData.Contacto}
                onChange={handleChange}
                required
              />
              <Input
                label="Dirección"
                name="Direccion"
                type="text"
                value={formData.Direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <Input
                label="Contraseña"
                name="Contraseña"
                type="password"
                value={formData.Contraseña}
                onChange={handleChange}
                required
              />
              <Input
                label="Confirmar Contraseña"
                name="ConfirmarContraseña"
                type="password"
                value={formData.ConfirmarContraseña}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Register;