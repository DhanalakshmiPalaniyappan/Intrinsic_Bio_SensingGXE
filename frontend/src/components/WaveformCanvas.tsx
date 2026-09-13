import { useEffect, useRef } from "react";

interface Props {
  currentMv?: number;
  height?: number;
  color?: string;
  speed?: number;
}

export default function WaveformCanvas({
  height = 90,
  color = "#27E6B0",
  speed = 1.8
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const offsetRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = height;
      }
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, h);

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(25, 56, 43, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = 15; y < h; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Bio-signal waveform path
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;

      const points = [];
      const midY = h / 2;
      const step = 4;
      const baseFreq = 0.035;

      for (let x = 0; x <= width; x += step) {
        const t = (x + offsetRef.current) * baseFreq;
        const wave1 = Math.sin(t) * 16;
        const wave2 = Math.sin(t * 2.8) * 7;
        const wave3 = Math.cos(t * 0.4) * 5;
        const spike = Math.pow(Math.sin(t * 0.8), 12) * 12;

        const y = midY + wave1 + wave2 + wave3 - spike;
        points.push({ x, y });
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Gradient fill underneath
      ctx.lineTo(width, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "rgba(39, 230, 176, 0.2)");
      grad.addColorStop(1, "rgba(39, 230, 176, 0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Leading glowing head dot
      if (points.length > 0) {
        const lastPt = points[points.length - 1];
        ctx.beginPath();
        ctx.arc(lastPt.x - 2, lastPt.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      offsetRef.current += speed;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [height, color, speed]);

  return <canvas ref={canvasRef} className="w-full block" style={{ height }} />;
}