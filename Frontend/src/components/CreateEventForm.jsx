import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Calendar.css';

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [tipoEvento, setTipoEvento] = useState('taller'); // 'taller' o 'experiencia'
  const [formData, setFormData] = useState({
    // Campos comunes
    titulo: '',
    descripcion: '',
    fecha: '',
    hora_inicio: '',
    hora_fin: '',
    valor: '',
    capacidad: '',
    
    // Campos específicos para talleres
    nombre_taller: '',
    
    // Campos específicos para experiencias
    tipo: '',
    categoria: '1',
    nivel_running: 1,
    duracion_desplazamiento: '',
    duracion_caminata: '',
    servicios_termales: 'No',
    ubicacion: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Preparar los datos según el tipo de evento seleccionado
      let eventoData = {
        fecha: formData.fecha,
        hora_inicio: formData.hora_inicio,
        hora_fin: formData.hora_fin,
        valor: formData.valor,
        capacidad: formData.capacidad,
        tipo: tipoEvento // Añadir el tipo de evento (taller o experiencia)
      };
      
      // Datos específicos según el tipo de evento
      if (tipoEvento === 'taller') {
        eventoData.talleresSolicitados = JSON.stringify([{
          nombre: formData.nombre_taller || formData.titulo,
          fecha: formData.fecha,
          horaInicio: formData.hora_inicio,
          horaFin: formData.hora_fin,
          valor: formData.valor
        }]);
        eventoData.experienciasSolicitadas = JSON.stringify([]);
      } else {
        eventoData.experienciasSolicitadas = JSON.stringify([{
          tipo: formData.tipo || formData.titulo,
          descripcion: formData.descripcion,
          categoria: formData.categoria,
          valor: formData.valor,
          cantPersonas: formData.capacidad,
          nivelRunning: formData.nivel_running,
          duracionDesplazamiento: formData.duracion_desplazamiento,
          duracionCaminata: formData.duracion_caminata,
          serviciosTermales: formData.servicios_termales,
          ubicacion: formData.ubicacion
        }]);
        eventoData.talleresSolicitados = JSON.stringify([]);
      }
      
      const response = await fetch('/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventoData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear el evento');
      }

      navigate('/calendario');
    } catch (error) {
      setError(error.message);
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
              <label htmlFor="tipo">Tipo de Experiencia</label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={formData.tipo}
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

        <button type="submit" className="submit-button">Crear {tipoEvento === 'taller' ? 'Taller' : 'Experiencia'}</button>
      </form>
    </div>
  );
};

export default CreateEventForm;