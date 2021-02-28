document.addEventListener("DOMContentLoaded", () => {
  const colection = document.querySelectorAll(".colection__item");

  for (const item of colection) {
    let detail = item.querySelector(".detail");
    item.addEventListener("mouseenter", function (event) {
      // console.log(event.target.clientHeight); //referencia a coleciton__item
      // console.log(event.target.clientWidth); //referencia a coleciton__item
      // console.log(this.clientHeight); //referencia a coleciton__item
      // console.log(this.clientWidth); //referencia a coleciton__item

      console.log("DETAIL", detail);

      console.log(item.clientHeight); //referencia a coleciton__item
      console.log(item.clientWidth); //referencia a coleciton__item

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
  }

  for (const item of colection) {
    let detail = item.querySelector(".detail");
    item.addEventListener("mouseleave", function (event) {
      // let detail = event.target.childNodes[3];
      // let detail = item.querySelector(".detail");
      let x = event.pageX - event.target.offsetLeft - detail.clientWidth / 2;
      let y = event.pageY - event.target.offsetTop - detail.clientHeight / 2;

      detail.style.setProperty("top", `${y}px`);
      detail.style.setProperty("left", `${x}px`);

      detail.classList.remove("detail--animated");
    });
  }
});
