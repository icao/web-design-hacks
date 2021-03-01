document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".grid__item");

  for (const item of elements) {
    item.addEventListener("mouseenter", function (event) {
      let maximumMeasure = Math.max(item.clientWidth, item.clientHeight);
      item.setAttribute("style", `--diameter: ${maximumMeasure}px;`);

      let x = event.layerY - maximumMeasure / 2;
      let y = event.layerX - maximumMeasure / 2;

      item.style.setProperty("--position-top-before", `${x}px`);
      item.style.setProperty("--position-left-before", `${y}px`);
    });

    item.addEventListener("mouseleave", function (event) {
      let x = event.layerY - maximumMeasure / 2;
      let y = event.layerX - maximumMeasure / 2;

      item.style.setProperty("--position-top-before", `${x}px`);
      item.style.setProperty("--position-left-before", `${y}px`);
    });
  }
});
