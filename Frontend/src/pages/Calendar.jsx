import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Header from '../components/Header';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../services/authService';
import CreateEventForm from '../components/CreateEventForm'; // Importar el componente CreateEventForm

moment.locale('es');
const localizer = momentLocalizer(moment);



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
      const response = await axios.get(`${API_URL}/eventos`); // Usar axios y la URL base
      const data = response.data; // Acceder a los datos desde axios
      console.log('Datos crudos de eventos recibidos:', data); // Log para inspeccionar datos crudos
      const formattedEvents = data.map(event => {
        console.log('Procesando evento individual:', event); // Log para cada evento
        // Determinar el título y otros campos basados en el tipo
        const title = event.tipo === 'taller' ? event.nombre_Taller : event.Tipo || event.titulo; // Usar nombre_Taller para talleres, Tipo o titulo para experiencias
        const id = event.tipo === 'taller' ? event.Id_Taller : event.Id_Experiencias; // Usar la ID correcta
        if (id === undefined || id === null) {
          console.warn('ID de evento indefinido o nulo para el evento:', event);
        }
        const start = event.fecha ? new Date(event.fecha) : new Date(); // Usar fecha si existe
        const end = event.fecha ? new Date(event.fecha) : new Date(); // Usar fecha si existe

        // Asegurarse de que start y end sean válidos
        if (isNaN(start.getTime())) {
          console.warn('Fecha inválida para el evento:', event);
          // Podrías retornar null o un objeto vacío para filtrar este evento
          // o usar una fecha por defecto, pero es mejor investigar por qué la fecha es inválida
        }

        return {
          id: id,
          title: title,
          start: start,
          end: end,
          desc: event.Descripcion, // Usar Descripcion (puede ser undefined para talleres)
          // Los siguientes campos pueden no existir en todos los tipos, manejar con cuidado
          disponible: event.Disponible, // Asumiendo que existe en ambos o se maneja en el backend
          capacidad: event.cant_Personas, // Usar cant_Personas para experiencias (puede ser undefined para talleres)
          tipo: event.tipo // Mantener el tipo para posible lógica futura
        };
      }).filter(event => event && !isNaN(event.start.getTime())); // Filtrar eventos nulos o con fecha inválida
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
    if (!event || event.id === undefined || event.id === null) {
      console.error('Intento de navegar a un evento con ID inválido:', event);
      return; // Evitar la navegación si el ID no es válido
    }
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
      await axios.post(`${API_URL}/eventos`, newEvent, {
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
            {/* Renderizar el componente CreateEventForm y pasarle la función closeModal */}
            <CreateEventForm closeModal={closeModal} selectedDate={selectedDate} fetchEvents={fetchEvents} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;