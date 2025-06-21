import { pool } from '../config/database.js';

// Modelo para la tabla 'experiencias'
export const Experiencia = {
  find: async () => {
    const [rows] = await pool.query('SELECT *, Fecha, Hora_Inicio, Hora_Fin FROM Experiencias');
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows.map(row => ({ ...row, tipo: 'experiencia' }));
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT *, Fecha, Hora_Inicio, Hora_Fin, (SELECT COUNT(*) FROM InscripcionesEventos WHERE Id_Evento = Experiencias.Id_Experiencias AND Tipo_Evento = \'experiencia\') AS Inscritos FROM Experiencias WHERE Id_Experiencias = ?', [id]);
    const inscritos = rows[0] ? rows[0].Inscritos : 0;
    const capacidad = rows[0] && rows[0].cant_Personas !== null ? rows[0].cant_Personas : Number.MAX_SAFE_INTEGER;
    let estado = 'Disponible';
    if (rows[0] && rows[0].Estado === 'Cancelado') {
      estado = 'Cancelado';
    } else if (inscritos >= capacidad) {
      estado = 'Completo';
    }
    console.log(`Experiencia ${id}: inscritos=${inscritos}, capacidad=${capacidad}, calculado estado=${estado}`);
    const returnedExperiencia = rows[0] ? { ...rows[0], tipo: 'experiencia', capacidad: capacidad, Estado: estado, inscritos_count: inscritos } : null;
    console.log('Returned Experiencia object:', returnedExperiencia);
    return returnedExperiencia;
  },

  create: async (data) => {
    // Id_Reserva se omite aquí, ya que no se proporciona al crear una experiencia directamente
    const query = `
      INSERT INTO Experiencias (
        Tipo, Descripcion, Categoria, Valor, 
        nivel_Running, duracion_Desplazamiento, duracion_Caminata,
        servicios_Termales, Ubicacion, Fecha, Hora_Inicio, Hora_Fin, cant_Personas, Estado
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      data.Ubicacion,
      data.Fecha,
      data.Hora_Inicio,
      data.Hora_Fin,
      data.capacidad,
      data.Estado || 'Disponible'
    ]);
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    if (data.capacidad !== undefined) {
      data.cant_Personas = data.capacidad;
      delete data.capacidad;
    }
    if (data.Estado !== undefined) {
      // Ensure Estado is one of the allowed ENUM values
      const allowedStates = ['Disponible', 'Cancelado', 'Completo'];
      if (!allowedStates.includes(data.Estado)) {
        throw new Error(`Invalid Estado value: ${data.Estado}. Must be one of ${allowedStates.join(', ')}`);
      }
    }


    const setClause = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const query = `UPDATE Experiencias SET ${setClause} WHERE Id_Experiencias = ?`;
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM Experiencias WHERE Id_Experiencias = ?', [id]);
    return result;
  },

  updateEstado: async (id, estado) => {
    const query = `UPDATE Experiencias SET Estado = ? WHERE Id_Experiencias = ?`;
    const [result] = await pool.query(query, [estado, id]);
    return result.affectedRows > 0;
  }
};

// Modelo para la tabla 'talleres'
export const Taller = {
  find: async () => {
    const [rows] = await pool.query('SELECT *, fecha AS Fecha, Hora_Inicio, Hora_Fin FROM Talleres');
    // Añadir un campo 'tipo' para identificarlo en el controlador si es necesario
    return rows.map(row => ({ ...row, tipo: 'taller' }));
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT *, fecha AS Fecha, Hora_Inicio, Hora_Fin, (SELECT COUNT(*) FROM InscripcionesEventos WHERE Id_Evento = Talleres.Id_Taller AND Tipo_Evento = \'taller\') AS Inscritos FROM Talleres WHERE Id_Taller = ?', [id]);
    const inscritos = rows[0] ? rows[0].Inscritos : 0;
    const capacidad = rows[0] && rows[0].cant_Personas !== null ? rows[0].cant_Personas : Number.MAX_SAFE_INTEGER;
    let estado = 'Disponible';
    if (rows[0] && rows[0].Estado === 'Cancelado') {
      estado = 'Cancelado';
    } else if (inscritos >= capacidad) {
      estado = 'Completo';
    }
    console.log(`Taller ${id}: inscritos=${inscritos}, capacidad=${capacidad}, calculado estado=${estado}`);
    const returnedTaller = rows[0] ? { ...rows[0], tipo: 'taller', capacidad: capacidad, Estado: estado, inscritos_count: inscritos } : null;
    console.log('Returned Taller object:', returnedTaller);
    return returnedTaller;
  },

  create: async (data) => {
    const query = `
      INSERT INTO Talleres (
        nombre_Taller, fecha,
        Hora_Inicio, Hora_Fin, Valor, cant_Personas
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
      // data.Id_Reserva, // Omitido
      data.nombre_Taller, // Usando 'nombre_Taller'
      data.fecha,
      data.Hora_Inicio,
      data.Hora_Fin,
      data.Valor,
      data.cant_Personas
    ]);
    return result.insertId;
  },

  update: async (id, data) => {
    const fields = Object.keys(data);
    if (fields.length === 0) return false;

    // Handle cant_Personas specifically if it's present in data
    if (data.capacidad !== undefined) {
      data.cant_Personas = data.capacidad;
      delete data.capacidad; // Remove original capacidad to avoid conflicts
    }



    const setClause = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    values.push(id);

    const query = `UPDATE Talleres SET ${setClause} WHERE Id_Taller = ?`;
    const [result] = await pool.query(query, values);
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM Talleres WHERE Id_Taller = ?', [id]);
    return result;
  },

  updateEstado: async (id, estado) => {
    const query = `UPDATE Talleres SET Estado = ? WHERE Id_Taller = ?`;
    const [result] = await pool.query(query, [estado, id]);
    return result.affectedRows > 0;
  }
};
