# Imagen base: Nginx ultra-liviana
FROM nginx:alpine

# Copiamos todos los archivos de la web al directorio de Nginx
COPY . /usr/share/nginx/html

# Configuración de Nginx para SPA / rutas limpias
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri $uri/ /index.html; } \
    gzip on; \
    gzip_types text/html text/css application/javascript image/png image/svg+xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
