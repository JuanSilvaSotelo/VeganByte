import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

// Configurar la URL base de axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

axios.defaults.baseURL = API_URL;

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [nuevoEvento, setNuevoEvento] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    capacidad: 0,
    estado: 'disponible',
    tipo: 'experiencia'
  });

  useEffect(() => {
    cargarUsuarios();
    cargarEventos();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/admin/usuarios-activos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Respuesta del servidor:', response.data);
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error.response?.data || error.message);
      setError('Error al cargar los usuarios. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const cargarEventos = async () => {
    try {
      const response = await axios.get('/api/admin/eventos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Eventos cargados:', response.data);
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error.response?.data || error.message);
    }
  };

  const handleEventoChange = (e) => {
    const { name, value } = e.target;
    setNuevoEvento(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const crearEvento = async (e) => {
    e.preventDefault();
    try {
      // Asegurarse de que la capacidad sea un número
      const eventoData = {
        ...nuevoEvento,
        capacidad: parseInt(nuevoEvento.capacidad),
        hora: nuevoEvento.fecha ? new Date(nuevoEvento.fecha).toTimeString().split(' ')[0].substring(0, 5) : '12:00'
      };
      
      console.log('Enviando datos de evento:', eventoData);
      
      await axios.post('/api/admin/eventos', eventoData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      setNuevoEvento({
        titulo: '',
        descripcion: '',
        fecha: '',
        capacidad: 0,
        estado: 'disponible',
        tipo: 'experiencia'
      });
      
      alert('Evento creado exitosamente');
      cargarEventos();
    } catch (error) {
      console.error('Error al crear evento:', error.response?.data || error.message);
      alert('Error al crear evento: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Panel de Admin</h2>
        <div className="admin-user-info">
          <p>Bienvenido, Admin</p>
        </div>
        <ul>
          <li><a href="#usuarios">Usuarios Registrados</a></li>
          <li><a href="#eventos">Gestión de Eventos</a></li>
          <li><a href="/calendar">Calendario de Eventos</a></li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <div className="admin-content">
        <section id="usuarios" className="users-table">
          <h3>Usuarios Registrados</h3>
          {loading && <p>Cargando usuarios...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !error && (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Fecha de Nacimiento</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td>{usuario.Nombre}</td>
                    <td>{usuario.Apellido}</td>
                    <td>{usuario.Correo}</td>
                    <td>{new Date(usuario.fecha_Nacimiento).toLocaleDateString()}</td>
                    <td>{usuario.Direccion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section id="eventos" className="event-management">
          <h3>Gestión de Eventos</h3>
          <form onSubmit={crearEvento}>
            <input
              type="text"
              name="titulo"
              placeholder="Título del evento"
              value={nuevoEvento.titulo}
              onChange={handleEventoChange}
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción del evento"
              value={nuevoEvento.descripcion}
              onChange={handleEventoChange}
              required
            />
            <input
              type="datetime-local"
              name="fecha"
              value={nuevoEvento.fecha}
              onChange={handleEventoChange}
              required
            />
            <input
              type="number"
              name="capacidad"
              placeholder="Capacidad máxima"
              value={nuevoEvento.capacidad}
              onChange={handleEventoChange}
              required
            />
            <select
              name="tipo"
              value={nuevoEvento.tipo}
              onChange={handleEventoChange}
              required
            >
              <option value="experiencia">Experiencia</option>
              <option value="taller">Taller</option>
            </select>
            <button type="submit">Crear Evento</button>
          </form>

          <div className="eventos-list">
            <h4>Eventos Programados</h4>
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Capacidad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento, index) => (
                  <tr key={index}>
                    <td>{evento.titulo}</td>
                    <td>{new Date(evento.fecha).toLocaleString()}</td>
                    <td>{evento.capacidad}</td>
                    <td>{evento.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;