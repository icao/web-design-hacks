const contenedor = document.querySelector("#container");
const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasCtx = canvas.getContext("2d");

let fuenteAudio;
let analizador;

contenedor.addEventListener("click", () => {
  const pistaAudio = document.querySelector("#audioControl");

  pistaAudio.src = "01 - Formula 1 Theme.flac";
  pistaAudio.src = "01 Lighter Than Air.flac";
  pistaAudio.src = "01 La Résistance De L'Amour.flac";

  const audioContext = new AudioContext();
  pistaAudio.play();
  /** Configuracion de audio */
  fuenteAudio = audioContext.createMediaElementSource(pistaAudio);
  analizador = audioContext.createAnalyser();
  fuenteAudio.connect(analizador);
  analizador.connect(audioContext.destination);
  analizador.fftSize = 256; // frecuencias default 2048. Pueden ser 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768. Entre mas alto mas barras en el canvas

  const longitudBuffer = analizador.frequencyBinCount; // cantidad de datos que tenremos en las barras, es siempre la mitad del tamanio del ffSize
  console.log(longitudBuffer);
  const datosArray = new Uint8Array(longitudBuffer); // personalizo los datos que vienen del longitudBuffer, convierto esa longitud en un tipo de datos especial llamada Uint8Array. Basicamente es una matriz nueva formateada en el tipo de dato que quiero.

  /** Configuracion visualizacion de las barras */
  const anchoBarra = canvas.width / longitudBuffer; //el ancho de una barra, del 100% de la ventana entre la longitud del buffer que es el numero de barras que vizualizaremos.
  let altoBarra; // tamanio del alto de la barra
  let coordenadaX; // coordenada en el eje x del lienzo canvas

  function dibujar() {
    coordenadaX = 0;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height); //Borramos las barrras del canvas
    analizador.getByteFrequencyData(datosArray); // asignanos los datos del array formateado que ocntiene los bits de cada barra

    for (let i = 0; i < longitudBuffer; i++) {
      altoBarra = datosArray[i]; //asiga el tamanio de bits como altura
      canvasCtx.fillStyle = "#f36";
      canvasCtx.fillRect(
        coordenadaX,
        canvas.height - altoBarra,
        anchoBarra,
        altoBarra
      );
      coordenadaX += anchoBarra;
    }

    requestAnimationFrame(dibujar);
  }

  dibujar();
});

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
