import express from 'express';
const router = express.Router();
import { verifyAdmin } from '../middlewares/adminAuth.js';
import * as adminController from '../controllers/admin.controller.js';
import * as adminManagementController from '../controllers/adminManagement.controller.js';

// Rutas públicas
router.post('/login', adminController.loginAdmin);

// Rutas protegidas - requieren autenticación de administrador
router.get('/usuarios-activos', verifyAdmin, adminController.getUsuariosActivos);

// Rutas para gestión de administradores - solo SuperAdmin puede crear/listar administradores
router.post('/crear', verifyAdmin, adminManagementController.createAdmin);
router.get('/listar', verifyAdmin, adminManagementController.getAdmins);
router.put('/:id', verifyAdmin, adminManagementController.updateAdmin);

// Rutas para eventos
router.get('/eventos', verifyAdmin, adminController.getEventos);
router.post('/eventos', verifyAdmin, adminController.createEvento);

export default router;