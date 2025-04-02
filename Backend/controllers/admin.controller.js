const jwt = require('jsonwebtoken');
const { Administradores } = require('../models');
const { Cliente } = require('../models');

const loginAdmin = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const admin = await Administradores.findOne({ where: { Usuario: usuario } });

    if (!admin || !await bcrypt.compare(contraseña, admin.Contraseña)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: admin.id, rol: admin.Rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    await admin.update({ Ultimo_login: new Date() });
    
    res.json({ token, nombre: `${admin.Nombre} ${admin.Apellido}` });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

const getUsuariosActivos = async (req, res) => {
  try {
    const usuarios = await Cliente.findAll({
      attributes: ['Nombre', 'Apellido', 'Correo', 'fecha_Nacimiento', 'Direccion'],
      order: [['fecha_Nacimiento', 'DESC']]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = {
  loginAdmin,
  getUsuariosActivos
};