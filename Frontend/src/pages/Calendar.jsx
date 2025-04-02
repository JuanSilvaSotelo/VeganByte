import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/Calendar.css';  // Updated path
import { useNavigate } from 'react-router-dom';

moment.locale('es');
const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación y rol del usuario
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setIsAdmin(userRole === 'admin');

    // Cargar eventos
    fetchEvents();
  }, []);

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
    if (!isAuthenticated) {
      navigate('/register');
      return;
    }

    if (isAdmin) {
      // Redirigir al formulario de creación de eventos
      navigate('/admin/crear-evento', {
        state: { date: slotInfo.start }
      });
    } else {
      // Redirigir al formulario de agendamiento
      navigate('/agendar-evento', {
        state: { date: slotInfo.start }
      });
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

  return (
    <div className="calendar-container">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
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
    </div>
  );
};

export default Calendar;