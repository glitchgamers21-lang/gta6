# Leonida Hub: sitio de fans de GTA VI

Sitio estático (HTML + CSS + JS, sin instalar nada) con noticias que se actualizan solas cada 3 horas.

## Ver el sitio en tu PC
Haz doble clic en `index.html`. Se abre en tu navegador.

## Qué editar

| Quieres cambiar…                          | Archivo                    |
|-------------------------------------------|----------------------------|
| Nombre del sitio, YouTube, redes, AdSense | `assets/js/config.js`      |
| Trucos, guías, consejos, personajes, mapa | `data/contenido.js`        |
| Videos (si no usas la carga automática)   | `data/videos.js`           |
| Colores y diseño                          | `assets/css/styles.css`    |

`data/news.js` lo reescribe el robot. No hace falta tocarlo; si quieres que una noticia no se borre nunca, ponle `"fijo": true`.

## Publicarlo gratis en Internet (GitHub Pages)
1. Crea una cuenta en https://github.com y un repositorio nuevo **público** (por ejemplo `gta6`).
2. En el repositorio pulsa **Add file → Upload files** y arrastra **todo el contenido** de esta carpeta, incluida la carpeta `.github`. (Si el Explorador no la muestra: Vista → marcar "Elementos ocultos".)
3. Ve a **Settings → Pages** y en "Source" elige **GitHub Actions**.
4. Ve a **Actions**, abre "Actualizar y publicar" y pulsa **Run workflow**.
5. En 1-2 minutos el sitio queda en `https://TU-USUARIO.github.io/gta6/`.

Desde ese momento, cada 3 horas GitHub descarga las noticias nuevas y vuelve a publicar el sitio. Tu PC no tiene que estar encendido.

### Tus videos de YouTube automáticos
1. Busca el ID de tu canal (empieza por `UC…`) en YouTube → Configuración → Configuración avanzada.
2. En GitHub: **Settings → Secrets and variables → Actions → New repository secret**.
   Nombre: `YT_CHANNEL_ID`. Valor: tu ID.
3. Cada vídeo nuevo que subas aparecerá en el sitio en menos de 3 horas.

### Dominio propio (recomendado para AdSense)
Compra un dominio (por ejemplo `gta6trucos.com`) y añádelo en **Settings → Pages → Custom domain**. Después sustituye `TU-DOMINIO.com` en `robots.txt` y `sitemap.xml`.

## Google AdSense
1. Solicita AdSense en https://adsense.google.com con tu dominio.
2. Copia tu ID de editor (`ca-pub-…`) en `adsenseClient` dentro de `assets/js/config.js`.
3. Edita `ads.txt` con tu número `pub-…`.
4. En AdSense, activa el mensaje de consentimiento de cookies (Privacidad y mensajes → GDPR). Es obligatorio para visitantes de Europa.

**Importante:** Google suele rechazar sitios que solo agregan noticias de otros medios. Para que te aprueben, y para posicionar en Google, publica **contenido propio**: guías, trucos verificados y tus videos. Las noticias automáticas son un complemento.

## Avisos legales
- El sitio se presenta como **no oficial**. No uses logotipos, capturas ni arte de Rockstar sin permiso; usa tus propias capturas de juego.
- No publiques trucos sin comprobarlos. La página de trucos muestra "próximamente" hasta que añadas códigos reales.
