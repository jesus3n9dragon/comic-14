/* V8: lector con páginas originales, navegación adaptable y reto de memoria visual. */
const comicPages = [
 ["Portada", "Portada"],
 ["Lámina 1", "El secreto de Julián"],
 ["Lámina 2", "Una tarea y un recuerdo"],
 ["Lámina 3", "El estudio del abuelo"],
 ["Lámina 4", "Las cinco preguntas"],
 ["Lámina 5", "El Eco aparece"],
 ["Lámina 6", "El medallón y el portal"],
 ["Lámina 7", "Llegada a 1545"],
 ["Lámina 8", "Kusi y las llamas"],
 ["Lámina 9", "El relato de Diego Huallpa"],
 ["Lámina 10", "El siguiente recuerdo"],
 ["Lámina 11", "La herrería de Tomás"],
 ["Lámina 12", "El trabajo en equipo"],
 ["Lámina 13", "Amaru y el Cerro Rico"],
 ["Lámina 14", "La vida en la mina"],
 ["Lámina 15", "El recorrido del mineral"],
 ["Lámina 16", "La mita y sus riesgos"],
 ["Lámina 17", "La espera de Amaru"],
 ["Lámina 18", "Inés y la carga"],
 ["Lámina 19", "Los registros del mineral"],
 ["Lámina 20", "La Casa de Moneda"],
 ["Lámina 21", "Catalina y la Villa Imperial"],
 ["Lámina 22", "El taller de Catalina"],
 ["Lámina 23", "El reconocimiento de la artesana"],
 ["Lámina 24", "El legado de las artes y las costumbres"],
 ["Lámina 25", "El quinto símbolo y el regreso del Eco"]
];
let readerShowIndex = false;
function v8Index(){const n=Number(location.hash.split('/')[1]||0);return Number.isFinite(n)?Math.max(0,Math.min(comicPages.length-1,n)):0}
function v8ReaderButton(text,num,kind='btn-navy'){
 return num<0||num>=comicPages.length?`<span class="btn ${kind} btn-small is-disabled" aria-disabled="true">${text}</span>`:`<a class="btn ${kind} btn-small" href="#volumenes/${num}">${text}</a>`;
}
function v8SavedPage(){try{return Number(localStorage.getItem('ecos-last-page')||0)}catch{return 0}}
function v8Remember(n){try{localStorage.setItem('ecos-last-page',String(n))}catch{}}
function v8ReaderChapters(){
 return `<aside class="reader-sidebar v8-sidebar"><h3>Índice ilustrado</h3><p>Las ilustraciones entregadas están organizadas en el orden recibido. Algunas contienen números impresos repetidos.</p>
 <div class="v8-mini-index">${comicPages.map((p,i)=>`<a href="#volumenes/${i}" class="v8-mini-entry ${i===v8Index()?'selected':''}" aria-label="Ir a ${p[0]}"><img src="assets/comic_${String(i).padStart(2,'0')}.webp" loading="lazy" alt=""><span>${p[0]}</span></a>`).join('')}</div>
 <p class="notice">Las páginas se muestran en el orden de numeración que enviaste; no se han añadido viñetas ficticias.</p></aside>`;
}
pages.volumenes=()=>{
 const n=v8Index(),p=comicPages[n];v8Remember(n);
 return `${header('Leer el cómic','Descubre las páginas ilustradas de la aventura de Mateo y Lucía.','LECTURA INTERACTIVA')}
 <div class="page-wrap"><div class="content v8-reader-content"><div class="v8-reader-heading"><h2>Volumen I · Páginas disponibles</h2><p>Lee en orden, amplía las viñetas y continúa por donde te quedaste.</p></div>
 <div class="reader-layout">${v8ReaderChapters()}<section class="reader-panel" id="comicReaderPanel" aria-label="Lector del cómic">
 <div class="reader-topbar"><div><span class="eyebrow">ECOS DEL CERRO RICO</span><h2 class="reader-title">${p[1]}</h2></div><div class="reader-status">${n===0?'Portada':'Página '+(n+1)} · ${comicPages.length} láminas</div></div>
 <div class="reader-stage" id="readerStage" tabindex="0" aria-label="Imagen de ${p[0]}"><img class="reader-page-img" src="assets/comic_${String(n).padStart(2,'0')}.webp" alt="${p[0]} del cómic: ${p[1]}" draggable="false"></div>
 <div class="v8-reader-toolbar" aria-label="Controles de lectura">
 ${v8ReaderButton('← Anterior',n-1,'btn-plain')}${v8ReaderButton('Siguiente →',n+1,'btn-gold')}
 <button class="btn btn-navy btn-small" data-v8-fullscreen type="button">⛶ <span class="v8-fs-label">Pantalla completa</span></button>
 <button class="btn btn-plain btn-small" type="button" data-v8-index>▦ Miniaturas</button>
 <a class="btn btn-plain btn-small" href="#inicio">⌂ Inicio</a>
 </div>
 <div class="v8-reader-index" ${readerShowIndex?'':'hidden'}>${comicPages.map((p,i)=>`<a href="#volumenes/${i}" class="v8-thumb ${i===n?'selected':''}"><img loading="lazy" src="assets/comic_${String(i).padStart(2,'0')}.webp" alt=""><span>${p[0]}</span></a>`).join('')}</div>
 <p class="v8-reader-help">En computadora: usa las teclas ← y → para pasar de página. En celular: desliza hacia los lados. El botón de pantalla completa mantiene los controles visibles.</p>
 </section></div><div class="v8-next-volume"><h3>Próximas páginas</h3><p>Las páginas de los capítulos finales aún no se han ilustrado. Se incorporarán respetando el guion definitivo.</p><a class="btn btn-navy btn-small" href="#actividades">Practicar con actividades</a></div></div></div>`;
};
const oldInicioV8=pages.inicio;
pages.inicio=()=>oldInicioV8().replace('Accede a la biblioteca de volúmenes y conoce los capítulos previstos de la aventura.','Lee la portada y las veinte láminas ilustradas.').replace('Ver volúmenes','Leer páginas').replace('Elige cómo quieres descubrir las memorias del Cerro Rico.','Lee el cómic, conoce a los personajes y pon a prueba tus conocimientos.');
const oldActividadesV8=pages.actividades;
pages.actividades=()=>{
 let content=oldActividadesV8();
 if(location.hash.slice(1).split('/')[1])return content;
 const add=`<section class="v8-extra-activity"><div><span class="eyebrow">NUEVO DESAFÍO VISUAL</span><h2>Memoria del Cerro Rico</h2><p>Un reto adicional basado en las viñetas reales del cómic: reconoce escenas, objetos y personajes. Dos niveles, con explicación de cada respuesta.</p><div class="difficulty-actions"><a class="btn btn-gold btn-small" href="#memoria/facil">Jugar nivel fácil</a><a class="btn btn-navy btn-small" href="#memoria/dificil">Jugar nivel difícil</a></div></div><img src="assets/comic_07.webp" loading="lazy" alt="Escena del descubrimiento de la plata en el cómic"></section>`;
 const pos=content.lastIndexOf('</div></div>');return pos>=0?content.slice(0,pos)+add+content.slice(pos):content+add;
};
const memoryQuestions={
 facil:[
 ['¿Quién dejó el cuaderno y el medallón a Mateo?',['Tomás','Julián','Amaru'],1,'Julián investigaba el Cerro Rico y dejó pistas para Mateo.',1],
 ['¿Quién ayuda a Mateo y Lucía cuando llegan al pasado?',['Catalina','La profesora','Kusi'],2,'Kusi los guía por el entorno antiguo.',5],
 ['¿Qué objeto conecta los recuerdos de la aventura?',['El medallón','Una radio','Un reloj eléctrico'],0,'El medallón es un recurso de ficción que conecta los viajes.',3],
 ['¿Qué mineral destaca en el relato del Cerro Rico?',['Cobre','Plata','Carbón'],1,'Kusi narra la tradición relacionada con la plata.',7],
 ['¿Qué oficio tiene Tomás en la historia?',['Marinero','Arquitecto','Herrero'],2,'En su taller, Tomás repara piezas y herramientas.',8]
 ],
 dificil:[
 ['¿En qué año sitúa el cómic la llegada al pasado?',['1773','1545','1825'],1,'La llegada al Potosí de 1545 aparece en las viñetas.',5],
 ['¿Quién relata a los protagonistas la tradición sobre Diego Huallpa?',['Kusi','Julián','Lucía'],0,'Kusi comparte un relato tradicional del hallazgo de plata, con detalles históricos discutidos.',6],
 ['¿Qué muestran Mateo y Lucía al ayudar en el taller?',['La fabricación de barcos','La acuñación de monedas modernas','La organización de piezas y encargos'],2,'Colaboran en la organización de encargos del herrero Tomás.',8],
 ['¿Cuál es la idea principal de las palabras de Julián?',['Solo interesa la cantidad de plata','También hay que recordar a quienes vivieron los hechos','La historia debe olvidarse'],1,'Julián propone recordar la experiencia de las personas, además de la riqueza.',1],
 ['¿Por qué brilla el medallón al terminar el recuerdo?',['Para anunciar la transición a otro momento','Porque es una moneda auténtica','Para llamar a Tomás'],0,'En el cómic el brillo anuncia otro viaje; es parte de la ficción.',7]
 ]
};
let memoryState={level:'facil',index:0,score:0,pick:null,checked:false};
pages.memoria=()=>{
 const level=location.hash.split('/')[1]==='dificil'?'dificil':'facil';
 return `${header('Memoria del Cerro Rico','Observa las escenas del cómic y responde.','NUEVO RETO EDUCATIVO')}<div class="page-wrap"><div class="content v8-memory-wrap"><div class="challenge-back"><a class="btn btn-plain btn-small" href="#actividades">← Actividades</a><div class="level-switch"><a class="btn ${level==='facil'?'btn-gold':'btn-navy'} btn-small" href="#memoria/facil">Fácil</a><a class="btn ${level==='dificil'?'btn-gold':'btn-navy'} btn-small" href="#memoria/dificil">Difícil</a></div></div><div class="v8-memory-card" id="memoryRoot"></div></div></div>`;
};
function v8InitMemory(){memoryState={level:location.hash.split('/')[1]==='dificil'?'dificil':'facil',index:0,score:0,pick:null,checked:false};v8RenderMemory()}
function v8RenderMemory(){
 const root=document.getElementById('memoryRoot');if(!root)return;let s=memoryState,bank=memoryQuestions[s.level];
 if(s.index>=bank.length){try{localStorage.setItem('ecos-memory-'+s.level,String(s.score))}catch{}
 root.innerHTML=`<div class="v8-finished"><div class="v8-finish-symbol">✦</div><h2>¡Reto completado!</h2><p>Respuestas acertadas: <strong>${s.score} de ${bank.length}</strong></p><p>Revisar las escenas también es una forma de recuperar la memoria histórica.</p><div class="difficulty-actions"><button class="btn btn-gold" data-memory-restart>Repetir</button><a class="btn btn-navy" href="#actividades">Otras actividades</a></div></div>`;return;}
 const [question,opts,correct,explain,img]=bank[s.index];
 root.innerHTML=`<div class="v8-memory-picture"><img src="assets/comic_${String(img).padStart(2,'0')}.webp" alt="Escena original del cómic que ayuda a responder la pregunta" loading="lazy"></div><div class="v8-memory-questions"><span class="eyebrow">${s.level==='facil'?'NIVEL FÁCIL':'NIVEL DIFÍCIL'} · PREGUNTA ${s.index+1} / ${bank.length}</span><div class="progress-track"><span style="width:${(s.index/bank.length)*100}%"></span></div><h2>${question}</h2><div class="v8-answer-list">${opts.map((option,i)=>`<button type="button" class="answer ${s.pick===i?'selected':''}" data-memory-choice="${i}" ${s.checked?'disabled':''}>${String.fromCharCode(65+i)}. ${option}</button>`).join('')}</div>${s.checked?`<p class="feedback ${s.pick===correct?'':'bad'}">${s.pick===correct?'¡Correcto! ':'La respuesta correcta era: '+opts[correct]+'. '}${explain}</p>`:''}<button class="btn btn-gold" type="button" data-memory-next ${s.pick===null?'disabled':''}>${s.checked?'Siguiente →':'Comprobar respuesta'}</button></div>`;
}
function v8RefreshReader(){document.body.classList.remove('v8-immersive');}
window.addEventListener('hashchange',()=>{
 const slug=location.hash.slice(1).split('/')[0];
 if(slug!=='volumenes')v8RefreshReader();
 if(slug==='memoria')v8InitMemory();
});
let swipeX=null;
document.addEventListener('touchstart',e=>{if(e.target.closest('#readerStage'))swipeX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{if(swipeX===null)return;const d=e.changedTouches[0].clientX-swipeX;swipeX=null;if(Math.abs(d)>65&&location.hash.startsWith('#volumenes')){const n=v8Index()+(d<0?1:-1);if(n>=0&&n<comicPages.length)location.hash='#volumenes/'+n;}},{passive:true});
document.addEventListener('keydown',e=>{
 if(!location.hash.startsWith('#volumenes')||document.activeElement?.matches('input,textarea,select'))return;
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();const n=v8Index()+(e.key==='ArrowRight'?1:-1);if(n>=0&&n<comicPages.length)location.hash='#volumenes/'+n;}
});
document.addEventListener('click',e=>{
 if(e.target.closest('[data-v8-fullscreen]')){document.body.classList.toggle('v8-immersive');const el=document.querySelector('[data-v8-fullscreen] .v8-fs-label');if(el)el.textContent=document.body.classList.contains('v8-immersive')?'Salir de pantalla completa':'Pantalla completa';}
 if(e.target.closest('[data-v8-index]')){readerShowIndex=!readerShowIndex;const el=document.querySelector('.v8-reader-index');if(el)el.hidden=!readerShowIndex;}
 if(e.target.closest('[data-memory-choice]')){if(!memoryState.checked){memoryState.pick=Number(e.target.closest('[data-memory-choice]').dataset.memoryChoice);v8RenderMemory();}}
 if(e.target.closest('[data-memory-next]')){if(memoryState.pick===null)return;if(!memoryState.checked){memoryState.checked=true;if(memoryState.pick===memoryQuestions[memoryState.level][memoryState.index][2])memoryState.score++;}else{memoryState.index++;memoryState.pick=null;memoryState.checked=false;}v8RenderMemory();}
 if(e.target.closest('[data-memory-restart]'))v8InitMemory();
});
// Asegurar que el parche final se aplique a la pantalla ya renderizada.
route();if(location.hash.startsWith('#memoria'))v8InitMemory();
/* Panel actualizado para distinguir los 8 niveles tradicionales y el reto adicional. */
progressBoard=()=>{
 let saved={};try{saved=JSON.parse(localStorage.getItem('ecos-v2-scores')||'{}')}catch{}
 const classic=Object.entries(saved).filter(([k,v])=>v&&/-(facil|dificil)$/.test(k)).length;
 let visual=0;try{visual=['facil','dificil'].filter(l=>localStorage.getItem('ecos-memory-'+l)!==null).length}catch{}
 return `<section class="parchment board"><h3>Mi progreso</h3><p><strong>${classic+visual} de 10 niveles</strong> completados (4 actividades originales más un reto visual, todos con nivel fácil y difícil).</p><div class="progress-track"><span style="width:${(classic+visual)*10}%"></span></div><p class="notice">Tu progreso se guarda en este navegador, sin crear una cuenta.</p></section>`;
};
