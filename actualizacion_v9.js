/* ECOS V9: biblioteca, lector, narrativa y comentarios configurables.
   Se carga después de V8; no altera los datos originales de actividades. */
const ECOS_EPISODIOS = [
 {"id": "prologo", "titulo": "Prólogo · El secreto de Julián", "inicio": 1, "fin": 1, "subtitulo": "La carta y el medallón del abuelo"},
 {"id": "capitulo1", "titulo": "Capítulo I · El cuaderno de las preguntas", "inicio": 2, "fin": 6, "subtitulo": "Las preguntas y la aparición del Eco"},
 {"id": "capitulo2", "titulo": "Capítulo II · La montaña antes de la ciudad", "inicio": 7, "fin": 10, "subtitulo": "Kusi y el relato de Diego Huallpa"},
 {"id": "capitulo3", "titulo": "Capítulo III · Una ciudad que crece", "inicio": 11, "fin": 12, "subtitulo": "La herrería de Tomás"},
 {"id": "capitulo4", "titulo": "Capítulo IV · El precio de la plata", "inicio": 13, "fin": 17, "subtitulo": "Amaru, el trabajo minero y la mita"},
 {"id": "capitulo5", "titulo": "Capítulo V · La ruta de una moneda", "inicio": 18, "fin": 20, "subtitulo": "Inés y la Casa de Moneda"},
 {"id": "capitulo6", "titulo": "Capítulo VI · Las dos caras de la Villa Imperial", "inicio": 21, "fin": 25, "subtitulo": "Catalina, el taller artesanal y el reconocimiento del trabajo"}
];
const ECOS_TOTAL_PREVISTO = 26;
const ECOS_DISPONIBLES = comicPages.length;
let ecosMiniaturasAbiertas = false;
let ecosModoLectura = false;
function ecosIndice(){
 const n=Number((location.hash.split('/')[1]||'0'));
 return Number.isInteger(n)?Math.max(0,Math.min(ECOS_DISPONIBLES-1,n)):0;
}
function ecosEpisodio(n){return ECOS_EPISODIOS.find(e=>n>=e.inicio&&n<=e.fin)||ECOS_EPISODIOS[0]}
function ecosLinkPagina(n,label,clase='btn-navy'){
 if(n<0||n>=ECOS_DISPONIBLES)return `<span class="btn ${clase} btn-small is-disabled" aria-disabled="true">${label}</span>`;
 return `<a class="btn ${clase} btn-small" href="#lectura/${n}">${label}</a>`;
}
function ecosMiniaturas(){return comicPages.map((p,i)=>`<a class="ecos-thumb ${i===ecosIndice()?'selected':''}" href="#lectura/${i}" aria-current="${i===ecosIndice()?'page':'false'}"><img loading="lazy" src="assets/comic_${String(i).padStart(2,'0')}.webp" alt=""><strong>${i===0?'Portada':'Lámina '+i}</strong></a>`).join('')}
function ecosCapituloCard(e,i){
 return `<article class="ecos-episode"><img src="assets/comic_${String(e.inicio).padStart(2,'0')}.webp" alt="Miniatura del ${safe(e.titulo)}" loading="lazy"><div class="ecos-episode-body"><span class="eyebrow">EPISODIO ${String(i+1).padStart(2,'0')} · DISPONIBLE</span><h3>${safe(e.titulo)}</h3><p>${safe(e.subtitulo)}</p><div class="ecos-episode-meta"><span>${e.fin-e.inicio+1} ${e.fin===e.inicio?'página disponible':'páginas disponibles'}</span><span>Lectura en color</span></div><a class="btn btn-gold btn-small" href="#lectura/${e.inicio}">Leer episodio →</a></div></article>`
}
function ecosFicha(){return `<section class="ecos-book-profile"><div class="ecos-book-cover"><img src="assets/comic_00.webp" alt="Portada oficial de Ecos del Cerro Rico: La última página"></div><div class="ecos-book-detail"><span class="eyebrow">CÓMIC DIGITAL INTERACTIVO · DISEÑO GRÁFICO</span><h1>Ecos del Cerro Rico <em>La última página</em></h1><p>Mateo y Lucía descubren un cuaderno, un medallón y una aventura que los llevará a conocer recuerdos de Potosí colonial. La historia combina narrativa de ficción y acontecimientos históricos.</p><div class="ecos-ficha-data"><div><small>Géneros</small><div class="ecos-tags"><span>Aventura</span><span>Histórico</span><span>Fantasía</span><span>Educativo</span></div></div><div><small>Formato</small><strong>Cómic ilustrado · a color</strong></div><div><small>Publicación</small><strong>En desarrollo · ${ECOS_DISPONIBLES} láminas disponibles</strong></div><div><small>Proyecto</small><strong>Diseño Gráfico · TBS · Potosí, Bolivia</strong></div></div><div class="ecos-book-actions"><a class="btn btn-gold" href="#lectura/0">Comenzar a leer</a><a class="btn btn-navy" href="#lectura/${Math.max(1,Math.min(ECOS_DISPONIBLES-1,v8SavedPage()))}">Continuar lectura</a></div></div></section>`}
function ecosBiblioteca(){
 const pendientes=["VII", "Epílogo"];
 return `<div class="ecos-library"><div class="ecos-wrap">${ecosFicha()}<div class="ecos-library-title"><span class="eyebrow">BIBLIOTECA DE EPISODIOS</span><h2>Capítulos y páginas del cómic</h2><p>Las láminas están ordenadas según los archivos recibidos. Algunas tienen números impresos repetidos; los capítulos restantes están disponibles en la historia narrada.</p></div><div class="ecos-episodes">${ECOS_EPISODIOS.map(ecosCapituloCard).join('')}</div><div class="ecos-coming"><h3>Capítulos por ilustrar</h3><div class="ecos-coming-grid">${pendientes.map(i=>`<div class="ecos-coming-card"><span>${i==="Epílogo"?"EPÍLOGO":"CAPÍTULO "+i}</span><b>Narración disponible</b><small>Ilustraciones pendientes</small></div>`).join('')}</div></div><div class="ecos-post-library"><a href="#historia" class="btn btn-navy">Leer la historia narrada</a><a href="#actividades" class="btn btn-navy">Actividades interactivas</a></div></div></div>`;
}
// La sección historia recibe el texto del archivo historia_narrada.js, sin contenido ficticio.
const ecosHistoriaDeReferencia = pages.historia;
pages.archivo = () => ecosHistoriaDeReferencia().replace('Explorar la historia','Contexto histórico');
pages.historia = () => {
 const escenas=Array.isArray(window.ECOS_HISTORIA_NARRADA)?window.ECOS_HISTORIA_NARRADA:[];
 const parrafos=escenas.filter(s=>s&&typeof s.titulo==='string'&&Array.isArray(s.parrafos));
 return `${header('Historia narrada','Lee el relato completo, organizado por capítulos.','EL RELATO POR ESCRITO')}<div class="page-wrap"><div class="content ecos-story"><div class="ecos-story-intro"><div class="ecos-story-icon" aria-hidden="true">📜</div><div><span class="eyebrow">NARRACIÓN DEL CÓMIC</span><h2>Una historia para leer</h2><p>Aquí encontrarás la narración escrita de <em>Ecos del Cerro Rico</em>, organizada por capítulos. Incluye el prólogo, siete capítulos, el epílogo y la nota histórica.</p></div></div>${parrafos.length?parrafos.map((s,i)=>`<article class="ecos-story-chapter"><span class="eyebrow">SECCIÓN ${i+1}</span><h3>${safe(s.titulo)}</h3>${s.parrafos.map(p=>`<p>${safe(p)}</p>`).join('')}</article>`).join(''):`<div class="ecos-story-empty"><span aria-hidden="true">✦</span><h3>Narración pendiente de incorporar</h3><p>Aquí aparecerá el texto narrado del cómic cuando lo subas. No se ha añadido ningún párrafo inventado.</p></div>`}<div class="ecos-story-actions"><a class="btn btn-gold" href="#volumenes">Ver los capítulos del cómic</a><a class="btn btn-navy" href="#archivo">Consultar el contexto histórico</a></div></div></div>`;
};
pages.volumenes=ecosBiblioteca;
function ecosComentarioUI(episodio){
 const k='ecos-reaccion-'+episodio.id;
 let voto='';try{voto=localStorage.getItem(k)||''}catch{}
 return `<section class="ecos-comments"><div class="ecos-comments-title"><span class="eyebrow">OPINIONES Y REACCIONES</span><h2>¿Qué te pareció este episodio?</h2><p>Tu reacción se guarda únicamente en este navegador. Los comentarios públicos se podrán activar con GitHub Discussions.</p></div><div class="ecos-reactions"><button class="ecos-react ${voto==='gusta'?'active':''}" data-ecos-react="gusta" data-episodio="${episodio.id}" aria-pressed="${voto==='gusta'}">♡ Me gustó</button><button class="ecos-react ${voto==='interesante'?'active':''}" data-ecos-react="interesante" data-episodio="${episodio.id}" aria-pressed="${voto==='interesante'}">✦ Interesante</button><button class="ecos-react ${voto==='aprendi'?'active':''}" data-ecos-react="aprendi" data-episodio="${episodio.id}" aria-pressed="${voto==='aprendi'}">✓ Aprendí algo</button></div><div class="ecos-public-comments" data-ecos-comments="${episodio.id}"><div class="ecos-comment-notice"><strong>Comentarios públicos todavía no activados</strong><p>GitHub Pages no almacena comentarios por sí solo. Para que las opiniones sean visibles para todos, hay que habilitar Discussions e instalar Giscus en el repositorio. Esta zona está lista para conectarse, pero no almacena mensajes de otros lectores.</p></div></div></section>`;
}
function ecosLector(){
 const n=ecosIndice(), p=comicPages[n], ep=ecosEpisodio(n);v8Remember(n);
 const previo=ECOS_EPISODIOS.find(e=>e.fin<ep.inicio);
 const posterior=ECOS_EPISODIOS.find(e=>e.inicio>ep.fin);
 return `<div class="ecos-reading"><div class="ecos-reading-content"><div class="ecos-reading-heading"><a class="ecos-back-link" href="#volumenes">← Biblioteca de capítulos</a><div><span class="eyebrow">${safe(ep.titulo)}</span><h1>${safe(p[1])}</h1><p>${n===0?'Portada del cómic':'Lámina '+n+' de '+(ECOS_DISPONIBLES-1)} · Episodio disponible</p></div></div><div class="ecos-reading-nav"><a href="#volumenes">☷ Episodios</a>${previo?`<a href="#lectura/${previo.inicio}">← Episodio anterior</a>`:`<span aria-disabled="true">← Episodio anterior</span>`}${posterior?`<a href="#lectura/${posterior.inicio}">Episodio siguiente →</a>`:`<span aria-disabled="true">Episodio siguiente →</span>`}</div><div class="ecos-reader-grid"><div class="ecos-reader-main"><div class="ecos-reader-img" id="readerStage" tabindex="0"><img src="assets/comic_${String(n).padStart(2,'0')}.webp" alt="${safe(p[0])}: ${safe(p[1])}" draggable="false"></div><div class="ecos-reader-controls">${ecosLinkPagina(n-1,'← Página anterior','btn-navy')}<a class="btn btn-navy btn-small" href="#lectura/0">⌂ Primera página</a>${ecosLinkPagina(n+1,'Página siguiente →','btn-gold')}<button class="btn btn-navy btn-small" type="button" data-ecos-fullscreen>${ecosModoLectura?'Salir de pantalla completa':'⛶ Pantalla completa'}</button><button class="btn btn-plain btn-small" type="button" data-ecos-thumbs aria-expanded="${ecosMiniaturasAbiertas}">${ecosMiniaturasAbiertas?'Ocultar miniaturas':'Ver miniaturas'}</button></div><div class="ecos-thumbs-panel" ${ecosMiniaturasAbiertas?'':'hidden'}><p>Las miniaturas son vistas pequeñas de cada página. Toca cualquiera para abrirla.</p><div class="ecos-thumbs">${ecosMiniaturas()}</div></div></div><aside class="ecos-reader-side"><h3>Índice de lectura</h3><p>Selecciona una página o vuelve a la biblioteca.</p><div class="ecos-side-pages">${comicPages.map((page,i)=>`<a class="${n===i?'selected':''}" href="#lectura/${i}"><span>${i===0?'P':String(i)}</span><b>${i===0?'Portada':'Lámina '+i}</b></a>`).join('')}</div><a href="#volumenes" class="ecos-side-library">Ver capítulos y próximos episodios →</a></aside></div><p class="ecos-reader-tip">Desliza lateralmente para cambiar de página en celular o usa ← y → en computadora. El botón «Primera página» abre la portada, no el inicio de la web.</p>${ecosComentarioUI(ep)}<div class="ecos-end-reader"><a href="#volumenes" class="btn btn-navy">Volver a la biblioteca</a><a href="#inicio" class="btn btn-navy">Ir al inicio de la web</a></div></div></div>`;
}
pages.lectura=ecosLector;
// Mejora de inicio: dos acciones inequívocas y fotografía original, sin imágenes de relleno.
const ecosInicioAnterior=pages.inicio;
pages.inicio=()=>ecosInicioAnterior().replace('Accede a la biblioteca de volúmenes y conoce los capítulos previstos de la aventura.','Consulta la ficha de la obra y abre las páginas ya publicadas.').replace('Ver volúmenes','Ver capítulos').replace('Descubre acontecimientos, lugares y contextos de la Potosí colonial.','Lee ahora el relato completo por capítulos.').replace('Elige cómo quieres descubrir las memorias del Cerro Rico.','Explora los contenidos del cómic y continúa tu aventura.');
// Convertir direcciones antiguas a la navegación de lectura sin perder la página.
function ecosLegacyHash(){if(/^#volumenes\/\d+$/.test(location.hash))history.replaceState(null,'','#lectura/'+location.hash.split('/')[1]);}
ecosLegacyHash();
function ecosSincronizarSeccion(){
 const slug=location.hash.slice(1).split('/')[0];
 document.body.classList.toggle('ecos-on-reader',slug==='lectura');
 document.body.classList.toggle('ecos-full',ecosModoLectura&&slug==='lectura');
 if(slug!=='lectura')ecosModoLectura=false;
 if(slug==='lectura'&&window.ECOS_COMENTARIOS&&window.ECOS_COMENTARIOS.repo){ecosInsertGiscus()}
}
function ecosInsertGiscus(){
 const conf=window.ECOS_COMENTARIOS||{};
 if(!conf.repo||!conf.repoId||!conf.categoryId)return;
 const target=document.querySelector('.ecos-public-comments');if(!target)return;
 target.innerHTML='';
 const script=document.createElement('script');
 script.src='https://giscus.app/client.js';script.async=true;
 const fields={'data-repo':conf.repo,'data-repo-id':conf.repoId,'data-category':conf.category||'General','data-category-id':conf.categoryId,'data-mapping':'specific','data-term':'ecos-'+ecosEpisodio(ecosIndice()).id,'data-strict':'1','data-reactions-enabled':'1','data-emit-metadata':'0','data-input-position':'top','data-theme':'light','data-lang':'es'};
 for(const [k,v] of Object.entries(fields))script.setAttribute(k,v);
 script.crossOrigin='anonymous';target.appendChild(script);
}
// La actualización de contenido y botones debe completarse después de que el enrutador renderice el HTML.
window.addEventListener('hashchange',()=>queueMicrotask(ecosSincronizarSeccion));
document.addEventListener('click',e=>{
 if(e.target.closest('[data-ecos-thumbs]')){
  ecosMiniaturasAbiertas=!ecosMiniaturasAbiertas;
  const box=document.querySelector('.ecos-thumbs-panel');if(box)box.hidden=!ecosMiniaturasAbiertas;
  const btn=e.target.closest('[data-ecos-thumbs]');btn.textContent=ecosMiniaturasAbiertas?'Ocultar miniaturas':'Ver miniaturas';btn.setAttribute('aria-expanded',String(ecosMiniaturasAbiertas));
 }
 if(e.target.closest('[data-ecos-fullscreen]')){
  ecosModoLectura=!ecosModoLectura;document.body.classList.toggle('ecos-full',ecosModoLectura);
  const btn=e.target.closest('[data-ecos-fullscreen]');btn.textContent=ecosModoLectura?'Salir de pantalla completa':'⛶ Pantalla completa';
 }
 const react=e.target.closest('[data-ecos-react]');if(react){
  const k='ecos-reaccion-'+react.dataset.episodio;let current='';try{current=localStorage.getItem(k)||''}catch{}
  const next=current===react.dataset.ecosReact?'':react.dataset.ecosReact;
  try{next?localStorage.setItem(k,next):localStorage.removeItem(k)}catch{}
  document.querySelectorAll('[data-ecos-react]').forEach(b=>{const selected=b.dataset.ecosReact===next;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected))});
 }
});
// V8 usa eventos táctiles y teclado solo en #volumenes; V9 añade lo mismo para #lectura.
let ecosTouchStart=null;
document.addEventListener('touchstart',e=>{if(e.target.closest('.ecos-reader-img'))ecosTouchStart=e.changedTouches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{if(ecosTouchStart===null)return;const dx=e.changedTouches[0].clientX-ecosTouchStart;ecosTouchStart=null;if(Math.abs(dx)>65&&location.hash.startsWith('#lectura')){const n=ecosIndice()+(dx<0?1:-1);if(n>=0&&n<ECOS_DISPONIBLES)location.hash='#lectura/'+n}},{passive:true});
document.addEventListener('keydown',e=>{if(!location.hash.startsWith('#lectura')||e.target.closest('input,textarea,select'))return;if(['ArrowRight','ArrowLeft'].includes(e.key)){const n=ecosIndice()+(e.key==='ArrowRight'?1:-1);if(n>=0&&n<ECOS_DISPONIBLES){e.preventDefault();location.hash='#lectura/'+n}}if(e.key==='Escape'&&ecosModoLectura){ecosModoLectura=false;document.body.classList.remove('ecos-full')}});
route();ecosSincronizarSeccion();

// Créditos actualizados para reflejar exclusivamente el material cargado en esta versión.
pages.creditos=()=>`${header('Créditos y proyecto','Sobre la creación visual de Ecos del Cerro Rico: La última página.','EL PROYECTO')}<div class="page-wrap"><div class="content"><div class="credit-grid"><div class="parchment"><h3>Sobre la obra</h3><p>Cómic digital interactivo de temática histórica sobre Potosí, desarrollado como proyecto académico de Diseño Gráfico.</p><p><strong>Postulante:</strong> Jesús Rolando Choque Apala</p><p><strong>Institución:</strong> Instituto Técnico Boliviano Suizo (TBS)</p><p><strong>Lugar:</strong> Potosí, Bolivia · 2026</p></div><div class="parchment"><h3>Material disponible</h3><p>Veintiséis láminas del cómic: portada y veinticinco imágenes enviadas, junto con fichas de personajes y actividades interactivas.</p><p>La narración completa en texto está incorporada; faltan ilustraciones del capítulo VII y del epílogo. Los comentarios públicos requieren una conexión externa.</p></div></div><div class="ecos-story-actions"><a class="btn btn-navy" href="#volumenes">Biblioteca</a><a class="btn btn-gold" href="#historia">Historia narrada</a></div></div></div>`;
