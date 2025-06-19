// Middleware para verificar si el usuario es un administrador
import jwt from 'jsonwebtoken';
import { Administradores } from '../models/index.js';

// Función para verificar el token y los privilegios de administrador
const verifyAdmin = async (req, res, next) => {
  console.log('*** Entrando a verifyAdmin ***');
  try {
    // Obtener el token del encabezado de autorización
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    // Verificar y decodificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Buscar el administrador por su ID en la base de datos
    const admin = await Administradores.findByPk(decoded.id);

    // Verificar si el usuario existe y tiene el rol adecuado
    if (!admin || (admin.Rol !== 'Admin' && admin.Rol !== 'SuperAdmin')) {
      return res.status(403).json({ error: 'Privilegios insuficientes' });
    }

    // Adjuntar el objeto admin a la solicitud para su uso posterior
    req.admin = admin;
    next();
  } catch (error) {
    // Manejo de errores de autenticación
    console.error('Error de autenticación:', error);
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

// Exportar el middleware para su uso en rutas protegidas
export { verifyAdmin };