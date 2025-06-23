// Controlador para la gestión de eventos (experiencias y talleres)
import { Experiencia, Taller } from '../models/evento.model.js';
import Cliente from '../models/cliente.model.js';
import { InscripcionEvento } from '../models/inscripcionEvento.model.js';

export const eventosController = {
  // Obtener todos los eventos (experiencias y talleres)
  getAllEventos: async (req, res) => {
    console.log('Intentando obtener todos los eventos con paginación...');
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Consultar experiencias con paginación
      console.log('Consultando experiencias con paginación...');
      const experiencias = await Experiencia.find(skip, limit);
      const totalExperiencias = await Experiencia.countDocuments();

      // Consultar talleres con paginación
      console.log('Consultando talleres con paginación...');
      const talleres = await Taller.find(skip, limit);
      const totalTalleres = await Taller.countDocuments();

      // Combinar ambos tipos de eventos y agregar el campo 'tipo'
      const eventos = [
        ...experiencias.map(e => ({ ...e, tipo: 'experiencia' })),
        ...talleres.map(t => ({ ...t, tipo: 'taller' }))
      ];

      // Ordenar los eventos combinados por fecha (opcional, pero útil para paginación consistente)
      eventos.sort((a, b) => new Date(a.Fecha || a.fecha) - new Date(b.Fecha || b.fecha));

      const totalEvents = totalExperiencias + totalTalleres;
      const totalPages = Math.ceil(totalEvents / limit);

      console.log(`Total de eventos combinados: ${eventos.length}, Total de páginas: ${totalPages}`);
      res.json({ events: eventos, totalPages: totalPages });
    } catch (error) {
      console.error('Error detallado al obtener eventos:', error);
      res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
  },

  getEventoById: async (req, res) => {
    try {
      const { eventoId } = req.params;
      const { tipo } = req.query;

      if (!eventoId || !tipo) {
        return res.status(400).json({ message: 'ID de evento y tipo son requeridos' });
      }

      let evento;
      if (tipo === 'taller') {
        evento = await Taller.findById(eventoId);
      } else if (tipo === 'experiencia') {
        evento = await Experiencia.findById(eventoId);
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }
      console.log('Evento fetched by ID:', evento);
      res.json(evento);
    } catch (error) {
      console.error('Error al obtener evento por ID:', error);
      res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
  },



  // Crear un nuevo evento (solo administradores)
  createEvento: async (req, res) => {
    console.log('*** Entrando a createEvento en eventos.controller.js ***');
    try {
      // Verificar si el usuario es administrador
      if (!req.admin) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      // Extraer datos del cuerpo de la solicitud
      const { 
        titulo, 
        descripcion, 
        fecha, 
        Hora_Inicio, 
        Hora_Fin, 
        valor, 
        capacidad, 
        tipo 
      } = req.body;

      console.log('Valor recibido en req.body:', valor); // Añadir este log

      // Convertir fecha a formato YYYY-MM-DD si es necesario
      const formattedFecha = fecha ? new Date(fecha).toISOString().split('T')[0] : null;

      // Validar tipo de evento
      if (!['taller', 'experiencia'].includes(tipo)) {
        console.log('Error: Tipo de evento inválido recibido:', tipo);
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      let nuevoEventoId;
      let message;

      // Datos comunes para ambos tipos de eventos
      const commonModelData = {
        Descripcion: descripcion,
        Valor: valor
      };

      if (tipo === 'experiencia') {
        console.log('Received body for Experiencia creation:', req.body);
        // Extraer datos específicos de experiencia
        const { 
          titulo, 
          categoria, 
          nivel_running, 
          duracion_desplazamiento, 
          duracion_caminata, 
          servicios_termales, 
          ubicacion, 
          capacidad,
          cant_Personas,
          Hora_Inicio,
          Hora_Fin
      } = req.body;

        // Construir objeto para experiencia
        const experienciaData = {
          ...commonModelData,
          Tipo: titulo,
          Categoria: categoria,
          nivel_Running: nivel_running,
          duracion_Desplazamiento: duracion_desplazamiento,
          duracion_Caminata: duracion_caminata,
          servicios_Termales: servicios_termales,
          Ubicacion: ubicacion,
          Fecha: formattedFecha,
          Hora_Inicio: Hora_Inicio,
          Hora_Fin: Hora_Fin,
          cant_Personas: cant_Personas || capacidad // Use cant_Personas if available, otherwise use capacidad
        };
        console.log('Experiencia Data before creation:', experienciaData);
        nuevoEventoId = await Experiencia.create(experienciaData);
        message = 'Experiencia creada exitosamente';
      } else { // tipo === 'taller'
        // Extraer datos específicos de taller
        const { nombre_taller, cant_personas } = req.body;

        // Construir objeto para taller
        const tallerData = {
          Valor: valor,
          nombre_Taller: nombre_taller || titulo,
          fecha: fecha,
          Hora_Inicio: Hora_Inicio,
          Hora_Fin: Hora_Fin,
          cant_Personas: cant_personas || capacidad // Use cant_personas if available, otherwise use capacidad
        };
        console.log('Received body for Taller creation:', req.body);
        console.log('Taller Data before creation:', tallerData);
        nuevoEventoId = await Taller.create(tallerData);
        message = 'Taller creado exitosamente';
      }

      // Responder con mensaje de éxito y el ID del nuevo evento
      res.status(201).json({ 
        message: message, 
        id: nuevoEventoId,
        tipo: tipo
      });
    } catch (error) {
      console.error(`Error al crear ${req.body.tipo || 'evento'}:`, error);
      res.status(400).json({ message: `Error al crear ${req.body.tipo || 'evento'}`, error: error.message });
    }
  },

  deleteEvento: async (req, res) => {
    try {
      if (!req.admin) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      const { eventoId } = req.params;
      const { tipo } = req.body; // Expect 'tipo' in the request body to determine model
      console.log('Received DELETE request for eventoId:', eventoId, 'and tipo:', tipo);

      if (!eventoId || !tipo) {
        return res.status(400).json({ message: 'ID de evento y tipo son requeridos' });
      }

      let result;
      if (tipo === 'experiencia') {
        result = await Experiencia.delete(eventoId);
      } else if (tipo === 'taller') {
        result = await Taller.delete(eventoId);
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Evento no encontrado o ya eliminado' });
      }

      res.status(200).json({ message: 'Evento eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      res.status(500).json({ message: 'Error interno del servidor al eliminar evento', error: error.message });
    }
  },



  // Agendar un evento (usuarios)
  agendarEvento: async (req, res) => {
    console.log('*** Entrando a agendarEvento ***');
    console.log('Iniciando agendarEvento...');
    try {
      // Lógica pendiente de refactorización para SQL
      const { eventoId } = req.params;
      const { tipo } = req.body;
      const clienteId = req.user.Id_Cliente; // Asumiendo que el ID del cliente está en req.user.Id_Cliente

      if (!eventoId || !tipo || !clienteId) {
        return res.status(400).json({ message: 'ID de evento, tipo y ID de cliente son requeridos' });
      }

      let evento;
      if (tipo === 'taller') {
        evento = await Taller.findById(eventoId);
      } else if (tipo === 'experiencia') {
        evento = await Experiencia.findById(eventoId);
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      // Verificar disponibilidad del evento
      if (evento.Estado === 'Completo' || evento.Estado === 'Cancelado') {
        return res.status(400).json({ message: `El evento ${evento.Estado.toLowerCase()}` });
      }

      console.log('Evento disponible. Procediendo con la verificación de inscripción y capacidad.');

      console.log('Verificando si el usuario ya está inscrito...');
      // Verificar si el usuario ya está inscrito
      const existingRegistration = await InscripcionEvento.findByClienteAndEvento(clienteId, eventoId, tipo);
      console.log('Existing registration:', existingRegistration);

      if (existingRegistration) {
        console.log('Error: El usuario ya está inscrito en este evento.');
        return res.status(400).json({ message: 'Ya estás inscrito en este evento' });
      }

      // Lógica para verificar capacidad y crear inscripción
      let currentParticipants;
      let capacidadMaxima;

      if (tipo === 'taller') {
        currentParticipants = await InscripcionEvento.countParticipantsForEvent(eventoId, 'taller');
        capacidadMaxima = evento.cant_Personas;
      } else if (tipo === 'experiencia') {
        currentParticipants = await InscripcionEvento.countParticipantsForEvent(eventoId, 'experiencia');
        capacidadMaxima = evento.cant_Personas;
      }

      console.log(`Participantes actuales: ${currentParticipants}, Capacidad máxima: ${capacidadMaxima}`);

      if (currentParticipants >= capacidadMaxima) {
        console.log('Error: Capacidad máxima alcanzada para el evento.');
        // Actualizar el estado del evento a 'Completo' si la capacidad está llena
        if (tipo === 'taller') {
          await Taller.updateEstado(eventoId, 'Completo');
        } else if (tipo === 'experiencia') {
          await Experiencia.updateEstado(eventoId, 'Completo');
        }
        return res.status(400).json({ message: 'Capacidad máxima alcanzada para este evento' });
      }

      // Crear la inscripción
      const inscripcionId = await InscripcionEvento.create({
        Id_Cliente: clienteId,
        Id_Evento: eventoId,
        Tipo_Evento: tipo,
      });

      console.log(`Inscripción creada con ID: ${inscripcionId}`);

      // Si la inscripción fue exitosa y la capacidad se llenó, actualizar el estado del evento
      if (currentParticipants + 1 >= capacidadMaxima) {
        console.log('Capacidad del evento alcanzada. Actualizando estado a Completo.');
        if (tipo === 'taller') {
          await Taller.updateEstado(eventoId, 'Completo');
        } else if (tipo === 'experiencia') {
          await Experiencia.updateEstado(eventoId, 'Completo');
        }
      }

      res.status(201).json({ message: 'Inscripción exitosa', inscripcionId });
    } catch (error) {
      console.error('Error detallado al agendar evento:', error);
      console.error('Error detallado al agendar evento:', error.stack);
      res.status(500).json({ message: 'Error interno del servidor al agendar evento', error: error.message, details: error.stack });
    }
  },

  // Cancelar registro a un evento (usuarios)
  cancelarRegistro: async (req, res) => {
    try {
      // Lógica pendiente de refactorización para SQL
      const { eventoId } = req.params;
      const { tipo } = req.query;
      const clienteId = req.user._id;

      // Aquí debería ir la lógica de cancelación de inscripción (ver comentarios en el código)
      res.status(501).json({ message: 'Funcionalidad de cancelar registro pendiente de refactorización para SQL' });
    } catch (error) {
      res.status(500).json({ message: 'Error al cancelar registro', error: error.message });
    }
  },

  // Obtener un evento específico por ID
  getEventoById: async (req, res) => {
    try {
      const { eventoId } = req.params;
      const { tipo } = req.query;

      let EventoModel;
      if (tipo === 'experiencia') {
        EventoModel = Experiencia;
      } else if (tipo === 'taller') {
        EventoModel = Taller;
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      const evento = await EventoModel.findById(eventoId);

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      res.json(evento);
    } catch (error) {
      console.error('Error al obtener evento por ID:', error);
      res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
  },

  // Actualizar un evento (solo administradores)
  updateEvento: async (req, res) => {
    try {
      if (!req.admin) {
        return res.status(403).json({ message: 'No autorizado' });
      }

      const { eventoId } = req.params;
      const { tipo, ...updateData } = req.body; // updateData will contain all fields from req.body except 'tipo'

      if (!eventoId || !tipo) {
        return res.status(400).json({ message: 'ID de evento y tipo son requeridos para la actualización' });
      }

      let EventoModel;
      if (tipo === 'experiencia') {
        EventoModel = Experiencia;
      } else if (tipo === 'taller') {
        EventoModel = Taller;
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      // and converting 'disponible'/'cancelado' to tinyint.
      if (tipo === 'experiencia') {
        if (updateData.titulo !== undefined) {
          updateData.Tipo = updateData.titulo;
          delete updateData.titulo;
        }
        if (updateData.hora_inicio !== undefined) {
          updateData.Hora_Inicio = updateData.hora_inicio;
          delete updateData.hora_inicio;
        }
        if (updateData.hora_fin !== undefined) {
          updateData.Hora_Fin = updateData.hora_fin;
          delete updateData.hora_fin;
        }
        if (updateData.tipo_experiencia !== undefined) {
          updateData.Tipo = updateData.tipo_experiencia;
          delete updateData.tipo_experiencia;
        }
      } else if (tipo === 'taller') {
        if (updateData.titulo !== undefined) {
          delete updateData.titulo;
        }
        if (updateData.descripcion !== undefined) {
          delete updateData.descripcion;
        }
        if (updateData.Hora_inicio !== undefined) {
          updateData.Hora_Inicio = updateData.Hora_inicio;
          delete updateData.Hora_inicio;
        }
        if (updateData.Hora_fin !== undefined) {
          updateData.Hora_Fin = updateData.Hora_fin;
          delete updateData.Hora_fin;
        }
      }

      const updated = await EventoModel.update(eventoId, updateData);

      if (!updated) {
        return res.status(404).json({ message: 'Evento no encontrado para actualizar o no se realizaron cambios' });
      }

      const updatedEvento = await EventoModel.findById(eventoId);

      if (!updatedEvento) {
        return res.status(404).json({ message: 'Evento no encontrado para actualizar' });
      }

      res.status(200).json({ message: 'Evento actualizado exitosamente', evento: updatedEvento });
    } catch (error) {
      console.error('Error al actualizar evento:', error);
      res.status(500).json({ message: 'Error al actualizar evento', error: error.message });
    }
  },

}
