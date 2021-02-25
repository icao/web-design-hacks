document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".grid__item");

  for (const item of elements) {
    // console.log("PROIPS: ", item);
    // console.log("WIDTH: ", item.clientWidth);
    // console.log("WIDTH: ", item.clientHeight);
    item.addEventListener("mousemove", function (event) {
      // console.log("EJE X: ", event.layerX);
      // console.log("EJE Y: ", event.layerY);

      let x = event.layerY;
      let y = event.layerX;

      item.style.setProperty("--top-before", `${x - 100}px`);
      item.style.setProperty("--left-before", `${y - 100}px`);
    });

    item.addEventListener("mouseLeave", function (event) {
      console.log("ESTOY FUERA DEL TERRITORIO");
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
