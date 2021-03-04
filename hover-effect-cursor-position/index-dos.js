document.addEventListener("DOMContentLoaded", () => {
  const colection = document.querySelectorAll(".colection__item");

  for (const item of colection) {
    let detail = item.querySelector(".detail");

    item.addEventListener("mouseenter", function (event) {
      if (!detail.clientWidth && !detail.clientHeight) {
        let maximumMeasure = Math.max(item.clientWidth, item.clientHeight);
        detail.setAttribute(
          "style",
          `width: ${maximumMeasure}px; height: ${maximumMeasure}px; `
        );
      }

      let x = event.pageX - event.target.offsetLeft - detail.clientWidth / 2;
      let y = event.pageY - event.target.offsetTop - detail.clientHeight / 2;

      detail.style.setProperty("top", `${y}px`);
      detail.style.setProperty("left", `${x}px`);

      detail.classList.add("detail--animated");
    });

    item.addEventListener("mouseleave", function (event) {
      let x = event.pageX - event.target.offsetLeft - detail.clientWidth / 2;
      let y = event.pageY - event.target.offsetTop - detail.clientHeight / 2;

      detail.style.setProperty("top", `${y}px`);
      detail.style.setProperty("left", `${x}px`);

      detail.classList.remove("detail--animated");
    });
  }
});
