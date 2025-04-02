const jwt = require('jsonwebtoken');
const { Administradores } = require('../models');

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Administradores.findByPk(decoded.id);

    if (!admin || admin.Rol !== 'Admin') {
      return res.status(403).json({ error: 'Privilegios insuficientes' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error de autenticación' });
  }
};

module.exports = { verifyAdmin };