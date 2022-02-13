document.addEventListener("DOMContentLoaded", function () {
  const pistaAudio = document.querySelector("#pistaAudio");
  const slideActivo = document.querySelector("#slide__nueve");

  window.addEventListener("scroll", function () {
    // Medicion de el ScrollTop - Posicion respecto al Top de la pagina
    let windowHeight =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // Posicion inicial despecto al TOP, donde se ejecutara solo el evento
    let inicioSlideActivo = slideActivo.offsetTop;
    // Posicion final despecto al TOP, donde se ejecutara solo el evento
    let finalSlideActivo = slideActivo.offsetTop + slideActivo.offsetHeight;

    // Si se encuentra dentro del espacio de eventos, haz play a la pista
    if (windowHeight >= inicioSlideActivo && windowHeight <= finalSlideActivo) {
      pistaAudio.play();
    }

    console.log(windowHeight, inicioSlideActivo, finalSlideActivo);
  });
});
