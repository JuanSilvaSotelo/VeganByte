import Cliente from '../models/cliente.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const PasswordController = {
  requestReset: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Cliente.findByEmail(email);

      if (!user) {
        return res.status(404).json({ error: 'No existe una cuenta con este correo electrónico' });
      }

      // Generar token de restablecimiento
      const resetToken = jwt.sign(
        { id: user.Id_Cliente },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Guardar token en la base de datos (puedes agregar un campo reset_token en tu tabla)
      // await Cliente.updateResetToken(user.Id_Cliente, resetToken);

      // Enviar correo electrónico
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecimiento de Contraseña - VeganByte',
        html: `
          <h1>Restablecimiento de Contraseña</h1>
          <p>Has solicitado restablecer tu contraseña.</p>
          <p>Haz clic en el siguiente enlace para continuar:</p>
          <a href="${resetUrl}">Restablecer Contraseña</a>
          <p>Este enlace expirará en 1 hora.</p>
          <p>Si no solicitaste este cambio, ignora este correo.</p>
        `
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico' });
    } catch (error) {
      console.error('Error al solicitar restablecimiento de contraseña:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Cliente.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Hash nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar contraseña
      await Cliente.updatePassword(user.Id_Cliente, hashedPassword);

      res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'El enlace ha expirado' });
      }
      console.error('Error al restablecer contraseña:', error);
      res.status(500).json({ error: 'Error al restablecer la contraseña' });
    }
  }
};

export default PasswordController;