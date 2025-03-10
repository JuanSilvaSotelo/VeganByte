import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller.js';
import { validateCliente } from '../utils/validators/cliente.validator.js';

const router = Router();

router.get('/', ClienteController.getClientes);
router.post('/', validateCliente, ClienteController.createCliente);

export default router;