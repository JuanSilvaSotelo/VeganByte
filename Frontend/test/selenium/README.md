# Pruebas de Selenium para VeganByte

Este directorio contiene pruebas automatizadas con Selenium WebDriver para la aplicación VeganByte. Las pruebas verifican las funcionalidades principales como inicio de sesión, registro de usuarios, visualización del calendario y reserva de eventos.

## Requisitos previos

- Node.js (versión 14 o superior)
- NPM (versión 6 o superior)
- Navegador Chrome instalado
- ChromeDriver compatible con la versión de Chrome instalada

## Instalación

1. Instalar las dependencias necesarias:

```bash
npm install selenium-webdriver mocha chromedriver assert
```

2. Asegurarse de que ChromeDriver esté en el PATH o especificar su ubicación en el archivo `config.js`.

## Configuración

Antes de ejecutar las pruebas, es necesario configurar los parámetros en el archivo `config.js`:

- `baseUrl`: URL base de la aplicación (por defecto: http://localhost:5173)
- `browser`: Navegador a utilizar (por defecto: chrome)
- `testUser` y `testAdmin`: Credenciales de prueba para usuarios y administradores

## Ejecución de las pruebas

Para ejecutar todas las pruebas:

```bash
node index.js
```

Para ejecutar una prueba específica:

```bash
node_modules/.bin/mocha login.test.js
```

## Estructura de las pruebas

- `config.js`: Configuración global para las pruebas
- `utils.js`: Funciones de utilidad para interactuar con el navegador
- `login.test.js`: Pruebas de inicio de sesión
- `register.test.js`: Pruebas de registro de usuarios
- `calendar.test.js`: Pruebas de calendario y reserva de eventos
- `index.js`: Archivo principal para ejecutar todas las pruebas

## Capturas de pantalla

Las pruebas generan capturas de pantalla en momentos clave, que se guardan en el directorio `screenshots/`. Estas capturas son útiles para depurar fallos en las pruebas.

## Notas importantes

1. Estas pruebas están diseñadas para ejecutarse en un entorno de desarrollo o pruebas, no en producción.
2. Las credenciales de prueba deben ser válidas en el entorno donde se ejecutan las pruebas.
3. La aplicación debe estar en ejecución (con `npm run dev`) antes de iniciar las pruebas.
4. Algunas pruebas pueden fallar si la estructura de la aplicación cambia. En ese caso, será necesario actualizar los selectores CSS o XPath utilizados.

## Solución de problemas

- **Error de conexión**: Asegurarse de que la aplicación esté en ejecución en la URL especificada en `config.js`.
- **Error de ChromeDriver**: Verificar que la versión de ChromeDriver sea compatible con la versión de Chrome instalada.
- **Fallos en selectores**: Si la estructura HTML cambia, actualizar los selectores en los archivos de prueba.