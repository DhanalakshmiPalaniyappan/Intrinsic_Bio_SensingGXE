import { useEffect, useRef } from "react";

interface Props {
  currentMv?: number;
  height?: number;
  color?: string;
  speed?: number;
  hertz?: number;
  amplitude?: number;
  showGrid?: boolean;
}

export default function WaveformCanvas({
  height = 90,
  color = "#27E6B0",
  speed = 1.8,
  hertz = 250,
  amplitude = 16,
  showGrid = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offsetRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high DPI crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const parentWidth = canvas.parentElement?.clientWidth || 300;
    
    canvas.width = parentWidth * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        const w = canvas.parentElement.clientWidth;
        canvas.width = w * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      const displayWidth = canvas.parentElement?.clientWidth || 300;
      const displayHeight = height;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Grid lines
      if (showGrid) {
        ctx.strokeStyle = "rgba(25, 56, 43, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let y = 15; y < displayHeight; y += 20) {
          ctx.moveTo(0, y);
          ctx.lineTo(displayWidth, y);
        }
        ctx.stroke();
      }

      // Calculate speed and frequency according to Hertz (baseline 250 Hz = 1.0x)
      const hertzRatio = hertz / 250;
      const effectiveSpeed = speed * hertzRatio;
      const baseFreq = 0.032;

      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;

      const points: { x: number; y: number }[] = [];
      const midY = displayHeight / 2;
      const step = 3;
      const effAmp = Math.min(amplitude, Math.max(6, midY - 8));

      for (let x = 0; x <= displayWidth; x += step) {
        const t = (x + offsetRef.current) * baseFreq;
        const wave1 = Math.sin(t) * effAmp;
        const wave2 = Math.sin(t * 2.6) * (effAmp * 0.35);
        const wave3 = Math.cos(t * 0.5) * (effAmp * 0.2);
        const spike = Math.pow(Math.abs(Math.sin(t * 0.7)), 10) * (effAmp * 0.4);

        let y = midY + wave1 + wave2 + wave3 - spike;
        y = Math.max(4, Math.min(displayHeight - 4, y));
        points.push({ x, y });

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Underneath gradient fill
      ctx.lineTo(displayWidth, displayHeight);
      ctx.lineTo(0, displayHeight);
      ctx.closePath();
      
      const grad = ctx.createLinearGradient(0, 0, 0, displayHeight);
      grad.addColorStop(0, `${color}33`); // 20% opacity hex
      grad.addColorStop(1, `${color}00`); // 0% opacity hex
      ctx.fillStyle = grad;
      ctx.fill();

      // Leading glowing dot at tip of waveform
      if (points.length > 0) {
        const lastPt = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPt.x - 2, lastPt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = color;
        ctx.shadowBlur = 14;
        ctx.fill();
      }

      offsetRef.current += effectiveSpeed;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [height, color, speed, hertz, amplitude, showGrid]);

  return <canvas ref={canvasRef} className="w-full block" style={{ height }} />;
}