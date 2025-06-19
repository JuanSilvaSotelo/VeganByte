import { pool } from '../config/database.js';

export const InscripcionEvento = {
  create: async (clienteId, eventoId, tipoEvento) => {
    const query = `
      INSERT INTO InscripcionesEventos (Id_Cliente, Id_Evento, Tipo_Evento)
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(query, [clienteId, eventoId, tipoEvento]);
    return result.insertId;
  },

  findByClienteAndEvento: async (clienteId, eventoId, tipoEvento) => {
    const query = `
      SELECT * FROM InscripcionesEventos
      WHERE Id_Cliente = ? AND Id_Evento = ? AND Tipo_Evento = ?
    `;
    const [rows] = await pool.query(query, [clienteId, eventoId, tipoEvento]);
    return rows[0];
  },

  delete: async (clienteId, eventoId, tipoEvento) => {
    const query = `
      DELETE FROM InscripcionesEventos
      WHERE Id_Cliente = ? AND Id_Evento = ? AND Tipo_Evento = ?
    `;
    const [result] = await pool.query(query, [clienteId, eventoId, tipoEvento]);
    return result.affectedRows > 0;
  },

  getAllInscripciones: async () => {
    const query = `
      SELECT ie.*, c.Nombre AS Nombre_Cliente, c.Apellido AS Apellido_Cliente,
             e.Tipo AS Tipo_Experiencia, e.Descripcion AS Descripcion_Experiencia,
             t.nombre_Taller AS Nombre_Taller, t.Descripcion AS Descripcion_Taller
      FROM InscripcionesEventos ie
      JOIN Clientes c ON ie.Id_Cliente = c.Id_Cliente
      LEFT JOIN Experiencias e ON ie.Id_Evento = e.Id_Experiencias AND ie.Tipo_Evento = 'experiencia'
      LEFT JOIN Talleres t ON ie.Id_Evento = t.Id_Taller AND ie.Tipo_Evento = 'taller'
    `;
    const [rows] = await pool.query(query);
    return rows;
  },

  getInscripcionesByEvento: async (eventoId, tipoEvento) => {
    const query = `
      SELECT ie.*, c.Nombre AS Nombre_Cliente, c.Apellido AS Apellido_Cliente
      FROM InscripcionesEventos ie
      JOIN Clientes c ON ie.Id_Cliente = c.Id_Cliente
      WHERE ie.Id_Evento = ? AND ie.Tipo_Evento = ?
    `;
    const [rows] = await pool.query(query, [eventoId, tipoEvento]);
    return rows;
  }
};