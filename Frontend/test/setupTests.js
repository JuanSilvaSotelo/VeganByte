// Configuración del entorno de pruebas
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('./selenium/config');

// Configurar tiempo de espera global para las pruebas
jest.setTimeout(180000); // 3 minutos

// Configurar variables de entorno para las pruebas
process.env.NODE_ENV = 'test';
process.env.SELENIUM_PROMISE_MANAGER = false;

// Configurar opciones de Chrome para las pruebas
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless=new');
chromeOptions.addArguments('--no-sandbox');
chromeOptions.addArguments('--disable-dev-shm-usage');
chromeOptions.addArguments('--disable-gpu');
chromeOptions.addArguments('--window-size=1920,1080');

// Exportar configuración global para las pruebas
module.exports = {
  chromeOptions,
  config
};