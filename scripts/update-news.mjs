// =========================================================
// Actualiza data/news.js y data/videos.js desde feeds RSS.
// Lo ejecuta GitHub Actions automáticamente (Node 20+, sin dependencias).
// Prueba local: node scripts/update-news.mjs
// =========================================================
import { readFile, writeFile } from "node:fs/promises";

const ROOT = new URL("../", import.meta.url);
const MAX_ITEMS = 80;
const YT_CHANNEL_ID = process.env.YT_CHANNEL_ID || "";

// Fuentes de noticias (añade o quita las que quieras)
const FEEDS = [
  { nombre: "Google Noticias", url: "https://news.google.com/rss/search?q=%22GTA+6%22+OR+%22GTA+VI%22+OR+%22Grand+Theft+Auto+VI%22&hl=es-419&gl=MX&ceid=MX:es-419" },
  { nombre: "Google News", url: "https://news.google.com/rss/search?q=%22GTA+6%22+OR+%22GTA+VI%22+when:7d&hl=en-US&gl=US&ceid=US:en" },
  { nombre: "Reddit r/GTA6", url: "https://www.reddit.com/r/GTA6/top/.rss?t=day" },
  { nombre: "Reddit r/GTA", url: "https://www.reddit.com/r/GTA/search.rss?q=GTA+6&restrict_sr=1&sort=new" }
];

// Palabras que debe contener el título para aceptarse
const MUST = /gta\s?(6|vi)\b|grand theft auto vi|vice city|leonida|rockstar/i;

// Clasificación automática por palabras clave (primera coincidencia gana)
const CATEGORIAS = [
  ["Trucos", /truco|cheat|c[oó]digo|code|glitch|exploit|secret|secreto|easter egg/i],
  ["Tráiler", /tr[aá]iler|trailer|teaser/i],
  ["Actualización", /actualizaci[oó]n|update|parche|patch|hotfix|dlc/i],
  ["Online", /online|multijugador|multiplayer/i],
  ["Guías", /gu[ií]a|guide|how to|c[oó]mo|tips|consejo/i],
  ["Lanzamiento", /lanzamiento|release|launch|fecha|date|precio|price|preorder|reserva|venta|sales|vend/i],
  ["Rumores", /rumor|leak|filtra|insider|report/i]
];

const UA = "Mozilla/5.0 (compatible; FanSiteNewsBot/1.0)";

function decode(s = "") {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&amp;/g, "&");
}
function strip(html = "") {
  return decode(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]).trim() : "";
}
function attr(block, name, at) {
  const m = block.match(new RegExp(`<${name}[^>]*\\s${at}="([^"]+)"`, "i"));
  return m ? decode(m[1]) : "";
}

function parseFeed(xml, fuenteDefault) {
  const out = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    let titulo = strip(tag(b, "title"));
    let url = tag(b, "link") || attr(b, "link", "href");
    const fecha = tag(b, "pubDate") || tag(b, "published") || tag(b, "updated");
    let fuente = strip(tag(b, "source")) || fuenteDefault;
    // Google News añade " - Medio" al final del título
    if (fuenteDefault.startsWith("Google") && / - [^-]+$/.test(titulo)) {
      const i = titulo.lastIndexOf(" - ");
      fuente = titulo.slice(i + 3); titulo = titulo.slice(0, i);
    }
    let resumen = strip(tag(b, "description") || tag(b, "summary") || tag(b, "content"));
    if (fuenteDefault.startsWith("Google")) resumen = ""; // la descripción de Google repite el título
    if (fuenteDefault.startsWith("Reddit")) resumen = resumen.replace(/submitted by.*$/i, "").trim();
    const imagen = attr(b, "media:thumbnail", "url") || attr(b, "media:content", "url") || "";
    if (!titulo || !url) continue;
    out.push({
      titulo: titulo.slice(0, 180),
      resumen: resumen.slice(0, 220),
      url,
      fuente,
      fecha: new Date(fecha || Date.now()).toISOString(),
      imagen: imagen.startsWith("https://") ? imagen : ""
    });
  }
  return out;
}

function categorizar(t) {
  for (const [cat, re] of CATEGORIAS) if (re.test(t)) return cat;
  return "Noticias";
}
function clave(t) {
  return t.toLowerCase().normalize("NFD").replace(/[^a-z0-9 ]/g, "").split(" ").filter(w => w.length > 3).slice(0, 8).join(" ");
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml, */*" }, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function readData(file, varName) {
  try {
    const txt = await readFile(new URL(file, ROOT), "utf8");
    const start = txt.indexOf("{", txt.indexOf(`window.${varName}`));
    const json = txt.slice(start, txt.lastIndexOf("}") + 1);
    return JSON.parse(json);
  } catch (e) {
    console.warn(`No se pudo leer ${file}: ${e.message}`);
    return { actualizado: "", items: [] };
  }
}
async function writeData(file, varName, data, header) {
  const body = `${header}\nwindow.${varName} = ${JSON.stringify(data, null, 2)};\n`;
  await writeFile(new URL(file, ROOT), body, "utf8");
}

async function updateNews() {
  const prev = await readData("data/news.js", "GTA_NEWS");
  const fijos = prev.items.filter(i => i.fijo);
  const recientes = [];
  for (const f of FEEDS) {
    try {
      const items = parseFeed(await fetchText(f.url), f.nombre);
      console.log(`✔ ${f.nombre}: ${items.length} elementos`);
      recientes.push(...items);
    } catch (e) {
      console.warn(`✖ ${f.nombre}: ${e.message}`);
    }
  }
  // Mezcla: nuevos + anteriores (para no perder historial si un feed falla)
  const todos = [...recientes, ...prev.items.filter(i => !i.fijo)]
    .filter(i => MUST.test(i.titulo + " " + i.resumen))
    .map(i => ({ ...i, categoria: i.categoria || categorizar(i.titulo + " " + i.resumen) }));

  const vistos = new Set(fijos.map(i => clave(i.titulo)));
  const urls = new Set(fijos.map(i => i.url));
  const unicos = [];
  for (const i of todos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))) {
    const k = clave(i.titulo);
    if (vistos.has(k) || urls.has(i.url)) continue;
    vistos.add(k); urls.add(i.url); unicos.push(i);
  }
  const items = [...unicos.slice(0, MAX_ITEMS - fijos.length), ...fijos];
  if (!recientes.length) { console.warn("Ningún feed respondió; se mantiene el archivo actual."); return; }
  await writeData("data/news.js", "GTA_NEWS", { actualizado: new Date().toISOString(), items },
    `/* Archivo generado automáticamente por scripts/update-news.mjs
   (GitHub Actions lo reescribe cada pocas horas). Los elementos con
   "fijo": true se conservan siempre. */`);
  console.log(`Noticias guardadas: ${items.length}`);
}

async function updateVideos() {
  if (!YT_CHANNEL_ID) { console.log("YT_CHANNEL_ID no configurado: se omiten los videos."); return; }
  try {
    const xml = await fetchText(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(YT_CHANNEL_ID)}`);
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/gi) || [];
    const nuevos = entries.map(e => ({ id: tag(e, "yt:videoId"), titulo: strip(tag(e, "title")), fecha: tag(e, "published") })).filter(v => v.id);
    const prev = await readData("data/videos.js", "GTA_VIDEOS");
    const ids = new Set(nuevos.map(v => v.id));
    const items = [...nuevos, ...prev.items.filter(v => !ids.has(v.id))].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 60);
    await writeData("data/videos.js", "GTA_VIDEOS", { actualizado: new Date().toISOString(), items },
      `/* Generado automáticamente desde el canal de YouTube (scripts/update-news.mjs).
   Puedes añadir videos a mano: { "id": "ID_DEL_VIDEO", "titulo": "...", "fecha": "2026-11-20" } */`);
    console.log(`Videos guardados: ${items.length}`);
  } catch (e) {
    console.warn(`✖ YouTube: ${e.message}`);
  }
}

await updateNews();
await updateVideos();
