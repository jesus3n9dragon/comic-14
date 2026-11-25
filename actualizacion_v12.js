/* V12: integra la quinta actividad con Julián sin rehacer la identidad gráfica. */
(() => {
 const base=pages.actividades;
 pages.actividades=()=>{
  let html=base();
  if(location.hash.slice(1).split('/')[1])return html;
  // El reto de memoria ya existe en V8; su imagen de ejemplo sigue sin aparecer en las preguntas.
  html=html.replace('4 ACTIVIDADES · 2 NIVELES','5 ACTIVIDADES · 2 NIVELES');
  html=html.replace(/Cuatro aventuras educativas/g,'Cinco aventuras educativas');
  html=html.replace(/ de 8 niveles completados/g,' de 10 niveles completados');
  html=html.replace('Un reto adicional basado en las viñetas reales del cómic: reconoce escenas, objetos y personajes.', 'Julián te invita a recordar escenas, objetos y personajes del cómic.');
  html=html.replace('<img src="assets/comic_07.webp" loading="lazy" alt="Escena del descubrimiento de la plata en el cómic">','<img class="v12-julian-image" src="assets/julian_cutout.png" loading="lazy" alt="Julián, guía de Memoria del Cerro Rico">');
  return html;
 };
 // Inicializar la pregunta al abrir directamente un enlace a Memoria.
 route();
 if(location.hash.startsWith('#memoria'))v8InitMemory();
})();
