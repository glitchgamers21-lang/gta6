/* =========================================================
   LEONIDA HUB — lógica del sitio
   ========================================================= */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var NEWS = (window.GTA_NEWS && window.GTA_NEWS.items) || [];
  var VIDEOS = (window.GTA_VIDEOS && window.GTA_VIDEOS.items) || [];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fecha(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
  }
  function hace(iso) {
    var diff = (Date.now() - new Date(iso)) / 1000;
    if (isNaN(diff)) return "";
    if (diff < 3600) return "hace " + Math.max(1, Math.round(diff / 60)) + " min";
    if (diff < 86400) return "hace " + Math.round(diff / 3600) + " h";
    if (diff < 86400 * 7) return "hace " + Math.round(diff / 86400) + " días";
    return fecha(iso);
  }

  /* ---------- Header y footer compartidos ---------- */
  var PAGES = [
    ["index.html", "Inicio"],
    ["noticias.html", "Noticias"],
    ["trucos.html", "Trucos"],
    ["guias.html", "Guías"],
    ["mapa.html", "Mapa"],
    ["personajes.html", "Personajes"],
    ["videos.html", "Videos"]
  ];
  var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (current.indexOf(".html") === -1) current = "index.html";

  function renderHeader() {
    var h = $("#site-header");
    if (!h) return;
    h.className = "site-header";
    h.innerHTML =
      '<nav class="container nav" aria-label="Principal">' +
      '<a class="logo" href="index.html"><span class="logo-mark">VI</span><span>' + esc(C.nombre) + "<b>" + esc(C.nombreResaltado) + "</b></span></a>" +
      '<button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">☰</button>' +
      '<ul class="nav-links">' +
      PAGES.map(function (p) {
        return '<li><a href="' + p[0] + '"' + (p[0] === current ? ' class="active" aria-current="page"' : "") + ">" + p[1] + "</a></li>";
      }).join("") +
      "</ul></nav>";
    var btn = $(".nav-toggle", h), links = $(".nav-links", h);
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.textContent = open ? "✕" : "☰";
    });
  }

  function renderFooter() {
    var f = $("#site-footer");
    if (!f) return;
    var redes = C.redes || {};
    var nombresRedes = { youtube: "YouTube", tiktok: "TikTok", instagram: "Instagram", x: "X / Twitter", discord: "Discord" };
    var redesHtml = Object.keys(redes).filter(function (k) { return redes[k]; }).map(function (k) {
      return '<li><a href="' + esc(redes[k]) + '" target="_blank" rel="noopener">' + nombresRedes[k] + "</a></li>";
    }).join("");
    f.className = "site-footer";
    f.innerHTML =
      '<div class="container"><div class="footer-grid">' +
      '<div><a class="logo" href="index.html"><span class="logo-mark">VI</span><span>' + esc(C.nombre) + "<b>" + esc(C.nombreResaltado) + "</b></span></a>" +
      '<p style="color:var(--muted);margin-top:14px;max-width:320px">' + esc(C.eslogan) + ". Actualizado automáticamente con las últimas novedades.</p></div>" +
      "<div><h4>Explorar</h4><ul>" + PAGES.slice(1, 5).map(function (p) { return '<li><a href="' + p[0] + '">' + p[1] + "</a></li>"; }).join("") + "</ul></div>" +
      '<div><h4>Más</h4><ul><li><a href="personajes.html">Personajes</a></li><li><a href="videos.html">Videos</a></li><li><a href="privacidad.html">Privacidad</a></li><li><a href="privacidad.html#aviso">Aviso legal</a></li></ul></div>' +
      "<div><h4>Síguenos</h4><ul>" + (redesHtml || "<li>Próximamente</li>") + "</ul></div>" +
      "</div>" +
      '<p class="disclaimer">© ' + new Date().getFullYear() + " " + esc(C.nombre + C.nombreResaltado) +
      ". Sitio de fans <b>no oficial</b>. No está afiliado, respaldado ni patrocinado por Rockstar Games ni Take-Two Interactive. " +
      "Grand Theft Auto, GTA y sus logotipos son marcas registradas de Take-Two Interactive Software, Inc. Todas las marcas pertenecen a sus respectivos dueños.</p></div>";
  }

  /* ---------- Google AdSense ---------- */
  function initAds() {
    var slots = $$(".ad-slot:not([data-done])");
    if (!slots.length) return;
    slots.forEach(function (s) { s.setAttribute("data-done", "1"); });
    if (!C.adsenseClient) {
      slots.forEach(function (s) { s.innerHTML = '<div class="ad-placeholder">Espacio publicitario</div>'; });
      return;
    }
    if (!document.getElementById("adsense-js")) {
      var sc = document.createElement("script");
      sc.id = "adsense-js";
    sc.async = true;
    sc.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(C.adsenseClient);
    sc.crossOrigin = "anonymous";
      document.head.appendChild(sc);
    }
    slots.forEach(function (s) {
      var tipo = s.getAttribute("data-ad") || "horizontal";
      var slotId = (C.adsenseSlots || {})[tipo] || "";
      s.innerHTML = '<span class="ad-label">Publicidad</span><ins class="adsbygoogle" style="display:block" data-ad-client="' + esc(C.adsenseClient) + '"' +
        (slotId ? ' data-ad-slot="' + esc(slotId) + '"' : "") +
        (tipo === "articulo" ? ' data-ad-layout="in-article" data-ad-format="fluid"' : ' data-ad-format="auto" data-full-width-responsive="true"') + "></ins>";
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });
  }

  /* ---------- Cuenta atrás ---------- */
  function initCountdown() {
    var el = $("#countdown");
    if (!el) return;
    var target = new Date(C.lanzamiento).getTime();
    function tick() {
      var d = target - Date.now();
      if (d <= 0) {
        var dias = Math.floor(-d / 86400000);
        el.innerHTML = '<div class="cd-released"><span class="grad-text">¡YA DISPONIBLE!</span>' +
          (dias > 0 ? '<div style="font-size:1rem;color:var(--muted);font-family:var(--font-body);text-transform:none;margin-top:6px">Lleva ' + dias + " días en Leonida</div>" : "") + "</div>";
        var badge = $("#hero-badge");
        if (badge) badge.innerHTML = "<i></i> Ya a la venta en PS5 y Xbox Series X|S";
        return;
      }
      var parts = [
        [Math.floor(d / 86400000), "Días"],
        [Math.floor(d / 3600000) % 24, "Horas"],
        [Math.floor(d / 60000) % 60, "Min"],
        [Math.floor(d / 1000) % 60, "Seg"]
      ];
      el.innerHTML = parts.map(function (p) {
        return '<div class="cd-box"><b>' + String(p[0]).padStart(2, "0") + "</b><span>" + p[1] + "</span></div>";
      }).join("");
      setTimeout(tick, 1000);
    }
    tick();
  }

  /* ---------- Noticias ---------- */
  var CAT_STYLE = {
    "Lanzamiento": ["bg-b", "🚀", "orange"], "Tráiler": ["bg-a", "🎬", "pink"], "Trucos": ["bg-e", "🎮", "orange"],
    "Actualización": ["bg-d", "🛠️", "green"], "Online": ["bg-c", "🌐", ""], "Rumores": ["bg-f", "👀", "purple"],
    "Guías": ["bg-d", "📘", "green"], "Comunidad": ["bg-c", "💬", ""], "Noticias": ["bg-a", "📰", "pink"]
  };
  function catStyle(c) { return CAT_STYLE[c] || CAT_STYLE["Noticias"]; }

  function newsCard(n) {
    var s = catStyle(n.categoria);
    var media = n.imagen
      ? '<img src="' + esc(n.imagen) + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
      : '<span class="glyph">' + s[1] + "</span>";
    return '<a class="card reveal" href="' + esc(n.url) + '" target="_blank" rel="noopener nofollow">' +
      '<div class="card-media ' + s[0] + '">' + media + "</div>" +
      '<div class="card-body"><span class="tag ' + s[2] + '">' + esc(n.categoria || "Noticias") + "</span>" +
      "<h3>" + esc(n.titulo) + "</h3>" + (n.resumen ? "<p>" + esc(n.resumen) + "</p>" : "") +
      '<div class="card-meta"><span>' + esc(n.fuente || "") + "</span><span>·</span><span>" + hace(n.fecha) + "</span></div></div></a>";
  }

  function sortedNews() {
    return NEWS.slice().sort(function (a, b) { return new Date(b.fecha) - new Date(a.fecha); });
  }

  function initNews() {
    var list = sortedNews();
    var latest = $("#latest-news");
    if (latest) latest.innerHTML = list.slice(0, 6).map(newsCard).join("");

    var ticker = $("#ticker");
    if (ticker && list.length) {
      var items = list.slice(0, 12).map(function (n) {
        return '<a href="' + esc(n.url) + '" target="_blank" rel="noopener nofollow">' + esc(n.titulo) + "</a>";
      }).join("");
      ticker.innerHTML = items + items; // duplicado para el bucle infinito
    }

    var upd = $$(".js-updated");
    if (upd.length && window.GTA_NEWS && window.GTA_NEWS.actualizado) {
      upd.forEach(function (u) { u.innerHTML = "Última actualización automática: <b>" + hace(window.GTA_NEWS.actualizado) + "</b>"; });
    }

    var all = $("#all-news");
    if (!all) return;
    var cats = ["Todas"].concat(list.map(function (n) { return n.categoria || "Noticias"; }).filter(function (c, i, a) { return a.indexOf(c) === i; }));
    var filt = $("#news-filters"), search = $("#news-search");
    var state = { cat: "Todas", q: "" };
    filt.innerHTML = cats.map(function (c) { return '<button class="chip' + (c === "Todas" ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>"; }).join("");
    function draw() {
      var q = state.q.toLowerCase();
      var res = list.filter(function (n) {
        return (state.cat === "Todas" || (n.categoria || "Noticias") === state.cat) &&
          (!q || (n.titulo + " " + (n.resumen || "") + " " + (n.fuente || "")).toLowerCase().indexOf(q) !== -1);
      });
      all.innerHTML = res.length ? res.map(newsCard).join("") : '<div class="empty-state" style="grid-column:1/-1"><div class="big">🔍</div><p>No hay noticias que coincidan.</p></div>';
      observeReveal();
    }
    filt.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      $$(".chip", filt).forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active"); state.cat = b.getAttribute("data-cat"); draw();
    });
    search.addEventListener("input", function () { state.q = search.value; draw(); });
    draw();
  }

  /* ---------- Videos (YouTube ligero) ---------- */
  function videoCard(v) {
    return '<div class="card reveal"><div class="yt" data-id="' + esc(v.id) + '" style="background-image:url(https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg)" role="button" tabindex="0" aria-label="Reproducir ' + esc(v.titulo) + '"><span class="play"></span></div>' +
      '<div class="card-body"><h3>' + esc(v.titulo) + "</h3>" + (v.fecha ? '<div class="card-meta">' + fecha(v.fecha) + "</div>" : "") + "</div></div>";
  }
  function initVideos() {
    $$("[data-videos]").forEach(function (box) {
      var max = parseInt(box.getAttribute("data-videos"), 10) || 99;
      if (!VIDEOS.length) {
        box.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="big">🎥</div><h3>Videos en camino</h3>' +
          "<p>Aquí aparecerán automáticamente los últimos videos del canal con trucos, gameplay y secretos de GTA VI.</p>" +
          '<a class="btn btn-primary" href="' + esc(C.youtubeUrl) + '" target="_blank" rel="noopener">Suscríbete en YouTube</a></div>';
        return;
      }
      box.innerHTML = VIDEOS.slice(0, max).map(videoCard).join("");
    });
    document.addEventListener("click", playVideo);
    document.addEventListener("keydown", function (e) { if (e.key === "Enter") playVideo(e); });
  }
  function playVideo(e) {
    var y = e.target.closest && e.target.closest(".yt");
    if (!y || y.querySelector("iframe")) return;
    y.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(y.getAttribute("data-id")) +
      '?autoplay=1&rel=0" title="Video de YouTube" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  /* ---------- Guías ---------- */
  var GUIAS = window.GTA_GUIAS || [];
  function guideCard(g) {
    return '<a class="card reveal" href="guias.html#' + esc(g.id) + '" data-guide="' + esc(g.id) + '">' +
      '<div class="card-media ' + esc(g.color || "bg-a") + '"><span class="glyph">' + (g.icono || "📘") + "</span></div>" +
      '<div class="card-body"><span class="tag">' + esc(g.categoria) + "</span><h3>" + esc(g.titulo) + "</h3><p>" + esc(g.resumen) + "</p>" +
      '<div class="card-meta"><span>⏱ ' + (g.minutos || 3) + " min de lectura</span></div></div></a>";
  }
  function initGuides() {
    $$("[data-guides]").forEach(function (box) {
      var max = parseInt(box.getAttribute("data-guides"), 10) || 99;
      box.innerHTML = GUIAS.slice(0, max).map(guideCard).join("");
    });
    var modal = $("#guide-modal");
    if (!modal) return;
    function open(id) {
      var g = GUIAS.filter(function (x) { return x.id === id; })[0];
      if (!g) return;
      $(".modal-content", modal).innerHTML =
        '<span class="tag">' + esc(g.categoria) + '</span><h1 style="font-size:clamp(2rem,5vw,3rem);margin-top:14px">' + esc(g.titulo) + "</h1>" +
        '<p class="updated-note">⏱ ' + (g.minutos || 3) + ' min de lectura</p><div class="article">' + g.contenido + "</div>" +
        '<div class="ad-slot" data-ad="articulo"></div>';
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      document.title = g.titulo + " | " + C.nombre + C.nombreResaltado;
      initAds();
    }
    function close() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      if (location.hash) history.replaceState(null, "", location.pathname);
    }
    $(".modal-close", modal).addEventListener("click", close);
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-guide]"); if (!a) return;
      e.preventDefault(); history.replaceState(null, "", "#" + a.getAttribute("data-guide")); open(a.getAttribute("data-guide"));
    });
    if (location.hash) open(location.hash.slice(1));
  }

  /* ---------- Trucos y consejos ---------- */
  function initCheats() {
    var box = $("#cheats");
    if (box) {
      var T = window.GTA_TRUCOS || [];
      var filt = $("#cheat-filters");
      if (!T.length) {
        box.innerHTML = '<div class="empty-state"><div class="big">🎮</div><h3>Trucos oficiales: próximamente</h3>' +
          "<p>Publicaremos aquí cada código de GTA VI en cuanto se confirme y lo probemos. Nada de trucos falsos ni inventados.</p>" +
          '<p class="updated-note">Activa la campana en YouTube para enterarte el primer día.</p></div>';
        if (filt) filt.style.display = "none";
      } else {
        var plat = "playstation";
        var draw = function () {
          box.innerHTML = T.map(function (t) {
            var code = t[plat] || "—";
            return '<div class="cheat reveal"><div class="cheat-icon bg-a">' + (t.icono || "🎮") + "</div><div><h3>" + esc(t.nombre) +
              (t.verificado ? ' <span class="tag green">Verificado</span>' : "") + "</h3><code>" + esc(code) + "</code>" +
              (t.descripcion ? '<p style="margin:4px 0 0;color:var(--muted);font-size:.88rem">' + esc(t.descripcion) + "</p>" : "") +
              '</div><button class="copy-btn" data-copy="' + esc(code) + '">Copiar</button></div>';
          }).join("");
          observeReveal();
        };
        filt.addEventListener("click", function (e) {
          var b = e.target.closest(".chip"); if (!b) return;
          $$(".chip", filt).forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active"); plat = b.getAttribute("data-plat"); draw();
        });
        draw();
      }
    }
    $$("[data-tips]").forEach(function (b) {
      var max = parseInt(b.getAttribute("data-tips"), 10) || 99;
      b.innerHTML = (window.GTA_CONSEJOS || []).slice(0, max).map(function (t) {
        return '<div class="tip reveal"><h3>' + esc(t.titulo) + "</h3><p>" + esc(t.texto) + "</p></div>";
      }).join("");
    });
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-copy]"); if (!b) return;
      var txt = b.getAttribute("data-copy");
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { toast("¡Código copiado!"); }, function () { toast(txt); });
    });
  }

  /* ---------- Personajes ---------- */
  function initCharacters() {
    $$("[data-characters]").forEach(function (box) {
      var max = parseInt(box.getAttribute("data-characters"), 10) || 99;
      box.innerHTML = (window.GTA_PERSONAJES || []).slice(0, max).map(function (p) {
        var ini = p.nombre.split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2);
        return '<article class="card char-card reveal"><div class="card-media ' + esc(p.color) + '"><span class="initials">' + esc(ini) + '</span><span class="tag role">' + esc(p.rol) + "</span></div>" +
          '<div class="card-body"><h3>' + esc(p.nombre) + "</h3><p>" + esc(p.descripcion) + "</p></div></article>";
      }).join("");
    });
  }

  /* ---------- Mapa interactivo ---------- */
  function initMap() {
    var svg = $("#leonida-map");
    if (!svg) return;
    var R = window.GTA_REGIONES || [];
    var pins = $("#map-pins", svg), info = $("#region-detail"), list = $("#region-list");
    pins.innerHTML = R.map(function (r) {
      return '<g class="map-pin" data-region="' + r.id + '" tabindex="0">' +
        '<circle class="pulse" cx="' + r.x + '" cy="' + r.y + '" r="9" fill="' + r.color + '"/>' +
        '<circle cx="' + r.x + '" cy="' + r.y + '" r="9" fill="' + r.color + '" stroke="#fff" stroke-width="3"/>' +
        '<text class="map-label" x="' + (r.x + 16) + '" y="' + (r.y + 5) + '"' + (r.x > 470 ? ' text-anchor="end" dx="-32"' : "") + ">" + esc(r.nombre.toUpperCase()) + "</text></g>";
    }).join("");
    list.innerHTML = R.map(function (r) {
      return '<button class="region-btn" data-region="' + r.id + '"><span><span style="color:' + r.color + '">●</span> ' + esc(r.nombre) + "</span><span>→</span></button>";
    }).join("");
    function select(id) {
      var r = R.filter(function (x) { return x.id === id; })[0]; if (!r) return;
      $$("[data-region]").forEach(function (el) { el.classList.toggle("active", el.getAttribute("data-region") === id); });
      info.innerHTML = '<span class="tag" style="color:' + r.color + ";border-color:" + r.color + '">Región</span>' +
        '<h2 style="margin-top:12px">' + esc(r.nombre) + '</h2><p style="color:var(--muted)">' + esc(r.descripcion) + "</p>" +
        '<ul style="padding-left:1.1em;color:#ddd3ee">' + r.destacados.map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>";
    }
    document.addEventListener("click", function (e) {
      var el = e.target.closest && e.target.closest("[data-region]"); if (el) select(el.getAttribute("data-region"));
    });
    select(R[0] && R[0].id);
  }

  /* ---------- Utilidades ---------- */
  function toast(msg) {
    var t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
  }, { threshold: 0.08 }) : null;
  function observeReveal() {
    $$(".reveal:not(.visible)").forEach(function (el) { if (io) io.observe(el); else el.classList.add("visible"); });
  }
  function countUp() {
    $$("[data-count]").forEach(function (el) {
      var end = parseInt(el.getAttribute("data-count"), 10), n = 0, step = Math.max(1, Math.ceil(end / 40));
      var h = setInterval(function () { n = Math.min(end, n + step); el.textContent = n + (el.getAttribute("data-suffix") || ""); if (n >= end) clearInterval(h); }, 30);
    });
    var nc = $("#stat-news"); if (nc) nc.textContent = NEWS.length;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    initCountdown();
    initNews();
    initVideos();
    initGuides();
    initCheats();
    initCharacters();
    initMap();
    initAds();
    countUp();
    observeReveal();
  });
})();
