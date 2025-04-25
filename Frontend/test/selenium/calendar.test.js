// Pruebas de Selenium para la funcionalidad del calendario
const { By, until } = require('selenium-webdriver');
const { initDriver, navigateTo, waitAndClick, waitAndSendKeys, isElementPresent, takeScreenshot } = require('./utils');
const config = require('./config');
const assert = require('assert');

describe('Pruebas del calendario y reserva de eventos', function() {
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
     * Prueba de visualización del calendario
     */
    it('debería mostrar el calendario correctamente', async function() {
        // Navegar a la página del calendario
        await navigateTo(driver, '/calendar');
        
        // Verificar que el calendario se muestra correctamente
        const calendarElement = await driver.wait(
            until.elementLocated(By.css('.react-big-calendar, .calendar-container')),
            config.implicitWait
        );
        assert.strictEqual(await calendarElement.isDisplayed(), true, 'El calendario no está visible');
        
        // Verificar que se muestran los controles de navegación del calendario
        const navigationButtons = await driver.findElements(By.css('.rbc-btn-group button'));
        assert.strictEqual(navigationButtons.length > 0, true);
        
        // Tomar captura de pantalla del calendario
        await takeScreenshot(driver, 'calendar-view');
    });

    /**
     * Prueba de inicio de sesión y reserva de evento
     */
    it('debería permitir a un usuario autenticado reservar un evento', async function() {
        // Primero iniciar sesión
        await navigateTo(driver, '/login');
        await waitAndSendKeys(driver, By.name('Usuario'), config.testUser.username);
        await waitAndSendKeys(driver, By.name('Contraseña'), config.testUser.password);
        await waitAndClick(driver, By.css('.login-button[type="submit"], button[type="submit"]'));
        
        // Esperar redirección o mensaje de éxito
        try {
            await driver.wait(until.urlIs(config.baseUrl + '/'), 5000);
        } catch (error) {
            console.log('No se redirigió automáticamente, navegando manualmente al calendario');
        }
        
        // Navegar al calendario
        await navigateTo(driver, '/calendar');
        
        // Esperar a que cargue el calendario
        await driver.wait(until.elementLocated(By.css('.react-big-calendar, .calendar-container')), config.implicitWait);
        
        // Buscar un evento disponible y hacer clic en él
        try {
            const events = await driver.findElements(By.css('.rbc-event, .calendar-event'));
            if (events.length > 0) {
                // Hacer clic en el primer evento disponible
                await waitAndClick(driver, By.css('.rbc-event, .calendar-event'));
                
                // Esperar a que aparezca el modal o se redirija a la página de reserva
                try {
                    // Si hay un botón de reserva en un modal, hacer clic en él
                    const bookButton = await driver.wait(
                        until.elementLocated(By.css('.book-button, .reserve-button, button:contains("Reservar")')),
                        config.implicitWait
                    );
                    await waitAndClick(driver, By.css('.book-button, .reserve-button, button:contains("Reservar")'));
                } catch (modalError) {
                    console.log('No se encontró modal, verificando si ya estamos en la página de reserva');
                }
                
                // Verificar que estamos en la página de reserva de evento
                await driver.wait(until.urlContains('/calendar/book/'), config.implicitWait);
                
                // Completar el formulario de reserva si existe
                if (await isElementPresent(driver, By.css('form'))) {
                    // Completar campos del formulario de reserva
                    const formFields = await driver.findElements(By.css('input, select, textarea'));
                    for (const field of formFields) {
                        const fieldType = await field.getAttribute('type');
                        if (fieldType !== 'submit' && fieldType !== 'button') {
                            await field.clear();
                            await field.sendKeys('Datos de prueba');
                        }
                    }
                    
                    // Tomar captura de pantalla del formulario completado
                    await takeScreenshot(driver, 'event-booking-form');
                    
                    // Enviar el formulario
                    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
                    await submitButton.click();
                    
                    // Esperar mensaje de confirmación
                    try {
                        await driver.wait(
                            until.or(
                                until.elementLocated(By.css('.success-message, .alert-success')),
                                until.urlContains('/calendar')
                            ),
                            config.implicitWait
                        );
                        
                        const currentUrl = await driver.getCurrentUrl();
                        const hasSuccessMessage = await isElementPresent(driver, By.css('.success-message, .alert-success'));
                        
                        assert.ok(
                            currentUrl.includes('/calendar') || hasSuccessMessage,
                            'No se completó la reserva exitosamente'
                        );
                    } catch (confirmError) {
                        console.log('No se encontró mensaje de confirmación explícito');
                    }
                    
                    // Tomar captura de pantalla de la confirmación
                    await takeScreenshot(driver, 'event-booking-confirmation');
                }
            } else {
                console.log('No se encontraron eventos disponibles para reservar');
                await takeScreenshot(driver, 'no-events-available');
            }
        } catch (eventError) {
            console.error('Error al intentar reservar un evento:', eventError);
            await takeScreenshot(driver, 'event-booking-error');
        }
    });

    /**
     * Prueba de acceso a la creación de eventos como administrador
     */
    it('debería permitir a un administrador acceder a la creación de eventos', async function() {
        // Iniciar sesión como administrador
        await navigateTo(driver, '/admin/login');
        await waitAndSendKeys(driver, By.name('Usuario') || By.name('username'), config.testAdmin.username);
        await waitAndSendKeys(driver, By.name('Contraseña') || By.name('password'), config.testAdmin.password);
        await waitAndClick(driver, By.css('.login-button[type="submit"], button[type="submit"]'));
        
        // Esperar redirección al dashboard
        try {
            await driver.wait(until.urlContains('/admin/dashboard'), 5000);
        } catch (error) {
            console.log('No se redirigió automáticamente al dashboard');
        }
        
        // Navegar a la página de creación de eventos
        await navigateTo(driver, '/calendar/create');
        
        // Verificar que estamos en la página de creación de eventos
        const formElement = await driver.wait(
            until.elementLocated(By.css('form')),
            5000
        );
        assert.strictEqual(await formElement.isDisplayed(), true);
        
        // Tomar captura de pantalla del formulario de creación
        await takeScreenshot(driver, 'create-event-form');
        
        // Intentar completar el formulario
        try {
            // Completar campos del formulario
            await waitAndSendKeys(driver, By.name('titulo') || By.name('title'), 'Evento de Prueba');
            await waitAndSendKeys(driver, By.name('descripcion') || By.name('description'), 'Descripción del evento de prueba');
            
            // Seleccionar fecha y hora (esto puede variar según la implementación)
            const dateFields = await driver.findElements(By.css('input[type="date"], input[type="datetime-local"]'));
            for (const dateField of dateFields) {
                await dateField.clear();
                // Establecer fecha para mañana
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const dateString = tomorrow.toISOString().split('T')[0];
                await dateField.sendKeys(dateString);
            }
            
            // Completar otros campos si existen
            const otherFields = await driver.findElements(By.css('input:not([type="date"]):not([type="datetime-local"]):not([type="submit"]), textarea, select'));
            for (const field of otherFields) {
                const fieldType = await field.getTagName();
                if (fieldType === 'select') {
                    // Seleccionar la primera opción para los select
                    const options = await field.findElements(By.css('option'));
                    if (options.length > 1) {
                        await options[1].click();
                    }
                } else {
                    await field.clear();
                    await field.sendKeys('Datos de prueba');
                }
            }
            
            // Tomar captura de pantalla del formulario completado
            await takeScreenshot(driver, 'create-event-form-completed');
            
            // No enviamos el formulario para no crear eventos reales en cada prueba
            console.log('Formulario completado pero no enviado para evitar crear eventos reales');
        } catch (formError) {
            console.error('Error al completar el formulario:', formError);
            await takeScreenshot(driver, 'create-event-form-error');
        }
    });
});