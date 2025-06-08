// Modelo para gestionar los clientes en la base de datos
// Importa bcrypt para el manejo seguro de contraseñas
import bcrypt from 'bcryptjs';
// Importa la conexión al pool de la base de datos
import { pool } from '../config/database.js';

const Cliente = {
  // Obtener todos los clientes ordenados por fecha de nacimiento descendente
  findAll: async () => {
    const [results] = await pool.query(
      'SELECT Nombre, Apellido, Correo, fecha_Nacimiento, Direccion FROM Cliente ORDER BY fecha_Nacimiento DESC'
    );
    return results;
  },

  // Buscar un cliente por su ID
  findById: async (id) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Id_Cliente = ?',
      [id]
    );
    return results[0];
  },

  // Actualizar la contraseña de un cliente
  updatePassword: async (id, hashedPassword) => {
    const [result] = await pool.query(
      'UPDATE Cliente SET Contraseña = ? WHERE Id_Cliente = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  },

  // Crear un nuevo cliente con contraseña encriptada
  create: async (clienteData) => {
    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(clienteData.Contraseña, 10);
    
    const query = `
      INSERT INTO Cliente 
      (Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto, 
      fecha_Nacimiento, Direccion, Contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [
      clienteData.Nombre,
      clienteData.Apellido,
      clienteData.tipo_Documento,
      clienteData.Numero_documento,
      clienteData.Sexo,
      clienteData.Correo,
      clienteData.Contacto,
      clienteData.fecha_Nacimiento,
      clienteData.Direccion,
      hashedPassword
    ]);
    
    return result.insertId;
  },

  // Buscar un cliente por su correo electrónico
  findByEmail: async (email) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Correo = ?',
      [email]
    );
    return results[0];
  },

  // Buscar un cliente por su número de documento
  findByDocumentNumber: async (documentNumber) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Numero_documento = ?',
      [documentNumber]
    );
    return results[0];
  }
};

// Exportar el modelo de cliente para su uso en otros módulos
export default Cliente;
