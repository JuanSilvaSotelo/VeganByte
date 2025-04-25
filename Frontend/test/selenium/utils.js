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
    let retries = 0;
    const maxRetries = config.retries || 3;
    const retryInterval = config.retryInterval || 5000;
    
    while (retries <= maxRetries) {
        try {
            // Configuración básica
            let options = new chrome.Options();
            
            // Configuración básica de Chrome
            options.addArguments('--no-sandbox');
            options.addArguments('--disable-dev-shm-usage');
            options.addArguments('--disable-gpu');
            options.addArguments('--start-maximized');
            options.addArguments('--ignore-certificate-errors');
            options.addArguments('--disable-extensions');
            options.addArguments('--disable-popup-blocking');
            options.addArguments('--disable-infobars');
            options.addArguments('--disable-browser-side-navigation');
            options.addArguments('--disable-features=site-per-process');
            options.addArguments('--enable-logging --v=1');
            
            // Configurar headless según la configuración
            if (config.headless) {
                console.log('Configurando modo headless');
                options.addArguments('--headless=new');
                options.addArguments('--window-size=1920,1080');
                options.addArguments('--disable-notifications');
            } else {
                console.log('Modo con interfaz gráfica activado');
            }
            
            // Configurar preferencias de Chrome
            options.setUserPreferences({
                'profile.default_content_settings.popups': 0,
                'profile.default_content_setting_values.notifications': 2,
                'download.prompt_for_download': false
            });
            
            // Excluir señales de automatización
            options.addArguments('--disable-automation');
            
            console.log(`Construyendo el driver (intento ${retries + 1}/${maxRetries + 1})...`);
            const driver = await new Builder()
                .forBrowser(config.browser)
                .setChromeOptions(options)
                .build();
            
            console.log('Driver construido correctamente');
            
            // Configurar tiempos de espera
            await driver.manage().setTimeouts({ 
                implicit: config.implicitWait,
                pageLoad: config.pageLoadTimeout,
                script: config.scriptTimeout
            });
            
            // Configurar tamaño de ventana
            if (!config.headless) {
                await driver.manage().window().maximize();
            } else {
                await driver.manage().window().setRect({
                    width: config.windowSize.width,
                    height: config.windowSize.height
                });
            }
            
            console.log('Tiempos de espera y ventana configurados correctamente');
            return driver;
        } catch (error) {
            retries++;
            console.error(`Error al inicializar el driver (intento ${retries}/${maxRetries + 1}):`, error);
            
            if (retries > maxRetries) {
                console.error('Se agotaron los reintentos para inicializar el driver');
                throw new Error(`No se pudo inicializar el driver después de ${maxRetries + 1} intentos: ${error.message}`);
            }
            
            console.log(`Esperando ${retryInterval/1000} segundos antes de reintentar...`);
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
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
    
    // Verificar que el servidor esté disponible antes de intentar navegar
    async function checkServerAvailable() {
        try {
            const response = await fetch(config.baseUrl);
            return response.ok;
        } catch (error) {
            console.error('Error al verificar el servidor:', error);
            return false;
        }
    }
    
    while (retries <= maxRetries) {
        try {
            // Verificar disponibilidad del servidor
            if (!path.startsWith('http')) {
                const isServerAvailable = await checkServerAvailable();
                if (!isServerAvailable) {
                    throw new Error('El servidor no está disponible');
                }
            }
            
            const url = path.startsWith('http') ? path : `${config.baseUrl}${path}`;
            console.log(`Navegando a: ${url} (intento ${retries + 1}/${maxRetries + 1})`);
            
            // Establecer un timeout más largo para la navegación
            await driver.get(url);
            
            // Esperar a que la página se cargue completamente
            await driver.wait(async () => {
                const readyState = await driver.executeScript('return document.readyState');
                const networkIdle = await driver.executeScript('return window.performance.getEntriesByType("resource").length === 0');
                console.log(`Estado de carga: ${readyState}, Red inactiva: ${networkIdle}`);
                return readyState === 'complete' && networkIdle;
            }, config.pageLoadTimeout, 'Timeout esperando que la página cargue completamente');
            
            // Verificar que la página ha cargado correctamente
            const currentUrl = await driver.getCurrentUrl();
            console.log(`Navegación completada a: ${currentUrl}`);
            
            // Esperar un momento adicional para asegurar que todo esté listo
            await driver.sleep(2000);
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
    const retryInterval = config.retryInterval || 5000;
    
    while (retries <= maxRetries) {
        try {
            console.log(`Esperando elemento para hacer clic: ${locator} (intento ${retries + 1}/${maxRetries + 1})`);
            
            // Esperar a que el elemento esté presente y visible en el DOM
            const element = await driver.wait(
                until.elementLocated(locator), 
                config.implicitWait, 
                `Elemento no encontrado: ${locator}`
            );
            
            // Esperar a que el elemento sea visible y clickeable
            await driver.wait(
                until.elementIsVisible(element),
                config.implicitWait,
                `Elemento no visible: ${locator}`
            );
            
            await driver.wait(
                until.elementIsEnabled(element),
                config.implicitWait,
                `Elemento no clickeable: ${locator}`
            );
            
            // Scroll hasta el elemento con margen adicional
            await driver.executeScript(
                'arguments[0].scrollIntoView({block: "center", behavior: "smooth"});',
                element
            );
            
            // Esperar a que el scroll y las animaciones se completen
            await driver.sleep(2000);
            
            // Intentar múltiples estrategias de clic
            try {
                // Intentar clic nativo primero
                await element.click();
            } catch (nativeClickError) {
                console.log('Clic nativo falló, intentando alternativas...');
                try {
                    // Intentar clic con JavaScript
                    await driver.executeScript('arguments[0].click();', element);
                } catch (jsClickError) {
                    console.log('Clic con JavaScript falló, intentando Actions...');
                    // Intentar clic con Actions
                    const actions = driver.actions({bridge: true});
                    await actions.move({origin: element}).click().perform();
                }
            }
            
            console.log(`Clic realizado exitosamente en: ${locator}`);
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