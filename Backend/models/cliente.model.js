import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';

const Cliente = {
  findById: async (id) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Id_Cliente = ?',
      [id]
    );
    return results[0];
  },

  updatePassword: async (id, hashedPassword) => {
    const [result] = await pool.query(
      'UPDATE Cliente SET Contraseña = ? WHERE Id_Cliente = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  },

  create: async (clienteData) => {
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

  findByEmail: async (email) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Correo = ?',
      [email]
    );
    return results[0];
  },

  findByDocumentNumber: async (documentNumber) => {
    const [results] = await pool.query(
      'SELECT * FROM Cliente WHERE Numero_documento = ?',
      [documentNumber]
    );
    return results[0];
  }
};

export default Cliente;
