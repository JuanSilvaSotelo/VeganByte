import {pool} from '../config/database.js';

const Cliente = {
  getAll: async () => {
    const [results] = await connection.query('SELECT * FROM Cliente');
    return results;
  },

  create: async (clienteData) => {
    const query = `
      INSERT INTO Cliente 
      (Nombre, Apellido, tipo_Documento, Sexo, Correo, Contacto, fecha_Nacimiento, Direccion, Contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.query(query, [
      clienteData.Nombre,
      clienteData.Apellido,
      clienteData.tipo_Documento,
      clienteData.Sexo,
      clienteData.Correo,
      clienteData.Contacto,
      clienteData.fecha_Nacimiento,
      clienteData.Direccion,
      clienteData.Contraseña
    ]);
    
    return result.insertId;
  }
};

export default Cliente;