const startButton = document.getElementById('start');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

let audioContext;
let analyser;
let dataArray;
let bufferLength;
let isVisualizing = false;

// Start microphone and visualization
startButton.addEventListener('click', async () => {
  if (isVisualizing) return;

  // Request access to the microphone
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  // Set up the audio context and analyser
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);

  // Configure the analyser
  analyser.fftSize = 256;
  bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  // Start visualization
  isVisualizing = true;
  drawVisualizer();
});

// Draw the visualizer
function drawVisualizer() {
  if (!isVisualizing) return;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Get the frequency data
  analyser.getByteFrequencyData(dataArray);

  // Draw the bars
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i] / 2;

    // Set the color and draw the bar
    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }

  // Request the next frame
  requestAnimationFrame(drawVisualizer);
}