import WaveformCanvas from "./WaveformCanvas";
import CircularGauge from "./CircularGauge";
import { useTelemetry } from "../context/TelemetryContext";

export default function MetricCards() {
  const { hertz } = useTelemetry();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {/* 1. Live Bio-Signal */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 flex flex-col justify-between hover:border-bio-accent/40 transition-all">
        <div>
          <div className="flex items-center justify-between mb-1.5 text-xs text-bio-muted">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="text-bio-accent font-bold">〜</span> Live Bio-Signal
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Stable
            </span>
          </div>
          <div className="text-2xl font-bold text-bio-text font-mono">
            742 <span className="text-xs text-bio-muted font-normal">mV</span>
          </div>
        </div>

        {/* Live Hertz-driven animated bio-waveform */}
        <div className="my-2 rounded-lg overflow-hidden border border-bio-border/40 bg-bio-bg/50">
          <WaveformCanvas height={45} color="#27E6B0" hertz={hertz} speed={1.8} showGrid={false} />
        </div>
      </div>

      {/* 2. Temperature */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 flex items-center justify-between hover:border-bio-accent/40 transition-all">
        <div>
          <div className="text-xs text-bio-muted flex items-center gap-1 mb-1">
            <span>🌡️</span> Temperature
          </div>
          <div className="text-2xl font-bold text-bio-text font-mono">
            31.3 <span className="text-xs text-bio-muted font-normal">°C</span>
          </div>
          <div className="text-xs font-mono text-amber-400 mt-1 flex items-center gap-1">
            <span>↑</span> 0.2
          </div>
        </div>
        <CircularGauge value={31.3} min={0} max={50} color="#F5B942" icon={<span>🌡️</span>} />
      </div>

      {/* 3. Humidity */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 flex items-center justify-between hover:border-bio-accent/40 transition-all">
        <div>
          <div className="text-xs text-bio-muted flex items-center gap-1 mb-1">
            <span>💧</span> Humidity
          </div>
          <div className="text-2xl font-bold text-bio-text font-mono">
            68 <span className="text-xs text-bio-muted font-normal">%</span>
          </div>
          <div className="text-xs font-mono text-bio-accent mt-1 flex items-center gap-1">
            <span>↑</span> 1%
          </div>
        </div>
        <CircularGauge value={68} min={0} max={100} color="#4DA3FF" icon={<span>💧</span>} />
      </div>

      {/* 4. Signal Quality */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 flex flex-col justify-between hover:border-bio-accent/40 transition-all">
        <div>
          <div className="text-xs text-bio-muted flex items-center gap-1.5 mb-1">
            <span>📶</span> Signal Quality
          </div>
          <div className="text-xl font-bold text-bio-text">Excellent</div>
        </div>

        <div className="my-1 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-bio-accent shadow-glow-sm"
              />
            ))}
          </div>
          <span className="text-bio-accent font-mono font-bold text-sm">98%</span>
        </div>
      </div>

      {/* 5. TOTAL TREES MONITORED */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 flex flex-col justify-between hover:border-bio-accent/40 transition-all">
        <div className="flex justify-between items-start">
          <div className="text-[11px] font-mono text-bio-muted">TOTAL TREES MONITORED</div>
          <span className="text-bio-accent text-sm">🌲</span>
        </div>

        <div className="text-3xl font-bold text-bio-text font-mono my-1">12</div>

        <div className="text-[10px] font-mono text-bio-faint flex items-center justify-between border-t border-bio-border/50 pt-1.5">
          <span className="text-emerald-400">● Healthy: 8</span>
          <span className="text-amber-400">● Watch: 3</span>
          <span className="text-red-400">● Alert: 1</span>
        </div>
      </div>
    </div>
  );
}
