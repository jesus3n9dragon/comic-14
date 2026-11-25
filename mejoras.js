/* Ecos del Cerro Rico — ampliación visual y actividades funcionales */
const charsExtended={
Mateo:{tag:'Protagonista · presente',job:'Estudiante que descubre una pista ligada al cuaderno de su abuelo Julián. Junto a Lucía comienza un viaje que lo enfrenta a memorias olvidadas de Potosí.',traits:'Curiosidad, iniciativa y disposición para aprender.',image:'mateo'},
'Lucía':{tag:'Protagonista · presente',job:'Compañera de Mateo. Observa, pregunta e interpreta las escenas del pasado; su mirada ayuda a conectar los acontecimientos históricos con el presente.',traits:'Atenta, reflexiva y perseverante.',image:'lucia'},
'Julián':{tag:'Abuelo de Mateo · presente (2034)',job:'Guarda un cuaderno y una página arrancada que ponen en marcha el misterio narrativo. Su vínculo con la memoria familiar conecta generaciones.',traits:'Reservado, reflexivo y protector.',image:'julian'},
'Eco':{tag:'Guardián de los recuerdos · fantástico',job:'Presencia sobrenatural de luz y fragmentos plateados relacionada con los recuerdos y la transición entre momentos de la historia.',traits:'Misterioso y simbólico.',image:'eco'},
'Kusi':{tag:'Niña guía · pasado colonial',job:'Acerca a los protagonistas a una perspectiva local de los primeros acontecimientos del recorrido. Su presencia ayuda a mirar la historia desde las personas.',traits:'Observadora y decidida.',image:'kusi'},
'Tomás':{tag:'Herrero · pasado colonial',job:'Representa oficios y trabajo artesanal presentes en la vida cotidiana de la ciudad en desarrollo.',traits:'Práctico y trabajador.',image:'tomas'},
'Amaru':{tag:'Joven trabajador · pasado colonial',job:'A través de su experiencia, la narración aborda el trabajo minero, la mita y las desigualdades de la sociedad colonial.',traits:'Resistencia y dignidad.',image:'amaru'},
'Inés':{tag:'Joven comerciante · pasado colonial',job:'Conecta la aventura con las redes de comercio, los intercambios y la vida urbana vinculada a la plata y la Casa de Moneda.',traits:'Curiosa y hábil.',image:'ines'},
'Catalina':{tag:'Mujer de la élite · pasado colonial',job:'Miembro de la élite colonial de la Villa Imperial. Su presencia permite mostrar las diferencias sociales, las costumbres y la vida de los sectores acomodados.',traits:'Elegante, observadora y consciente de las normas de su entorno.',image:'catalina'}
};
const historical=[
 {title:'Cerro Rico y la plata',photo:'Cerro Rico over Potosí, Bolivia.jpg',text:'Desde mediados del siglo XVI, la explotación de los yacimientos de plata del Cerro Rico impulsó el crecimiento de Potosí. Sus minerales abastecieron una amplia red de producción, circulación monetaria y comercio internacional.',detail:'La minería no dependía solo de la extracción. En las instalaciones coloniales también se trituraba y procesaba el mineral. La tecnología hidráulica y el uso de mercurio formaron parte de un complejo sistema productivo que transformó profundamente el territorio.',questions:'¿Cómo cambió el desarrollo de la ciudad cuando aumentó la explotación de plata?',source:'https://whc.unesco.org/es/list/420'},
 {title:'La Villa Imperial',photo:'Bolivia - Potosí - Plaza 10 de Noviembre e la cattedrale.jpg',text:'El crecimiento de Potosí atrajo trabajadores, comerciantes, autoridades y personas procedentes de diversos lugares. Durante los siglos XVI y XVII se consolidó como un importante centro urbano de América.',detail:'Sus calles, iglesias, plazas, casas y barrios muestran una sociedad con intercambios culturales, pero también profundas diferencias económicas y sociales. La diversidad de sus habitantes es esencial para comprender la vida cotidiana de la ciudad colonial.',questions:'¿Quiénes participaron en la construcción y funcionamiento de la ciudad?',source:'https://whc.unesco.org/en/list/420'},
 {title:'La Casa de Moneda',photo:'Casa Nacional de Moneda',photoUrl:'https://casanacionaldemoneda.bo/images/p1.jpg',text:'La acuñación de moneda permitió transformar parte de la plata en piezas utilizadas dentro de los circuitos económicos. La Casa de Moneda es uno de los testimonios arquitectónicos más reconocibles de esa historia.',detail:'El edificio que hoy se visita corresponde en gran parte a una reconstrucción del siglo XVIII. La institución y su trayectoria abarcan distintas etapas históricas; por eso conviene distinguir el edificio actual de los primeros establecimientos de acuñación.',questions:'¿Por qué era importante convertir la plata en moneda?',source:'https://casanacionaldemoneda.bo/'},
 {title:'Trabajo minero y mita',photo:'Potosi Mining Photo by Sascha Grabow.jpg',text:'La explotación colonial de la plata requirió numerosos trabajadores. Entre los mecanismos de reclutamiento se encontraba la mita organizada por el poder colonial, que impuso labores obligatorias a comunidades indígenas.',detail:'El trabajo, la desigualdad y sus consecuencias deben contarse sin romantizar las condiciones de la minería. En el cómic, Amaru permite acercarse de manera humana a las experiencias de quienes sostenían la producción.',questions:'¿Qué diferencia existe entre la importancia económica de la plata y las condiciones de quienes la extraían?',source:'https://whc.unesco.org/en/list/420'},
 {title:'Ciudad, oficios y comercio',photo:'Calle de Potosí Bolivia.jpg',text:'La Villa Imperial reunió mercados, talleres y actividades cotidianas indispensables para su población. La prosperidad minera sostuvo servicios y oficios muy diversos, además de relaciones comerciales a gran escala.',detail:'La historia de Potosí no se limita a las minas. Los objetos que se fabricaban, los alimentos que circulaban, los espacios religiosos y las distintas formas de vivienda también ayudan a comprender cómo vivían sus habitantes.',questions:'¿Qué actividades hacían posible la vida de una ciudad tan grande?',source:'https://whc.unesco.org/en/list/420'},
 {title:'Patrimonio y memoria',photo:'Ciudad de PotosÍ - Bolivia.jpg',text:'Potosí forma parte del Patrimonio Mundial desde 1987. Su conjunto histórico reúne paisajes, obras hidráulicas, arquitectura religiosa, barrios y testimonios asociados con la actividad minera.',detail:'Investigar y cuidar este patrimonio permite reconocer tanto los logros materiales como las desigualdades y experiencias humanas del pasado. El cómic propone aproximarse a esa memoria desde la narrativa visual.',questions:'¿Qué historias deberían conservarse además de los monumentos?',source:'https://whc.unesco.org/es/list/420'}
];
function photoCredit(item){return item.photoUrl?"https://casanacionaldemoneda.bo/":`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(item.photo).replace(/%20/g,"_")}`}
function historyImg(item){const f=item.photoUrl||`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(item.photo)}?width=900`;return `<img loading="lazy" alt="Fotografía real relacionada con ${safe(item.title)}" src="${f}" onerror="this.onerror=null;this.src='assets/back.webp';this.closest('.historic-photo').classList.add('fallback-photo')">`}
pages.historia=()=>`${header('Explorar la historia','Conoce el patrimonio, la vida cotidiana y las personas que construyeron la historia colonial de Potosí.','EL PASADO QUE SIGUE PRESENTE')}<div class="page-wrap"><div class="content">${sectionHead('Seis ventanas a la historia','Fotografías actuales de lugares reales, información de contexto y preguntas para reflexionar. Las fotos muestran el patrimonio presente, no recreaciones exactas del siglo XVI.','HISTORIA DOCUMENTADA')}<div class="history-rich">${historical.map((h,i)=>`<article class="historic-entry"><figure class="historic-photo">${historyImg(h)}<figcaption>Imagen documental · <a href="${photoCredit(h)}" target="_blank" rel="noopener noreferrer">Origen y créditos de la fotografía ↗</a></figcaption></figure><div class="historic-copy"><span class="eyebrow">CAPÍTULO HISTÓRICO ${String(i+1).padStart(2,'0')}</span><h2>${h.title}</h2><p>${h.text}</p><p>${h.detail}</p><div class="reflect">✦ <strong>Para reflexionar:</strong> ${h.questions}</div><a target="_blank" rel="noopener noreferrer" href="${h.source}" class="source-link">Consultar fuente histórica ↗</a></div></article>`).join('')}</div><p class="notice">Las fotografías se cargan desde sitios externos al abrir la web con conexión a Internet. Si una imagen no está disponible se muestra una ilustración del proyecto como alternativa. Las referencias históricas utilizadas se indican en cada ficha.</p></div></div>`;
pages.personajes=()=>`${header('Personajes de la aventura','Conoce a quienes acompañan a Mateo y Lucía a través de los recuerdos de Potosí.','ROSTROS DE LA MEMORIA')}<div class="page-wrap"><div class="content">${sectionHead('Protagonistas','La historia comienza con dos jóvenes que se atreven a mirar el pasado.','NUESTRA HISTORIA')}<div class="character-showcase">${['Mateo','Lucía'].map(n=>characterCard(n)).join('')}</div>${sectionHead('Personajes que encontrarás','Sus historias permiten descubrir diversas miradas sobre la memoria, los oficios y la sociedad colonial.','PERSONAJES SECUNDARIOS')}<div class="character-showcase smaller">${['Julián','Eco','Kusi','Tomás','Amaru','Inés','Catalina'].map(n=>characterCard(n)).join('')}</div><p class="notice">Las fichas narrativas se basan en los personajes ya establecidos. La ilustración de Catalina y algunos detalles de su participación están pendientes de confirmar con la versión definitiva del guion.</p></div></div>`;
function characterCard(n){const p=charsExtended[n];return `<article class="character-wide"><div class="character-visual">${p.image?`<img src="assets/${p.image}_cutout.png" alt="Ilustración de ${n}, recortada sobre fondo transparente" loading="lazy">`:`<div class="character-await"><span>✧</span><b>${n}</b><small>Ilustración pendiente</small></div>`}</div><div class="character-copy"><span class="eyebrow">${safe(p.tag)}</span><h3>${safe(n)}</h3><p>${safe(p.job)}</p><p class="character-traits"><strong>En el cómic:</strong> ${safe(p.traits)}</p><a class="btn btn-navy btn-small" href="#actividades">Descubre sus actividades →</a></div></article>`}
const challenges=[
{id:'quiz',name:'Quiz histórico',who:'Mateo',img:'mateo',asset:'mateo_invita.png',guideAsset:'mateo_senala.png',intro:'¿Te animas a responder lo que aprendiste sobre el Cerro Rico?',icon:'✍',type:'quiz'},
{id:'relacion',name:'Relaciona conceptos',who:'Lucía',img:'lucia',asset:'lucia_actividad.png',intro:'Ayúdame a unir lugares, personajes y conceptos con su significado.',icon:'🧩',type:'match'},
{id:'tiempo',name:'Ordena la línea del tiempo',who:'Kusi',img:'kusi',asset:'kusi_cutout.png',intro:'¿Puedes organizar estos acontecimientos en orden histórico?',icon:'⌛',type:'timeline'},
{id:'verdadero',name:'Verdadero o falso',who:'Eco',img:'eco',asset:'eco_cutout.png',intro:'¿Puedes distinguir lo verdadero sobre la historia de Potosí?',icon:'✓',type:'truefalse'}
];
const quizBank={facil:[['¿Por qué fue importante el Cerro Rico?',['Por sus abundantes yacimientos de plata','Por ser un puerto marítimo','Por sus plantaciones de café'],0,'La extracción de plata impulsó el crecimiento de Potosí.'],['¿Dónde se acuñaban monedas?',['En el mercado central','En la Casa de Moneda','En una universidad'],1,'La Casa de Moneda se relaciona con la acuñación.'],['¿Quiénes son los protagonistas del cómic?',['Mateo y Lucía','Julián y Tomás','Inés y Amaru'],0,'Mateo y Lucía realizan el viaje narrativo.'],['¿Qué montaña se relaciona con Potosí?',['El Illimani','El Cerro Rico','El Tunari'],1,'El Cerro Rico domina el paisaje de Potosí.'],['¿Quién dejó pistas a Mateo mediante un cuaderno y medallón?',['Kusi','Tomás','Su abuelo Julián'],2,'En el prólogo Julián prepara los recuerdos que Mateo encontrará.']],dificil:[['¿Qué infraestructura ayudaba a mover molinos de mineral?',['Molinos hidráulicos y reservas de agua','Ferrocarriles eléctricos','Canales marítimos'],0,'Los ingenios coloniales utilizaron energía hidráulica.'],['¿Cuál de estos elementos también forma parte de la memoria de Potosí?',['Solo la plata','Barrios, iglesias, oficios y testimonios','Solo las monedas actuales'],1,'El patrimonio reúne huellas materiales y sociales.'],['¿Qué caracterizó a la mita colonial?',['Trabajo obligatorio impuesto a comunidades indígenas','Intercambio voluntario de libros','Elección de alcaldes'],0,'La mita implicó un sistema coercitivo de trabajo.'],['¿Qué ocurrió con la economía minera después de 1800?',['La actividad disminuyó respecto de su gran apogeo','Desapareció toda minería','Se transformó en pesca'],0,'La explotación continuó, aunque con menor intensidad.'],['¿Cuál es el objetivo de los viajes ficticios de Mateo y Lucía?',['Sustituir las fuentes históricas','Conectar la historia investigada con una aventura visual','Afirmar que existieron portales en el siglo XVI'],1,'El viaje temporal es ficción y permite narrar acontecimientos históricos.']]};
const matchBank={facil:[['Cerro Rico','Montaña vinculada a la extracción de plata'],['Casa de Moneda','Lugar relacionado con la acuñación'],['Villa Imperial','Ciudad colonial de gran importancia'],['Mita','Sistema de trabajo obligatorio'],['Julián','Abuelo de Mateo que investiga la historia']],dificil:[['Ingenio','Instalación para procesar mineral'],['Acuñación','Fabricación de monedas'],['Patrimonio','Herencia cultural e histórica'],['Barrio mitayo','Espacio relacionado con trabajadores sujetos a la mita'],['Narrativa temporal','Recurso ficticio que conecta escenas del pasado']]};
const timelineBank={facil:[['1545','Inicio del auge minero de Potosí'],['1572','Visita del virrey Francisco de Toledo'],['1759','Inicio de la reconstrucción de la Casa de Moneda'],['1987','Potosí inscrita como Patrimonio Mundial'],['2034','Año en que Julián investiga en el prólogo ficticio']],dificil:[['1545','Inicio de la explotación de plata en Potosí'],['1572','Reformas del virrey Toledo en la región'],['1759','Inicio de la nueva Casa de Moneda'],['Siglo XIX','Disminución minera respecto del auge colonial'],['2035','Escena escolar de Mateo y Lucía en el relato ficticio']]};
const vfBank={facil:[['El Cerro Rico fue importante por sus yacimientos de plata.',true],['La Casa de Moneda era un mercado de alimentos.',false],['La Villa Imperial creció vinculada a la minería.',true],['Mateo y Lucía son los protagonistas.',true],['El medallón forma parte de la aventura ficticia.',true]],dificil:[['La explotación minera colonial dependía exclusivamente de tecnología eléctrica.',false],['La mita colonial implicó trabajo obligatorio de población indígena.',true],['El patrimonio de Potosí comprende solo las minas y ningún edificio urbano.',false],['El edificio actual de la Casa de Moneda corresponde a intervenciones del siglo XVIII.',true],['La historia de Diego Huallpa debe contarse como un relato sin aspectos discutidos.',false]]};
let chState={};function challengeRoute(){const parts=location.hash.slice(1).split('/');return {id:parts[1],level:parts[2]}}
pages.actividades=()=>{const r=challengeRoute(), item=challenges.find(c=>c.id===r.id);if(!item)return `${header('Actividades interactivas','Cinco aventuras educativas con dos niveles de dificultad cada una. ¡Elige quién te acompañará!','APRENDE · JUEGA · DESCUBRE')}<div class="page-wrap"><div class="content">${sectionHead('Elige tu desafío','Mateo, Lucía, Kusi, El Eco y Julián te invitan a jugar. Cada actividad tiene niveles fácil y difícil.','5 ACTIVIDADES · 2 NIVELES')}<div class="challenge-list">${challenges.map(c=>`<article class="challenge-card"><div class="challenge-person"><img loading="lazy" src="assets/${c.asset||`${c.img}_cutout.png`}" alt="${c.who}"></div><div class="challenge-info"><span class="eyebrow">INVITACIÓN DE ${c.who.toUpperCase()}</span><h2>${c.icon} ${c.name}</h2><p>«${c.intro}»</p><div class="difficulty-actions"><a class="btn btn-gold btn-small" href="#actividades/${c.id}/facil">Nivel fácil →</a><a class="btn btn-navy btn-small" href="#actividades/${c.id}/dificil">Nivel difícil →</a></div></div></article>`).join('')}</div>${progressBoard()}</div></div>`;
const level=r.level==='dificil'?'dificil':'facil';return `${header(item.name,`${item.who} te acompaña en este reto. Nivel ${level==='facil'?'fácil':'difícil'}.`,'ACTIVIDAD INTERACTIVA')}<div class="page-wrap"><div class="content"><div class="challenge-back"><a href="#actividades" class="btn btn-plain btn-small">← Todas las actividades</a><div class="level-switch"><a class="btn ${level==='facil'?'btn-gold':'btn-navy'} btn-small" href="#actividades/${item.id}/facil">Fácil</a><a class="btn ${level==='dificil'?'btn-gold':'btn-navy'} btn-small" href="#actividades/${item.id}/dificil">Difícil</a></div></div><div class="challenge-play"><aside class="challenge-guide"><div class="bubble">${item.intro}</div><img src="assets/${item.guideAsset||item.asset||`${item.img}_cutout.png`}" alt="${item.who} te invita a realizar la actividad"></aside><section class="challenge-stage"><div class="stage-plaque"><h2>${item.icon} ${item.name}</h2><p>Nivel ${level==='facil'?'fácil':'difícil'}</p></div><div id="challengeRoot" aria-live="polite"></div></section></div></div></div>`};
function progressBoard(){
 let saved={};try{saved=JSON.parse(localStorage.getItem('ecos-v2-scores')||'{}')}catch{}
 const memoryLevels=['facil','dificil'].filter(l=>{try{return localStorage.getItem('ecos-memory-'+l)!==null}catch{return false}}).length;
 const complete=Object.keys(saved).filter(k=>saved[k]).length+memoryLevels;
 return `<section class="parchment board"><h3>✦ Mi progreso</h3><p>${complete} de 10 niveles completados · Se guarda solo en este dispositivo.</p><div class="badges-line">${challenges.map(c=>`<span>${c.icon} ${c.name}: ${['facil','dificil'].map(l=>saved[c.id+'-'+l]?'✓':'○').join(' / ')}</span>`).join('')}<span>✦ Memoria del Cerro Rico: ${['facil','dificil'].map(l=>{try{return localStorage.getItem('ecos-memory-'+l)!==null?'✓':'○'}catch{return '○'}}).join(' / ')}</span></div></section>`;
}
function stateInit(){
 const r=challengeRoute();if(!r.id)return;
 chState={id:r.id,level:r.level==='dificil'?'dificil':'facil',index:0,pick:null,confirmed:false,score:0,pairs:[],order:[],answers:{},left:null,results:[],matchDone:false};
 renderChallenge();
}
function markCompleted(){const r=challengeRoute();try{const x=JSON.parse(localStorage.getItem('ecos-v2-scores')||'{}');x[r.id+'-'+(r.level==='dificil'?'dificil':'facil')]=true;localStorage.setItem('ecos-v2-scores',JSON.stringify(x))}catch{}}
function finish(){
 const s=chState;markCompleted();const root=document.getElementById('challengeRoot');if(!root)return;
 root.innerHTML=`<div class="finish-panel"><span>✦</span><h3>¡Desafío completado!</h3><p>Obtuviste <strong>${s.score} de 5</strong> respuestas correctas.</p><p>${s.score<5?'Repasa el cómic y vuelve a intentarlo para mejorar.':'Has completado correctamente los cinco retos de este nivel.'}</p><div class="difficulty-actions"><button class="btn btn-gold" data-challenge-restart>Volver a intentar</button><a class="btn btn-navy" href="#actividades">Elegir otra actividad</a></div></div>`;
}
function v12WhyTF(statement, truth){const claims={
 'El Cerro Rico fue importante por sus yacimientos de plata.':'Sus yacimientos de plata impulsaron el crecimiento colonial de Potosí.',
 'La Casa de Moneda era un mercado de alimentos.':'La Casa de Moneda se dedicaba a acuñar moneda, no a comercializar alimentos.',
 'La Villa Imperial creció vinculada a la minería.':'La explotación de la plata atrajo población, oficios y comercio.',
 'Mateo y Lucía son los protagonistas.':'Son los dos estudiantes que viajan a los recuerdos del pasado.',
 'El medallón forma parte de la aventura ficticia.':'Es un dispositivo narrativo, no un objeto histórico documentado.',
 'La explotación minera colonial dependía exclusivamente de tecnología eléctrica.':'Se utilizaron tecnologías de época, entre ellas sistemas hidráulicos; no electricidad.',
 'La mita colonial implicó trabajo obligatorio de población indígena.':'Fue un sistema colonial coercitivo de trabajo.',
 'El patrimonio de Potosí comprende solo las minas y ningún edificio urbano.':'Incluye también arquitectura, barrios y testimonios urbanos.',
 'El edificio actual de la Casa de Moneda corresponde a intervenciones del siglo XVIII.':'El edificio conservado pertenece principalmente a la etapa constructiva del siglo XVIII.',
 'La historia de Diego Huallpa debe contarse como un relato sin aspectos discutidos.':'La tradición del hallazgo tiene detalles debatidos; no se presenta todo como certeza documental.'
 };return claims[statement]||(truth?'La afirmación es coherente con el cómic.':'Revisa el contexto histórico.');}
function renderChallenge(){
 const root=document.getElementById('challengeRoot');if(!root)return;
 const s=chState;const N=5;
 if(s.id!=='relacion'&&s.id!=='tiempo'&&s.index>=N){finish();return;}
 if(s.id==='relacion'){
  const bank=matchBank[s.level],rightOrder=[2,4,0,3,1];
  if(s.matchDone){root.innerHTML=`<div class="feedback" role="status"><h3>Relaciones comprobadas</h3><p>Acertaste ${s.score} de 5 parejas.</p>${s.results.map((ok,i)=>`<p>${ok?'✓':'✕'} <strong>${safe(bank[i][0])}</strong>: ${safe(bank[i][1])}</p>`).join('')}<button class="btn btn-gold" data-finish-match>Ver resultado →</button></div>`;return;}
  root.innerHTML=`<p class="challenge-progress">${s.pairs.length} de 5 parejas unidas</p><div class="progress-track"><span style="width:${s.pairs.length*20}%"></span></div><h3 class="challenge-question">Selecciona un concepto y luego su definición</h3><p class="notice">Puedes hacerlo con ratón, teclado o pantalla táctil.</p><div class="v12-match-grid"><div class="v12-match-column"><strong>Conceptos</strong>${bank.map((x,i)=>`<button type="button" class="match-option ${s.left===i?'active':''} ${s.pairs.some(p=>p[0]===i)?'matched':''}" data-v12-left="${i}" ${s.pairs.some(p=>p[0]===i)?'disabled':''}>${safe(x[0])}</button>`).join('')}</div><div class="v12-match-column"><strong>Definiciones</strong>${rightOrder.map(i=>`<button type="button" class="match-option ${s.pairs.some(p=>p[1]===i)?'matched':''}" data-v12-right="${i}" ${s.pairs.some(p=>p[1]===i)?'disabled':''}>${safe(bank[i][1])}</button>`).join('')}</div></div><p class="notice" role="status">${s.left===null?'Selecciona el concepto de la izquierda.':'Ahora elige su definición a la derecha.'}</p><div class="difficulty-actions"><button type="button" class="btn btn-plain btn-small" data-v12-reset-pairs>Reiniciar parejas</button><button type="button" class="btn btn-gold" data-v12-check-pairs ${s.pairs.length!==N?'disabled':''}>Comprobar las 5 parejas</button></div>`;return;
 }
 if(s.id==='tiempo'){
  const events=timelineBank[s.level],order=s.order,orderIndices=[2,4,0,3,1];
  root.innerHTML=`<p class="challenge-progress">${order.length} de 5 acontecimientos</p><div class="progress-track"><span style="width:${order.length*20}%"></span></div><h3 class="challenge-question">Ordena del más antiguo al más reciente. Selecciona las tarjetas en secuencia.</h3><div class="timeline-picks">${orderIndices.map(i=>`<button class="timeline-choice ${order.includes(i)?'chosen':''}" data-event="${i}" ${order.includes(i)||s.confirmed?'disabled':''}>${safe(events[i][1])}</button>`).join('')}</div><div class="timeline-slots">${Array.from({length:N},(_,i)=>`<div>${i+1}. ${order[i]!==undefined?safe(events[order[i]][1]):'Selecciona un hecho'}</div>`).join('')}</div>${s.confirmed?`<div class="feedback ${s.score===N?'':'bad'}" role="status"><strong>${s.score===N?'¡Secuencia correcta!':'Secuencia revisada:'}</strong><p>${events.map(x=>safe(x[0])+': '+safe(x[1])).join(' → ')}</p><p>Has ubicado ${s.score} de 5 acontecimientos en su posición.</p></div>`:''}<div class="difficulty-actions"><button class="btn btn-plain btn-small" data-reset-order ${s.confirmed?'disabled':''}>Reiniciar orden</button><button class="btn btn-gold" data-finish-order ${order.length!==N?'disabled':''}>${s.confirmed?'Ver resultado':'Comprobar orden'}</button></div>`;return;
 }
 let html=`<p class="challenge-progress">Pregunta ${s.index+1} de ${N}</p><div class="progress-track"><span style="width:${s.index/N*100}%"></span></div>`;
 if(s.id==='quiz'){
  const [q,opts,correct,why]=quizBank[s.level][s.index];
  html+=`<h3 class="challenge-question">${safe(q)}</h3><div class="answer-options">${opts.map((o,i)=>`<button class="answer ${s.pick===i?'selected':''}" data-choice="${i}" ${s.confirmed?'disabled':''}>${String.fromCharCode(65+i)}. ${safe(o)}</button>`).join('')}</div>${s.confirmed?`<div class="feedback ${s.pick===correct?'':'bad'}" role="status"><strong>${s.pick===correct?'¡Correcto!':'Respuesta correcta: '+safe(opts[correct])}</strong><p>${safe(why)}</p></div>`:''}<button class="btn btn-navy" data-challenge-next ${s.pick===null?'disabled':''}>${s.confirmed?'Siguiente →':'Comprobar respuesta'}</button>`;
 } else if(s.id==='verdadero'){
  const [q,truth]=vfBank[s.level][s.index];
  html+=`<h3 class="challenge-question">${safe(q)}</h3><div class="truth-options">${[true,false].map(v=>`<button class="btn ${s.pick===v?'btn-gold':'btn-navy'}" data-truth="${v}" ${s.confirmed?'disabled':''}>${v?'✓ Verdadero':'✕ Falso'}</button>`).join('')}</div>${s.confirmed?`<div class="feedback ${s.pick===truth?'':'bad'}" role="status"><strong>${s.pick===truth?'¡Correcto!':'Respuesta correcta: '+(truth?'verdadero':'falso')}</strong><p>${safe(v12WhyTF(q,truth))}</p></div>`:''}<button class="btn btn-gold" data-challenge-next ${s.pick===null?'disabled':''}>${s.confirmed?'Siguiente →':'Comprobar respuesta'}</button>`;
 }
 root.innerHTML=html;
}
function challengeClick(el){
 if(!chState.id)return;const s=chState;
 if(el.hasAttribute('data-choice')&&!s.confirmed){s.pick=Number(el.dataset.choice);renderChallenge()}
 else if(el.hasAttribute('data-truth')&&!s.confirmed){s.pick=el.dataset.truth==='true';renderChallenge()}
 else if(el.hasAttribute('data-challenge-next')){
  if(s.pick===null)return;
  if(!s.confirmed){const correct=s.id==='quiz'?s.pick===quizBank[s.level][s.index][2]:s.pick===vfBank[s.level][s.index][1];if(correct)s.score++;s.confirmed=true}
  else{s.index++;s.pick=null;s.confirmed=false}
  renderChallenge();
 }
 else if(el.hasAttribute('data-event')&&!s.confirmed){s.order.push(Number(el.dataset.event));renderChallenge()}
 else if(el.hasAttribute('data-reset-order')&&!s.confirmed){s.order=[];renderChallenge()}
 else if(el.hasAttribute('data-finish-order')){
  if(s.order.length!==5)return;
  if(!s.confirmed){s.score=s.order.reduce((v,x,i)=>v+(x===i),0);s.confirmed=true;renderChallenge()}
  else finish();
 }
 else if(el.hasAttribute('data-challenge-restart'))stateInit();
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-choice],[data-truth],[data-challenge-next],[data-event],[data-reset-order],[data-finish-order],[data-challenge-restart]');if(el)challengeClick(el)});

document.addEventListener('click',e=>{
 const b=e.target.closest('[data-v12-left],[data-v12-right],[data-v12-reset-pairs],[data-v12-check-pairs],[data-finish-match]');if(!b||chState.id!=='relacion')return;
 const s=chState;
 if(b.hasAttribute('data-v12-left')){s.left=Number(b.dataset.v12Left);renderChallenge()}
 else if(b.hasAttribute('data-v12-right')&&s.left!==null){const r=Number(b.dataset.v12Right);if(!s.pairs.some(x=>x[1]===r)){s.pairs.push([s.left,r]);s.left=null;}renderChallenge()}
 else if(b.hasAttribute('data-v12-reset-pairs')){s.pairs=[];s.left=null;renderChallenge()}
 else if(b.hasAttribute('data-v12-check-pairs')&&s.pairs.length===5){const bank=matchBank[s.level];s.results=bank.map((_,i)=>s.pairs.some(p=>p[0]===i&&p[1]===i));s.score=s.results.filter(Boolean).length;s.matchDone=true;renderChallenge()}
 else if(b.hasAttribute('data-finish-match'))finish();
});
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#actividades'))stateInit()});
// Navigate first on loading. The original script's route handler remains the renderer.
route();if(location.hash.startsWith('#actividades'))stateInit();

/* ===== V5 · ajuste responsive, personajes completos y lector del cómic ===== */
charsExtended['Herrero']={tag:'Artesano · pasado colonial',job:'Maestro herrero de la Villa Imperial. Representa los oficios, la técnica artesanal y el trabajo cotidiano que sostuvo la ciudad.',traits:'Hábil, trabajador y observador.',image:'herrero'};
charsExtended['Catalina']={tag:'Mujer de la élite · pasado colonial',job:'Miembro de la élite colonial de la Villa Imperial. Su presencia permite mostrar las diferencias sociales, las costumbres y la vida de los sectores acomodados.',traits:'Elegante, observadora y consciente de las normas de su entorno.',image:'catalina'};

const readerPreviewPages=[
  {title:'Portada del cómic',chapter:'Presentación editorial',file:'cover.webp',note:'Portada principal del proyecto.'},
  {title:'Página de presentación',chapter:'Prólogo',file:'reader_page_2.webp',note:'Página de presentación del proyecto y síntesis de la historia.'},
  {title:'Página piloto del cómic',chapter:'Capítulo I · El secreto de Julián',file:'reader_page_1.webp',note:'Vista piloto de lectura del cómic. Desde aquí puedes usar pantalla completa para leer mejor.'}
];

function volumeRoute(){
  const parts=location.hash.slice(1).split('/');
  let pageIndex=Number(parts[1]||2);
  if(Number.isNaN(pageIndex)) pageIndex=2;
  pageIndex=Math.max(0,Math.min(readerPreviewPages.length-1,pageIndex));
  return {pageIndex};
}

function readerNavBtn(label,href,kind='navy',disabled=false){
  if(disabled) return `<span class="btn btn-${kind} btn-small is-disabled" aria-disabled="true">${label}</span>`;
  return `<a class="btn btn-${kind} btn-small" href="${href}">${label}</a>`;
}

function chapterSidebar(){
  return `<aside class="reader-sidebar"><h3>📚 Capítulos</h3><p>Capítulo 1 habilitado como muestra de lectura. Los demás quedan listos para seguir cargando páginas después.</p><div class="reader-chapter-list">
  <a class="reader-chapter-item active" href="#volumenes/2"><strong>I</strong><span>El secreto de Julián</span></a>
  <button class="reader-chapter-item" type="button" disabled><strong>II</strong><span>El viaje en el tiempo</span></button>
  <button class="reader-chapter-item" type="button" disabled><strong>III</strong><span>La Villa Imperial</span></button>
  <button class="reader-chapter-item" type="button" disabled><strong>IV</strong><span>La mita y el trabajo</span></button>
  <button class="reader-chapter-item" type="button" disabled><strong>V</strong><span>Voces de resistencia</span></button>
  <button class="reader-chapter-item" type="button" disabled><strong>VI</strong><span>El costo de la plata</span></button>
  <button class="reader-chapter-item" type="button" disabled><strong>VII</strong><span>La última página</span></button>
  </div><div class="reader-sidebar-tip">Tip: en celular puedes leer mejor usando el botón de <strong>pantalla completa</strong>.</div></aside>`;
}

pages.volumenes=()=>{
  const r=volumeRoute();
  const item=readerPreviewPages[r.pageIndex];
  return `${header('Leer cómic','Ahora la página de lectura tiene un lector más cómodo, adaptable al celular y con botón de pantalla completa.','LECTOR DEL CÓMIC')}<div class="page-wrap"><div class="content">${sectionHead('Lectura del cómic','Usa los controles inferiores para avanzar, volver al inicio o abrir la lectura en pantalla completa.','LECTOR MEJORADO')}<div class="reader-layout">${chapterSidebar()}<section class="reader-panel"><div class="reader-topbar"><div><span class="eyebrow">${item.chapter}</span><h2 class="reader-title">${item.title}</h2></div><div class="reader-status">Página ${r.pageIndex+1} de ${readerPreviewPages.length}</div></div><div class="reader-stage" id="readerStage"><img class="reader-page-img" src="assets/${item.file}" alt="${safe(item.title)}"></div><p class="reader-hint">${item.note}</p><div class="reader-controls">${readerNavBtn('← Anterior',`#volumenes/${Math.max(0,r.pageIndex-1)}`,'plain',r.pageIndex===0)}<a class="btn btn-navy btn-small" href="#inicio">⌂ Volver al inicio</a><button class="btn btn-gold btn-small" type="button" data-reader-fullscreen>⛶ Pantalla completa</button>${readerNavBtn('Siguiente →',`#volumenes/${Math.min(readerPreviewPages.length-1,r.pageIndex+1)}`,'gold',r.pageIndex===readerPreviewPages.length-1)}</div></section></div></div></div>`;
};

function secondaryCharacterCard(name){
  const p=charsExtended[name];
  return `<article class="character-mini"><div class="character-mini-visual">${p.image?`<img src="assets/${p.image}_cutout.png" alt="Ilustración de ${name}" loading="lazy">`:`<div class="character-await"><span>✧</span><b>${name}</b><small>Ilustración pendiente</small></div>`}</div><div class="character-mini-copy"><h3>${name}</h3><small>${safe(p.tag)}</small><p>${safe(p.job)}</p><p><strong>En el cómic:</strong> ${safe(p.traits)}</p></div></article>`;
}

pages.personajes=()=>`${header('Personajes de la aventura','Se ajustaron mejor las imágenes para que se adapten correctamente en computadora y celular.','ROSTROS DE LA MEMORIA')}<div class="page-wrap"><div class="content">${sectionHead('Protagonistas','Mateo y Lucía lideran el viaje por la memoria de Potosí.','PERSONAJES PRINCIPALES')}<div class="character-showcase">${['Mateo','Lucía'].map(n=>characterCard(n)).join('')}</div>${sectionHead('Personajes secundarios e históricos','Aquí aparecen los personajes que acompañan la aventura y ayudan a comprender distintos aspectos de la vida colonial.','TODOS LOS PERSONAJES')}<div class="character-collection">${['Julián','Eco','Kusi','Tomás','Amaru','Inés','Catalina'].map(secondaryCharacterCard).join('')}</div><p class="notice">Las ilustraciones se ajustaron para evitar recortes en pantallas pequeñas. Las fichas utilizan las nuevas ilustraciones proporcionadas para mantener la coherencia visual entre personajes.</p></div></div>`;

// Botón de pantalla completa del lector
async function toggleReaderFullscreen(){
  const el=document.getElementById('readerStage');
  if(!el) return;
  try{
    if(document.fullscreenElement){
      await document.exitFullscreen?.();
    }else{
      await el.requestFullscreen?.();
    }
  }catch(err){
    console.warn('No se pudo activar pantalla completa',err);
  }
}

document.addEventListener('click',e=>{
  const fs=e.target.closest('[data-reader-fullscreen]');
  if(fs){ toggleReaderFullscreen(); }
});

// Re-renderiza con las nuevas páginas si el usuario ya está dentro del sitio
route();
if(location.hash.startsWith('#actividades')) stateInit();
