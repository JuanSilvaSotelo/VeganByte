// Archivo principal para ejecutar pruebas de Selenium
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

// Crear directorio para capturas de pantalla si no existe
const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Configurar y ejecutar las pruebas
const mocha = new Mocha({
    timeout: 180000, // 180 segundos de timeout global (aumentado)
    reporter: 'spec', // Usar el reporter spec para salida detallada
    retries: 2, // Permitir reintentos a nivel de prueba
    slow: 10000 // Umbral para considerar una prueba como lenta
});

// Añadir archivos de prueba
const testFiles = [
    './register.test.js',
    './login.test.js',
    './calendar.test.js'
];

testFiles.forEach(file => {
    mocha.addFile(path.join(__dirname, file));
});

// Ejecutar las pruebas
mocha.run(failures => {
    process.exitCode = failures ? 1 : 0;
    console.log(`Pruebas completadas con ${failures} fallos.`);
    
    // Mostrar ubicación de las capturas de pantalla
    console.log(`Las capturas de pantalla se encuentran en: ${screenshotDir}`);
});