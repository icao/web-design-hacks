var x = e.pageX - $(this).offset().left - ink.width() / 2;
var y = e.pageY - $(this).offset().top - ink.height() / 2;

ink.css({ top: y + "px", left: x + "px" }).addClass("ink-animate");

$(".cursor-follower").addClass("hide");

function mouse(e) {
  var ink = $(this).find(".ink");
  var x = e.pageX - $(this).offset().left - ink.width() / 2;
  var y = e.pageY - $(this).offset().top - ink.height() / 2;
  ink.css({ top: y + "px", left: x + "px" }).removeClass("ink-animate");
  $(".cursor-follower").removeClass("hide");
}
