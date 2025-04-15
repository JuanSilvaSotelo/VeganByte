import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../components/Header';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

moment.locale('es');
const localizer = momentLocalizer(moment);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    capacidad: 0,
    estado: 'disponible'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación y rol del usuario
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    setIsAuthenticated(!!token || !!adminToken);
    setIsAdmin(!!adminToken);

    // Cargar eventos
    fetchEvents();
  }, []);

  useEffect(() => {
    // Actualizar fechas disponibles cuando cambien los eventos
    const dates = events.map(event => moment(event.start).format('YYYY-MM-DD'));
    setAvailableDates(dates);
  }, [events]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/eventos');
      const data = await response.json();
      const formattedEvents = data.map(event => ({
        id: event._id,
        title: event.titulo,
        start: new Date(event.fecha),
        end: new Date(event.fecha),
        desc: event.descripcion,
        disponible: event.disponible,
        capacidad: event.capacidad
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    const selectedDate = moment(slotInfo.start).format('YYYY-MM-DD');
    
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    if (isAdmin) {
      // Mostrar modal para crear evento
      setSelectedDate(slotInfo.start);
      setNewEvent(prev => ({
        ...prev,
        fecha: moment(slotInfo.start).format('YYYY-MM-DD'),
        hora: moment(slotInfo.start).format('HH:mm')
      }));
      setShowEventModal(true);
    } else {
      // Redirigir al formulario de agendamiento si hay eventos disponibles
      if (availableDates.includes(selectedDate)) {
        navigate('/agendar-evento', {
          state: { date: slotInfo.start }
        });
      }
    }
  };

  const handleSelectEvent = (event) => {
    if (!isAuthenticated) {
      navigate('/registro');
      return;
    }

    // Mostrar detalles del evento o formulario de inscripción
    navigate(`/evento/${event.id}`);
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`${API_URL}/api/eventos`, newEvent, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Limpiar formulario y cerrar modal
      setNewEvent({
        titulo: '',
        descripcion: '',
        fecha: '',
        hora: '',
        capacidad: 0,
        estado: 'disponible'
      });
      setShowEventModal(false);
      
      // Recargar eventos
      fetchEvents();
    } catch (error) {
      console.error('Error al crear evento:', error);
    }
  };

  const closeModal = () => {
    setShowEventModal(false);
  };

  return (
    <div className="calendar-container">
      <Header />
      {isAdmin && (
        <button 
          className="create-event-button" 
          onClick={() => setShowEventModal(true)}
        >
          <i className="fas fa-plus"></i> Crear Evento
        </button>
      )}
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 450 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        dayPropGetter={(date) => {
          const dateStr = moment(date).format('YYYY-MM-DD');
          return {
            className: availableDates.includes(dateStr) ? '' : 'disabled-date',
            style: {
              cursor: availableDates.includes(dateStr) ? 'pointer' : 'not-allowed',
              backgroundColor: availableDates.includes(dateStr) ? '#ffffff' : '#f0f0f0'
            }
          };
        }}
        messages={{
          next: 'Siguiente',
          previous: 'Anterior',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          noEventsInRange: 'No hay eventos en este rango.'
        }}
      />
      
      {/* Modal para crear eventos (solo visible para administradores) */}
      {showEventModal && (
        <div className="event-modal-overlay">
          <div className="event-modal">
            <h2>Crear Nuevo Evento</h2>
            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label htmlFor="titulo">Título del Evento</label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={newEvent.titulo}
                  onChange={handleEventChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={newEvent.descripcion}
                  onChange={handleEventChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={newEvent.fecha}
                  onChange={handleEventChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={newEvent.hora}
                  onChange={handleEventChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="capacidad">Capacidad</label>
                <input
                  type="number"
                  id="capacidad"
                  name="capacidad"
                  value={newEvent.capacidad}
                  onChange={handleEventChange}
                  min="1"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={newEvent.estado}
                  onChange={handleEventChange}
                  required
                >
                  <option value="disponible">Disponible</option>
                  <option value="completo">Completo</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              
              <div className="modal-buttons">
                <button type="button" onClick={closeModal} className="cancel-button">Cancelar</button>
                <button type="submit" className="submit-button">Crear Evento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;