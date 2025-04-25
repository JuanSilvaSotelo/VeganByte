// Pruebas de Selenium para la funcionalidad de registro de usuarios
const { By, until } = require('selenium-webdriver');
const { initDriver, navigateTo, waitAndClick, waitAndSendKeys, isElementPresent, takeScreenshot } = require('./utils');
const config = require('./config');
const assert = require('assert');

describe('Pruebas de registro de usuarios', function() {
    // Aumentar el tiempo de espera para las pruebas
    this.timeout(180000); // Reducido a 3 minutos para evitar timeouts excesivos
    let driver;
    let retries = 0;
    const maxRetries = 3;

    // Antes de cada prueba, inicializar el navegador
    beforeEach(async function() {
        while (retries < maxRetries) {
            try {
                driver = await initDriver();
                if (driver) {
                    console.log('Driver inicializado correctamente');
                    return;
                }
            } catch (error) {
                retries++;
                console.error(`Error en intento ${retries}/${maxRetries}:`, error);
                if (retries === maxRetries) {
                    throw new Error(`No se pudo inicializar el driver después de ${maxRetries} intentos`);
                }
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
    });

    // Después de cada prueba, cerrar el navegador
    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    /**
     * Prueba de registro exitoso
     */
    it('debería registrar un nuevo usuario correctamente', async function() {
        // Generar un correo único para evitar duplicados
        const timestamp = new Date().getTime();
        const uniqueEmail = `usuario.test.${timestamp}@example.com`;
        
        // Navegar a la página de registro
        await navigateTo(driver, '/register');
        
        // Verificar que estamos en la página de registro
        const registerTitle = await driver.wait(
            until.elementLocated(By.css('.register-container h2.register')),
            config.implicitWait
        );
        const titleText = await registerTitle.getText();
        assert.strictEqual(
            titleText,
            'REGISTRARSE',
            'No se encontró el título de registro'
        );
        
        // Completar el formulario de registro con todos los campos requeridos
        await waitAndSendKeys(driver, By.css('input[name="Nombre"]'), 'Usuario');
        await waitAndSendKeys(driver, By.css('input[name="Apellido"]'), 'De Prueba');
        await waitAndSendKeys(driver, By.css('input[name="Correo"]'), uniqueEmail);
        await waitAndSendKeys(driver, By.css('input[name="ConfirmarCorreo"]'), uniqueEmail);
        
        // Seleccionar tipo de documento
        const tipoDocumentoSelect = await driver.findElement(By.name('tipo_Documento'));
        await tipoDocumentoSelect.click();
        await driver.findElement(By.css('option[value="Cedula de ciudadania"]')).click();
        
        // Ingresar número de documento
        await waitAndSendKeys(driver, By.name('Numero_documento'), '12345678');
        
        // Seleccionar sexo
        const sexoSelect = await driver.findElement(By.name('Sexo'));
        await sexoSelect.click();
        await driver.findElement(By.css('option[value="Masculino"]')).click();
        
        // Ingresar fecha de nacimiento
        await waitAndSendKeys(driver, By.name('fecha_Nacimiento'), '1990-01-01');
        
        // Ingresar teléfono y dirección
        await waitAndSendKeys(driver, By.name('Contacto'), '1234567890');
        await waitAndSendKeys(driver, By.name('Direccion'), 'Calle Principal 123');
        
        // Ingresar contraseñas
        await waitAndSendKeys(driver, By.name('Contraseña'), 'Password123!');
        await waitAndSendKeys(driver, By.name('ConfirmarContraseña'), 'Password123!');
        
        // Tomar captura de pantalla antes de enviar el formulario
        await takeScreenshot(driver, 'register-form-completed');
        
        // Hacer clic en el botón de registro
        await waitAndClick(driver, By.css('button[type="submit"]'));
        
        // Esperar a que aparezca el mensaje de éxito o a ser redirigido
        try {
            // Verificar si hay mensaje de éxito o redirección
            await driver.wait(
                until.or(
                    until.elementLocated(By.css('.success-message, .alert-success')),
                    until.urlContains('/login')
                ),
                config.implicitWait
            );
            
            // Verificar que estamos en la página de login o hay mensaje de éxito
            const currentUrl = await driver.getCurrentUrl();
            const hasSuccessMessage = await isElementPresent(driver, By.css('.success-message, .alert-success'));
            
            assert.ok(
                currentUrl.includes('/login') || hasSuccessMessage,
                'No se completó el registro exitosamente'
            );
            
            // Esperar redirección a la página de inicio de sesión
            await driver.wait(
                until.urlContains('/login'),
                5000
            );
        } catch (error) {
            // Si no hay mensaje de éxito, verificar que estamos en la página de inicio de sesión
            const currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl.includes('/login'), true);
        }
        
        // Tomar captura de pantalla después del registro
        await takeScreenshot(driver, 'register-success');
    });

    /**
     * Prueba de validación de formulario
     */
    it('debería mostrar errores de validación cuando los campos son inválidos', async function() {
        // Navegar a la página de registro
        await navigateTo(driver, '/register');
        
        // Intentar enviar el formulario sin completar campos obligatorios
        await waitAndClick(driver, By.css('.login-button[type="submit"]'));
        
        // Verificar que se muestran mensajes de validación
        const isValidationMessagePresent = await isElementPresent(driver, By.css(':invalid'));
        assert.strictEqual(isValidationMessagePresent, true);
        
        // Tomar captura de pantalla de los errores de validación
        await takeScreenshot(driver, 'register-validation-errors');
        
        // Completar solo algunos campos y verificar validación de contraseña
        await waitAndSendKeys(driver, By.name('Nombre'), 'Usuario');
        await waitAndSendKeys(driver, By.name('Apellido'), 'De Prueba');
        await waitAndSendKeys(driver, By.name('Numero_documento'), '12345678');
        await waitAndSendKeys(driver, By.name('Correo'), 'usuario.test@example.com');
        await waitAndSendKeys(driver, By.name('ConfirmarCorreo'), 'usuario.test@example.com');
        await waitAndSendKeys(driver, By.name('Contacto'), '1234567890');
        await waitAndSendKeys(driver, By.name('fecha_Nacimiento'), '1990-01-01');
        await waitAndSendKeys(driver, By.name('Direccion'), 'Calle Principal 123');
        await waitAndSendKeys(driver, By.name('Contraseña'), 'pass123');
        await waitAndSendKeys(driver, By.name('ConfirmarContraseña'), 'pass456');
        
        // Hacer clic en el botón de registro
        await waitAndClick(driver, By.css('button[type="submit"]'));
        
        // Verificar mensaje de error por contraseñas que no coinciden
        try {
            const errorMessage = await driver.wait(
                until.elementLocated(By.css('.error-message')),
                5000
            );
            const isErrorDisplayed = await errorMessage.isDisplayed();
            assert.strictEqual(isErrorDisplayed, true);
        } catch (error) {
            // Si no hay mensaje específico, verificar que seguimos en la página de registro
            const currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl.includes('/register'), true);
        }
        
        // Tomar captura de pantalla
        await takeScreenshot(driver, 'register-password-mismatch');
    });

    /**
     * Prueba de navegación entre registro e inicio de sesión
     */
    it('debería permitir navegar entre las páginas de registro e inicio de sesión', async function() {
        // Navegar a la página de registro
        await navigateTo(driver, '/register');
        
        // Verificar que hay un enlace para ir a inicio de sesión
        const loginLink = await driver.findElement(By.css('a[href*="/login"]'));
        assert.strictEqual(await loginLink.isDisplayed(), true);
        
        // Tomar captura de pantalla antes de hacer clic
        await takeScreenshot(driver, 'register-page-with-login-link');
        
        // Hacer clic en el enlace de inicio de sesión
        await waitAndClick(driver, By.css('a[href*="/login"]'));
        
        // Verificar que estamos en la página de inicio de sesión
        await driver.wait(until.urlContains('/login'), 5000);
        const loginTitle = await driver.findElement(By.css('.login-container h2'));
        const titleText = await loginTitle.getText();
        assert.strictEqual(titleText, 'INICIAR SESIÓN');
        
        // Tomar captura de pantalla después de la navegación
        await takeScreenshot(driver, 'navigation-to-login');
        
        // Verificar que podemos volver a la página de registro
        const registerLink = await driver.findElement(By.css('a[href*="/register"]'));
        assert.strictEqual(await registerLink.isDisplayed(), true);
        
        // Hacer clic en el enlace de registro
        await waitAndClick(driver, By.css('a[href*="/register"]'));
        
        // Verificar que estamos de vuelta en la página de registro
        await driver.wait(until.urlContains('/register'), config.implicitWait);
        const registerTitle = await driver.wait(
            until.elementLocated(By.css('h2.register, .register-container h2')),
            config.implicitWait
        );
        const registerTitleText = await registerTitle.getText();
        assert.ok(registerTitleText.includes('REGISTRARSE'), 'No se encontró el título de registro');
        
        // Tomar captura de pantalla
        await takeScreenshot(driver, 'navigation-back-to-register');
    });
});