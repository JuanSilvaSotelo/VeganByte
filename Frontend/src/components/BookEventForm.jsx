import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Calendar.css';

const BookEventForm = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tipo = queryParams.get('tipo');
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`/api/v1/eventos/${eventId}?tipo=${tipo}`);
        if (!response.ok) {
          throw new Error('Evento no encontrado');
        }
        const data = await response.json();
        setEvento(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventId, tipo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/register');
        return;
      }

      const response = await fetch(`/api/v1/eventos/${eventId}/agendar`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ eventoId: eventId, tipo: tipo })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al agendar el evento');
      }

      navigate('/calendar');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  console.log('Evento object before render:', evento);
  console.log('Evento disponible:', evento?.disponible);
  if (!evento) {
    return <div className="error-message">Evento no encontrado</div>;
  }

  return (
    <div className="book-event-container">
      <h2>Agendar Evento</h2>
      <div className="event-details">
        <h3>{evento.titulo}</h3>
        <p>{evento.descripcion}</p>
        <p>Fecha: {new Date(evento.fecha).toLocaleDateString()}</p>
        <p>Hora: {evento.hora}</p>
        <p>Cupos disponibles: {evento.capacidad - (evento.participantes ? evento.participantes.length : 0)}</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <p className="confirmation-text">
          ¿Deseas agendar este evento?
        </p>
        <button 
          type="submit" 
          className="submit-button"
          disabled={!evento.disponible}
        >
          Inscribirse al Evento
        </button>
      </form>
      {!evento.disponible && (
        <p className="event-full">Este evento está completo</p>
      )}
    </div>
  );
};

export default BookEventForm;