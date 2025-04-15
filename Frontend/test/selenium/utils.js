// Utilidades para pruebas de Selenium
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./config');
const fs = require('fs');
const path = require('path');

// Asegurar que el directorio de capturas de pantalla exista
const screenshotDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

/**
 * Inicializa y configura el navegador para las pruebas
 * @returns {WebDriver} Instancia del navegador
 */
async function initDriver() {
    console.log('Iniciando configuración del driver...');
    
    // Configuración básica
    let options = new chrome.Options();
    
    // Opciones mínimas necesarias
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    // Configurar headless según la configuración
    if (config.headless) {
        console.log('Configurando modo headless');
        options.addArguments('--headless');
    } else {
        console.log('Modo con interfaz gráfica activado');
    }
    
    // Intentar crear el driver directamente sin reintentos complejos
    try {
        console.log('Construyendo el driver...');
        const driver = await new Builder()
            .forBrowser(config.browser)
            .setChromeOptions(options)
            .build();
        
        console.log('Driver construido correctamente');
        
        // Configurar tiempos de espera
        await driver.manage().setTimeouts({ 
            implicit: config.implicitWait,
            pageLoad: config.pageLoadTimeout || 60000,
            script: config.scriptTimeout || 30000
        });
        
        console.log('Tiempos de espera configurados correctamente');
        return driver;
    } catch (error) {
        console.error('Error al inicializar el driver:', error);
        throw error;
    }
}

/**
 * Navega a una URL específica
 * @param {WebDriver} driver - Instancia del navegador
 * @param {string} path - Ruta a navegar (se añadirá a la URL base)
 */
async function navigateTo(driver, path) {
    let retries = 0;
    const maxRetries = config.retries || 3;
    const retryInterval = config.retryInterval || 3000;
    
    while (retries <= maxRetries) {
        try {
            const url = path.startsWith('http') ? path : `${config.baseUrl}${path}`;
            console.log(`Navegando a: ${url} (intento ${retries + 1}/${maxRetries + 1})`);
            
            // Establecer un timeout más largo para la navegación
            await driver.get(url);
            
            // Esperar a que la página se cargue completamente con timeout específico
            await driver.wait(async () => {
                const readyState = await driver.executeScript('return document.readyState');
                console.log(`Estado de carga de la página: ${readyState}`);
                return readyState === 'complete';
            }, config.pageLoadTimeout || 60000, 'Timeout esperando que la página cargue completamente');
            
            // Verificar que la página ha cargado correctamente
            const currentUrl = await driver.getCurrentUrl();
            console.log(`Navegación completada a: ${currentUrl}`);
            
            // Si llegamos aquí, la navegación fue exitosa
            return;
        } catch (error) {
            retries++;
            console.error(`Error al navegar a ${path} (intento ${retries}/${maxRetries + 1}):`, error);
            
            // Tomar captura de pantalla en caso de error
            try {
                await takeScreenshot(driver, `error-navigation-${Date.now()}`);
            } catch (screenshotError) {
                console.error('Error al tomar captura de pantalla:', screenshotError);
            }
            
            // Si ya hemos agotado todos los reintentos, lanzar el error
            if (retries > maxRetries) {
                console.error(`Se agotaron los reintentos para navegar a ${path}`);
                throw new Error(`No se pudo navegar a ${path} después de ${maxRetries + 1} intentos: ${error.message}`);
            }
            
            // Esperar antes de reintentar
            console.log(`Esperando ${retryInterval/1000} segundos antes de reintentar la navegación...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }
}

/**
 * Espera a que un elemento sea visible y luego hace clic en él
 * @param {WebDriver} driver - Instancia del navegador
 * @param {By} locator - Localizador del elemento
 */
async function waitAndClick(driver, locator) {
    let retries = 0;
    const maxRetries = config.retries || 3;
    const retryInterval = config.retryInterval || 3000;
    
    while (retries <= maxRetries) {
        try {
            console.log(`Esperando elemento para hacer clic: ${locator} (intento ${retries + 1}/${maxRetries + 1})`);
            
            // Esperar a que el elemento esté presente en el DOM
            const element = await driver.wait(
                until.elementLocated(locator), 
                config.implicitWait, 
                `Elemento no encontrado: ${locator}`
            );
            
            // Esperar a que el elemento sea visible
            await driver.wait(
                until.elementIsVisible(element), 
                config.implicitWait, 
                `Elemento no visible: ${locator}`
            );
            
            // Esperar a que el elemento sea clickeable
            await driver.wait(
                until.elementIsEnabled(element),
                config.implicitWait,
                `Elemento no habilitado para clic: ${locator}`
            );
            
            // Scroll hasta el elemento para asegurar que es visible
            await driver.executeScript('arguments[0].scrollIntoView({block: "center"});', element);
            
            // Esperar un momento para que el scroll se complete
            await driver.sleep(1000);
            
            // Intentar hacer clic con JavaScript si está disponible
            try {
                await driver.executeScript('arguments[0].click();', element);
            } catch (jsClickError) {
                console.log('Clic con JavaScript falló, intentando clic nativo');
                await element.click();
            }
            
            console.log(`Clic realizado en: ${locator}`);
            return; // Salir del bucle si el clic fue exitoso
        } catch (error) {
            retries++;
            console.error(`Error al hacer clic en ${locator} (intento ${retries}/${maxRetries + 1}):`, error);
            
            // Tomar captura de pantalla en caso de error
            try {
                await takeScreenshot(driver, `error-click-${Date.now()}`);
            } catch (screenshotError) {
                console.error('Error al tomar captura de pantalla:', screenshotError);
            }
            
            // Si ya hemos agotado todos los reintentos, lanzar el error
            if (retries > maxRetries) {
                console.error(`Se agotaron los reintentos para hacer clic en ${locator}`);
                throw new Error(`No se pudo hacer clic en ${locator} después de ${maxRetries + 1} intentos: ${error.message}`);
            }
            
            // Esperar antes de reintentar
            console.log(`Esperando ${retryInterval/1000} segundos antes de reintentar el clic...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }
}

/**
 * Espera a que un elemento sea visible y luego ingresa texto en él
 * @param {WebDriver} driver - Instancia del navegador
 * @param {By} locator - Localizador del elemento
 * @param {string} text - Texto a ingresar
 */
async function waitAndSendKeys(driver, locator, text) {
    let retries = 0;
    const maxRetries = config.retries || 3;
    const retryInterval = config.retryInterval || 3000;
    
    while (retries <= maxRetries) {
        try {
            console.log(`Esperando elemento para ingresar texto: ${locator} (intento ${retries + 1}/${maxRetries + 1})`);
            
            // Esperar a que el elemento esté presente en el DOM
            const element = await driver.wait(
                until.elementLocated(locator), 
                config.implicitWait, 
                `Elemento no encontrado: ${locator}`
            );
            
            // Esperar a que el elemento sea visible
            await driver.wait(
                until.elementIsVisible(element), 
                config.implicitWait, 
                `Elemento no visible: ${locator}`
            );
            
            // Esperar a que el elemento sea interactuable
            await driver.wait(
                until.elementIsEnabled(element),
                config.implicitWait,
                `Elemento no habilitado para interacción: ${locator}`
            );
            
            // Scroll hasta el elemento para asegurar que es visible
            await driver.executeScript('arguments[0].scrollIntoView({block: "center"});', element);
            
            // Esperar un momento para que el scroll se complete
            await driver.sleep(1000);
            
            // Limpiar el campo con diferentes estrategias
            try {
                await element.clear();
            } catch (clearError) {
                console.log('Método clear() falló, intentando alternativa');
                // Alternativa: seleccionar todo el texto y eliminarlo
                await element.sendKeys(Key.chord(Key.CONTROL, 'a'));
                await element.sendKeys(Key.BACK_SPACE);
            }
            
            // Ingresar el texto
            await element.sendKeys(text);
            console.log(`Texto ingresado en ${locator}: ${text.replace(/./g, '*')}`);
            return; // Salir del bucle si la operación fue exitosa
        } catch (error) {
            retries++;
            console.error(`Error al ingresar texto en ${locator} (intento ${retries}/${maxRetries + 1}):`, error);
            
            // Tomar captura de pantalla en caso de error
            try {
                await takeScreenshot(driver, `error-sendkeys-${Date.now()}`);
            } catch (screenshotError) {
                console.error('Error al tomar captura de pantalla:', screenshotError);
            }
            
            // Si ya hemos agotado todos los reintentos, lanzar el error
            if (retries > maxRetries) {
                console.error(`Se agotaron los reintentos para ingresar texto en ${locator}`);
                throw new Error(`No se pudo ingresar texto en ${locator} después de ${maxRetries + 1} intentos: ${error.message}`);
            }
            
            // Esperar antes de reintentar
            console.log(`Esperando ${retryInterval/1000} segundos antes de reintentar...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }
}

/**
 * Verifica si un elemento está presente en la página
 * @param {WebDriver} driver - Instancia del navegador
 * @param {By} locator - Localizador del elemento
 * @returns {Promise<boolean>} - true si el elemento está presente, false en caso contrario
 */
async function isElementPresent(driver, locator) {
    try {
        await driver.findElement(locator);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Toma una captura de pantalla y la guarda con un nombre específico
 * @param {WebDriver} driver - Instancia del navegador
 * @param {string} fileName - Nombre del archivo (sin extensión)
 */
async function takeScreenshot(driver, fileName) {
    const fs = require('fs');
    const path = require('path');
    
    // Crear directorio si no existe
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    
    // Tomar captura de pantalla
    const image = await driver.takeScreenshot();
    const screenshotPath = path.join(screenshotDir, `${fileName}.png`);
    
    // Guardar captura de pantalla
    fs.writeFileSync(screenshotPath, image, 'base64');
    console.log(`Captura de pantalla guardada en: ${screenshotPath}`);
}

module.exports = {
    initDriver,
    navigateTo,
    waitAndClick,
    waitAndSendKeys,
    isElementPresent,
    takeScreenshot
};