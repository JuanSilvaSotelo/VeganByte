import { Evento } from '../models/evento.model.js';
import { Cliente } from '../models/cliente.model.js';

export const eventosController = {
  // Obtener todos los eventos
  getAllEventos: async (req, res) => {
    try {
      const eventos = await Evento.find()
        .populate('creador', 'nombre email')
        .populate('participantes', 'nombre email');
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener eventos', error: error.message });
    }
  },

  // Crear un nuevo evento (solo administradores)
  createEvento: async (req, res) => {
    try {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'No autorizado' });
      }

      const nuevoEvento = new Evento({
        ...req.body,
        creador: req.user._id
      });

      await nuevoEvento.save();
      res.status(201).json(nuevoEvento);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear evento', error: error.message });
    }
  },

  // Agendar un evento (usuarios)
  agendarEvento: async (req, res) => {
    try {
      const { eventoId } = req.params;
      const clienteId = req.user._id;

      const evento = await Evento.findById(eventoId);
      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      if (!evento.disponible || evento.estado !== 'disponible') {
        return res.status(400).json({ message: 'Evento no disponible' });
      }

      if (evento.participantes.length >= evento.capacidad) {
        evento.estado = 'completo';
        evento.disponible = false;
        await evento.save();
        return res.status(400).json({ message: 'Evento sin cupos disponibles' });
      }

      if (evento.participantes.includes(clienteId)) {
        return res.status(400).json({ message: 'Ya estás registrado en este evento' });
      }

      evento.participantes.push(clienteId);
      if (evento.participantes.length >= evento.capacidad) {
        evento.estado = 'completo';
        evento.disponible = false;
      }

      await evento.save();
      res.json({ message: 'Registro exitoso', evento });
    } catch (error) {
      res.status(500).json({ message: 'Error al agendar evento', error: error.message });
    }
  },

  // Cancelar registro a un evento (usuarios)
  cancelarRegistro: async (req, res) => {
    try {
      const { eventoId } = req.params;
      const clienteId = req.user._id;

      const evento = await Evento.findById(eventoId);
      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      const index = evento.participantes.indexOf(clienteId);
      if (index === -1) {
        return res.status(400).json({ message: 'No estás registrado en este evento' });
      }

      evento.participantes.splice(index, 1);
      if (evento.estado === 'completo') {
        evento.estado = 'disponible';
        evento.disponible = true;
      }

      await evento.save();
      res.json({ message: 'Registro cancelado exitosamente', evento });
    } catch (error) {
      res.status(500).json({ message: 'Error al cancelar registro', error: error.message });
    }
  },

  // Obtener un evento específico
  getEventoById: async (req, res) => {
    try {
      const { eventoId } = req.params;
      const evento = await Evento.findById(eventoId)
        .populate('creador', 'nombre email')
        .populate('participantes', 'nombre email');

      if (!evento) {
        return res.status(404).json({ message: 'Evento no encontrado' });
      }

      res.json(evento);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener evento', error: error.message });
    }
  }
};