import bcrypt from 'bcrypt';
import { Administradores } from '../models/index.js';

/**
 * Crear un nuevo administrador (solo accesible por SuperAdmin)
 */
const createAdmin = async (req, res) => {
  try {
    // Verificar que el usuario actual sea SuperAdmin
    if (req.admin.Rol !== 'SuperAdmin') {
      return res.status(403).json({ error: 'Solo SuperAdmin puede crear nuevos administradores' });
    }

    const {
      nombre, apellido, usuario, contraseña, correo, 
      tipoDocumento, numeroDocumento, sexo, contacto, 
      direccion, fechaNacimiento, rol
    } = req.body;

    // Validar campos obligatorios
    if (!nombre || !apellido || !usuario || !contraseña || !correo || 
        !tipoDocumento || !numeroDocumento || !sexo || !contacto || 
        !direccion || !fechaNacimiento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existingAdmin = await Administradores.findByUsername(usuario);
    if (existingAdmin) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Crear el nuevo administrador
    const adminData = {
      Nombre: nombre,
      Apellido: apellido,
      Usuario: usuario,
      Contraseña: contraseña, // Se hasheará en el modelo
      Correo: correo,
      tipo_Documento: tipoDocumento,
      Numero_documento: numeroDocumento,
      Sexo: sexo,
      Contacto: contacto,
      Direccion: direccion,
      fecha_Nacimiento: fechaNacimiento,
      Rol: rol || 'Admin' // Por defecto es Admin si no se especifica
    };

    const newAdminId = await Administradores.create(adminData);

    res.status(201).json({ 
      message: 'Administrador creado exitosamente', 
      id: newAdminId 
    });
  } catch (error) {
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

    const admins = await Administradores.findAll();
    res.json(admins);
  } catch (error) {
    console.error('Error al obtener administradores:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

/**
 * Actualizar información de un administrador
 */
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Solo SuperAdmin puede modificar a otros administradores
    // Un Admin solo puede modificarse a sí mismo
    if (req.admin.Rol !== 'SuperAdmin' && req.admin.Id_Administradores != id) {
      return res.status(403).json({ error: 'No tienes permisos para modificar este administrador' });
    }

    // Obtener datos a actualizar
    const updateData = {};
    const allowedFields = [
      'Nombre', 'Apellido', 'Correo', 'Contraseña', 
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
      contraseña: 'Contraseña',
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

    // Actualizar administrador
    const updated = await Administradores.update(id, updateData);

    if (!updated) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.json({ message: 'Administrador actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar administrador:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export {
  createAdmin,
  getAdmins,
  updateAdmin
};