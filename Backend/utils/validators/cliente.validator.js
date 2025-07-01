import { body, validationResult } from 'express-validator';

export const validateCliente = [
  body('Nombre').notEmpty().withMessage('El nombre es requerido'),
  body('Apellido').notEmpty().withMessage('El apellido es requerido'),
  body('Correo').isEmail().withMessage('Correo electrónico inválido'),
  body('Contacto').isMobilePhone().withMessage('Número de contacto inválido'),
  body('fecha_Nacimiento').isDate().withMessage('Fecha de nacimiento inválida'),
  body('Contrasena').isLength({ min: 6 }).withMessage('La contrasena debe tener al menos 6 caracteres')
];