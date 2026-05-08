# =========================================================
# ETAPA 1 - BUILD (Node.js + Vite)
# =========================================================
FROM node:22-alpine AS build

WORKDIR /app

# Copiar manifiestos de dependencias primero (caché de capas)
COPY package.json package-lock.json ./

# Instalar dependencias incluyendo peerDependencies (react, react-dom)
RUN npm install

# Copiar el código fuente y compilar
COPY . .
RUN npm run build

# =========================================================
# ETAPA 2 - RUNTIME (Nginx sirve los estáticos)
# =========================================================
FROM nginx:1.27-alpine

# Copiar el build generado por Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Puerto expuesto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
