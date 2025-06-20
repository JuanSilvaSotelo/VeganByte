@echo OFF
ECHO Iniciando Backend...
cd Backend
CALL npm install
ECHO Backend npm install complete.
ECHO Creando y configurando la base de datos...
cmd /c ""C:\Program Files\MySQL\MySQL Server 9.2\bin\mysql.exe" -u root -p < ""%~dp0DB\DB.sql""" 2>NUL
start npm start
start http://localhost:5173/

ECHO Iniciando Frontend...
cd ..\Frontend
CALL npm install
ECHO Frontend npm install complete.
start npm run dev

ECHO Ambos servidores se estan iniciando en nuevas ventanas.

:WAIT_FOR_SHUTDOWN
SET /P "input=Escribe 'cerrar' para apagar los servidores: "
IF /I "%input%"=="cerrar" GOTO SHUTDOWN
GOTO WAIT_FOR_SHUTDOWN

:SHUTDOWN
ECHO Apagando servidores...
REM Intenta terminar todos los procesos de Node.js. Esto podría afectar otras aplicaciones de Node.js en ejecución.
taskkill /IM node.exe /F /T >NUL 2>&1
ECHO Servidores apagados.
EXIT
