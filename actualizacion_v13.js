/* V13: narración proporcionada, índice accesible y aclaraciones de imágenes. */
(() => {
  'use strict';
  const baseStory = pages.historia;
  pages.historia = () => {
    let html = baseStory();
    const chapters = Array.isArray(window.ECOS_HISTORIA_NARRADA) ? window.ECOS_HISTORIA_NARRADA : [];
    if (!chapters.length) return html;
    const toc = `<nav class="v13-story-toc" aria-label="Índice de la historia narrada"><h3>Índice de la historia</h3><div class="v13-story-toc-list">${chapters.map((chapter,i) => `<a href="#relato-${i}">${safe(chapter.titulo)}</a>`).join('')}</div></nav>`;
    let i = 0;
    html = html.replace(/<article class="ecos-story-chapter">/g,() => `<article class="ecos-story-chapter" id="relato-${i++}">`);
    html = html.replace('<article class="ecos-story-chapter"',toc+'<article class="ecos-story-chapter"');
    html = html.replace('<div class="ecos-story-actions">','<aside class="v13-story-note"><strong>Historia y ficción:</strong> Los viajes temporales, el medallón y El Eco pertenecen a la narración fantástica. La nota histórica distingue estos elementos de los procesos documentados. El capítulo VII y el epílogo están disponibles en texto; faltan sus ilustraciones.</aside><div class="ecos-story-actions">');
    return html;
  };
  const baseLibrary = pages.volumenes;
  pages.volumenes = () => baseLibrary().replace('<div class="ecos-library-title">','<div class="v13-reading-notice"><strong>26 láminas disponibles:</strong> portada y 25 imágenes recibidas. Las cinco láminas nuevas corresponden al episodio de Catalina. Algunos números impresos en las imágenes anteriores se repiten; la numeración del lector es consecutiva.</div><div class="ecos-library-title">');
  const baseReader = pages.lectura;
  pages.lectura = () => baseReader().replace('<div class="ecos-reading-nav">','<div class="v13-reading-notice">Lectura ilustrada disponible hasta el episodio de Catalina. Algunos números impresos en las imágenes anteriores se repiten. Usa «Página siguiente» o el modo de lectura continua para avanzar.</div><div class="ecos-reading-nav">');
  document.addEventListener('click',event => {
    const link=event.target.closest('a[href^="#relato-"]');
    if(!link) return;
    const target=document.getElementById(link.hash.substring(1));
    if(target){event.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
  });
  if (typeof route==='function') route();
})();
