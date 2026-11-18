/* =========================================================
   CONTENIDO EDITABLE DEL SITIO
   Añade aquí tus guías, trucos y consejos. Cada objeto es una
   tarjeta en el sitio. Respeta las comas y comillas.
   ========================================================= */

/* ---------- TRUCOS ----------
   Cuando se confirmen los códigos oficiales, añádelos así:
   {
     nombre: "Armas nivel 1",
     categoria: "Armas",            // Armas | Vehículos | Jugador | Mundo
     icono: "🔫",
     playstation: "R1, R2, L1, ...",
     xbox: "RB, RT, LB, ...",
     telefono: "1-999-...",
     descripcion: "Te da un set básico de armas.",
     verificado: true
   },
*/
window.GTA_TRUCOS = [
];

/* ---------- CONSEJOS RÁPIDOS ---------- */
window.GTA_CONSEJOS = [
  { titulo: "Guarda con frecuencia", texto: "Antes de cada misión importante, guarda en una ranura distinta. Si algo sale mal, no perderás horas de progreso." },
  { titulo: "Planifica la huida", texto: "En la saga, perder a la policía es más fácil saliendo de su campo de visión: callejones, túneles, garajes y cambios de vehículo." },
  { titulo: "Explora sin prisa", texto: "Rockstar esconde eventos aleatorios, coleccionables y secretos fuera de las misiones. Recorrer Leonida a pie también paga." },
  { titulo: "Ajusta la cámara y los controles", texto: "Dedica cinco minutos al menú de opciones: sensibilidad, apuntado asistido y subtítulos marcan la diferencia en los tiroteos." },
  { titulo: "Cuida tu dinero", texto: "En los GTA modernos, invertir en negocios y propiedades suele rendir más a largo plazo que gastar todo en coches." },
  { titulo: "Cambia de protagonista con estrategia", texto: "Con dos personajes jugables, alternar entre Jason y Lucia puede abrir actividades y rutas distintas. Aprovecha cada uno." }
];

/* ---------- PERSONAJES ---------- */
window.GTA_PERSONAJES = [
  { nombre: "Lucia Caminos", rol: "Protagonista", color: "bg-a", descripcion: "Protagonista de GTA VI. Recién salida de prisión, busca una vida mejor y no piensa volver atrás. Es la primera protagonista femenina de la era moderna de la saga." },
  { nombre: "Jason Duval", rol: "Protagonista", color: "bg-c", descripcion: "Creció rodeado de estafadores y delincuentes. Tras pasar por el ejército, intenta llevar una vida tranquila en los Cayos, pero los problemas siempre lo encuentran." },
  { nombre: "Cal Hampton", rol: "Aliado", color: "bg-d", descripcion: "Amigo de Jason y compañero de trabajo. Desconfiado y aficionado a las teorías conspirativas, prefiere quedarse en casa con una cerveza." },
  { nombre: "Boobie Ike", rol: "Empresario", color: "bg-b", descripcion: "Leyenda local de Vice City que ha convertido sus negocios —club, inmobiliaria y estudio de grabación— en un pequeño imperio." },
  { nombre: "Dre'Quan Priest", rol: "Productor musical", color: "bg-e", descripcion: "Dirige un sello discográfico con la mirada puesta en lanzar a las próximas estrellas del rap de Vice City." },
  { nombre: "Real Dimez", rol: "Dúo de rap", color: "bg-a", descripcion: "Bae-Luxe y Roxy, amigas desde el instituto, convirtieron su fama en redes en una carrera musical." },
  { nombre: "Raul Bautista", rol: "Atracador", color: "bg-f", descripcion: "Ladrón de bancos veterano y carismático, siempre buscando nuevos talentos para golpes cada vez más arriesgados." },
  { nombre: "Brian Heder", rol: "Contrabandista", color: "bg-b", descripcion: "Traficante de la vieja escuela en los Cayos de Leonida. Jason trabaja para él a cambio de un techo." }
];

/* ---------- REGIONES DEL MAPA ---------- */
window.GTA_REGIONES = [
  { id: "vice", nombre: "Vice City", x: 515, y: 500, color: "#ff2e88", descripcion: "La gran metrópolis de Leonida: playas, rascacielos, vida nocturna y la ciudad que vuelve a ser el corazón de la saga.", destacados: ["Playas y paseo marítimo", "Rascacielos del centro", "Puerto y muelles"] },
  { id: "keys", nombre: "Leonida Keys", x: 400, y: 648, color: "#22e4ff", descripcion: "Cadena de islas al sur unidas por puentes. Agua turquesa, barcos y algo de contrabando.", destacados: ["Puentes entre islas", "Pesca y barcos", "Bares de playa"] },
  { id: "grass", nombre: "Grassrivers", x: 410, y: 450, color: "#3dffa8", descripcion: "Humedales y pantanos salvajes llenos de caimanes, lanchas de hélice y caminos poco transitados.", destacados: ["Pantanos y caimanes", "Lanchas de hélice", "Fauna salvaje"] },
  { id: "gell", nombre: "Port Gellhorn", x: 130, y: 165, color: "#ffd23f", descripcion: "Ciudad costera venida a menos en el noroeste, con un ambiente decadente de antiguo destino turístico.", destacados: ["Costa del Golfo", "Moteles y centros comerciales", "Zona industrial"] },
  { id: "ambrosia", nombre: "Ambrosia", x: 350, y: 250, color: "#ff8a3d", descripcion: "Región del interior marcada por la industria azucarera y las bandas de moteros.", destacados: ["Refinería de azúcar", "Clubes de moteros", "Carreteras rurales"] },
  { id: "kalaga", nombre: "Mount Kalaga", x: 420, y: 140, color: "#8b3dff", descripcion: "Parque nacional al norte con bosques, ríos y senderos: la zona más natural del mapa.", destacados: ["Senderismo y caza", "Ríos y cascadas", "Campamentos"] }
];

/* ---------- GUÍAS ----------
   "contenido" admite HTML sencillo: <p>, <h2>, <ul><li>, <b>.  */
window.GTA_GUIAS = [
  {
    id: "todo-sobre-gta-6",
    titulo: "Todo lo que sabemos de GTA VI: fecha, plataformas, historia y mapa",
    categoria: "Esencial",
    icono: "📌",
    color: "bg-a",
    minutos: 6,
    resumen: "Resumen completo con toda la información confirmada por Rockstar Games antes del lanzamiento.",
    contenido: `
      <p>Grand Theft Auto VI es la nueva entrega principal de la saga de Rockstar Games y la primera desde GTA V (2013). Te resumimos lo confirmado.</p>
      <h2>Fecha de lanzamiento</h2>
      <p>GTA VI sale el <b>19 de noviembre de 2026</b>. Originalmente estaba previsto para 2025, luego para el 26 de mayo de 2026, y finalmente Rockstar lo movió a noviembre para pulir el juego.</p>
      <h2>Plataformas</h2>
      <ul><li>PlayStation 5 (y PS5 Pro)</li><li>Xbox Series X|S</li></ul>
      <p>Rockstar no ha anunciado versión para PC en el lanzamiento. Con GTA V, la versión de PC llegó año y medio después de consolas.</p>
      <h2>Protagonistas</h2>
      <p>La historia sigue a <b>Lucia Caminos</b> y <b>Jason Duval</b>, una pareja que se ve envuelta en una conspiración criminal tras un golpe que sale mal.</p>
      <h2>Dónde se ambienta</h2>
      <p>El juego transcurre en el estado ficticio de <b>Leonida</b>, inspirado en Florida, con <b>Vice City</b> como ciudad principal. Otras regiones confirmadas: Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia y Mount Kalaga.</p>
      <div class="callout">Iremos actualizando esta guía con cada novedad oficial.</div>`
  },
  {
    id: "prepararte-lanzamiento",
    titulo: "Cómo prepararte para el lanzamiento de GTA VI",
    categoria: "Lanzamiento",
    icono: "🚀",
    color: "bg-b",
    minutos: 4,
    resumen: "Espacio en disco, actualizaciones y todo lo que conviene hacer antes de jugar el primer día.",
    contenido: `
      <h2>1. Libera espacio de almacenamiento</h2>
      <p>Se espera que GTA VI sea un juego muy pesado. Revisa el almacenamiento de tu consola y deja margen extra para el parche del primer día.</p>
      <h2>2. Actualiza tu consola</h2>
      <p>Instala la última versión del sistema de PS5 o Xbox Series antes del lanzamiento para evitar esperas.</p>
      <h2>3. Precarga si compraste en digital</h2>
      <p>Si reservaste la versión digital, revisa en la tienda de tu consola si la descarga previa está activa.</p>
      <h2>4. Mejora tu conexión</h2>
      <p>Conecta la consola por cable o cerca del router: el día de salida los servidores irán saturados.</p>
      <h2>5. Evita los spoilers</h2>
      <p>Silencia palabras clave en redes sociales si quieres descubrir la historia por ti mismo.</p>`
  },
  {
    id: "mapa-leonida",
    titulo: "Guía del mapa de Leonida: todas las regiones confirmadas",
    categoria: "Mapa",
    icono: "🗺️",
    color: "bg-c",
    minutos: 5,
    resumen: "Vice City, los Cayos, Grassrivers, Port Gellhorn, Ambrosia y Mount Kalaga explicados.",
    contenido: `
      <p>Leonida es el mapa más grande y variado que ha creado Rockstar hasta la fecha. Estas son sus zonas principales:</p>
      <ul>
        <li><b>Vice City:</b> la metrópolis costera, con playas, rascacielos y vida nocturna.</li>
        <li><b>Leonida Keys:</b> islas al sur conectadas por puentes.</li>
        <li><b>Grassrivers:</b> pantanos y humedales salvajes.</li>
        <li><b>Port Gellhorn:</b> ciudad costera decadente en el noroeste.</li>
        <li><b>Ambrosia:</b> interior industrial y azucarero.</li>
        <li><b>Mount Kalaga:</b> parque nacional del norte.</li>
      </ul>
      <p>Explora el <a href="mapa.html" style="color:var(--pink)">mapa interactivo</a> para ver cada región.</p>`
  },
  {
    id: "consejos-saga",
    titulo: "10 consejos de la saga GTA que te servirán en GTA VI",
    categoria: "Consejos",
    icono: "💡",
    color: "bg-d",
    minutos: 5,
    resumen: "Trucos de jugador veterano que funcionan en todos los GTA: dinero, policía, combate y exploración.",
    contenido: `
      <ul>
        <li><b>Guarda en varias ranuras</b> para no quedarte atrapado en una mala partida.</li>
        <li><b>Rompe la línea de visión</b> de la policía para bajar el nivel de búsqueda más rápido.</li>
        <li><b>Cambia de vehículo</b> en plena persecución: es la forma clásica de despistar.</li>
        <li><b>Usa las coberturas</b> en los tiroteos en lugar de correr a campo abierto.</li>
        <li><b>Completa actividades secundarias</b>: suelen desbloquear mejoras y dinero.</li>
        <li><b>Invierte con cabeza</b>: las propiedades generan ingresos con el tiempo.</li>
        <li><b>Personaliza tus coches</b> en talleres: mejor motor y blindaje salvan vidas.</li>
        <li><b>Lee el mapa</b>: los iconos nuevos indican eventos y negocios.</li>
        <li><b>Activa los subtítulos</b>: muchos diálogos esconden pistas.</li>
        <li><b>Experimenta</b>: Rockstar premia la curiosidad con secretos y easter eggs.</li>
      </ul>`
  },
  {
    id: "gta-6-pc",
    titulo: "¿Saldrá GTA VI en PC? Lo que sabemos",
    categoria: "Plataformas",
    icono: "💻",
    color: "bg-e",
    minutos: 3,
    resumen: "Rockstar solo ha confirmado consolas. Esto es lo que dice la historia de la saga.",
    contenido: `
      <p>A día de hoy GTA VI está confirmado solo para <b>PS5 y Xbox Series X|S</b>. Rockstar no ha anunciado una versión para PC.</p>
      <h2>Lo que nos dice el pasado</h2>
      <ul>
        <li><b>GTA IV:</b> consolas en 2008, PC unos meses después.</li>
        <li><b>GTA V:</b> consolas en 2013, PC en abril de 2015.</li>
        <li><b>Red Dead Redemption 2:</b> consolas en 2018, PC un año más tarde.</li>
      </ul>
      <p>Lo más probable es que la versión de PC llegue más adelante. Actualizaremos esta guía en cuanto haya anuncio oficial.</p>`
  },
  {
    id: "personajes-gta-6",
    titulo: "Personajes de GTA VI: quién es quién en Leonida",
    categoria: "Historia",
    icono: "🎭",
    color: "bg-f",
    minutos: 4,
    resumen: "Lucia, Jason y todo el reparto secundario confirmado hasta ahora.",
    contenido: `
      <p>Además de los protagonistas Lucia Caminos y Jason Duval, Rockstar presentó a varios personajes secundarios: Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez, Raul Bautista y Brian Heder.</p>
      <p>Consulta la <a href="personajes.html" style="color:var(--pink)">página de personajes</a> para ver la ficha de cada uno.</p>`
  }
];
