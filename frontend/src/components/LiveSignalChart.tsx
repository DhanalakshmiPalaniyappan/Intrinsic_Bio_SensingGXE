import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Point {
  time: string;
  mv: number;
}

const RANGES = ["1H", "6H", "12H", "24H"] as const;

function genSeed(n: number): Point[] {
  const now = Date.now();
  return Array.from({ length: n }, (_, i) => {
    const t = new Date(now - (n - i) * 60000);
    return {
      time: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mv: 700 + Math.sin(i / 5) * 60 + (Math.random() - 0.5) * 30,
    };
  });
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bio-elevated border border-bio-border rounded-lg px-3 py-2 text-xs shadow-glow-sm">
      <div className="text-bio-muted">{label}</div>
      <div className="text-bio-accent font-semibold">{Math.round(payload[0].value)} mV</div>
    </div>
  );
}

export default function LiveSignalChart({ deviceLabel = "Tree T-04" }: { deviceLabel?: string }) {
  const [range, setRange] = useState<typeof RANGES[number]>("1H");
  const [data, setData] = useState<Point[]>(() => genSeed(30));

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1);
        const t = new Date();
        const last = prev[prev.length - 1]?.mv ?? 742;
        next.push({
          time: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          mv: Math.max(600, Math.min(820, last + (Math.random() - 0.5) * 24)),
        });
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const current = Math.round(data[data.length - 1]?.mv ?? 0);
  const min = Math.round(Math.min(...data.map((d) => d.mv)));
  const max = Math.round(Math.max(...data.map((d) => d.mv)));

  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5 card-hover">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 text-bio-text font-semibold">
          <span className="text-bio-accent">〜</span> Live Bio-Signal ({deviceLabel})
        </div>
        <div className="flex gap-1 bg-bio-bg2 rounded-lg p-1 border border-bio-border">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                range === r ? "bg-bio-accent text-bio-bg font-semibold" : "text-bio-muted hover:text-bio-text"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="signalFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#27E6B0" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#27E6B0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#19382B" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#61766B", fontSize: 11 }} axisLine={{ stroke: "#19382B" }} tickLine={false} minTickGap={30} />
            <YAxis domain={[550, 850]} tick={{ fill: "#61766B", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#27E6B0", strokeWidth: 1, strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="mv"
              stroke="#27E6B0"
              strokeWidth={2}
              fill="url(#signalFill)"
              isAnimationActive={false}
              style={{ filter: "drop-shadow(0 0 6px rgba(39,230,176,0.45))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-bio-border text-sm">
        <div>
          <div className="text-bio-muted text-xs">Current Value</div>
          <div className="text-bio-text font-semibold">{current} mV</div>
        </div>
        <div>
          <div className="text-bio-muted text-xs">Trend</div>
          <div className="text-bio-accent font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-bio-accent animate-breathe" /> Stable
          </div>
        </div>
        <div>
          <div className="text-bio-muted text-xs">Signal Range</div>
          <div className="text-bio-text font-semibold">{min} – {max} mV</div>
        </div>
        <div>
          <div className="text-bio-muted text-xs">Dominant Frequency</div>
          <div className="text-bio-text font-semibold">12.4 Hz</div>
        </div>
      </div>
    </div>
  );
}
