import BioSignalWaveform from "./BioSignalWaveform";
import CircularGauge from "./CircularGauge";

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Live Bio-Signal */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 card-hover">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-bio-muted flex items-center gap-1.5">
            <span className="text-bio-accent">〜</span> Live Bio-Signal
          </span>
          <span className="text-[11px] bg-bio-accent/10 text-bio-accent px-2 py-0.5 rounded-full border border-bio-accent/30">
            Stable
          </span>
        </div>
        <div className="text-2xl font-bold text-bio-text mb-2">742 <span className="text-sm text-bio-muted font-normal">mV</span></div>
        <BioSignalWaveform />
        <div className="text-[11px] text-bio-faint mt-2">Last updated: 10:24 AM</div>
      </div>

      {/* Temperature */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 card-hover flex items-center justify-between">
        <div>
          <span className="text-sm text-bio-muted flex items-center gap-1.5 mb-2">🌡️ Temperature</span>
          <div className="text-2xl font-bold text-bio-text">31.3 <span className="text-sm text-bio-muted font-normal">°C</span></div>
          <div className="text-xs text-bio-warning mt-1">↑ 0.2</div>
          <div className="text-[11px] text-bio-faint mt-2">Normal Range<br />25 – 35 °C</div>
        </div>
        <CircularGauge value={31.3} min={0} max={45} color="#F5B942" icon={<span>🌡️</span>} />
      </div>

      {/* Humidity */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 card-hover flex items-center justify-between">
        <div>
          <span className="text-sm text-bio-muted flex items-center gap-1.5 mb-2">💧 Humidity</span>
          <div className="text-2xl font-bold text-bio-text">68 <span className="text-sm text-bio-muted font-normal">%</span></div>
          <div className="text-xs text-bio-info mt-1">↑ 1%</div>
          <div className="text-[11px] text-bio-faint mt-2">Normal Range<br />60 – 80%</div>
        </div>
        <CircularGauge value={68} min={0} max={100} color="#4DA3FF" icon={<span>💧</span>} />
      </div>

      {/* Signal Quality */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-4 card-hover">
        <span className="text-sm text-bio-muted flex items-center gap-1.5 mb-2">📶 Signal Quality</span>
        <div className="text-2xl font-bold text-bio-text mb-2">Excellent</div>
        <div className="flex items-center gap-1 mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-2 h-4 rounded-sm bg-bio-accent animate-breathe"
              style={{ animationDelay: `${i * 150}ms`, height: `${10 + i * 4}px` }}
            />
          ))}
        </div>
        <div className="text-bio-accent text-sm font-semibold">98%</div>
      </div>
    </div>
  );
}
