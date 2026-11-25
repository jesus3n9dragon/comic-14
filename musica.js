// Música ambiental persistente: el reproductor vive fuera del contenido que cambia al navegar.
(() => {
  const audio = document.getElementById('ambience');
  const toggle = document.getElementById('musicControl');
  const label = document.getElementById('musicControlText');
  if (!audio || !toggle) return;
  audio.volume = 0.18;
  audio.loop = true;
  let enabled = false;
  try { enabled = localStorage.getItem('ecosMusicEnabled') !== 'false'; } catch (_) {}

  function sync() {
    const playing = !audio.paused;
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar música ambiental' : 'Activar música ambiental');
    toggle.title = playing ? 'Pausar música ambiental' : 'Activar música ambiental';
    if (label) label.textContent = playing ? 'Música activada' : 'Música apagada';
    toggle.querySelector('[aria-hidden="true"]')?.replaceChildren(document.createTextNode(playing ? '♫' : '♪'));
  }

  async function start() {
    enabled = true;
    try { localStorage.setItem('ecosMusicEnabled', 'true'); } catch (_) {}
    try { await audio.play(); } catch (_) { enabled = false; sync(); }
    sync();
  }
  function stop() {
    enabled = false;
    audio.pause();
    try { localStorage.setItem('ecosMusicEnabled', 'false'); } catch (_) {}
    sync();
  }
  toggle.addEventListener('click', () => audio.paused ? start() : stop());
  audio.addEventListener('play', sync);
  audio.addEventListener('pause', sync);
  audio.addEventListener('ended', () => { if (enabled) audio.play().catch(() => {}); });

  // Si la persona ya había activado la música, se intenta reanudar al volver a abrir el sitio.
  // Los navegadores móviles pueden exigir un primer toque por sus políticas de reproducción.
  if (enabled) {
    const resume = () => {
      if (!enabled || !audio.paused) return;
      audio.play().then(sync).catch(sync);
    };
    const firstTouch = (event) => { if (event.target.closest?.('#musicControl')) return; resume(); };
    document.addEventListener('pointerdown', firstTouch);
    document.addEventListener('keydown', resume);
    // Intentar reproducción automática sin interacción: algunos navegadores la bloquean.
    audio.play().then(sync).catch(sync);
  }
  sync();
})();
