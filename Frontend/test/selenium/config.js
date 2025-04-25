// Configuración para pruebas de Selenium
const config = {
    baseUrl: 'http://localhost:5174', // URL base de la aplicación en desarrollo
    browser: 'chrome', // Usando Chrome por su mejor compatibilidad con Selenium
    implicitWait: 30000, // Tiempo de espera implícito reducido a 30 segundos
    pageLoadTimeout: 60000, // Tiempo de carga de página reducido a 1 minuto
    scriptTimeout: 30000, // Tiempo de script reducido a 30 segundos
    headless: true, // Modo headless para mayor estabilidad
    windowSize: {
        width: 1366,
        height: 768
    },
    // Configuración adicional para mejorar la estabilidad
    retries: 4, // Aumentado el número de reintentos
    seleniumTimeout: 60000, // Tiempo de espera de Selenium reducido a 1 minuto
    // Tiempo de espera entre reintentos (ms)
    retryInterval: 3000, // Intervalo de reintento reducido
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