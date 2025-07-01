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
        Contrasena: req.body.Contrasena, // Asegúrate de que la contraseña se pase explícitamente
        is_verified: false,
        verification_token: verificationToken
      });
      console.log('Nuevo usuario creado ID:', newUserId);

      // Envía el correo electrónico de verificación de forma asíncrona
      emailService.sendVerificationEmail(req.body.Correo, verificationToken).catch(error => {
        console.error('Error al enviar correo de verificación:', error);
        // Aqui podrias anadir logica para reintentar o notificar al administrador
      });
      
      res.status(201).json({
        message: 'Registro exitoso. Se ha enviado un correo electrónico de verificación a tu dirección. Por favor, revisa tu bandeja de entrada.',
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
      const { Usuario, Contrasena } = req.body;

      // Busca usuario por correo electrónico
      let user = await Cliente.findByEmail(Usuario);

      // Si no se encuentra por correo, busca por número de documento
      if (!user) {
        user = await Cliente.findByDocumentNumber(Usuario);
      }

      // Si no se encuentra el usuario
      if (!user) {
        return res.status(401).json({ error: 'Usuario o contrasena incorrectos' });
      }

      // Verifica la contrasena
      const isPasswordValid = await bcrypt.compare(Contrasena, user.Contrasena);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Usuario o contrasena incorrectos' });
      }

      // Verifica si el usuario ha verificado su correo electrónico
      if (!user.is_verified) {
        return res.status(401).json({ error: 'Por favor, verifica tu correo electrónico antes de iniciar sesión.' });
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