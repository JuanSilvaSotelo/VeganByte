import express from 'express';
import PasswordController from '../controllers/password.controller.js';

const router = express.Router();

// Ruta para solicitar restablecimiento de contraseña
router.post('/request-reset', PasswordController.requestReset);

// Ruta para restablecer la contraseña
router.post('/reset', PasswordController.resetPassword);

export default router;