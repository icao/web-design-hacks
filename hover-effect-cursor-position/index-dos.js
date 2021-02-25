document.addEventListener("DOMContentLoaded", () => {
  const colection = document.querySelectorAll(".colection__item");
  // let diameter = null; // TODO: se tiene que inicializar con una medida

  // window.addEventListener("resize", () => {
  //   const colectionItem = document.querySelector(".colection__item");
  //   // TODO: aplicarselo a todos los nodos hijos, ver otra posible solucion al aplicarselo directamente al span
  //   let maximumMeasure = Math.max(
  //     colectionItem.offsetWidth,
  //     colectionItem.offsetHeight
  //   );
  //   diameter = maximumMeasure;
  // });

  // console.warn("MAXIMO DIAMETRO", diameter);

  for (const item of colection) {
    item.addEventListener("mouseenter", function (event) {
      let detail = event.target.childNodes[3];
      // console.log(event.target.clientHeight); //referencia a coleciton__item
      // console.log(event.target.clientWidth); //referencia a coleciton__item
      // console.log(this.clientHeight); //referencia a coleciton__item
      // console.log(this.clientWidth); //referencia a coleciton__item

      console.log(item.clientHeight); //referencia a coleciton__item
      console.log(item.clientWidth); //referencia a coleciton__item
      // if (!ink.height() && !ink.width()) {
      //   var d = Math.max($(this).outerWidth(), $(this).outerHeight());
      //   ink.css({ height: d, width: d });
      // }

      if (!detail.clientWidth && !detail.clientHeight) {
        console.warn("NO TENGO MEDIDAS");
        let maximumMeasure = Math.max(item.clientWidth, item.clientHeight);
        // console.log(detail.offsetHeight, detail.offsetWidth);
        detail.setAttribute(
          "style",
          `width: ${maximumMeasure}px; height: ${maximumMeasure}px; `
        );
      }

      let x = event.pageX - event.target.offsetLeft - detail.clientWidth / 2;
      let y = event.pageY - event.target.offsetTop - detail.clientHeight / 2;

      // detail.setAttribute("style", `top: ${y}px; left: ${x}px; `);
      detail.style.setProperty("top", `${y}px`);
      detail.style.setProperty("left", `${x}px`);

      // TODO: calcular la medida mas grande entre el ancho y el alto, siempre, tener un listener que este capturando la medida y actualizar el ancho y alto del span con dicha medida, podemos poner una variable en css (en clase .detail, variable dinamica)para irla modificando, seria lo mas conveniente si no queremos sobreescribir los edtilos enviados con el ssetattribute.
      // TODO: es importante dejar las medidas dinamicas del span hover para si se quiere aplicar en un grid tipo mansory y adecuarse al diametro de cualquier elemento.  Procurar que siempre sea recalculado la dimension, es importante si se hace un resize del viewport

      detail.classList.add("detail--animated");
    });
  }

  for (const item of colection) {
    item.addEventListener("mouseleave", function (event) {
      let detail = event.target.childNodes[3];
      let x = event.pageX - event.target.offsetLeft - detail.clientWidth / 2;
      let y = event.pageY - event.target.offsetTop - detail.clientHeight / 2;

      // detail.setAttribute("style", `top: ${y}px; left: ${x}px;`);
      detail.style.setProperty("top", `${y}px`);
      detail.style.setProperty("left", `${x}px`);

      detail.classList.remove("detail--animated");
    });
  }
});

// $(".hover-animated .circle").on({

//   mouseenter: function (e) {

//     if ($(this).find(".ink").length === 0) {
//       $(this).prepend("<span class='ink'></span>");
//     }

//     var ink = $(this).find(".ink");

//     ink.removeClass("animate");

//     if (!ink.height() && !ink.width()) {
//       var d = Math.max($(this).outerWidth(), $(this).outerHeight());
//       ink.css({ height: d, width: d });
//     }

//     var x = e.pageX - $(this).offset().left - ink.width() / 2;
//     var y = e.pageY - $(this).offset().top - ink.height() / 2;
//     ink.css({ top: y + "px", left: x + "px" }).addClass("ink-animate");
//     $(".cursor-follower").addClass("hide");
//   },

//   mouseleave: function (e) {
//     var ink = $(this).find(".ink");
//     var x = e.pageX - $(this).offset().left - ink.width() / 2;
//     var y = e.pageY - $(this).offset().top - ink.height() / 2;
//     ink.css({ top: y + "px", left: x + "px" }).removeClass("ink-animate");
//     $(".cursor-follower").removeClass("hide");
//   },
// });
