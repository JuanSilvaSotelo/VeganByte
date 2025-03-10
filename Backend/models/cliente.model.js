import bcrypt from 'bcrypt';
import {pool} from '../config/database.js';

const Cliente = {
  create: async (clienteData) => {
    const hashedPassword = await bcrypt.hash(clienteData.Contraseña, 10);
    
    const query = `
      INSERT INTO Cliente 
      (Nombre, Apellido, tipo_Documento, Numero_documento, Sexo, Correo, Contacto, 
      fecha_Nacimiento, Direccion, Contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.query(query, [
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
    const [results] = await connection.query(
      'SELECT * FROM Cliente WHERE Correo = ?',
      [email]
    );
    return results[0];
  }
};

export default Cliente;