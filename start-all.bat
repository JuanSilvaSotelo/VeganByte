@echo OFF
ECHO Iniciando Backend...
cd Backend
start npm run dev

ECHO Iniciando Frontend...
cd ..\Frontend
start npm run dev

ECHO Ambos servidores se estan iniciando en nuevas ventanas.