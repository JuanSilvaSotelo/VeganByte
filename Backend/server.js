import dotenv from 'dotenv';
dotenv.config(); // ¡Debe ir primero!

import cors from 'cors';
import express from 'express';
import { pool as connection } from './config/database.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta de prueba de conexión
app.get('/test-db', async (req, res) => {
  try {
    const [result] = await connection.query('SELECT 1 + 1 AS solution');
    res.json({ database: 'OK', solution: result[0].solution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas Cliente
app.get('/api/Cliente', async (req, res) => {
  try {
    const [results] = await connection.query('SELECT * FROM Cliente');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/Cliente', async (req, res) => {
  try {
    const { Nombre, Apellido, tipo_Documento, Sexo, Correo, Contacto, fecha_Nacimiento, Direccion, Contraseña } = req.body;
    
    const query = `
      INSERT INTO Cliente 
      (Nombre, Apellido, tipo_Documento, Sexo, Correo, Contacto, fecha_Nacimiento, Direccion, Contraseña)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await connection.query(query, [
      Nombre, Apellido, tipo_Documento, Sexo, Correo, 
      Contacto, fecha_Nacimiento, Direccion, Contraseña
    ]);

    res.status(201).json({
      message: 'Cliente creado exitosamente',
      id: result.insertId
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});