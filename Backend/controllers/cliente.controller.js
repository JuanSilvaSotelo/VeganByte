import Cliente from '../models/cliente.model.js';
import { validationResult } from 'express-validator';

const ClienteController = {
  getClientes: async (req, res, next) => {
    try {
      const clientes = await Cliente.getAll();
      res.json(clientes);
    } catch (error) {
      next(error);
    }
  },

  createCliente: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newClienteId = await Cliente.create(req.body);
      res.status(201).json({
        message: 'Cliente creado exitosamente',
        id: newClienteId
      });
    } catch (error) {
      next(error);
    }
  }
};

export default ClienteController;