# Imagen base: Nginx ultra-liviana
FROM nginx:alpine

# Copiamos todos los archivos de la web al directorio de Nginx
COPY . /usr/share/nginx/html

# Configuración de Nginx para rutas limpias (sin .html en la URL)
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Redirige /index.html → / (quita el index.html de la barra) \
    rewrite ^/index\\.html$ / permanent; \
    \
    # Redirige /pagina.html → /pagina (quita la extensión) \
    rewrite ^/(.*)\\.html$ /$1 permanent; \
    \
    location / { \
        # Intenta el archivo exacto, luego con .html, luego carpeta \
        try_files $uri $uri.html $uri/ =404; \
    } \
    \
    gzip on; \
    gzip_types text/html text/css application/javascript image/png image/svg+xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
