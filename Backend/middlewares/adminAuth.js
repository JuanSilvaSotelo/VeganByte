import jwt from 'jsonwebtoken';
import { Administradores } from '../models/index.js';

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Usar el método correcto según el modelo Administradores
    const admin = await Administradores.findByPk(decoded.id);

    if (!admin || (admin.Rol !== 'Admin' && admin.Rol !== 'SuperAdmin')) {
      return res.status(403).json({ error: 'Privilegios insuficientes' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

export { verifyAdmin };