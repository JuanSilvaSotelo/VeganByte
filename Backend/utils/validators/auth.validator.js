import { body } from 'express-validator';

export const validateRegister = [
  body('Nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('Apellido').trim().notEmpty().withMessage('El apellido es requerido'),
  body('tipo_Documento').isIn(['Cedula de ciudadania', 'Pasaporte', 'Cedula extranjero']),
  body('Numero_documento').isInt({ min: 100000, max: 99999999999999 }).withMessage('Número de documento inválido'),
  body('Sexo').isIn(['Masculino', 'Femenino', 'Otro']),
  body('Correo').isEmail().normalizeEmail(),
  body('Contacto').isMobilePhone('any'),
  body('fecha_Nacimiento').isDate(),
  body('Direccion').trim().notEmpty(),
  body('Contrasena').isLength({ min: 8 })
];