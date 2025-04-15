import express from 'express';
import { eventosController } from '../controllers/eventos.controller.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';

const router = express.Router();

// Rutas públicas
router.get('/eventos', eventosController.getAllEventos);
router.get('/eventos/:eventoId', eventosController.getEventoById);

// Rutas protegidas para usuarios autenticados
// Estas rutas requieren autenticación de cliente que no está implementada aún
// router.post('/eventos/:eventoId/agendar', authMiddleware, eventosController.agendarEvento);
// router.delete('/eventos/:eventoId/cancelar', authMiddleware, eventosController.cancelarRegistro);

// Rutas protegidas para administradores
router.post('/eventos', verifyAdmin, eventosController.createEvento);

export default router;