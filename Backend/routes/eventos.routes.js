// ... existing code ...
/**
 * Módulo de rutas para la gestión de eventos (experiencias y talleres)
 * Define los endpoints públicos y protegidos para eventos
 */
import express from 'express';
import { eventosController } from '../controllers/eventos.controller.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';

const router = express.Router();

// Rutas públicas - acceso libre para consultar eventos
router.get('/eventos', eventosController.getAllEventos);
router.get('/eventos/:eventoId', eventosController.getEventoById);

// Rutas protegidas para usuarios autenticados (pendiente de implementación de autenticación de cliente)
// router.post('/eventos/:eventoId/agendar', authMiddleware, eventosController.agendarEvento);
// router.delete('/eventos/:eventoId/cancelar', authMiddleware, eventosController.cancelarRegistro);

// Rutas protegidas para administradores - requieren autenticación de administrador
router.post('/eventos', verifyAdmin, eventosController.createEvento);

export default router;