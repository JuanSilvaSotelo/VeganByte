import axios from 'axios';
import React, { useState } from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Input from '../components/Input';

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
    ConfirmarContraseña: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones del cliente
    if (formData.Correo !== formData.ConfirmarCorreo) {
      return setError('Los correos no coinciden');
    }

    if (formData.Contraseña !== formData.ConfirmarContraseña) {
      return setError('Las contraseñas no coinciden');
    }

    if (!/^\d{6,10}$/.test(formData.Numero_documento)) {
      return setError('El documento debe tener entre 6 y 10 dígitos');
    }

    if (!/^\d{10}$/.test(formData.Contacto)) {
      return setError('El teléfono debe tener 10 dígitos');
    }

    try {
      setLoading(true);
      const { ConfirmarCorreo, ConfirmarContraseña, ...userData } = formData;
      
      // Convertir campos numéricos a números
      userData.Numero_documento = Number(userData.Numero_documento);
      userData.Contacto = Number(userData.Contacto);

      console.log('Enviando datos:', userData);
      
      const response = await axios.post('/api/auth/register', userData);

      if (response.status === 201) {
        setSuccess('¡Registro exitoso! Por favor inicia sesión');
        // Reiniciar formulario
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
          ConfirmarContraseña: '',
        });
      }
    } catch (err) {
      console.error('Error en registro:', err.response?.data || err.message);
      const serverError = err.response?.data?.error || err.message;
      setError(serverError?.message || 'Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Header />
      <main>
        <div className="register-container">
          <h2 className="register">REGISTRARSE</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <Input
                label="Nombres"
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellidos"
                name="Apellido"
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
                <label>Tipo de Documento</label>
                <select
                  name="tipo_Documento"
                  value={formData.tipo_Documento}
                  onChange={handleChange}
                  required
                >
                  <option value="Cedula de ciudadania">Cédula</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Cedula extranjero">Cédula Extranjera</option>
                </select>
              </div>
              <Input
                label="Número de documento"
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
                <label>Sexo</label>
                <select
                  name="Sexo"
                  value={formData.Sexo}
                  onChange={handleChange}
                  required
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
                pattern="[0-9]{10}"
                required
              />
              <Input
                label="Dirección"
                name="Direccion"
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
                minLength="8"
                required
              />
              <Input
                label="Confirmar Contraseña"
                name="ConfirmarContraseña"
                type="password"
                value={formData.ConfirmarContraseña}
                onChange={handleChange}
                minLength="8"
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