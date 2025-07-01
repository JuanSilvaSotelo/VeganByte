// Modelo para gestionar los administradores en la base de datos
import bcrypt from 'bcryptjs';
import { pool } from '../config/database.js';

const Administradores = {
  // Crear un nuevo administrador con contrasena encriptada
  create: async (adminData) => {
    const hashedPassword = await bcrypt.hash(adminData.Contrasena, 10);
    
    const query = `
      INSERT INTO Administradores 
      (Nombre, Apellido, Usuario, Contrasena, Correo, tipo_Documento, 
      Numero_documento, Sexo, Contacto, Direccion, fecha_Nacimiento, Rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [
      adminData.Nombre,
      adminData.Apellido,
      adminData.Usuario,
      hashedPassword,
      adminData.Correo,
      adminData.tipo_Documento,
      adminData.Numero_documento,
      adminData.Sexo,
      adminData.Contacto,
      adminData.Direccion,
      adminData.fecha_Nacimiento,
      adminData.Rol || 'Admin'
    ]);
    
    return result.insertId;
  },

  // Buscar un administrador por su nombre de usuario
  findByUsername: async (username) => {
    const [results] = await pool.query(
      'SELECT * FROM Administradores WHERE Usuario = ?',
      [username]
    );
    return results[0];
  },

  // Buscar un administrador por su ID primario
  findByPk: async (id) => {
    const [results] = await pool.query(
      'SELECT * FROM Administradores WHERE Id_Administradores = ?',
      [id]
    );
    return results[0];
  },

  // Obtener todos los administradores con información básica
  findAll: async () => {
    const [results] = await pool.query(
      'SELECT Id_Administradores, Nombre, Apellido, Usuario, Correo, Rol, Ultimo_login FROM Administradores'
    );
    return results;
  },

  // Actualizar los datos de un administrador
  update: async (id, data) => {
    // Construir dinámicamente la consulta de actualización
    const fields = Object.keys(data).filter(key => key !== 'Contrasena');
    
    if (fields.length === 0 && !data.Contrasena) {
      return false; // No hay nada que actualizar
    }
    
    // Manejar la contrasena por separado si esta presente
    if (data.Contrasena) {
      const hashedPassword = await bcrypt.hash(data.Contrasena, 10);
      fields.push('Contrasena');
      data.Contrasena = hashedPassword;
    }
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => data[field]);
    values.push(id); // Para la cláusula WHERE
    
    const query = `UPDATE Administradores SET ${setClause} WHERE Id_Administradores = ?`;
    
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }
};

// Exportar el modelo de administradores para su uso en otros módulos
export default Administradores;