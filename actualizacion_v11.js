/* V11: lectura continua, accesibilidad, contenidos pendientes y comentarios responsables.
   No modifica ilustraciones, identidad ni historia de autoría del usuario. */
(() => {
  'use strict';
  let lecturaContinua = false;
  let lectorZoom = false;
  const lecturaOriginal = pages.lectura;
  const bibliotecaOriginal = pages.volumenes;
  const actividadesOriginal = pages.actividades;
  const historiaOriginal = pages.historia;
  const storage = {
    get(key){try{return localStorage.getItem(key)}catch{return null}},
    set(key,val){try{localStorage.setItem(key,String(val))}catch{}}
  };

  // Control real del modo de lectura: ambas variantes usan exactamente las láminas subidas.
  pages.lectura = () => {
    let html = lecturaOriginal();
    const selector = `<div class="v11-reading-mode" role="group" aria-label="Modo de lectura"><span>Modo de lectura</span><button type="button" class="btn btn-small ${lecturaContinua?'btn-navy':'btn-gold'}" data-v11-mode="paginas" aria-pressed="${!lecturaContinua}">Por página</button><button type="button" class="btn btn-small ${lecturaContinua?'btn-gold':'btn-navy'}" data-v11-mode="continua" aria-pressed="${lecturaContinua}">Continua ↓</button></div>`;
    html=html.replace('<div class="ecos-reader-grid">',selector+'<div class="ecos-reader-grid">');
    if(lecturaContinua){
      const pageCards=comicPages.map((page,i)=>`<figure class="v11-long-page" id="lamina-${i}"><img src="assets/comic_${String(i).padStart(2,'0')}.webp" loading="${i<2?'eager':'lazy'}" alt="${safe(page[0])}: ${safe(page[1])}" draggable="false"><figcaption>${i===0?'Portada':'Lámina '+i} · ${safe(page[1])}</figcaption></figure>`).join('');
      html=html.replace(/<div class="ecos-reader-img" id="readerStage"[\s\S]*?<\/div><div class="ecos-reader-controls">/,`<div class="v11-long-reader" id="readerStage" tabindex="0" aria-label="Lectura continua de las láminas">${pageCards}</div><div class="ecos-reader-controls">`);
      // Los botones de página no son útiles si está todo el episodio visible.
      html=html.replace('Desliza lateralmente para cambiar de página en celular o usa ← y → en computadora.','Desplázate verticalmente para leer las láminas en orden.');
      html=html.replace('<div class="ecos-reader-controls">','<div class="ecos-reader-controls">');
      html=html.replace(/<a class="btn ([^"]+) btn-small" href="#lectura\/(\d+)">([^<]*)<\/a>/g,(match,kind,index,label)=>{
        if(label.includes('Primera página'))return `<a class="btn ${kind} btn-small" href="#lamina-0">⌂ Primera página</a>`;
        return `<a class="btn ${kind} btn-small" href="#lamina-${index}">${label}</a>`;
      });
    } else {
      html=html.replace('<div class="ecos-reader-img" id="readerStage" tabindex="0">',`<div class="ecos-reader-img v11-zoomable ${lectorZoom?'v11-zoomed':''}" id="readerStage" tabindex="0" aria-label="Lámina del cómic, pulsa ampliar para ver detalles">`);
      html=html.replace('<div class="ecos-reader-controls">','<div class="ecos-reader-controls"><button class="btn btn-navy btn-small" type="button" data-v11-zoom aria-pressed="'+lectorZoom+'">'+(lectorZoom?'− Reducir imagen':'+ Ampliar imagen')+'</button>');
    }
    html=html.replace('<div class="ecos-reading-heading">','<div class="ecos-reading-heading">');
    return html;
  };

  pages.volumenes = () => bibliotecaOriginal().replace('Los siguientes se añadirán cuando estén ilustrados, sin inventar páginas.','Los capítulos restantes se publicarán después de recibir y revisar sus ilustraciones.');
  pages.historia = () => {
    let html=historiaOriginal();
    // No mostrar que el texto está pendiente cuando se incorpore contenido real.
    if(Array.isArray(window.ECOS_HISTORIA_NARRADA) && window.ECOS_HISTORIA_NARRADA.length){
      html=html.replace('Todavía no se ha incorporado el texto porque no ha sido entregado.','Lee los capítulos narrados disponibles a continuación.');
    }
    return html;
  };

  // Los cuatro juegos existentes y Memoria quedan juntos en el seguimiento de progreso.
  pages.actividades = () => {
    let html=actividadesOriginal();
    const r=location.hash.split('/');
    if(r[1])return html;
    const facile=storage.get('ecos-memory-facil');
    const difficile=storage.get('ecos-memory-dificil');
    const status=`<section class="v11-memory-status parchment" aria-label="Avance de memoria visual"><h3>Memoria visual · progreso</h3><p>Fácil: ${facile===null?'Sin completar':safe(facile)+' de 5 aciertos'} · Difícil: ${difficile===null?'Sin completar':safe(difficile)+' de 5 aciertos'}. Los resultados se guardan solo en este dispositivo.</p></section>`;
    return html.replace('<section class="v8-extra-activity">',status+'<section class="v8-extra-activity">');
  };

  function updateViewerControls(){
    const controls=document.querySelector('.ecos-reader-controls');
    if(!controls)return;
    controls.querySelectorAll('a[href^="#lectura/"]').forEach(a=>{a.classList.toggle('v11-not-needed',lecturaContinua && !a.textContent.includes('Primera'))});
  }

  function enhanceComments(){
    const target=document.querySelector('.ecos-public-comments');
    if(!target)return;
    const conf=window.ECOS_COMENTARIOS||{};
    const ready=Boolean(conf.repo&&conf.repoId&&conf.categoryId);
    const warning=`<p class="v11-privacy-note">Los comentarios públicos utilizan GitHub. No compartas apellidos completos, teléfonos, direcciones ni otros datos personales. El responsable del repositorio debe revisar y moderar las publicaciones.</p>`;
    if(!target.querySelector('.v11-privacy-note'))target.insertAdjacentHTML('beforeend',warning);
    if(!ready){
      const title=target.querySelector('strong');if(title)title.textContent='Comentarios todavía pendientes de activación';
    }
  }

  function enhanceCurrentView(){
    if(location.hash.startsWith('#lectura')){
      updateViewerControls();enhanceComments();
      if(lecturaContinua){
        // El índice lleva a la lámina correspondiente en vez de cambiar el modo y perder el contexto.
        document.querySelectorAll('.ecos-side-pages a, .ecos-thumbs a').forEach(a=>{const i=Number(a.getAttribute('href')?.split('/')[1]);if(Number.isInteger(i))a.href='#lamina-'+i});
      }
    }
  }
  document.addEventListener('click',e=>{
    const mode=e.target.closest('[data-v11-mode]');
    if(mode){
      const next=mode.dataset.v11Mode==='continua';if(next!==lecturaContinua){lecturaContinua=next;lectorZoom=false;route();window.scrollTo({top:Math.max(0,(document.querySelector('.v11-reading-mode')?.getBoundingClientRect().top||0)+window.scrollY-110),behavior:'instant'});enhanceCurrentView();}
      return;
    }
    const zoom=e.target.closest('[data-v11-zoom]');
    if(zoom){lectorZoom=!lectorZoom;document.getElementById('readerStage')?.classList.toggle('v11-zoomed',lectorZoom);zoom.setAttribute('aria-pressed',String(lectorZoom));zoom.textContent=lectorZoom?'− Reducir imagen':'+ Ampliar imagen';return}
    const jump=e.target.closest('a[href^="#lamina-"]');
    if(jump){e.preventDefault();const id=jump.getAttribute('href').substring(1);document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  });
  document.addEventListener('dblclick',e=>{
    if(!lecturaContinua && e.target.closest('.v11-zoomable img')){
      lectorZoom=!lectorZoom;document.getElementById('readerStage')?.classList.toggle('v11-zoomed',lectorZoom);
      const b=document.querySelector('[data-v11-zoom]');if(b){b.textContent=lectorZoom?'− Reducir imagen':'+ Ampliar imagen';b.setAttribute('aria-pressed',String(lectorZoom));}
    }
  });
  // Los eventos nativos de esta aplicación terminan antes de este callback.
  window.addEventListener('hashchange',()=>setTimeout(enhanceCurrentView,0));
  enhanceCurrentView();
})();
