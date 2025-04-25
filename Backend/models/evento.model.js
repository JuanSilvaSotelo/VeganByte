import { pool } from '../config/database.js';

// Modelo para la tabla 'experiencias'
export const Experiencia = {
  find: async () => {
    const [rows] = await pool.query('SELECT * FROM Experiencias'); // Corrección del nombre de la tabla
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows.map(row => ({ ...row, tipo: 'experiencia' }));
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Experiencias WHERE Id_Experiencias = ?', [id]); // Corrección del nombre de la tabla y la clave primaria
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows[0] ? { ...rows[0], tipo: 'experiencia' } : null;
  },

  create: async (data) => {
    // Id_Reserva se omite aquí, ya que no se proporciona al crear una experiencia directamente
    const query = `
      INSERT INTO Experiencias (
        Tipo, Descripcion, Categoria, Valor, 
        nivel_Running, duracion_Desplazamiento, duracion_Caminata,
        servicios_Termales, Ubicacion
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      // data.Id_Reserva, // Omitido
      data.Tipo,
      data.Descripcion,
      data.Categoria,
      data.Valor,
      data.nivel_Running,
      data.duracion_Desplazamiento,
      data.duracion_Caminata,
      data.servicios_Termales,
      data.Ubicacion
    ]);
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => data[field]);
    values.push(id);

    const query = `UPDATE Experiencias SET ${setClause} WHERE Id_Experiencias = ?`; // Corrección del nombre de la tabla y la clave primaria
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }
};

// Modelo para la tabla 'talleres'
export const Taller = {
  find: async () => {
    const [rows] = await pool.query('SELECT * FROM Talleres');
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows.map(row => ({ ...row, tipo: 'taller' }));
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM Talleres WHERE Id_Taller = ?', [id]);
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows[0] ? { ...rows[0], tipo: 'taller' } : null;
  },

  create: async (data) => {
    // Id_Reserva se omite aquí, ya que no se proporciona al crear un taller directamente
    // Capacidad también se omite ya que no existe en la tabla Talleres
    const query = `
      INSERT INTO Talleres (
        nombre_Taller, fecha,
        hora_Inicio, hora_Fin, Valor
      )
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      // data.Id_Reserva, // Omitido
      data.nombre_Taller, // Usando 'nombre_Taller'
      // data.Descripcion, // Omitido, no existe en la tabla
      // data.Capacidad, // Omitido
      data.fecha,
      data.hora_Inicio || '12:00',
      data.hora_Fin,
      data.Valor
    ]);
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const values = fields.map(field => data[field]);
    values.push(id);

    const query = `UPDATE Talleres SET ${setClause} WHERE Id_Taller = ?`;
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  }
};
