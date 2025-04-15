@echo off

:: Verificar si Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js no está instalado. Por favor, instale Node.js primero.
    exit /b
)

:: Verificar si npm está instalado
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm no está instalado. Por favor, instale npm primero.
    exit /b
)

:: Instalar dependencias del Frontend
echo Instalando dependencias del Frontend...
cd Frontend
if %errorlevel% neq 0 (
    echo Error al acceder al directorio Frontend.
    exit /b
)
npm install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias del Frontend.
    exit /b
)
cd ..

:: Instalar dependencias del Backend
echo Instalando dependencias del Backend...
cd Backend
if %errorlevel% neq 0 (
    echo Error al acceder al directorio Backend.
    exit /b
)
npm install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias del Backend.
    exit /b
)
cd ..

echo Instalación completada exitosamente.
echo Puede iniciar el Frontend con 'cd Frontend && npm run dev'
echo Puede iniciar el Backend con 'cd Backend && npm start'