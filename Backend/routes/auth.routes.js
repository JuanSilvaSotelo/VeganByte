// ... existing code ...
/**
 * Módulo de rutas para autenticación de usuarios
 * Define los endpoints para registro y login
 */
import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateRegister } from '../utils/validators/auth.validator.js';

const router = Router();

// Ruta para registrar un nuevo usuario, incluye validación de datos
router.post('/register', validateRegister, AuthController.register);
// Ruta para iniciar sesión de usuario
router.post('/login', AuthController.login);

export default router;