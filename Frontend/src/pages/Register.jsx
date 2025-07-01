import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
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
    Contrasena: '',
    ConfirmarContrasena: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState(''); // Added for testing fieldErrors issue
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFieldErrors({});

    const newFieldErrors = {};

    if (!formData.Nombre) newFieldErrors.Nombre = 'El nombre es requerido.';
    if (!formData.Apellido) newFieldErrors.Apellido = 'El apellido es requerido.';
    if (!formData.Numero_documento) newFieldErrors.Numero_documento = 'El número de documento es requerido.';
    if (!formData.Correo) newFieldErrors.Correo = 'El correo electrónico es requerido.';
    if (formData.Correo !== formData.ConfirmarCorreo) {
      newFieldErrors.ConfirmarCorreo = 'Los correos no coinciden.';
    }
    if (!formData.Contacto) newFieldErrors.Contacto = 'El teléfono es requerido.';
    if (!formData.fecha_Nacimiento) newFieldErrors.fecha_Nacimiento = 'La fecha de nacimiento es requerida.';
    if (!formData.Direccion) newFieldErrors.Direccion = 'La dirección es requerida.';
    if (!formData.Contrasena) newFieldErrors.Contrasena = 'La contrasena es requerida.';
    if (formData.Contrasena !== formData.ConfirmarContrasena) {
      newFieldErrors.ConfirmarContrasena = 'Las contrasenas no coinciden.';
    }

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    try {
      setLoading(true);
      const { ConfirmarCorreo, ConfirmarContrasena, Contrasena, ...dataToSend } = formData;
       dataToSend.Contrasena = String(Contrasena);
      
      const response = await registerUser(dataToSend);
      
      if (response.status === 201) {
        console.log('Registration successful, navigating to verification-sent. Response status:', response.status);
        navigate('/verification-sent');
      } else {
        console.log('Registration response status:', response.status);
        setError('Error en el registro: ' + response.status);
      }
    } catch (err) {
        const errorMessage = err.response?.data?.error?.message || 
                            err.message || 
                            "Error en el registro";
        setError(errorMessage); 
        console.error('Registration error:', err);
      } finally {
        setLoading(false);
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
      <main className="register-main">
        <div className="register-container">
          <h2 className='register'>REGISTRARSE</h2>
          
          {error && (<div className="error-message">{error}</div>)}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <Input
                label="Nombres"
                name="Nombre"
                type="text"
                value={formData.Nombre}
                onChange={handleChange}
                error={fieldErrors.Nombre}
              />
              <Input
                label="Apellidos"
                name="Apellido"
                type="text"
                value={formData.Apellido}
                onChange={handleChange}
                error={fieldErrors.Apellido}
              />
            </div>

            <div className="row">
              <Input
                label="Correo Electrónico"
                name="Correo"
                type="email"
                value={formData.Correo}
                onChange={handleChange}
                error={fieldErrors.Correo}
              />
              <Input
                label="Confirmar Correo"
                name="ConfirmarCorreo"
                type="email"
                value={formData.ConfirmarCorreo}
                onChange={handleChange}
                error={fieldErrors.ConfirmarCorreo}
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
                    error={fieldErrors.Numero_documento}
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
                error={fieldErrors.fecha_Nacimiento}
              />
            </div>

            <div className="row">
            <Input
                label="Teléfono"
                name="Contacto"
                type="text"
                value={formData.Contacto}
                onChange={handleChange}
                pattern="[0-9]{10}" // Assuming a 10-digit phone number format
                maxLength="10" // Limiting to 10 digits
                error={fieldErrors.Contacto}
              />
              <Input
                label="Dirección"
                name="Direccion"
                type="text"
                value={formData.Direccion}
                onChange={handleChange}
                error={fieldErrors.Direccion}
              />
            </div>

            <div className="row">
              <Input
                label="Contrasena"
                name="Contrasena"
                type="password"
                value={formData.Contrasena}
                onChange={handleChange}
              />
              <Input
                label="Confirmar Contrasena"
                name="ConfirmarContrasena"
                type="password"
                value={formData.ConfirmarContrasena}
                onChange={handleChange}
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