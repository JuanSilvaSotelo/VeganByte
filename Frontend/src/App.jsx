/*import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';

function App() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre: '',
    Apellido: '',
    tipo_Documento: 'Cedula de ciudadania',
    Sexo: 'Masculino',
    Correo: '',
    Contacto: '',
    fecha_Nacimiento: '',
    Direccion: '',
    Contraseña: ''
  });
  const [error, setError] = useState(null);
  const [dbStatus, setDbStatus] = useState('❌ Sin conexión');

  // Verificar conexión con el backend y DB al cargar
  useEffect(() => {
    testBackendConnection();
    fetchClientes();
  }, []);

  const testBackendConnection = async () => {
    try {
      const response = await axios.get('http://localhost:5000/test-db');
      if (response.data.database === 'OK') {
        setDbStatus('✅ Conectado a Backend y DB');
      }
    } catch (error) {
      setDbStatus('❌ Error de conexión');
      setError(error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clientes:', error);
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/Cliente', nuevoCliente);
      fetchClientes();
      setNuevoCliente({
        Nombre: '',
        Apellido: '',
        tipo_Documento: 'Cedula de ciudadania',
        Sexo: 'Masculino',
        Correo: '',
        Contacto: '',
        fecha_Nacimiento: '',
        Direccion: '',
        Contraseña: ''
      });
    } catch (error) {
      console.error('Error creando cliente:', error);
      setError(error);
    }
  };

  const handleChange = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container">
      <Header />
      
      <div className="status-bar">
        <h2>Estado de conexión: {dbStatus}</h2>
        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error.message}</p>
            {error.response?.data?.error && <p>Detalles: {error.response.data.error}</p>}
          </div>
        )}
      </div>

      <h1>Gestión de Clientes</h1>
      
      <form onSubmit={handleSubmit} className="client-form">
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={nuevoCliente.Nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Apellido"
          placeholder="Apellido"
          value={nuevoCliente.Apellido}
          onChange={handleChange}
          required
        />
        
        <select
          name="tipo_Documento"
          value={nuevoCliente.tipo_Documento}
          onChange={handleChange}
          required
        >
          <option value="Cedula de ciudadania">Cédula</option>
          <option value="Pasaporte">Pasaporte</option>
          <option value="Cedula extranjero">Cédula extranjera</option>
        </select>

        <select
          name="Sexo"
          value={nuevoCliente.Sexo}
          onChange={handleChange}
          required
        >
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <input
          type="email"
          name="Correo"
          placeholder="Correo electrónico"
          value={nuevoCliente.Correo}
          onChange={handleChange}
          required
        />
        
        <input
          type="tel"
          name="Contacto"
          placeholder="Número de contacto"
          value={nuevoCliente.Contacto}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />
        
        <input
          type="date"
          name="fecha_Nacimiento"
          value={nuevoCliente.fecha_Nacimiento}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="Direccion"
          placeholder="Dirección"
          value={nuevoCliente.Direccion}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          value={nuevoCliente.Contraseña}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Cliente</button>
      </form>

      <div className="client-list">
        <h2>Clientes Registrados</h2>
        <ul>
          {clientes.map(cliente => (
            <li key={cliente.Id_Cliente}>
              {cliente.Nombre} {cliente.Apellido} - {cliente.Correo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/styles.css';

function App() {
    return (
      <ErrorBoundary>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} /> {/* Ruta por defecto */}
            </Routes>
        </Router>
      </ErrorBoundary>
    );
}
<script src="http://localhost:8097"></script>
export default App;
