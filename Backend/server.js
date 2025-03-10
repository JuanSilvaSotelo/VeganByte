import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/cliente.routes.js';
import { errorHandler, notFoundHandler } from './utils/errors/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rutas
app.use('/api/cliente', clienteRoutes);

// Prueba de conexión a DB
app.get('/test-db', async (req, res) => {
  const dbHealthy = await DatabaseService.healthCheck();
  res.json({ database: dbHealthy ? 'OK' : 'Error' });
});

// Manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});