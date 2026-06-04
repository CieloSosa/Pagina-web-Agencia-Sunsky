# Deploy — agenciasunsky.com (VPS)

## Archivos a subir
- `web/index.html` → raíz del servidor (`/var/www/agenciasunsky.com/` o el directorio que uses)

## Opción A: SCP directo (si tenés acceso SSH)

```bash
# Subir el index.html al VPS
scp /ruta/local/web/index.html usuario@IP_DEL_VPS:/var/www/agenciasunsky.com/index.html
```

## Opción B: Panel cPanel / FileManager
1. Abrí el File Manager en cPanel
2. Navegá a `public_html/` (o el directorio raíz del dominio)
3. Subí el archivo `index.html`
4. Asegurate que el archivo tenga permisos 644

## Configuración Nginx (si usás Nginx en VPS)

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name agenciasunsky.com www.agenciasunsky.com;
    
    root /var/www/agenciasunsky.com;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Gzip para performance
    gzip on;
    gzip_types text/html text/css application/javascript;
    
    # Redirect www a non-www
    if ($host = www.agenciasunsky.com) {
        return 301 https://agenciasunsky.com$request_uri;
    }
}
```

## SSL/HTTPS (obligatorio para SEO)

```bash
# Con Certbot (Let's Encrypt — gratis)
sudo certbot --nginx -d agenciasunsky.com -d www.agenciasunsky.com
```

## Logo de la agencia

Reemplazá el emoji `☀️` en el nav y footer con el logo real:
- Logo horizontal: `referencia/marca/logo-horizontal.png`
- Subilo al servidor junto con `index.html`
- En el HTML, cambiá el div `.nav-logo-icon` por `<img src="logo-horizontal.png" height="30" alt="Sunsky">`

## Checklist antes del lanzamiento

- [ ] Subir `index.html` al VPS
- [ ] Activar HTTPS con Certbot
- [ ] Reemplazar logos emoji con imágenes reales (`logo-horizontal.png`)
- [ ] Reemplazar logos de clientes en el strip con los logos reales (PNG transparente)
- [ ] Reemplazar testimonios placeholder con quotes reales de clientes
- [ ] Completar stats del hero con números reales (años de experiencia, clientes activos)
- [ ] Verificar que todos los links de WhatsApp funcionen
- [ ] Agregar Google Analytics (GA4) — solo 2 líneas de código
- [ ] Enviar URL a Google Search Console para indexación

## Google Analytics (GA4) — agregar antes del `</head>`

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
Reemplazá `G-XXXXXXXXXX` con tu Measurement ID de GA4.

## Google Search Console

1. Entrá a search.google.com/search-console
2. Agregá la propiedad `agenciasunsky.com`
3. Verificá con el método de HTML tag o DNS
4. Hacé "Request indexing" sobre la URL principal
