import mysql from 'mysql2/promise'; // Usar la versión con promesas

// Configuración de la conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool; // Exportar el pool de conexiones