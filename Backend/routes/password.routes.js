// ... existing code ...
/**
 * Módulo de rutas para restablecimiento de contraseña
 * Define los endpoints para solicitar y realizar el cambio de contraseña
 */
import express from 'express';
import PasswordController from '../controllers/password.controller.js';

const router = express.Router();

// Ruta para solicitar restablecimiento de contraseña (envía correo con instrucciones)
router.post('/request-reset', PasswordController.requestReset);

// Ruta para restablecer la contraseña usando el token recibido
router.post('/reset', PasswordController.resetPassword);

export default router;