// Importar las dependencias necesarias
import jwt from 'jsonwebtoken'; // Para generar y verificar tokens JWT
import bcrypt from 'bcryptjs'; // Para encriptar y comparar contraseñas
import { Administradores, Cliente, InscripcionEvento } from '../models/index.js'; // Modelos de base de datos
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
      attributes: ['Id_Cliente', 'Nombre', 'Apellido', 'Correo', 'fecha_Nacimiento', 'Direccion'], // Atributos a devolver
      order: [['fecha_Nacimiento', 'DESC']], // Ordenar por fecha de nacimiento de forma descendente
      raw: true // Asegura que los resultados sean objetos planos y no instancias del modelo
    });
    // Responder con la lista de usuarios
    res.json(usuarios);
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    res.status(500).json({ error: 'Error al obtener usuarios' }); // Respuesta de error al obtener usuarios
  }
};

// Exportar las funciones para su uso en otras partes de la aplicación
const createUser = async (req, res) => {
  try {
    const { Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto, Contraseña, fecha_Nacimiento, Direccion } = req.body;

    const existingUser = await Cliente.findByEmail(Correo);
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    const newUser = await Cliente.create({
      Nombre,
      Apellido,
      tipo_Documento,
      Numero_documento,
      Sexo,
      Correo,
      Contacto,
      Contraseña: hashedPassword,
      fecha_Nacimiento,
      Direccion,
      is_verified: true, // Admin created users are automatically verified
      verification_token: null
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error en el servidor al crear usuario' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto, Contraseña, fecha_Nacimiento, Direccion } = req.body;

    const user = await Cliente.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const updateData = {
      Nombre,
      Apellido,
      tipo_Documento,
      Numero_documento,
      Sexo,
      Correo,
      Contacto,
      fecha_Nacimiento,
      Direccion
    };

    if (Contraseña) {
      updateData.Contraseña = await bcrypt.hash(Contraseña, 10);
    }

    await Cliente.update(id, updateData);

    res.json({ message: 'Usuario actualizado exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor al actualizar usuario' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Cliente.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Eliminar todas las inscripciones de eventos asociadas a este cliente
    await InscripcionEvento.delete({ Id_Cliente: id });

    // Ahora se puede eliminar el cliente
    await Cliente.delete(id);

    res.json({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor al eliminar usuario' });
  }
};

export {
  loginAdmin,
  getUsuariosActivos,
  createUser,
  updateUser,
  deleteUser
};
