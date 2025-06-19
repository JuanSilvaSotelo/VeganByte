// ... existing code ...
/**
 * Módulo de rutas para la gestión de eventos (experiencias y talleres)
 * Define los endpoints públicos y protegidos para eventos
 */
import express from 'express';
import { eventosController } from '../controllers/eventos.controller.js';
import { verifyAdmin } from '../middlewares/adminAuth.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Rutas públicas - acceso libre para consultar eventos
router.get('/', eventosController.getAllEventos);
router.get('/:eventoId', eventosController.getEventoById);

// Rutas protegidas para usuarios autenticados (pendiente de implementación de autenticación de cliente)
console.log('*** Antes de verifyToken en agendar ***');
router.post('/:eventoId/agendar', verifyToken, eventosController.agendarEvento);
// router.delete('/eventos/:eventoId/cancelar', authMiddleware, eventosController.cancelarRegistro);

// Rutas protegidas para administradores - requieren autenticación de administrador
router.post('/', verifyAdmin, eventosController.createEvento);
router.put('/:eventoId', verifyAdmin, eventosController.updateEvento);
router.delete('/:eventoId', verifyAdmin, eventosController.deleteEvento);

export default router;