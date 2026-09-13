import { useMemo } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

function buildSpectrum() {
  return Array.from({ length: 50 }, (_, i) => {
    const peak = Math.exp(-Math.pow(i - 12, 2) / 8) * 0.9;
    const noise = Math.random() * 0.08;
    return { hz: i, amp: Math.min(1, peak + noise) };
  });
}

export default function FrequencyAnalysis() {
  const data = useMemo(buildSpectrum, []);

  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-bio-text flex items-center gap-2">
          <span className="text-bio-info">◱</span> Frequency Analysis (FFT)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <XAxis dataKey="hz" tick={{ fill: "#61766B", fontSize: 10 }} axisLine={{ stroke: "#19382B" }} tickLine={false} interval={9} />
              <YAxis domain={[0, 1]} hide />
              <Bar dataKey="amp" radius={[2, 2, 0, 0]} fill="#4DA3FF" isAnimationActive={true} animationDuration={600} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center text-[11px] text-bio-faint mt-1">Frequency (Hz)</div>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <div className="text-bio-muted text-xs">Dominant Frequency</div>
            <div className="text-bio-text font-semibold">12.4 Hz</div>
          </div>
          <div>
            <div className="text-bio-muted text-xs">Signal Pattern</div>
            <div className="text-bio-accent font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-bio-accent" /> Normal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
