interface Props {
  score: number; // 0-100
  size?: number;
}

const statusFor = (score: number) => {
  if (score >= 85) return { label: "Excellent", color: "#27E6B0" };
  if (score >= 60) return { label: "Moderate", color: "#F5B942" };
  return { label: "Critical", color: "#EF6262" };
};

export default function HealthIndexRing({ score, size = 96 }: Props) {
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const status = statusFor(score);

  return (
    <div className="flex flex-col items-center">
      <div style={{ width: size, height: size }} className="relative">
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#19382B" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={status.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1000ms ease", filter: `drop-shadow(0 0 8px ${status.color}66)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-bio-text">{score}</span>
          <span className="text-[10px] text-bio-muted">/100</span>
        </div>
      </div>
      <span className="mt-1 text-xs font-medium" style={{ color: status.color }}>
        {status.label}
      </span>
    </div>
  );
}
