import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL, getAuthHeaders } from '../services/authService';
import CreateEventForm from '../components/CreateEventForm';
import Modal from '../components/Modal';
import '../styles/Admin.css';

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
    estado: 'Disponible',
    tipo: 'experiencia'
  });

  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleOpenCreateEventModal = () => {
    setShowCreateEventModal(true);
  };

  const handleCloseCreateEventModal = () => {
    setShowCreateEventModal(false);
  };

  const handleOpenEditEventModal = (event) => {
    console.log('Evento a editar:', event);
    setEventToEdit(event);
    setShowEditEventModal(true);
  };

  const handleCloseEditEventModal = () => {
    setEventToEdit(null);
    setShowEditEventModal(false);
  };

  useEffect(() => {
    cargarUsuarios();
    cargarEventos();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_URL}/admin/usuarios-activos`, {
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

  const cargarEventos = useCallback(async () => {
    try {
      console.log('Requesting events from:', `${API_URL}/eventos`);
      const response = await axios.get(`${API_URL}/eventos`, getAuthHeaders());
      console.log('Eventos cargados (raw):', response.data);
      // Asegurarse de que los IDs sean correctos
      const processedEvents = response.data.map(event => {
        if (event.tipo === 'experiencia' && event.Id_Experiencias === undefined) {
          console.warn('Experiencia sin Id_Experiencias:', event);
        }
        if (event.tipo === 'taller' && event.Id_Taller === undefined) {
          console.warn('Taller sin Id_Taller:', event);
        }
        return event;
      });
      setEventos(processedEvents);

    } catch (error) {
      console.error('Error al cargar eventos:', error.response?.data || error.message);
    }
  }, [setEventos]);

  const handleDeleteEvent = async (id, tipo) => {
    console.log('handleDeleteEvent called with ID:', id, 'and Type:', tipo);
    if (window.confirm(`¿Estás seguro de que quieres eliminar este ${tipo}?`)) {
      try {
      const response = await fetch(`${API_URL}/eventos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ tipo })
      });
        alert(`${tipo} eliminado exitosamente`);
        cargarEventos(); // Recargar eventos después de la eliminación
      } catch (error) {
        console.error(`Error al eliminar ${tipo}:`, error.response?.data || error.message);
        alert(`Error al eliminar ${tipo}: ` + (error.response?.data?.message || error.message));
      }
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
          {console.log('Admin: loading', loading)}
          {console.log('Admin: error', error)}
          {console.log('Admin: eventos', eventos)}
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
          <button onClick={handleOpenCreateEventModal} className="create-event-button">Crear Nuevo Evento</button>

          <div className="event-list">
            {eventos.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Fecha</th>
                    <th>Hora Inicio</th>
                    <th>Hora Fin</th>
                    <th>Valor</th>
                    <th>Capacidad</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {eventos.map(event => {
                    console.log('Evento en Admin.jsx:', event);
                    return (
                    <tr key={event.Id_Experiencias || event.Id_Taller}>
                      <td>{event.Tipo || event.nombre_Taller}</td>
                      <td>{event.Descripcion || event.descripcion}</td>
                      <td>{new Date(event.Fecha || event.fecha).toLocaleDateString()}</td>
                      <td>{event.Hora_Inicio}</td>
                      <td>{event.Hora_Fin}</td>
                      <td>{event.Valor || event.valor}</td>
                      <td>{event.cant_Personas || event.cant_Personas}</td>
                      <td>{event.tipo}</td>
                      <td>
                        <button onClick={() => handleOpenEditEventModal(event)} className="edit-button">Editar</button>
                        <button onClick={() => {
                          console.log('Attempting to delete event:', event.Id_Experiencias || event.Id_Taller, event.tipo);
                          handleDeleteEvent(event.Id_Experiencias || event.Id_Taller, event.tipo);
                        }} className="delete-button">Eliminar</button>
                      </td>
                    </tr>
                  );})
                  }
                </tbody>
              </table>
            ) : (
              <p>No hay eventos disponibles.</p>
            )}
          </div>



          {showCreateEventModal && (
            <Modal onClose={handleCloseCreateEventModal}>
              <CreateEventForm
                closeModal={handleCloseCreateEventModal}
                fetchEvents={cargarEventos}
              />
            </Modal>
          )}

          {showEditEventModal && (
            <Modal onClose={handleCloseEditEventModal}>
              <CreateEventForm
                closeModal={handleCloseEditEventModal}
                fetchEvents={cargarEventos}
                eventToEdit={eventToEdit}
              />
            </Modal>
          )}
        </section>
      </div>
    </div>
  );
};

export default Admin;