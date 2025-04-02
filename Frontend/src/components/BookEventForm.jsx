import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles/Calendar.css';

const BookEventForm = () => {
  const { eventoId } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`/api/eventos/${eventoId}`);
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
  }, [eventoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/registro');
        return;
      }

      const response = await fetch(`/api/eventos/${eventoId}/agendar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al agendar el evento');
      }

      navigate('/calendario');
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
        <p>Cupos disponibles: {evento.capacidad - evento.participantes.length}</p>
      </div>

      {evento.disponible ? (
        <form onSubmit={handleSubmit} className="booking-form">
          <p className="confirmation-text">
            ¿Deseas agendar este evento?
          </p>
          <button 
            type="submit" 
            className="submit-button"
            disabled={!evento.disponible}
          >
            Confirmar Agendamiento
          </button>
        </form>
      ) : (
        <p className="event-full">Este evento está completo</p>
      )}
    </div>
  );
};

export default BookEventForm;