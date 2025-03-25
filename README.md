

# VeganByte

Este es el proyecto que realizamos en el Sena para la empresa Madre Raiz Casa Taller.

## Descripción

VeganByte es un proyecto orientado a proporcionar soluciones digitales para la empresa Madre Raíz Casa Taller. El proyecto se compone de varios módulos que incluyen un backend, una base de datos y un frontend.

## Estructura del Proyecto

- **Backend:** Contiene la lógica del servidor y las conexiones con la base de datos.
- **DB:** Incluye la configuración y migración de la base de datos.
- **Frontend:** La interfaz de usuario para interactuar con el sistema.

## Tecnologías Utilizadas

- **Lenguajes:** JavaScript, CSS, HTML
- **Frameworks y Librerías:** Detalle de cualquier framework o librería adicional que pueda haberse utilizado.
  
## Configuración e Instalación

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Instrucciones de Instalación

1. Clone el repositorio desde GitHub:
   ```bash
   git clone https://github.com/JuanSilvaSotelo/VeganByte.git
   ```

2. Navegue al directorio del proyecto:
   ```bash
   cd VeganByte
   ```

3. Instale las dependencias del backend y frontend:
   ```bash
   cd Backend
   npm install
   ```

   ```bash
   cd ../Frontend
   npm install
   ```

### Configuración

Cree un archivo `.env` en el directorio raíz del backend con el siguiente contenido:

```properties
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1604
DB_DATABASE=veganByte
PORT=5000
BCRYPT_SALT_ROUNDS=10
FRONTEND_URL=http://localhost:5173
JWT_SECRET=1604
```

### Ejecución del Proyecto

1. Inicie el servidor de backend:
   ```bash
   cd Backend
   npm start
   ```

2. Inicie el servidor de frontend:
   ```bash
   cd ../Frontend
   npm start
   ```

## Contribuciones

Por favor, siéntase libre de contribuir al proyecto. Para cambios mayores, abra primero un issue para discutir qué le gustaría cambiar.

## Contacto

Para más información sobre el proyecto y colaboración, puede ponerse en contacto con el desarrollador principal:

- Juan Silva Sotelo   
- [GitHub](https://github.com/JuanSilvaSotelo)

