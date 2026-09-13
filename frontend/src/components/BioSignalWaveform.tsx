import { useEffect, useRef, useState } from "react";

/**
 * Small continuously-scrolling waveform used inside the Live Bio-Signal card.
 * Purely presentational — feed it `value` from live data if desired, or
 * leave it running on its own gentle simulated signal.
 */
export default function BioSignalWaveform({
  height = 64,
  points = 48,
  color = "#27E6B0",
}: {
  height?: number;
  points?: number;
  color?: string;
}) {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: points }, () => 50 + Math.random() * 10)
  );
  const frame = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      frame.current += 1;
      setData((prev) => {
        const next = prev.slice(1);
        const base = 50 + Math.sin(frame.current / 6) * 12;
        next.push(base + (Math.random() - 0.5) * 8);
        return next;
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  const width = 320;
  const step = width / (points - 1);
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${height - (v / 100) * height}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }} preserveAspectRatio="none">
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: `drop-shadow(0 0 5px ${color}80)` }}
      />
    </svg>
  );
}
