FROM nginx:alpine

# Copiamos todos los archivos de la web
COPY . /usr/share/nginx/html

# Copiamos la config de Nginx (reemplaza la default)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
