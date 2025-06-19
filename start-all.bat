@echo OFF
ECHO Iniciando Backend...
cd Backend
ECHO Creando y configurando la base de datos...
cmd /c ""C:\Program Files\MySQL\MySQL Server 9.2\bin\mysql.exe" -u root -p1604 < ""%~dp0DB\DB.sql""" 2>NUL
start npm run dev

ECHO Iniciando Frontend...
cd ..\Frontend
npm run dev

ECHO Ambos servidores se estan iniciando en nuevas ventanas.