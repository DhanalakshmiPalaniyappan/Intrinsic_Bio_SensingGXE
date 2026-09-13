interface Props {
  value: number;
  min: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  icon?: React.ReactNode;
}

/** Circular progress gauge, animates its ring via CSS variables set inline. */
export default function CircularGauge({
  value,
  min,
  max,
  size = 88,
  strokeWidth = 8,
  color = "#27E6B0",
  icon,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const offset = circumference * (1 - pct);

  return (
    <div style={{ width: size, height: size }} className="relative">
      <svg width={size} height={size} className="rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#19382B"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 900ms ease",
            filter: `drop-shadow(0 0 6px ${color}66)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-bio-accent">
        {icon}
      </div>
    </div>
  );
}
