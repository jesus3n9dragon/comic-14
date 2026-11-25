/* V10: correcciones puntuales solicitadas, sin reemplazar identidad ni portada. */
(() => {
  const inicioBaseV9 = pages.inicio;
  pages.inicio = () => {
    const base = inicioBaseV9();
    const from = base.indexOf('<div class="page-wrap">');
    const band = base.indexOf('<section class="section-band">', from);
    if(from < 0 || band < 0) return base;
    const replacement = `<section class="ecos-v10-process" aria-labelledby="ecos-process-title"><div class="ecos-v10-process-inner"><div class="ecos-v10-process-title"><span class="eyebrow">DE LA INVESTIGACIÓN A LA AVENTURA</span><h2 id="ecos-process-title">Una historia construida desde Potosí</h2><p>Conoce cómo se relacionan la historia, las ilustraciones y la experiencia digital que dan vida a este proyecto.</p></div><div class="ecos-v10-steps"><article><span class="ecos-v10-number">01</span><h3>Memoria histórica</h3><p>El Cerro Rico, la Villa Imperial y las experiencias de sus habitantes son la base del relato.</p></article><article><span class="ecos-v10-number">02</span><h3>Narrativa ilustrada</h3><p>Mateo, Lucía y Julián conectan el presente con acontecimientos de Potosí colonial.</p></article><article><span class="ecos-v10-number">03</span><h3>Aprendizaje activo</h3><p>La lectura se complementa con actividades que invitan a reflexionar sobre lo descubierto.</p></article></div></div></section>`;
    const final = `<section class="ecos-v10-banner"><div><span class="eyebrow">PROYECTO DE DISEÑO GRÁFICO</span><p>Una propuesta visual para acercar la memoria histórica de Potosí a estudiantes de secundaria.</p></div><span class="ecos-v10-banner-symbol" aria-hidden="true">✦</span></section>`;
    return base.slice(0,from) + replacement + final;
  };

  const originalMemoryPage = pages.memoria;
  pages.memoria = () => originalMemoryPage().replace('Observa las escenas del cómic y responde.','Responde primero y descubre después la escena que explica la respuesta.');

  // No mostrar imágenes que revelen la respuesta antes de comprobarla.
  v8RenderMemory = function() {
    const root=document.getElementById('memoryRoot');if(!root)return;
    const s=memoryState, bank=memoryQuestions[s.level];
    if(s.index>=bank.length){
      try{localStorage.setItem('ecos-memory-'+s.level,String(s.score))}catch{}
      root.innerHTML=`<div class="v8-finished"><div class="v8-finish-symbol">✦</div><h2>¡Reto completado!</h2><p>Acertaste <strong>${s.score} de ${bank.length}</strong> preguntas.</p><p>Repasar las respuestas te ayudará a reconocer los detalles históricos de las escenas.</p><div class="difficulty-actions"><button class="btn btn-gold" data-memory-restart>Jugar otra vez</button><a class="btn btn-navy" href="#actividades">Otras actividades</a></div></div>`;
      return;
    }
    const [question,opts,correct,explain,img]=bank[s.index];
    const success=s.pick===correct;
    // Escena solo tras la evaluación, con retroalimentación clara en ambos casos.
    const scene=s.checked?`<figure class="ecos-v10-scene"><img src="assets/comic_${String(img).padStart(2,'0')}.webp" alt="Viñeta del cómic vinculada con la respuesta explicada" loading="lazy"><figcaption>Escena original del cómic relacionada con esta respuesta.</figcaption></figure>`:'';
    root.innerHTML=`<div class="ecos-v10-memory ${s.checked?'is-reviewed':'is-asking'}"><div class="ecos-v10-question"><span class="eyebrow">${s.level==='facil'?'NIVEL FÁCIL':'NIVEL DIFÍCIL'} · PREGUNTA ${s.index+1} DE ${bank.length}</span><div class="progress-track"><span style="width:${s.index/bank.length*100}%"></span></div><h2>${question}</h2><p class="ecos-v10-no-spoiler">${s.checked?'Aquí está la explicación de la escena.':'La imagen aparecerá después de comprobar tu respuesta.'}</p><div class="v8-answer-list">${opts.map((o,i)=>`<button type="button" class="answer ${s.pick===i?'selected':''} ${s.checked&&i===correct?'ecos-correct':''}" data-memory-choice="${i}" ${s.checked?'disabled':''}>${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div>${s.checked?`<div class="feedback ${success?'':'bad'}" role="status"><strong>${success?'¡Correcto!':'No es la respuesta correcta.'}</strong><p>${success?'':`La respuesta correcta es «${opts[correct]}». `}${explain}</p></div>`:''}<button class="btn btn-gold" type="button" data-memory-next ${s.pick===null?'disabled':''}>${s.checked?(s.index+1===bank.length?'Ver resultado':'Siguiente pregunta →'):'Comprobar respuesta'}</button></div>${scene}</div>`;
  };

  // Garantiza que el diseño de preguntas se actualice al navegar al reto.
  window.addEventListener('hashchange',()=>{
    if(location.hash.startsWith('#memoria'))queueMicrotask(()=>{if(document.getElementById('memoryRoot'))v8RenderMemory()});
  });
  route();
  if(location.hash.startsWith('#memoria'))v8RenderMemory();
})();
