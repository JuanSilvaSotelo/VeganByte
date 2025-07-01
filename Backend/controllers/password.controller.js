// Controlador para la gestion de restablecimiento de contrasenas
import Cliente from '../models/cliente.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

// Configuración del transporte de correo usando nodemailer y Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const PasswordController = {
  // Solicitar restablecimiento de contrasena
  requestReset: async (req, res) => {
    try {
      const { email } = req.body;
      // Buscar usuario por correo electrónico
      const user = await Cliente.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'No existe una cuenta con este correo electrónico' });
      }

      // Generar token de restablecimiento válido por 1 hora
      const resetToken = jwt.sign(
        { id: user.Id_Cliente },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Guardar token en la base de datos si se implementa (comentado)
      // await Cliente.updateResetToken(user.Id_Cliente, resetToken);

      // Construir URL de restablecimiento para el frontend
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      
      // Opciones del correo electrónico
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecimiento de Contrasena - VeganByte',
        html: `
          <h1>Restablecimiento de Contrasena</h1>
          <p>Has solicitado restablecer tu contrasena.</p>
          <p>Haz clic en el siguiente enlace para continuar:</p>
          <a href="${resetUrl}">Restablecer Contrasena</a>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        `
      };

      // Enviar correo electrónico con el enlace de restablecimiento
      await transporter.sendMail(mailOptions);

      res.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico' });
    } catch (error) {
      console.error('Error al solicitar restablecimiento de contrasena:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  },

  // Restablecer la contrasena usando el token recibido
  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      // Verificar y decodificar el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Buscar usuario por ID decodificado
      const user = await Cliente.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Hashear la nueva contrasena
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar la contrasena en la base de datos
      await Cliente.updatePassword(user.Id_Cliente, hashedPassword);

      res.json({ message: 'Contrasena actualizada exitosamente' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'El enlace ha expirado' });
      }
      console.error('Error al restablecer contrasena:', error);
      res.status(500).json({ error: 'Error al restablecer la contrasena' });
    }
  }
};

export default PasswordController;