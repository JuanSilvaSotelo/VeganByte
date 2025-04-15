import { pool } from '../config/database.js';

export const Evento = {
  find: async () => {
    const [rows] = await pool.query('SELECT * FROM Eventos');
    return rows;
  },
  
  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Eventos WHERE Id_Evento = ?', [id]);
    return rows[0];
  },
  
  create: async (eventoData) => {
    const query = `
      INSERT INTO Eventos 
      (Titulo, Descripcion, Fecha, Hora, Capacidad, Disponible, Id_Administrador, Estado, Tipo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(query, [
      eventoData.titulo,
      eventoData.descripcion,
      eventoData.fecha,
      eventoData.hora || '12:00',
      eventoData.capacidad,
      eventoData.disponible !== undefined ? eventoData.disponible : true,
      eventoData.creador || 1, // ID del administrador por defecto
      eventoData.estado || 'disponible',
      eventoData.tipo || 'experiencia' // Tipo de evento (taller o experiencia)
    ]);
    
    return result.insertId;
  },
  
  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => data[field]);
    values.push(id);
    
    const query = `UPDATE Eventos SET ${setClause} WHERE Id_Evento = ?`;
    
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }
};