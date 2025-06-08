// Controlador para la gestión de eventos (experiencias y talleres)
import { Experiencia, Taller } from '../models/evento.model.js';
import Cliente from '../models/cliente.model.js';

export const eventosController = {
  // Obtener todos los eventos (experiencias y talleres)
  getAllEventos: async (req, res) => {
    console.log('Intentando obtener todos los eventos...'); // Log inicial
    try {
      // Consultar todas las experiencias
      console.log('Consultando experiencias...');
      const experiencias = await Experiencia.find();
      console.log(`Experiencias encontradas: ${experiencias.length}`);

      // Consultar todos los talleres
      console.log('Consultando talleres...');
      const talleres = await Taller.find();
      console.log(`Talleres encontrados: ${talleres.length}`);

      // Combinar ambos tipos de eventos y agregar el campo 'tipo'
      const eventos = [
        ...experiencias.map(e => ({ ...e, tipo: 'experiencia' })),
        ...talleres.map(t => ({ ...t, tipo: 'taller' }))
      ];
      console.log(`Total de eventos combinados: ${eventos.length}`);
      res.json(eventos);
    } catch (error) {
      console.error('Error detallado al obtener eventos:', error);
      res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
  },

  // Crear un nuevo evento (solo administradores)
  createEvento: async (req, res) => {
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
        hora_inicio, 
        hora_fin, 
        valor, 
        capacidad, 
        tipo 
      } = req.body;

      // Validar tipo de evento
      if (!['taller', 'experiencia'].includes(tipo)) {
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
        // Extraer datos específicos de experiencia
        const { 
          tipo_experiencia, 
          categoria, 
          nivel_running, 
          duracion_desplazamiento, 
          duracion_caminata, 
          servicios_termales, 
          ubicacion 
        } = req.body;

        // Construir objeto para experiencia
        const experienciaData = {
          ...commonModelData,
          Tipo: tipo_experiencia || titulo,
          Categoria: categoria,
          nivel_Running: nivel_running,
          duracion_Desplazamiento: duracion_desplazamiento,
          duracion_Caminata: duracion_caminata,
          servicios_Termales: servicios_termales,
          Ubicacion: ubicacion
        };
        nuevoEventoId = await Experiencia.create(experienciaData);
        message = 'Experiencia creada exitosamente';
      } else { // tipo === 'taller'
        // Extraer datos específicos de taller
        const { nombre_taller } = req.body;

        // Construir objeto para taller
        const tallerData = {
          Valor: valor,
          nombre_Taller: nombre_taller || titulo,
          fecha: fecha,
          hora_Inicio: hora_inicio || '12:00',
          hora_Fin: hora_fin
        };
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

  // Agendar un evento (usuarios)
  agendarEvento: async (req, res) => {
    try {
      // Lógica pendiente de refactorización para SQL
      const { eventoId, tipo } = req.params;
      const clienteId = req.user._id;

      let evento;
      if (tipo === 'experiencia') {
        evento = await Experiencia.findById(eventoId);
      } else if (tipo === 'taller') {
        evento = await Taller.findById(eventoId);
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      if (!evento.Disponible || evento.Estado !== 'disponible') {
        return res.status(400).json({ message: 'Evento no disponible' });
      }

      // Aquí debería ir la lógica de inscripción (ver comentarios en el código)
      res.status(501).json({ message: 'Funcionalidad de agendar pendiente de refactorización para SQL' });
    } catch (error) {
      res.status(500).json({ message: 'Error al agendar evento', error: error.message });
    }
  },

  // Cancelar registro a un evento (usuarios)
  cancelarRegistro: async (req, res) => {
    try {
      // Lógica pendiente de refactorización para SQL
      const { eventoId, tipo } = req.params;
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
      // Lógica pendiente de refactorización para SQL
      const { eventoId, tipo } = req.params;

      let evento;
      if (tipo === 'experiencia') {
        evento = await Experiencia.findById(eventoId);
        // Aquí se podría obtener información adicional del creador usando JOIN
      } else if (tipo === 'taller') {
        evento = await Taller.findById(eventoId);
        // Aquí se podría obtener información adicional del creador usando JOIN
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      // Respuesta temporal mientras se refactoriza la lógica
      res.status(501).json({ message: 'Funcionalidad de obtener evento por ID pendiente de refactorización completa para SQL (joins/datos relacionados)' });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
  }
};