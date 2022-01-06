var element = document.getElementById("main");
//var svg = document.getElementById("Capa_1");
var chars = '0123456789ABCDEF'.split('');

var randomColor = function(){
   var color = '#';

   for(var i = 0; i < 6; i++)
      color += chars[Math.floor(Math.random() * 16)];
   return color;
};

setInterval(function(){
   element.style.background = randomColor();
   //svg.style.background = randomColor();
}, 4000); 