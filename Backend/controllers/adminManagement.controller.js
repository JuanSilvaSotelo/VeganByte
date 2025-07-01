// Importar las dependencias necesarias
import bcrypt from 'bcryptjs'; // Para encriptar contrasenas
import { Administradores } from '../models/index.js'; // Modelo de base de datos para administradores

/**
 * Crear un nuevo administrador (solo accesible por SuperAdmin)
 */
const createAdmin = async (req, res) => {
  try {
    // Verificar que el usuario actual sea SuperAdmin
    if (req.admin.Rol !== 'SuperAdmin') {
      return res.status(403).json({ error: 'Solo SuperAdmin puede crear nuevos administradores' });
    }

    // Desestructurar el cuerpo de la solicitud para obtener los datos del nuevo administrador
    const {
      nombre, apellido, usuario, contrasena, correo, 
      tipoDocumento, numeroDocumento, sexo, contacto, 
      direccion, fechaNacimiento, rol
    } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !usuario || !contrasena || !correo || 
        !tipoDocumento || !numeroDocumento || !sexo || !contacto || 
        !direccion || !fechaNacimiento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingAdmin = await Administradores.findByUsername(usuario);
    if (existingAdmin) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Crear el nuevo administrador con los datos proporcionados
    const adminData = {
      Nombre: nombre,
      Apellido: apellido,
      Usuario: usuario,
      Contrasena: contrasena, // Se hasheara en el modelo
      Correo: correo,
      tipo_Documento: tipoDocumento,
      Numero_documento: numeroDocumento,
      Sexo: sexo,
      Contacto: contacto,
      Direccion: direccion,
      fecha_Nacimiento: fechaNacimiento,
      Rol: rol || 'Admin' // Por defecto es Admin si no se especifica
    };

    // Crear el nuevo administrador en la base de datos
    const newAdminId = await Administradores.create(adminData);

    // Responder con un mensaje de éxito y el ID del nuevo administrador
    res.status(201).json({ 
      message: 'Administrador creado exitosamente', 
      id: newAdminId 
    });
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    console.error('Error al crear administrador:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

/**
 * Obtener lista de administradores (solo accesible por SuperAdmin)
 */
const getAdmins = async (req, res) => {
  try {
    // Verificar que el usuario actual sea SuperAdmin
    if (req.admin.Rol !== 'SuperAdmin') {
      return res.status(403).json({ error: 'Solo SuperAdmin puede ver la lista de administradores' });
    }

    // Obtener todos los administradores de la base de datos
    const admins = await Administradores.findAll();
    // Responder con la lista de administradores
    res.json(admins);
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    console.error('Error al obtener administradores:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

/**
 * Actualizar información de un administrador
 */
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del administrador a actualizar
    
    // Solo SuperAdmin puede modificar a otros administradores
    // Un Admin solo puede modificarse a sí mismo
    if (req.admin.Rol !== 'SuperAdmin' && req.admin.Id_Administradores != id) {
      return res.status(403).json({ error: 'No tienes permisos para modificar este administrador' });
    }

    // Obtener datos a actualizar
    const updateData = {};
    const allowedFields = [
      'Nombre', 'Apellido', 'Correo', 'Contrasena', 
      'tipo_Documento', 'Numero_documento', 'Sexo', 
      'Contacto', 'Direccion', 'fecha_Nacimiento'
    ];

    // Solo SuperAdmin puede cambiar el rol
    if (req.admin.Rol === 'SuperAdmin' && req.body.rol) {
      updateData.Rol = req.body.rol;
    }

    // Mapear campos del body a los campos de la base de datos
    const fieldMapping = {
      nombre: 'Nombre',
      apellido: 'Apellido',
      correo: 'Correo',
      contrasena: 'Contrasena',
      tipoDocumento: 'tipo_Documento',
      numeroDocumento: 'Numero_documento',
      sexo: 'Sexo',
      contacto: 'Contacto',
      direccion: 'Direccion',
      fechaNacimiento: 'fecha_Nacimiento'
    };

    // Construir objeto de actualización
    Object.keys(fieldMapping).forEach(bodyField => {
      if (req.body[bodyField] !== undefined) {
        const dbField = fieldMapping[bodyField];
        if (allowedFields.includes(dbField)) {
          updateData[dbField] = req.body[bodyField];
        }
      }
    });

    // Verificar si hay datos para actualizar
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
    }

    // Actualizar administrador en la base de datos
    const updated = await Administradores.update(id, updateData);

    // Verificar si el administrador fue encontrado y actualizado
    if (!updated) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    // Responder con un mensaje de éxito
    res.json({ message: 'Administrador actualizado exitosamente' });
  } catch (error) {
    // Manejo de errores en caso de que ocurra un problema
    console.error('Error al actualizar administrador:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Exportar las funciones para su uso en otras partes de la aplicación
export {
  createAdmin,
  getAdmins,
  updateAdmin
};
