import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connection from './config/database.js'; // Ruta corregida y sintaxis ES6

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta GET para obtener usuarios
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, resultados) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(resultados);
  });
});

// Ruta POST para crear usuarios
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

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;