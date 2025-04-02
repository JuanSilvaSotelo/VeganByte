import express from 'express';
import { eventosController } from '../controllers/eventos.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { adminAuth } from '../middlewares/adminAuth.js';

const router = express.Router();

// Rutas públicas
router.get('/eventos', eventosController.getAllEventos);
router.get('/eventos/:eventoId', eventosController.getEventoById);

// Rutas protegidas para usuarios autenticados
router.post('/eventos/:eventoId/agendar', authMiddleware, eventosController.agendarEvento);
router.delete('/eventos/:eventoId/cancelar', authMiddleware, eventosController.cancelarRegistro);

// Rutas protegidas para administradores
router.post('/eventos', [authMiddleware, adminAuth], eventosController.createEvento);

export default router;