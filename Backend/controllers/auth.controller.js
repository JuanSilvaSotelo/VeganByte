// Controlador de autenticación para clientes
import Cliente from '../models/cliente.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import emailService from '../services/email.service.js';

const AuthController = {
  // Registro de un nuevo cliente
  register: async (req, res, next) => {
    try {
      // Verifica si el número de documento ya está registrado
      console.log('Datos recibidos:', req.body);
      const existingDoc = await Cliente.findByDocumentNumber(req.body.Numero_documento);
      if (existingDoc) {
        return res.status(400).json({ error: 'Número de documento ya registrado' });
      }
      
      // Verifica si el correo ya está registrado
      const existingUser = await Cliente.findByEmail(req.body.Correo);
      if (existingUser) {
        console.log('Correo ya registrado:', req.body.Correo);
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      // Genera un token de verificación único
      const verificationToken = crypto.randomBytes(32).toString('hex');

      // Crea un nuevo usuario en la base de datos con el token de verificación
      const newUserId = await Cliente.create({
        ...req.body,
        is_verified: false,
        verification_token: verificationToken
      });
      console.log('Nuevo usuario creado ID:', newUserId);

      // Envía el correo electrónico de verificación
      await emailService.sendVerificationEmail(req.body.Correo, verificationToken);
      
      res.status(201).json({
        message: 'Registro exitoso. Por favor, verifica tu correo electrónico.',
        userId: newUserId
      });
    } catch (error) {
      console.error('Error en registro:', error);
      next({
        status: 500,
        message: 'Error en el servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  },

  // Inicio de sesión de cliente
  login: async (req, res) => {
    try {
      const { Usuario, Contraseña } = req.body;

      // Busca usuario por correo electrónico
      let user = await Cliente.findByEmail(Usuario);

      // Si no se encuentra por correo, busca por número de documento
      if (!user) {
        user = await Cliente.findByDocumentNumber(Usuario);
      }

      // Si no se encuentra el usuario
      if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Verifica la contraseña
      const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Genera el token JWT
      const token = jwt.sign({ id: user.Id_Cliente }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.query;

      const user = await Cliente.findByVerificationToken(token);

      if (!user) {
        return res.status(400).json({ error: 'Token de verificación inválido o expirado.' });
      }

      await Cliente.updateVerificationStatus(user.Id_Cliente, true);

      res.status(200).json({ message: 'Correo electrónico verificado exitosamente.' });
    } catch (error) {
      console.error('Error al verificar correo electrónico:', error);
      next({
        status: 500,
        message: 'Error en el servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  }
};

export default AuthController;