document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".grid__item");

  for (const item of elements) {
    let maximumMeasure = Math.max(item.clientWidth, item.clientHeight);
    item.addEventListener("mouseenter", function (event) {
      item.setAttribute("style", `--diameter: ${maximumMeasure}px;`);

      let x = event.pageX - event.target.offsetLeft - maximumMeasure / 2;
      let y = event.pageY - event.target.offsetTop - maximumMeasure / 2;

      item.style.setProperty("--position-top-before", `${y}px`);
      item.style.setProperty("--position-left-before", `${x}px`);
    });

    item.addEventListener("mouseleave", function (event) {
      let x = event.pageX - event.target.offsetLeft - maximumMeasure / 2;
      let y = event.pageY - event.target.offsetTop - maximumMeasure / 2;
      console.log({ x }, { y });
      console.log(
        event.layerX - maximumMeasure / 2,
        event.layerY - maximumMeasure / 2
      );
      item.style.setProperty("--position-top-before", `${y}px`);
      item.style.setProperty("--position-left-before", `${x}px`);
    });
  }
});

//IMPORTANT: Se detecto que en firefox: 'event.layerY'  y 'event.layerX' no sirven, estan deprecados.
//NOTA: La mejor solucion es hacer la diferencia de 'event.pageX - event.target.offsetLeft' y 'event.pageY - event.target.offsetTop', para calcular las distancias respectivamente.
