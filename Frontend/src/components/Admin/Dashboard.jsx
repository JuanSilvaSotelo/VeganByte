import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import { getAuthHeaders, getAdminName, logoutAdmin } from '../../services/authService';
import '../../styles/Admin.css';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    fetchActiveUsers();
    fetchEvents();
    setAdminName(getAdminName() || 'Administrador');
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get('/api/admin/usuarios-activos', getAuthHeaders());
      setActiveUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.get('/api/admin/eventos', getAuthHeaders());
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    window.location.href = '/admin/login';
  };

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2>Panel Admin</h2>
        <div className="admin-user-info">
          <p>Bienvenido, {adminName}</p>
        </div>
        <ul>
          <li><Link to="/admin/usuarios">Usuarios Activos</Link></li>
          <li><Link to="/admin/user-management">Gestión de Usuarios</Link></li>
          <li><Link to="/admin/eventos">Gestión de Eventos</Link></li>
          <li><Link to="/admin/estadisticas">Estadísticas</Link></li>
          <li><Link to="/calendar">Calendario de Eventos</Link></li>
          <li><button onClick={handleLogout} className="logout-button">Cerrar Sesión</button></li>
        </ul>
      </nav>
      
      <div className="admin-content">
        <Routes>
          <Route path="usuarios" element={<UsersList users={activeUsers} />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="eventos" element={<EventManagement events={events} />} />
          <Route path="estadisticas" element={<StatsDashboard />} />
        </Routes>
      </div>
    </div>
  );
};

const UsersList = ({ users }) => (
  <div className="users-table">
    <h3>Usuarios Registrados</h3>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Ubicación</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{`${user.Nombre} ${user.Apellido}`}</td>
            <td>{user.Correo}</td>
            <td>{user.Direccion}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EventManagement = ({ events }) => {
  const [newEvent, setNewEvent] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tipo: 'taller'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post('/api/admin/eventos', newEvent, getAuthHeaders());
      setNewEvent({ titulo: '', descripcion: '', fecha: '', tipo: 'taller' });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="event-management">
      <h3>Crear Nuevo Evento</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título del evento"
          value={newEvent.titulo}
          onChange={(e) => setNewEvent({...newEvent, titulo: e.target.value})}
        />
        <textarea
          placeholder="Descripción"
          value={newEvent.descripcion}
          onChange={(e) => setNewEvent({...newEvent, descripcion: e.target.value})}
        />
        <input
          type="date"
          value={newEvent.fecha}
          onChange={(e) => setNewEvent({...newEvent, fecha: e.target.value})}
        />
        <select
          value={newEvent.tipo}
          onChange={(e) => setNewEvent({...newEvent, tipo: e.target.value})}
        >
          <option value="taller">Taller</option>
          <option value="experiencia">Experiencia</option>
          <option value="evento">Evento Especial</option>
        </select>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

const StatsDashboard = () => (
  <div className="stats-container">
    <h3>Estadísticas de Uso</h3>
    <div className="stats-grid">
      <div className="stat-card">
        <h4>Usuarios Activos</h4>
        <p>Loading...</p>
      </div>
      <div className="stat-card">
        <h4>Eventos Activos</h4>
        <p>Loading...</p>
      </div>
    </div>
  </div>
);

export default AdminDashboard;