

<div align="center">
 <h1 style="font-size: 30px; color: #4CAF50">VeganByte Project</h1>
 </div>

VeganByte es una aplicación web completa diseñada para facilitar la gestión de eventos y usuarios, con un backend robusto y un frontend interactivo. Desarrollada con fines de aprendizaje y como un proyecto práctico, demuestra la integración de tecnologías modernas y el uso de Docker para la contenedorización y orquestación de servicios.

Esta aplicación proporciona una experiencia de usuario fluida para la creación, visualización y gestión de eventos, así como para la administración de usuarios. Utiliza contenedores Docker para el backend, el frontend y la base de datos, facilitando el despliegue y la escalabilidad.

Además de sus aspectos funcionales, VeganByte sirve como una herramienta de aprendizaje práctica para comprender el ciclo de vida de las aplicaciones full-stack y su contenedorización con Docker. Mediante el uso de Dockerfiles, Docker Compose, volúmenes y redes de Docker, los desarrolladores pueden obtener información práctica sobre la gestión de dependencias, el escalado de aplicaciones y la orquestación eficaz de componentes dentro de un entorno contenedorizado.

## Tabla de Contenidos

1. [Características](#características)
2. [Primeros Pasos](#primeros-pasos)
3. [Prerrequisitos](#prerrequisitos)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Estructura de Carpetas](#estructura-de-carpetas)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Créditos](#créditos)
9. [Contribuciones](#contribuciones)
10. [Licencia](#licencia)
11. [Documentación](#documentación)

## Características

### Gestión de Eventos:

- **Creación y Edición**: Permite a los administradores crear y modificar eventos, incluyendo talleres y experiencias, con detalles como título, descripción, fecha, hora, valor y capacidad.
- **Visualización**: Los usuarios pueden ver los eventos disponibles, con información detallada de cada uno.
- **Tipos de Eventos**: Soporte para diferentes tipos de eventos (talleres y experiencias), cada uno con campos específicos.
- **Estado del Evento**: Gestión del estado de los eventos (e.g., Disponible).

### Gestión de Usuarios:

- **Autenticación de Administradores**: Sistema de login para administradores con verificación de roles (Admin, SuperAdmin).
- **Registro de Usuarios**: Permite el registro de nuevos usuarios en la plataforma.
- **Restablecimiento de Contraseña**: Funcionalidad para solicitar y restablecer contraseñas.

### Contenedorización con Docker:

- **Backend Service**: Contenedor Docker para la API construida con Node.js y Express.
- **Frontend Service**: Contenedor Docker para la aplicación React servida con Nginx.
- **Database Service**: Contenedor Docker para la base de datos MySQL.
- **Dockerfiles Personalizados**: Guían en la creación de entornos para cada servicio.
- **Docker Compose**: Orquesta todos los servicios para un fácil despliegue con un solo comando.

### Gestión de Datos con Volúmenes Docker:

- Demuestra cómo los volúmenes de Docker se utilizan para persistir los datos de la base de datos MySQL, asegurando que los datos no se pierdan cuando los contenedores se detienen o se reinician.

### Comunicación en Red con Redes Docker:

- Ilustra cómo las redes de Docker facilitan la comunicación entre los contenedores del frontend, backend y la base de datos de forma aislada y segura.

## Primeros Pasos

### Prerrequisitos

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (para desarrollo local fuera de Docker)
- [Git](https://git-scm.com/)

### Configuración del Entorno Local

Antes de iniciar los servicios, es crucial configurar el archivo de entorno para el frontend. Este archivo (`.env`) contiene variables que la aplicación frontend utiliza para comunicarse con el backend y otros servicios.

1.  **Crea el archivo `.env`**: En el directorio `Frontend/`, crea un nuevo archivo llamado `.env`.

    ```bash
    cd Frontend
    copy .env.example .env
    cd ..
    ```

    *   **¿Por qué es necesario?** El archivo `.env` es utilizado por Vite (el bundler del frontend) para cargar variables de entorno específicas del proyecto. Aunque Docker Compose maneja la comunicación interna entre servicios (por ejemplo, `http://backend:5000`), el frontend necesita saber a qué URL conectarse cuando se ejecuta en el navegador del usuario. El archivo `.env.example` proporciona una plantilla con la configuración recomendada para el desarrollo local, asegurando que el frontend pueda encontrar el backend correctamente.

2.  **Verifica el contenido**: Asegúrate de que el archivo `Frontend/.env` contenga la siguiente línea (o similar, si tu configuración de backend es diferente):

    ```
    VITE_BACKEND_URL=http://backend:5000
    ```

    Esta configuración permite que el frontend, una vez dentro del contenedor Docker, se comunique con el servicio `backend` utilizando el nombre de servicio definido en `docker-compose.yml`.

### Inicialización del Administrador por Defecto

Al iniciar los servicios con `docker-compose up --build -d`, se ejecuta automáticamente un script (`Backend/scripts/initAdmin.js`) que verifica si ya existe un administrador en la base de datos. Si no se encuentra ningún administrador, el script crea uno por defecto con las siguientes credenciales:

-   **Usuario**: `admin`
-   **Contraseña**: `admin123`

Este proceso asegura que siempre haya un usuario administrador disponible para el primer inicio de la aplicación. Se recomienda encarecidamente cambiar esta contraseña después del primer inicio de sesión por motivos de seguridad.

### Instalación

Clona el repositorio del proyecto:
```bash
git clone <URL_DEL_REPOSITORIO_VEGANBYTE> # Reemplaza con la URL de tu repositorio
cd VeganByte-1
```

No se requiere la construcción manual de imágenes individuales si se utiliza Docker Compose, ya que este se encargará del proceso.

## Uso

Para iniciar todos los servicios (backend, frontend y base de datos) utilizando Docker Compose, ejecuta el siguiente comando desde la raíz del proyecto (`VeganByte-1`):

```bash
docker-compose up --build -d
```

- El frontend estará accesible en `http://localhost:5173`.
- El backend estará accesible (principalmente para la comunicación interna del frontend) en `http://localhost:5000`.
- La base de datos MySQL estará accesible en el host en el puerto `3307` (conectándose al contenedor en el puerto `3306`).

Para detener los servicios:
```bash
docker-compose down
```

## Integración Continua y Despliegue Continuo (CI/CD)

Este proyecto utiliza GitHub Actions para la automatización de CI/CD:

- **`/.github/workflows/ci.yml`**: Este workflow se activa con cada `push` o `pull_request` a la rama `main`. Realiza las siguientes tareas:
    - Checkout del código.
    - Configuración de Node.js (para múltiples versiones).
    - Instalación de dependencias para el Backend y el Frontend (`npm ci`).
    - Ejecución de linters para el Backend y el Frontend (si están configurados en los respectivos `package.json` con un script `lint`).
    - (Opcional, descomentado en el archivo) Ejecución de pruebas para Backend y Frontend (si están configurados con un script `test`).

- **`/.github/workflows/cd.yml`**: Este workflow se activa con cada `push` a la rama `main`. Se encarga de construir las imágenes Docker del frontend y backend y publicarlas en Docker Hub.
    - Checkout del código.
    - Configuración de Docker Buildx.
    - Inicio de sesión en Docker Hub (requiere secretos de GitHub).
    - Construcción y push de la imagen Docker del Backend (`<DOCKERHUB_USERNAME>/veganbyte-backend:latest`).
    - Construcción y push de la imagen Docker del Frontend (`<DOCKERHUB_USERNAME>/veganbyte-frontend:latest`).

**Configuración Necesaria para CD:**

Para que el workflow de Despliegue Continuo (`cd.yml`) funcione correctamente y pueda publicar las imágenes en Docker Hub, necesitas configurar los siguientes "Repository secrets" en la configuración de tu repositorio de GitHub (`Settings > Secrets and variables > Actions`):

- `DOCKERHUB_USERNAME`: Tu nombre de usuario de Docker Hub.
- `DOCKERHUB_TOKEN`: Un token de acceso personal de Docker Hub con permisos para leer y escribir paquetes. Puedes generar uno desde la configuración de seguridad de tu cuenta de Docker Hub.

(Opcional) Si tu `Frontend/Dockerfile` utiliza un `ARG` para `VITE_API_BASE_URL` en producción (por ejemplo, `ARG VITE_API_BASE_URL`), también necesitarás configurar el secreto `VITE_API_BASE_URL_PROD` con la URL base de tu API en el entorno de producción.

## Estructura de Carpetas

```bash
VeganByte/
├── .github/
│   └── workflows/
│       ├── cd.yml
│       └── ci.yml
├── .gitignore
├── Backend/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── config/
│   │   └── database.js
│   ├── const bcrypt = require('bcrypt');.js
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── adminManagement.controller.js
│   │   ├── auth.controller.js
│   │   ├── eventos.controller.js
│   │   └── password.controller.js
│   ├── generateHash.cjs
│   ├── middlewares/
│   │   ├── adminAuth.js
│   │   └── auth.js
│   ├── models/
│   │   ├── administradores.model.js
│   │   ├── cliente.model.js
│   │   ├── evento.model.js
│   │   ├── index.js
│   │   └── inscripcionEvento.model.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── auth.routes.js
│   │   ├── eventos.routes.js
│   │   └── password.routes.js
│   ├── scripts/
│   │   └── initAdmin.js
│   ├── server.js
│   ├── services/
│   │   ├── database.service.js
│   │   └── email.service.js
│   └── utils/
│       ├── errors/
│       └── validators/
├── DB/
│   ├── DB VEGANBYTE PAULA RODRIGUEZ.txt
│   └── DB.sql
├── Frontend/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   └── IconInicioPag.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── main.jsx
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── test/
│   │   ├── selenium/
│   │   └── setupTests.js
│   └── vite.config.js
├── LICENSE
├── README.md
├── docker-compose.yml
├── instrucciones.md
├── package-lock.json
├── package.json
└── start-all.bat
```

## Tecnologías Utilizadas

- **Frontend**: React, Vite, Axios, Nginx (para servir la aplicación en Docker)
- **Backend**: Node.js, Express.js, bcrypt (para manejo de contraseñas), Nodemailer (para envío de correos)
- **Base de Datos**: MySQL, Sequelize (ORM)
- **Contenedorización**: Docker, Docker Compose
- **Integración Continua/Despliegue Continuo (CI/CD)**: GitHub Actions
- **Control de Versiones**: Git

## Créditos

Este proyecto fue desarrollado como parte de un ejercicio de aprendizaje y demostración de tecnologías full-stack y Docker.

### Miembros del Equipo

- Paula Dayana Rodriguez Avendaño - GitHub: [@PauRodri0422](https://github.com/PauRodri0422).
- Juan Camilo Riaño Molano - GitHub: [@JuanCRiano](https://github.com/JuanCRiano)
- Juan Diego Silva Sotelo - GitHub: [@JuanSilvaSotelo](https://github.com/JuanSilvaSotelo)

## Contribuciones

Si deseas contribuir al proyecto, por favor considera seguir las guías estándar de contribución de código abierto. Puedes hacer un fork del repositorio, crear una rama para tus cambios y enviar un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo <mcfile name="LICENSE" path="c:\Users\YEYOJ\Documents\VeganByte-1\LICENSE"></mcfile> para más detalles.

## Documentación

Puedes encontrar más detalles sobre el proyecto y su configuración en este mismo `README.md` y explorando el código fuente en el repositorio:
[https://github.com/YEYOJ/VeganByte-1](https://github.com/YEYOJ/VeganByte-1) (Reemplaza con la URL correcta de tu repositorio si es diferente)

