const startButton = document.getElementById("start") as HTMLButtonElement | null;
const canvas = document.getElementById("visualizer") as HTMLCanvasElement | null;
const canvasContext = canvas?.getContext("2d") ?? null;

let audioContext: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let dataArray: Uint8Array<ArrayBuffer> | null = null;
let bufferLength = 0;
let isVisualizing = false;

if (startButton && canvas && canvasContext) {
  startButton.addEventListener("click", async () => {
    if (isVisualizing) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const AudioContextConstructor = window.AudioContext ?? window.webkitAudioContext;

    if (!AudioContextConstructor) {
      throw new Error("AudioContext is not supported in this browser.");
    }

    audioContext = new AudioContextConstructor();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    analyser.fftSize = 256;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    isVisualizing = true;
    drawVisualizer();
  });
}

function drawVisualizer(): void {
  if (!isVisualizing || !canvas || !canvasContext || !analyser || !dataArray) {
    return;
  }

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let index = 0; index < bufferLength; index += 1) {
    const barHeight = dataArray[index] / 2;

    canvasContext.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }

  requestAnimationFrame(drawVisualizer);
}
