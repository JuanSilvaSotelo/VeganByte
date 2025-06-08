// Importar las dependencias necesarias
import dotenv from 'dotenv'; // Para cargar variables de entorno desde un archivo .env
import { createPool } from 'mysql2/promise'; // Para crear un pool de conexiones a MySQL
import path from 'path'; // Para manejar rutas de archivos
import { fileURLToPath } from 'url'; // Para obtener la ruta del archivo actual

// Obtener la ruta del directorio actual del módulo
const __filename = fileURLToPath(import.meta.url); // Obtener el nombre del archivo actual
const __dirname = path.dirname(__filename); // Obtener el directorio del archivo actual

// Cargar variables de entorno desde el archivo .env en el directorio padre (Backend)
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Cargar las variables de entorno

// Debug: Mostrar credenciales (opcional)
console.log("[DEBUG DB] Credenciales:", {
  host: process.env.DB_HOST, // Mostrar el host de la base de datos
  user: process.env.DB_USER, // Mostrar el usuario de la base de datos
  database: process.env.DB_DATABASE, // Mostrar el nombre de la base de datos
  password: process.env.DB_PASSWORD ? '***' : 'vacía', // Ocultar la contraseña por seguridad
});

// Crear el pool de conexiones a la base de datos
const pool = createPool({
  host: process.env.DB_HOST, // Host de la base de datos
  user: process.env.DB_USER, // Usuario de la base de datos
  password: process.env.DB_PASSWORD || null, // Si no hay contraseña, usar null
  database: process.env.DB_DATABASE, // Nombre de la base de datos
  port: 3306, // Puerto de conexión (por defecto para MySQL)
  waitForConnections: true, // Esperar conexiones si el pool está lleno
  connectionLimit: 10, // Límite de conexiones en el pool
});

// Verificación de conexión (opcional pero recomendado)
pool.getConnection()
  .then(conn => {
    console.log("✅ Conexión a MySQL exitosa!"); // Mensaje de éxito
    conn.release(); // Liberar la conexión una vez que se ha verificado
  })
  .catch(err => {
    console.error("❌ Error de conexión a MySQL:", err); // Mensaje de error
    process.exit(1); // Detener la aplicación si no se puede conectar
  });

// Exportar el pool de conexiones para su uso en otras partes de la aplicación
export { pool }; // Exportación nombrada
