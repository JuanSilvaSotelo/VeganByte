import React, { useState, useEffect } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getAuthHeaders, getAdminName, logoutAdmin } from '../../services/authService';
import '../../styles/Admin.css';
import UserManagement from './UserManagement';
import Admin from '../../pages/Admin';

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
      const response = await axios.get(`${API_URL}/admin/usuarios-activos`, getAuthHeaders());
      setActiveUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/eventos`, getAuthHeaders());
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
          <Route path="eventos" element={<Admin />} />
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