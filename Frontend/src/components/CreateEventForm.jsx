import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import '../styles/Calendar.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CreateEventForm = ({ closeModal, selectedDate, fetchEvents }) => {
  const [tipoEvento, setTipoEvento] = useState('taller');
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '',
    hora_inicio: selectedDate ? moment(selectedDate).format('HH:mm') : '',
    hora_fin: '',
    valor: '',
    capacidad: '',
    tipo: tipoEvento,
    categoria: '1',
    nivel_running: 1,
    duracion_desplazamiento: '',
    duracion_caminata: '',
    servicios_termales: 'No',
    ubicacion: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        fecha: moment(selectedDate).format('YYYY-MM-DD'),
        hora_inicio: moment(selectedDate).format('HH:mm')
      }));
    }
  }, [selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      let eventoData = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        fecha: formData.fecha,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        valor: parseFloat(formData.valor),
        capacidad: parseInt(formData.capacidad, 10),
        tipo: tipoEvento,
        ...(tipoEvento === 'taller' && {
          nombre_taller: formData.titulo
        }),
        ...(tipoEvento === 'experiencia' && {
          tipo_experiencia: formData.tipo || formData.titulo,
          categoria: formData.categoria,
          nivel_running: parseInt(formData.nivel_running, 10),
          duracion_desplazamiento: formData.duracion_desplazamiento,
          duracion_caminata: formData.duracion_caminata,
          servicios_termales: formData.servicios_termales,
          ubicacion: formData.ubicacion
        })
      };
      await axios.post(`${API_URL}/api/eventos`, eventoData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchEvents();
      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Error al crear el evento');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Crear Nuevo Evento</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="tipoEvento">Tipo de Evento</label>
          <select
            id="tipoEvento"
            value={tipoEvento}
            onChange={(e) => setTipoEvento(e.target.value)}
            className="select-tipo-evento"
          >
            <option value="taller">Taller</option>
            <option value="experiencia">Experiencia</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="titulo">{tipoEvento === 'taller' ? 'Nombre del Taller' : 'Título de la Experiencia'}</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora_inicio">Hora de Inicio</label>
          <input
            type="time"
            id="hora_inicio"
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hora_fin">Hora de Finalización</label>
          <input
            type="time"
            id="hora_fin"
            name="hora_fin"
            value={formData.hora_fin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            id="valor"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacidad">Capacidad (Número de Personas)</label>
          <input
            type="number"
            id="capacidad"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        {tipoEvento === 'experiencia' && (
          <>
            <div className="form-group">
              <label htmlFor="tipo_experiencia">Tipo de Experiencia</label>
              <input
                type="text"
                id="tipo_experiencia"
                name="tipo_experiencia" // Cambiado de 'tipo' a 'tipo_experiencia'
                value={formData.tipo} // El estado interno puede seguir siendo 'tipo' si se prefiere, pero el 'name' debe coincidir
                onChange={handleChange}
                placeholder="Ej: Senderismo, Ciclismo, etc."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              >
                <option value="1">Categoría 1</option>
                <option value="2">Categoría 2</option>
                <option value="3">Categoría 3</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nivel_running">Nivel de Running</label>
              <input
                type="number"
                id="nivel_running"
                name="nivel_running"
                value={formData.nivel_running}
                onChange={handleChange}
                min="1"
                max="5"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="duracion_desplazamiento">Duración del Desplazamiento (hh:mm)</label>
              <input
                type="time"
                id="duracion_desplazamiento"
                name="duracion_desplazamiento"
                value={formData.duracion_desplazamiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="duracion_caminata">Duración de la Caminata (hh:mm)</label>
              <input
                type="time"
                id="duracion_caminata"
                name="duracion_caminata"
                value={formData.duracion_caminata}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="servicios_termales">Servicios Termales</label>
              <select
                id="servicios_termales"
                name="servicios_termales"
                value={formData.servicios_termales}
                onChange={handleChange}
                required
              >
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className="modal-buttons">
          <button type="button" className="cancel-button" onClick={closeModal}>Cancelar</button>
          <button type="submit" className="submit-button">Crear {tipoEvento === 'taller' ? 'Taller' : 'Experiencia'}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;