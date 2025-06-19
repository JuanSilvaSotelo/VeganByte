import jwt from 'jsonwebtoken';
import Cliente from '../models/cliente.model.js';

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cliente = await Cliente.findById(decoded.id);

    if (!cliente) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    req.user = cliente;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado. Por favor, inicie sesión nuevamente.', redirect: '/register' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token inválido. Por favor, inicie sesión nuevamente.', redirect: '/register' });
    } else {
      return res.status(500).json({ message: 'Error interno del servidor al verificar token.' });
    }
  }
};