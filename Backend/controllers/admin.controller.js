import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Administradores, Cliente } from '../models/index.js';
import { Experiencia, Taller } from '../models/index.js';

const loginAdmin = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    const admin = await Administradores.findByUsername(usuario);

    if (!admin || !await bcrypt.compare(contraseña, admin.Contraseña)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    if (admin.Rol !== 'Admin' && admin.Rol !== 'SuperAdmin') {
      return res.status(403).json({ error: 'No tiene los privilegios necesarios' });
    }

    const token = jwt.sign({ id: admin.Id_Administradores, rol: admin.Rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    
    // Actualizar último login
    await Administradores.update(admin.Id_Administradores, { Ultimo_login: new Date() });
    
    res.json({ token, nombre: `${admin.Nombre} ${admin.Apellido}` });
  } catch (error) {
    console.error('Error en login de administrador:', error);
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


export {
  loginAdmin,
  getUsuariosActivos
};