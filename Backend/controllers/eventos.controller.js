import { Experiencia, Taller } from '../models/evento.model.js';
import Cliente from '../models/cliente.model.js';

export const eventosController = {
  // Obtener todos los eventos
  getAllEventos: async (req, res) => {
    console.log('Intentando obtener todos los eventos...'); // Log inicial
    try {
      console.log('Consultando experiencias...'); // Log antes de consultar experiencias
      const experiencias = await Experiencia.find();
      console.log(`Experiencias encontradas: ${experiencias.length}`); // Log después de consultar experiencias

      console.log('Consultando talleres...'); // Log antes de consultar talleres
      const talleres = await Taller.find();
      console.log(`Talleres encontrados: ${talleres.length}`); // Log después de consultar talleres

      // Asegurarse de que cada objeto tenga un campo 'tipo'
      const eventos = [
        ...experiencias.map(e => ({ ...e, tipo: 'experiencia' })),
        ...talleres.map(t => ({ ...t, tipo: 'taller' }))
      ];
      console.log(`Total de eventos combinados: ${eventos.length}`); // Log final antes de enviar respuesta
      res.json(eventos);
    } catch (error) {
      console.error('Error detallado al obtener eventos:', error); // Log de error detallado
      res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
  },

  // Crear un nuevo evento (solo administradores)
  createEvento: async (req, res) => {
    try {
      if (!req.admin) {
        return res.status(403).json({ message: 'No autorizado' });
      }

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

      if (!['taller', 'experiencia'].includes(tipo)) {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      let nuevoEventoId;
      let message;

       // Datos comunes básicos para ambos tipos (con capitalización correcta para el modelo)
        const commonModelData = {
          Descripcion: descripcion, // Usado solo por Experiencias
          Valor: valor // Usado por ambos
          // Capacidad se maneja específicamente por tipo
          // Id_Reserva no se pasa aquí
        };

      if (tipo === 'experiencia') {
        // Extraer datos específicos de experiencia del req.body
        const { 
          tipo_experiencia, // Este es el 'Tipo' en el modelo
          categoria, 
          nivel_running, 
          duracion_desplazamiento, 
          duracion_caminata, 
          servicios_termales, 
          ubicacion 
        } = req.body;

         // Datos específicos para Experiencia (con capitalización correcta para el modelo)
          const experienciaData = {
            ...commonModelData, // Incluye Descripcion, Valor, Id_Reserva
            // cant_Personas solo si existe en la tabla
            Tipo: tipo_experiencia || titulo, // Modelo espera 'Tipo'
            Categoria: categoria, // Modelo espera 'Categoria'
            nivel_Running: nivel_running, // Modelo espera 'nivel_Running'
            duracion_Desplazamiento: duracion_desplazamiento, // Modelo espera 'duracion_Desplazamiento'
            duracion_Caminata: duracion_caminata, // Modelo espera 'duracion_Caminata'
            servicios_Termales: servicios_termales, // Modelo espera 'servicios_Termales'
            Ubicacion: ubicacion // Modelo espera 'Ubicacion'
            // Nota: fecha, hora_inicio, hora_fin no están en el modelo Experiencia
          };
        nuevoEventoId = await Experiencia.create(experienciaData);
        message = 'Experiencia creada exitosamente';
      } else { // tipo === 'taller'
        // Extraer datos específicos de taller del req.body
        // El campo 'capacidad' se recibe pero se ignora para talleres, ya que no existe en la tabla.
        const { nombre_taller } = req.body;

         // Datos específicos para Taller (con capitalización correcta para el modelo)
          const tallerData = {
            // 'capacidad' y 'descripcion' se ignoran aquí, ya que no existen en la tabla Talleres.
            Valor: valor, // Tomado de commonModelData implicitamente si no se redefine, pero lo ponemos explícito.
            nombre_Taller: nombre_taller || titulo, // Modelo espera 'nombre_Taller'
            fecha: fecha, // Modelo espera 'fecha'
            hora_Inicio: hora_inicio || '12:00', // Modelo espera 'hora_Inicio'
            hora_Fin: hora_fin // Modelo espera 'hora_Fin'
          };
        nuevoEventoId = await Taller.create(tallerData);
        message = 'Taller creado exitosamente';
      }

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
      // TODO: Refactorizar esta lógica para usar tablas separadas y posiblemente una tabla de inscripciones
      // La lógica actual con .participantes y .save() no funcionará con los modelos SQL
      const { eventoId, tipo } = req.params; // Necesitará el tipo para saber qué tabla consultar
      const clienteId = req.user._id; // Asumiendo que req.user viene del middleware de autenticación de cliente

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

      // --- Lógica de inscripción (requiere refactorización) ---
      // 1. Verificar si hay cupo (SELECT COUNT(*) FROM inscripciones WHERE ...)
      // 2. Verificar si el usuario ya está inscrito (SELECT * FROM inscripciones WHERE ...)
      // 3. Insertar en la tabla inscripciones (INSERT INTO inscripciones ...)
      // 4. Actualizar el estado del evento si se llena (UPDATE experiencias/talleres SET Estado = 'completo', Disponible = false WHERE ...)
      // --- Fin Lógica de inscripción --- 

      // Placeholder de respuesta mientras se refactoriza
      res.status(501).json({ message: 'Funcionalidad de agendar pendiente de refactorización para SQL' });

      /* Lógica anterior (NoSQL/Mongoose - no aplicable):
      if (evento.participantes.length >= evento.capacidad) { ... }
      if (evento.participantes.includes(clienteId)) { ... }
      evento.participantes.push(clienteId);
      if (evento.participantes.length >= evento.capacidad) { ... }
      await evento.save();
      res.json({ message: 'Registro exitoso', evento });
      */
    } catch (error) {
      res.status(500).json({ message: 'Error al agendar evento', error: error.message });
    }
  },

  // Cancelar registro a un evento (usuarios)
  cancelarRegistro: async (req, res) => {
    try {
      // TODO: Refactorizar esta lógica para usar tablas separadas y una tabla de inscripciones
      const { eventoId, tipo } = req.params; // Necesitará el tipo
      const clienteId = req.user._id;

      // --- Lógica de cancelación (requiere refactorización) ---
      // 1. Verificar si la inscripción existe (SELECT * FROM inscripciones WHERE ...)
      // 2. Eliminar la inscripción (DELETE FROM inscripciones WHERE ...)
      // 3. Si el evento estaba 'completo', actualizarlo a 'disponible' (UPDATE experiencias/talleres SET Estado = 'disponible', Disponible = true WHERE ...)
      // --- Fin Lógica de cancelación ---

      // Placeholder de respuesta mientras se refactoriza
      res.status(501).json({ message: 'Funcionalidad de cancelar registro pendiente de refactorización para SQL' });

      /* Lógica anterior (NoSQL/Mongoose - no aplicable):
      const evento = await Evento.findById(eventoId);
      if (!evento) { ... }
      const index = evento.participantes.indexOf(clienteId);
      if (index === -1) { ... }
      evento.participantes.splice(index, 1);
      if (evento.estado === 'completo') { ... }
      await evento.save();
      res.json({ message: 'Registro cancelado exitosamente', evento });
      */
    } catch (error) {
      res.status(500).json({ message: 'Error al cancelar registro', error: error.message });
    }
  },

  // Obtener un evento específico
  getEventoById: async (req, res) => {
    try {
      // TODO: Refactorizar para determinar el tipo y consultar la tabla correcta.
      // La lógica actual con populate no funcionará.
      const { eventoId, tipo } = req.params; // Necesitará el tipo

      let evento;
      if (tipo === 'experiencia') {
        evento = await Experiencia.findById(eventoId);
        // Si necesitas datos del creador, tendrías que hacer otra consulta o un JOIN en el modelo
        // const [adminData] = await pool.query('SELECT Nombre, Correo FROM Administradores WHERE Id_Administradores = ?', [evento.Id_Administrador]);
        // evento.creador = adminData[0]; // Ejemplo
      } else if (tipo === 'taller') {
        evento = await Taller.findById(eventoId);
        // Similar para obtener datos del creador
      } else {
        return res.status(400).json({ message: 'Tipo de evento inválido' });
      }

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      // Placeholder de respuesta mientras se refactoriza
      // res.json(evento); // Devolver el evento básico por ahora
       res.status(501).json({ message: 'Funcionalidad de obtener evento por ID pendiente de refactorización completa para SQL (joins/datos relacionados)' });

      /* Lógica anterior (NoSQL/Mongoose - no aplicable):
      const evento = await Evento.findById(eventoId)
        .populate('creador', 'nombre email')
        .populate('participantes', 'nombre email');
      if (!evento) { ... }
      res.json(evento);
      */
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
  }
};