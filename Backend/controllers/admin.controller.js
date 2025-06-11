// Importar las dependencias necesarias
import jwt from 'jsonwebtoken'; // Para generar y verificar tokens JWT
import bcrypt from 'bcryptjs'; // Para encriptar y comparar contraseñas
import { Administradores, Cliente } from '../models/index.js'; // Modelos de base de datos
import { Experiencia, Taller } from '../models/index.js'; // Modelos adicionales (no utilizados en este fragmento)

// Función para manejar el inicio de sesión de un administrador
const loginAdmin = async (req, res) => {
  try {
    // Desestructurar el cuerpo de la solicitud para obtener usuario y contraseña
    const { usuario, contraseña } = req.body;

    // Buscar el administrador por su nombre de usuario
    const admin = await Administradores.findByUsername(usuario);

    // Verificar si el administrador existe y si la contraseña es correcta
    if (!admin || !await bcrypt.compare(contraseña, admin.Contraseña)) {
      return res.status(401).json({ error: 'Credenciales inválidas' }); // Respuesta de error si las credenciales son inválidas
    }

    // Verificar si el administrador tiene el rol adecuado
    if (admin.Rol !== 'Admin' && admin.Rol !== 'SuperAdmin') {
      return res.status(403).json({ error: 'No tiene los privilegios necesarios' }); // Respuesta de error si no tiene privilegios
    }

    // Generar un token JWT con el ID del administrador y su rol, que expira en 8 horas
    const token = jwt.sign({ id: admin.Id_Administradores, rol: admin.Rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    
    // Actualizar la fecha del último inicio de sesión del administrador
    await Administradores.update(admin.Id_Administradores, { Ultimo_login: new Date() });
    
    // Responder con el token y el nombre completo del administrador
    res.json({ token, nombre: `${admin.Nombre} ${admin.Apellido}` });
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    console.error('Error en login de administrador:', error);
    res.status(500).json({ error: 'Error en el servidor' }); // Respuesta de error del servidor
  }
};

// Función para obtener la lista de usuarios activos
const getUsuariosActivos = async (req, res) => {
  try {
    // Obtener todos los usuarios activos con los atributos especificados
    const usuarios = await Cliente.findAll({
      attributes: ['Nombre', 'Apellido', 'Correo', 'fecha_Nacimiento', 'Direccion'], // Atributos a devolver
      order: [['fecha_Nacimiento', 'DESC']] // Ordenar por fecha de nacimiento de forma descendente
    });
    // Responder con la lista de usuarios
    res.json(usuarios);
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    res.status(500).json({ error: 'Error al obtener usuarios' }); // Respuesta de error al obtener usuarios
  }
};

// Exportar las funciones para su uso en otras partes de la aplicación
export {
  loginAdmin,
  getUsuariosActivos
};
