import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import router from './routes/auth.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import DatabaseService from './services/database.service.js';
import { errorHandler, notFoundHandler } from './utils/errors/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración CORS mejorada
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      process.env.FRONTEND_URL,
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

// Middlewares críticos primero
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Debe estar antes de las rutas
app.use(express.json());

// Middleware de registro para diagnóstico
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Origin:', req.headers.origin);
  next();
});

// Rutas
app.use('/api/auth', router);
app.use('/api/cliente', clienteRoutes);

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi servidor backend!');
});

// Prueba de conexión a DB
app.get('/test-db', async (req, res) => {
  try {
    const dbHealthy = await DatabaseService.healthCheck();
    res.json({
      database: dbHealthy ? 'OK' : 'Error',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error de conexión a la base de datos',
      details: process.env.NODE_ENV === 'development' ? error.message : null,
    });
  }
});

// Manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
  console.log(`🛡️  CORS configurado para orígenes:`, corsOptions.origin);
});