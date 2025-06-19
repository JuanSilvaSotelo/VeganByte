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
    estado: 'disponible',
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
      console.log('Eventos cargados:', response.data);
      setEventos(response.data);
    } catch (error) {
      console.error('Error al cargar eventos:', error.response?.data || error.message);
    }
  }, [setEventos]);

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
      
      await axios.post(`${API_URL}/admin/eventos`, eventoData, {
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

          <div className="eventos-list">
            <h4>Eventos Programados</h4>
            <table>
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Valor</th>
                  <th>Capacidad</th>
                  <th>Tipo</th>
                  <th>Disponible</th>
                  <th>Cancelado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {eventos.map((evento, index) => (
                  <tr key={index}>
                    <td>{evento.Titulo || evento.nombre_Taller}</td>
                    <td>{evento.Descripcion}</td>
                    <td>{new Date(evento.Fecha).toLocaleDateString()}</td>
                    <td>{evento.Hora_Inicio} - {evento.Hora_Fin}</td>
                    <td>{evento.Valor}</td>
                    <td>{evento.Capacidad}</td>
                    <td>{evento.tipo}</td>
                    <td>{evento.disponible ? 'Sí' : 'No'}</td>
                    <td>{evento.cancelado ? 'Sí' : 'No'}</td>
                    <td>
                      <button onClick={() => handleOpenEditEventModal(evento)} className="edit-button">Editar</button>
                      {/* <button onClick={() => handleDeleteEvent(evento.Id_Experiencias || evento.Id_Taller, evento.tipo)} className="delete-button">Eliminar</button> */}
                    </td>
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