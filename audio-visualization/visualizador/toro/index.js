const contenedor = document.querySelector("#container");
const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canvasCtx = canvas.getContext("2d");
const archivoAudio = document.querySelector("#fileUpload");
let fuenteAudio;
let analizador;

archivoAudio.addEventListener("change", function () {
  const audioContext = new AudioContext();
  console.log(this.files);
  const archivosAudio = this.files;
  const pistaAudio = document.querySelector("#audioControl");
  pistaAudio.src = URL.createObjectURL(archivosAudio[0]);
  pistaAudio.load();
  pistaAudio.play();

  /** Configuracion de audio */
  fuenteAudio = audioContext.createMediaElementSource(pistaAudio);
  analizador = audioContext.createAnalyser();
  fuenteAudio.connect(analizador);
  analizador.connect(audioContext.destination);
  analizador.fftSize = 1024; //  32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768

  const longitudBuffer = analizador.frequencyBinCount;
  console.log(longitudBuffer);
  const datosArray = new Uint8Array(longitudBuffer);

  /** Configuracion visualizacion de las barras */
  // const anchoBarra = canvas.width / longitudBuffer;
  const anchoBarra = 17;
  let altoBarra;
  let coordenadaX;

  function dibujar() {
    coordenadaX = 0;
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    analizador.getByteFrequencyData(datosArray);
    dibujarVisualizador(
      longitudBuffer,
      coordenadaX,
      altoBarra,
      anchoBarra,
      datosArray
    );

    requestAnimationFrame(dibujar);
  }

  dibujar();
});

function dibujarVisualizador(
  longitudBuffer,
  coordenadaX,
  altoBarra,
  anchoBarra,
  datosArray
) {
  for (let i = 0; i < longitudBuffer; i++) {
    altoBarra = datosArray[i] * 1.5; //asiga el tamanio de bits como altura
    canvasCtx.save();
    canvasCtx.translate(canvas.width / 2, canvas.height / 2);
    canvasCtx.rotate((i * (Math.PI * 10)) / longitudBuffer);

    const hue = i * 0.4;
    canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    canvasCtx.fillRect(0, 0, anchoBarra, altoBarra);
    coordenadaX += anchoBarra;
    canvasCtx.restore();
  }
}
