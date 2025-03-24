import Cliente from '../models/cliente.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = {
  register: async (req, res, next) => {
    try {
      const existingDoc = await Cliente.findByDocumentNumber(req.body.Numero_documento);
      if (existingDoc) {
        return res.status(400).json({ error: 'Número de documento ya registrado' });
      }
      console.log('Datos recibidos:', req.body);
      
      const existingUser = await Cliente.findByEmail(req.body.Correo);
      if (existingUser) {
        console.log('Correo ya registrado:', req.body.Correo);
        return res.status(400).json({ error: 'El correo ya está registrado' });
      }

      const newUserId = await Cliente.create(req.body);
      console.log('Nuevo usuario creado ID:', newUserId);
      
      res.status(201).json({
        message: 'Registro exitoso',
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

  login: async (req, res) => {
    try {
      const { Usuario, Contraseña } = req.body;

      // Attempt to find user by email
      let user = await Cliente.findByEmail(Usuario);

      // If not found by email, attempt to find by document number
      if (!user) {
        user = await Cliente.findByDocumentNumber(Usuario);
      }

      if (!user) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.Id_Cliente }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};

export default AuthController;