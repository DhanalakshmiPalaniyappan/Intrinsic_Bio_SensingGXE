import { useState, useEffect } from "react";
import WaveformCanvas from "./WaveformCanvas";
import { useTelemetry } from "../context/TelemetryContext";

interface Props {
  deviceLabel?: string;
}

const RANGES = ["1H", "6H", "12H", "24H"];

export default function LiveSignalChart({ deviceLabel = "Tree T-04" }: Props) {
  const { hertz } = useTelemetry();
  const [selectedRange, setSelectedRange] = useState("6H");
  const [currentMv, setCurrentMv] = useState(742);

  // Live real-time value updates
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 8;
      setCurrentMv((prev) => Math.round(Math.max(710, Math.min(780, prev + delta))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bio-card border border-bio-border rounded-2xl p-6 space-y-4 hover:border-bio-accent/40 transition-all">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bio-border/40 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-bio-accent animate-pulse" />
          <h3 className="font-bold text-base text-bio-text tracking-tight font-mono">
            Live Bio-Signal — {deviceLabel}
          </h3>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 bg-bio-bg p-1 rounded-xl border border-bio-border text-xs font-mono">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRange(r)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedRange === r
                  ? "bg-bio-accent text-black font-bold shadow-glow-sm"
                  : "text-bio-muted hover:text-bio-text"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Waveform Display Area */}
      <div className="relative bg-bio-bg/90 border border-bio-border rounded-xl p-4 overflow-hidden">
        {/* Top Info Badges inside Canvas */}
        <div className="flex justify-between items-center text-[11px] font-mono text-bio-muted mb-2 relative z-10">
          <span className="text-bio-muted font-semibold">mV</span>
          <span className="bg-bio-elevated text-bio-accent border border-bio-border px-2.5 py-0.5 rounded text-[10px] font-bold">
            SAMPLING: {hertz} Hz (Nyquist Compliant)
          </span>
        </div>

        {/* Live Canvas Waveform */}
        <WaveformCanvas height={160} color="#27E6B0" hertz={hertz} speed={2.0} amplitude={24} />

        {/* Timestamps X-Axis */}
        <div className="flex justify-between items-center text-[10px] font-mono text-bio-faint pt-2 border-t border-bio-border/40">
          <span>09:25</span>
          <span>09:35</span>
          <span>09:45</span>
          <span>09:55</span>
          <span>10:05</span>
          <span>10:15</span>
          <span className="text-bio-accent font-bold">10:24 AM</span>
        </div>
      </div>

      {/* Footer Metrics Summary Bar matching Image 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 font-mono">
        <div className="bg-bio-bg/60 p-3 rounded-xl border border-bio-border/40">
          <div className="text-[10px] text-bio-muted uppercase mb-1">CURRENT VALUE</div>
          <div className="text-sm font-bold text-bio-text">{currentMv} mV</div>
        </div>

        <div className="bg-bio-bg/60 p-3 rounded-xl border border-bio-border/40">
          <div className="text-[10px] text-bio-muted uppercase mb-1">DOMINANT FREQUENCY</div>
          <div className="text-sm font-bold text-bio-accent">12.4 Hz</div>
        </div>

        <div className="bg-bio-bg/60 p-3 rounded-xl border border-bio-border/40">
          <div className="text-[10px] text-bio-muted uppercase mb-1">TREND</div>
          <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Stable
          </div>
        </div>

        <div className="bg-bio-bg/60 p-3 rounded-xl border border-bio-border/40">
          <div className="text-[10px] text-bio-muted uppercase mb-1">SIGNAL RANGE</div>
          <div className="text-sm font-bold text-bio-text">612 – 818 mV</div>
        </div>
      </div>
    </div>
  );
}
