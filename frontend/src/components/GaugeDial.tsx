import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface Props {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export default function GaugeDial({ label, value, max, unit, color }: Props) {
  const pct = Math.min((value / max) * 100, 100);
  const data = [{ value: pct, fill: color }];

  return (
    <div className="flex flex-col items-center bg-bio-card border border-bio-accent/10 rounded-lg p-4">
      <div className="relative w-24 h-24">
        <RadialBarChart
          width={96}
          height={96}
          cx={48}
          cy={48}
          innerRadius={34}
          outerRadius={44}
          barSize={8}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar background={{ fill: "#0D1C16" }} dataKey="value" cornerRadius={8} />
        </RadialBarChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-bio-text">{value}</span>
          <span className="text-[10px] text-bio-muted">{unit}</span>
        </div>
      </div>
      <div className="text-xs text-bio-accent mt-2 tracking-wide uppercase">{label}</div>
    </div>
  );
}