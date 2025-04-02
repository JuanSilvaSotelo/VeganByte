import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchActiveUsers();
    fetchEvents();
  }, []);

  const fetchActiveUsers = async () => {
    try {
      const response = await axios.get('/api/admin/usuarios-activos');
      setActiveUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/admin/eventos');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="admin-container">
      <nav className="admin-sidebar">
        <h2>Panel Admin</h2>
        <ul>
          <li><Link to="/admin/usuarios">Usuarios Activos</Link></li>
          <li><Link to="/admin/eventos">Gestión de Eventos</Link></li>
          <li><Link to="/admin/estadisticas">Estadísticas</Link></li>
        </ul>
      </nav>
      
      <div className="admin-content">
        <Routes>
          <Route path="usuarios" element={<UsersList users={activeUsers} />} />
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
      await axios.post('/api/admin/eventos', newEvent);
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