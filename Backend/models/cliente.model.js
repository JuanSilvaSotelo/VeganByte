import bcrypt from 'bcrypt';
import { pool } from '../config/database.js';

const Cliente = {
  create: async (clienteData) => {
    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(clienteData.Contraseña, 10);

      // Query para insertar un nuevo cliente
      const query = `
        INSERT INTO Cliente 
        (Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto, 
        fecha_Nacimiento, Direccion, Contraseña)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      // Ejecutar la consulta
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
        hashedPassword,
      ]);

      // Devolver el ID del nuevo cliente
      return result.insertId;
    } catch (error) {
      console.error('Error en Cliente.create:', error);
      throw error; // Relanzar el error para manejarlo en el controlador
    }
  },

  findByEmail: async (email) => {
    try {
      // Query para buscar un cliente por correo
      const [results] = await pool.query(
        'SELECT * FROM Cliente WHERE Correo = ?',
        [email]
      );
      return results[0]; // Devolver el primer resultado (si existe)
    } catch (error) {
      console.error('Error en Cliente.findByEmail:', error);
      throw error; // Relanzar el error para manejarlo en el controlador
    }
  },

  findByDocumentNumber: async (Numero_documento) => {
    try {
      // Query para buscar un cliente por número de documento
      const [results] = await pool.query(
        'SELECT * FROM Cliente WHERE Numero_documento = ?',
        [Numero_documento]
      );
      return results[0]; // Devolver el primer resultado (si existe)
    } catch (error) {
      console.error('Error en Cliente.findByDocumentNumber:', error);
      throw error; // Relanzar el error para manejarlo en el controlador
    }
  },
};

export default Cliente;