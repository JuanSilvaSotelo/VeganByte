/**
 * Módulo de rutas para la administración del sistema
 * Define los endpoints para autenticación y gestión de administradores
 */
import express from 'express';
const router = express.Router();
import { verifyAdmin } from '../middlewares/adminAuth.js';
import * as adminController from '../controllers/admin.controller.js';
import * as adminManagementController from '../controllers/adminManagement.controller.js';

// Rutas públicas - no requieren autenticación
router.post('/login', adminController.loginAdmin);

// Rutas protegidas - requieren autenticación de administrador
router.get('/usuarios-activos', verifyAdmin, adminController.getUsuariosActivos);
router.post('/usuarios', verifyAdmin, adminController.createUser);
router.put('/usuarios/:id', verifyAdmin, adminController.updateUser);
router.delete('/usuarios/:id', verifyAdmin, adminController.deleteUser);

/**
 * Rutas para gestión de administradores
 * Requieren autenticación y privilegios de SuperAdmin
 */
router.post('/crear', verifyAdmin, adminManagementController.createAdmin);
router.get('/listar', verifyAdmin, adminManagementController.getAdmins);
router.put('/:id', verifyAdmin, adminManagementController.updateAdmin);

export default router;