// backend/server.js
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de conexión a MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: '1604',
    database: 'mi_proyecto'
  });

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Ejemplo de ruta
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(resultados);
  });
});

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email) VALUES (?, ?)';
  
  connection.query(query, [nombre, email], (error, resultado) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json({ 
      message: 'Usuario creado exitosamente', 
      id: resultado.insertId 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;