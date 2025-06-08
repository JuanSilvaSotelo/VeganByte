# Usa una imagen base oficial de Node.js (elige la versión que estés usando, ej: lts, 18, 20)
FROM node:22.11.0

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

RUN npm install -g nodemon

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que corre tu aplicación backend (según tu .env es 5000)
EXPOSE 5000


RUN apt-get update && apt-get install -y build-essential python3
# Comando para iniciar la aplicación cuando el contenedor se ejecute
# Usaremos el script 'start' o 'dev' de tu package.json. 'start' es más para producción.
CMD [ "npm", "run", "dev" ]