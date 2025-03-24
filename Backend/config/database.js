import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: '.env' });

// Debug: Mostrar credenciales (opcional)
console.log("[DEBUG DB] Credenciales:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD ? '***' : 'vacía', // Oculta la contraseña por seguridad
});

// Crear el pool de conexiones
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || null, // Si no hay contraseña, usa null
  database: process.env.DB_DATABASE,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
});

// Verificación de conexión (opcional pero recomendado)
pool.getConnection()
  .then(conn => {
    console.log("✅ Conexión a MySQL exitosa!");
    conn.release(); // Liberar la conexión
  })
  .catch(err => {
    console.error("❌ Error de conexión a MySQL:", err);
    process.exit(1); // Detener la aplicación si no se puede conectar
  });

export { pool }; // Exportación nombrada
