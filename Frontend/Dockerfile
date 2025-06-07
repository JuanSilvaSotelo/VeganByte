# Etapa 1: Construcción de la aplicación React
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos de la etapa anterior al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar una configuración personalizada de Nginx (opcional, pero recomendado para SPAs)
# Si no tienes uno, Nginx usará su configuración por defecto que podría no funcionar bien con React Router.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80 (puerto por defecto de Nginx)
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]