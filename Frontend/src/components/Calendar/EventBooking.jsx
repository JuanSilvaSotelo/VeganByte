import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const EventBooking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/eventos/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('No se pudo cargar el evento');
        }

        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/eventos/${eventId}/reservar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al reservar el evento');
      }

      navigate('/calendar');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="event-booking-page">
        <Header />
        <main className="main-content">
          <p>Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-booking-page">
        <Header />
        <main className="main-content">
          <p className="error-message">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="event-booking-page">
      <Header />
      <main className="main-content">
        <div className="event-details">
          <h2>{event.titulo}</h2>
          <p>{event.descripcion}</p>
          <p>Fecha: {new Date(event.fecha).toLocaleDateString()}</p>
          <p>Hora: {event.hora}</p>
          <p>Capacidad: {event.capacidad}</p>
          <button 
            onClick={handleBooking}
            className="booking-button"
          >
            Reservar Evento
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventBooking;