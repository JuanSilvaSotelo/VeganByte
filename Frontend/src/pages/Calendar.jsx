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
import Footer from '../components/Footer';
import { BottomNavigation } from '../components/BottomNavigation';

moment.locale('es');
const localizer = momentLocalizer(moment);



const Calendar = () => {
   const [events, setEvents] = useState([]);

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
    estado: 'Disponible'
  });
  const [currentDate, setCurrentDate] = useState(new Date()); // Nuevo estado para la fecha actual del calendario

  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticación y rol del usuario
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');

    setIsAdmin(!!adminToken);
    console.log('Calendar mounted. isAdmin:', !!adminToken);

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
        console.log('Original event object:', event);
        console.log('Assigned ID:', id);
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
    
    console.log('handleSelectSlot triggered.');
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    const userIsAuthenticated = !!token || !!adminToken;

    console.log('Inside handleSelectSlot: token:', token);
    console.log('Inside handleSelectSlot: adminToken:', adminToken);
    console.log('Inside handleSelectSlot: userIsAuthenticated:', userIsAuthenticated);

    if (!userIsAuthenticated) {
      navigate('/register');
      return;
    }

    // If authenticated but not admin, prevent any further action related to slot selection
    if (!isAdmin) {
      console.log('Authenticated non-admin clicked on slot. No action taken.');
      return;
    }

    // From here, we know isAuthenticated is true and isAdmin is true
    // Mostrar modal para crear evento (only for admins)
    setSelectedDate(slotInfo.start);
    setNewEvent(prev => ({
      ...prev,
      fecha: moment(slotInfo.start).format('YYYY-MM-DD'),
      hora: moment(slotInfo.start).format('HH:mm')
    }));
    setShowEventModal(true);
  };

  const handleSelectEvent = (event) => {
    console.log('handleSelectEvent triggered.');
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    const userIsAuthenticated = !!token || !!adminToken;

    console.log('Inside handleSelectEvent: token:', token);
    console.log('Inside handleSelectEvent: adminToken:', adminToken);
    console.log('Inside handleSelectEvent: userIsAuthenticated:', userIsAuthenticated);

    if (!userIsAuthenticated) {
      navigate('/register');
      return;
    }

    // If the user is authenticated but not an admin, they should only be able to view event details
    // and potentially register, not edit or create events.
    // The current logic already navigates to /evento/:id, which is appropriate for viewing details.
    // Further logic for registration would be within the /evento/:id page.


    // Mostrar detalles del evento o formulario de inscripción
    if (!event || event.id === undefined || event.id === null) {
      console.error('Intento de navegar a un evento con ID inválido:', event);
      return; // Evitar la navegación si el ID no es válido
    }
    navigate(`/calendar/book/${event.id}?tipo=${event.tipo}`);
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
        estado: 'Disponible'
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
    <div className="calendar-page">
      <Header />
      <div className="calendar-content">
        {console.log('Rendering Calendar. isAdmin:', isAdmin)}
        {isAdmin && (
          <>
            <h1 className="agendamiento-title">* AGENDAMIENTO *</h1>
            <div className="calendar-header-section">
              <div className="programate-section">
                <img src="/Frontend/src/assets/Icons/calculator-icon.png" alt="Calculator Icon" className="header-icon" />
                <span>Prográmate</span>
              </div>
              <div className="icons-section">
                <img src="/Frontend/src/assets/Icons/people-icon.png" alt="People Icon" className="header-icon" />
                <img src="/Frontend/src/assets/Icons/car-icon.png" alt="Car Icon" className="header-icon" />
                <img src="/Frontend/src/assets/Icons/check-icon.png" alt="Check Icon" className="header-icon" />
              </div>
            </div>
          </>
        )}

        <div className="calendar-main-section">
          <div className="training-camp-section">
            <p className="training-camp-text">TRAINNING CAMP</p>
            <div className="dropdown-container">
              <input type="text" placeholder="" className="dropdown-input" readOnly />
              <span className="dropdown-arrow">&#9660;</span>
            </div>
          </div>

          <div className="calendar-display-section">
            <div className="month-year-display">
              <button className="nav-arrow left-arrow" onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'month').toDate())}>&#9664;</button>
              <h2 className="month-name">{moment(currentDate).format('MMMM').toUpperCase()}</h2>
              <span className="year-number">{moment(currentDate).format('YYYY')}</span>
              <button className="nav-arrow right-arrow" onClick={() => setCurrentDate(moment(currentDate).add(1, 'month').toDate())}>&#9654;</button>
            </div>
            {console.log('BigCalendar selectable prop:', isAdmin)}
          <BigCalendar
            localizer={localizer}
            events={events}
              startAccessor="start"
              endAccessor="end"
              selectable={true}
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
              culture='es'
              toolbar={false} /* Elimina la barra de herramientas de navegación */
              view='month' /* Establece la vista por defecto a mes */
              date={currentDate} /* Controla la fecha del calendario */
              onNavigate={setCurrentDate} /* Permite la navegación programática */
            />
          </div>
        </div>

        {showEventModal && isAdmin && (
          <CreateEventForm
            newEvent={newEvent}
            handleEventChange={handleEventChange}
            handleCreateEvent={handleCreateEvent}
            closeModal={closeModal}
          />
        )}
      </div>
       <Footer />
     </div>
    );
};

export default Calendar;