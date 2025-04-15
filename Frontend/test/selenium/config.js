// Configuración para pruebas de Selenium
const config = {
    baseUrl: 'http://localhost:5174', // URL base de la aplicación en desarrollo
    browser: 'firefox', // Cambiado a Firefox para mayor estabilidad
    implicitWait: 30000, // Aumentado para evitar timeouts
    pageLoadTimeout: 60000, // Tiempo máximo para cargar la página
    scriptTimeout: 30000, // Tiempo máximo para ejecutar scripts
    headless: false, // Desactivar modo headless para evitar problemas de compatibilidad
    windowSize: {
        width: 1366,
        height: 768
    },
    // Configuración adicional para mejorar la estabilidad
    retries: 5, // Aumentado número de reintentos para acciones fallidas
    seleniumTimeout: 60000, // Timeout específico para operaciones de Selenium
    // Tiempo de espera entre reintentos (ms)
    retryInterval: 3000,
    // Credenciales de prueba
    testUser: {
        username: 'usuario.prueba@example.com',
        password: 'Password123!'
    },
    testAdmin: {
        username: 'admin@example.com',
        password: 'AdminPassword123!'
    }
};

module.exports = config;