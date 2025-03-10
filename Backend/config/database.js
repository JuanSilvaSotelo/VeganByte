import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' }); // Fuerza la ruta del archivo

console.log("[DEBUG DB] Credenciales:", {
  host: process.env.DB_HOST, // Debe mostrar 'localhost'
  user: process.env.DB_USER, // Debe mostrar 'root'
  database: process.env.DB_DATABASE // Debe mostrar 'veganByte'
});

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE, // ¡OJO! Tienes un typo aquí (DB_DATABASE vs DB_DATABASE)
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10
});
// Verificación de conexión (opcional pero recomendado)
pool.getConnection()
  .then(conn => {
    console.log("✅ Conexión a MySQL exitosa!");
    conn.release();
  })
  .catch(err => {
    console.error("❌ Error de conexión a MySQL:", err);
    process.exit(1);
});

export { pool }; // Exportación nombrada