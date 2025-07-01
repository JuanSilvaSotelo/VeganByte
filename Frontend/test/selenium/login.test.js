// Pruebas de Selenium para la funcionalidad de inicio de sesión
const { By, until } = require('selenium-webdriver');
const { initDriver, navigateTo, waitAndClick, waitAndSendKeys, isElementPresent, takeScreenshot } = require('./utils');
const config = require('./config');
const assert = require('assert');

describe('Pruebas de inicio de sesión', function() {
    // Aumentar el tiempo de espera para las pruebas
    this.timeout(180000); // Aumentado a 3 minutos para evitar timeouts
    let driver;

    // Antes de cada prueba, inicializar el navegador
    beforeEach(async function() {
        driver = await initDriver();
    });

    // Después de cada prueba, cerrar el navegador
    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    /**
     * Prueba de inicio de sesión exitoso
     */
    it('debería iniciar sesión correctamente con credenciales válidas', async function() {
        // Navegar a la página de inicio de sesión
        await navigateTo(driver, '/login');
        
        // Verificar que estamos en la página de inicio de sesión
        const loginTitle = await driver.wait(
            until.elementLocated(By.css('.login-container h2')),
            config.implicitWait
        );
        const titleText = await loginTitle.getText();
        assert.strictEqual(titleText, 'INICIAR SESIÓN', 'No se encontró el título de inicio de sesión');
        
        // Ingresar credenciales
        await waitAndSendKeys(driver, By.css('input[name="Usuario"]'), config.testUser.username);
        await waitAndSendKeys(driver, By.css('input[name="Contraseña"]'), config.testUser.password);
        
        // Tomar captura de pantalla antes de enviar el formulario
        await takeScreenshot(driver, 'login-before-submit');
        
        // Hacer clic en el botón de inicio de sesión
        await waitAndClick(driver, By.css('button[type="submit"]'));
        
        // Esperar a que aparezca el mensaje de éxito o a ser redirigido
        try {
            // Verificar si hay mensaje de éxito o redirección
            await driver.wait(
                until.or(
                    until.elementLocated(By.css('.success-message, .alert-success')),
                    until.urlIs(config.baseUrl + '/'),
                    until.urlContains('/dashboard')
                ),
                config.implicitWait
            );
            
            // Verificar la redirección
            const currentUrl = await driver.getCurrentUrl();
            assert.ok(
                currentUrl === config.baseUrl + '/' || 
                currentUrl.includes('/dashboard'),
                'No se redirigió correctamente después del inicio de sesión'
            );
        } catch (error) {
            throw new Error('Fallo en el inicio de sesión: ' + error.message);
        }
        
        // Tomar captura de pantalla después del inicio de sesión
        await takeScreenshot(driver, 'login-success');
    });

    /**
     * Prueba de inicio de sesión fallido
     */
    it('debería mostrar un mensaje de error con credenciales inválidas', async function() {
        // Navegar a la página de inicio de sesión
        await navigateTo(driver, '/login');
        
        // Ingresar credenciales inválidas
        await waitAndSendKeys(driver, By.name('Usuario'), 'usuario.invalido@example.com');
        await waitAndSendKeys(driver, By.name('Contraseña'), 'contraseñaIncorrecta');
        
        // Hacer clic en el botón de inicio de sesión
        await waitAndClick(driver, By.css('.login-button[type="submit"], button[type="submit"]'));
        
        // Esperar a que aparezca el mensaje de error
        const errorMessage = await driver.wait(
            until.elementLocated(By.css('.error-message')),
            5000
        );
        
        // Verificar que el mensaje de error está presente
        const isErrorDisplayed = await errorMessage.isDisplayed();
        assert.strictEqual(isErrorDisplayed, true);
        
        // Tomar captura de pantalla del error
        await takeScreenshot(driver, 'login-error');
    });

    /**
     * Prueba de navegación a la página de recuperación de contrasena
     */
    it('debería navegar a la página de recuperación de contrasena', async function() {
        // Navegar a la página de inicio de sesión
        await navigateTo(driver, '/login');
        
        // Hacer clic en el enlace de recuperación de contrasena
        await waitAndClick(driver, By.xpath('//a[contains(text(), "¿Olvidaste tu contrasena?")]'));
        
        // Verificar que estamos en la página de recuperación de contrasena
        await driver.wait(until.urlContains('/request-reset'), 5000);
        
        // Verificar que el formulario de recuperación está presente
        const resetForm = await driver.findElement(By.css('form'));
        assert.strictEqual(await resetForm.isDisplayed(), true);
        
        // Tomar captura de pantalla
        await takeScreenshot(driver, 'password-reset-page');
    });

    /**
     * Prueba de navegación a la página de inicio de sesión de administrador
     */
    it('debería navegar a la página de inicio de sesión de administrador', async function() {
        // Navegar a la página de inicio de sesión
        await navigateTo(driver, '/login');
        
        // Hacer clic en el enlace de inicio de sesión de administrador
        await waitAndClick(driver, By.css('a.admin-login-link'));
        
        // Verificar que estamos en la página de inicio de sesión de administrador
        await driver.wait(until.urlContains('/admin/login'), 5000);
        
        // Tomar captura de pantalla
        await takeScreenshot(driver, 'admin-login-page');
    });
});