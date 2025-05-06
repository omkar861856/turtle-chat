import { useRef, useEffect, MutableRefObject } from "react";

// Types for analyzer data prop
interface AnalyzerData {
  dataArray: Uint8Array;
  analyzer: AnalyserNode;
  bufferLength: number;
}

// Function to animate the bars
function animateBars(
  analyzer: AnalyserNode,
  canvas: HTMLCanvasElement,
  canvasCtx: CanvasRenderingContext2D,
  dataArray: Uint8Array,
  bufferLength: number
) {
  analyzer.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = '#000';
  const HEIGHT = canvas.height / 2;
  const barWidth = Math.ceil(canvas.width / bufferLength) * 2.5;

  let barHeight: number;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    barHeight = (dataArray[i] / 255) * HEIGHT;

    const maximum = 10;
    const minimum = -10;
    const r = 242 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const g = 104 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const b = 65 + Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
    canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }
}

// Component to render the waveform
const WaveForm = ({ analyzerData }: { analyzerData: AnalyzerData }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { dataArray, analyzer, bufferLength } = analyzerData;

  const draw = (
    dataArray: Uint8Array,
    analyzer: AnalyserNode,
    bufferLength: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const animate = () => {
      requestAnimationFrame(animate);
      canvas.width = canvas.width; // clear canvas
      animateBars(analyzer, canvas, canvasCtx, dataArray, bufferLength);
    };

    animate();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
  }, [dataArray, analyzer, bufferLength]);

  return (
    <canvas
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: "-10"
      }}
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default WaveForm;