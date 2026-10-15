FROM nginx:alpine

# Copiamos todos los archivos de la web (los internos quedan afuera por .dockerignore)
COPY . /usr/share/nginx/html

# Copiamos la config de Nginx (reemplaza la default) y sacamos el archivo de la carpeta pública
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /usr/share/nginx/html/nginx.conf /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore

EXPOSE 80
