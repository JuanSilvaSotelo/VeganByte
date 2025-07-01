// ... existing code ...
/**
 * Modulo de rutas para restablecimiento de contrasena
 * Define los endpoints para solicitar y realizar el cambio de contrasena
 */
import express from 'express';
import PasswordController from '../controllers/password.controller.js';

const router = express.Router();

// Ruta para solicitar restablecimiento de contrasena (envia correo con instrucciones)
router.post('/request-reset', PasswordController.requestReset);

// Ruta para restablecer la contrasena usando el token recibido
router.post('/reset', PasswordController.resetPassword);

export default router;