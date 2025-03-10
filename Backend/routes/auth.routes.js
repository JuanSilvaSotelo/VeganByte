import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { validateRegister } from '../utils/validators/auth.validator.js';

const router = Router();

router.post('/register', validateRegister, AuthController.register);

export default router;