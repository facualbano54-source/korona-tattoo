// Formulario de contacto conectado a WhatsApp
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const texto =
      `Hola Korona, quiero hacer una consulta.\n\n` +
      `Nombre: ${nombre}\n` +
      `Correo: ${email}\n` +
      `Asunto: ${asunto}\n` +
      `Mensaje: ${mensaje}`;

    // Reemplazar por el número internacional correcto
    const telefono = "598099966388";

    const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    if (feedback) {
      feedback.textContent =
        "Se abrirá WhatsApp para que puedas enviar tu consulta.";
    }

    window.location.href = enlace;
  });
});

// Reproducción automática secuencial: un video por vez, sin repetir archivos.
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('videoShowcase');
  if (!el || !window.bootstrap) return;
  const carousel = bootstrap.Carousel.getOrCreateInstance(el, {interval:false,ride:false,wrap:true});
  const videos = Array.from(el.querySelectorAll('video'));
  let visible = false;
  function stopAll(){ videos.forEach(v => {v.pause();v.currentTime=0;}); }
  function playActive(){
    stopAll();
    if (!visible) return;
    const v=el.querySelector('.carousel-item.active video');
    if (!v) return;
    v.muted=true;
    const p=v.play();
    if (p && typeof p.catch==='function') p.catch(()=>{});
  }
  videos.forEach(v=>v.addEventListener('ended',()=>{
    if(v.closest('.carousel-item')?.classList.contains('active')) carousel.next();
  }));
  el.addEventListener('slide.bs.carousel',stopAll);
  el.addEventListener('slid.bs.carousel',playActive);
  const observer=new IntersectionObserver(entries=>{
    const wasVisible=visible;
    visible=entries[0].isIntersecting;
    if(visible && !wasVisible)playActive();
    else if(!visible)videos.forEach(v=>v.pause());
  },{threshold:0.2});
  observer.observe(el);
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) videos.forEach(v=>v.pause());
    else if(visible)playActive();
  });
});
