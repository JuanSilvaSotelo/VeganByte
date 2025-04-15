import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';

// Datos del administrador por defecto
const defaultAdmin = {
  Nombre: 'Admin',
  Apellido: 'Sistema',
  Usuario: 'admin',
  Contraseña: 'admin123', // Esta contraseña se hasheará antes de guardarla
  Correo: 'admin@veganbyte.com',
  tipo_Documento: 'Cedula de ciudadania',
  Numero_documento: 123456789,
  Sexo: 'Otro',
  Contacto: 3001234567,
  Direccion: 'Calle Principal #123',
  fecha_Nacimiento: '1990-01-01',
  Rol: 'SuperAdmin'
};

/**
 * Función para inicializar el administrador por defecto
 */
async function initializeAdmin() {
  try {
    console.log('Verificando si existe un administrador...');
    
    // Verificar si ya existe algún administrador
    const [admins] = await pool.query('SELECT COUNT(*) as count FROM Administradores');
    
    if (admins[0].count > 0) {
      console.log('Ya existe al menos un administrador en el sistema.');
      return;
    }
    
    // No hay administradores, crear uno por defecto
    console.log('No se encontraron administradores. Creando administrador por defecto...');
    
    // Hashear la contraseña
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(defaultAdmin.Contraseña, saltRounds);
    
    // Insertar el administrador
    const query = `
      INSERT INTO Administradores 
      (Nombre, Apellido, Usuario, Contraseña, Correo, tipo_Documento, 
      Numero_documento, Sexo, Contacto, Direccion, fecha_Nacimiento, Rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query(query, [
      defaultAdmin.Nombre,
      defaultAdmin.Apellido,
      defaultAdmin.Usuario,
      hashedPassword,
      defaultAdmin.Correo,
      defaultAdmin.tipo_Documento,
      defaultAdmin.Numero_documento,
      defaultAdmin.Sexo,
      defaultAdmin.Contacto,
      defaultAdmin.Direccion,
      defaultAdmin.fecha_Nacimiento,
      defaultAdmin.Rol
    ]);
    
    console.log('✅ Administrador por defecto creado exitosamente!');
    console.log(`Usuario: ${defaultAdmin.Usuario}`);
    console.log(`Contraseña: ${defaultAdmin.Contraseña}`);
    console.log('Por favor, cambie esta contraseña después de iniciar sesión por primera vez.');
  } catch (error) {
    console.error('❌ Error al inicializar el administrador:', error);
  } finally {
    // Cerrar la conexión al finalizar
    process.exit(0);
  }
}

// Ejecutar la función
initializeAdmin();