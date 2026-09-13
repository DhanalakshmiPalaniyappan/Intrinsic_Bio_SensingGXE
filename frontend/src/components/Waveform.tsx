import { useEffect, useRef } from "react";

interface Props {
  height?: number;
  color?: string;
  speed?: number; // higher = faster oscillation
}

export default function WaveformCanvas({ height = 65, color = "#27E6B0", speed = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let t = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = color;
      ctx.shadowBlur = 4;

      const points = 120;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * w;
        const noise = Math.sin(i * 0.4 + t) * 0.3 + Math.sin(i * 0.15 + t * 0.7) * 0.5;
        const y = h / 2 + noise * (h / 2.5);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 0.05 * speed;
      frameRef.current = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [color, speed, height]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: `${height}px`, display: "block" }} />;
}