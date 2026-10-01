import { useState } from "react";
import WaveformCanvas from "../components/WaveformCanvas";
import { useTelemetry } from "../context/TelemetryContext";

interface StressEvent {
  node: string;
  condition: "NORMAL" | "HEAT STRESS" | "FIRE RISK" | "ILLEGAL CUTTING";
  rationale: string;
  severity: "NORMAL" | "ELEVATED";
  timestamp: string;
}

const EVENTS: StressEvent[] = [
  { node: "Tree T-04", condition: "NORMAL", rationale: "Equilibrium baseline bio-potential sustained", severity: "NORMAL", timestamp: "09:45:52 PM" },
  { node: "Tree T-07", condition: "HEAT STRESS", rationale: "Rapid mV attenuation + 36.4°C thermal spike", severity: "ELEVATED", timestamp: "09:39:52 PM" },
  { node: "Tree T-03", condition: "FIRE RISK", rationale: "Rhizosphere moisture < 12% with high impedance", severity: "ELEVATED", timestamp: "09:33:52 PM" },
  { node: "Tree T-01", condition: "NORMAL", rationale: "Steady diurnal circadian rhythm", severity: "NORMAL", timestamp: "09:21:52 PM" },
  { node: "Tree T-02", condition: "ILLEGAL CUTTING", rationale: "High-frequency mechanical spike train > 45 mV", severity: "ELEVATED", timestamp: "08:57:52 PM" },
];

export default function Analytics() {
  const { hertz } = useTelemetry();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="text-bio-text space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
            <span className="bg-bio-accent/10 text-bio-accent px-2.5 py-0.5 rounded border border-bio-accent/30 font-semibold">
              AI INFERENCE ENGINE
            </span>
            <span className="text-bio-muted uppercase">HYBRID STATISTICAL + ML</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-bio-text flex items-center gap-3">
            <span className="text-bio-accent">📊</span>
            Physiological Analytics & Signal Processing
          </h1>
          <p className="text-xs text-bio-muted mt-1">
            Fast Fourier Transform spectral density, biopotential circadian cycles, and AI classification records.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bio-card border border-bio-border hover:border-bio-accent text-xs font-mono text-bio-text transition-all self-start md:self-auto"
        >
          <span className={refreshing ? "animate-spin" : ""}>🔄</span>
          <span>Refresh Records</span>
        </button>
      </div>

      {/* 3 Animated Waveform Cards Grid */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Bioelectric Potential */}
          <div className="bg-bio-card border border-bio-border rounded-2xl p-5 space-y-3 hover:border-bio-accent/40 transition-all">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-bio-muted font-medium">Bioelectric Potential (mV)</span>
              <span className="text-emerald-400 font-bold text-sm">742 mV (Nominal)</span>
            </div>
            <div className="bg-bio-bg/80 border border-bio-border rounded-xl p-2 overflow-hidden shadow-inner">
              <WaveformCanvas height={110} color="#27E6B0" hertz={hertz} speed={1.8} />
            </div>
            <div className="text-[11px] text-bio-faint font-mono">Circadian sap-flow baseline</div>
          </div>

          {/* Card 2: Temperature Correlation */}
          <div className="bg-bio-card border border-bio-border rounded-2xl p-5 space-y-3 hover:border-bio-accent/40 transition-all">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-bio-muted font-medium">Temperature Correlation (°C)</span>
              <span className="text-amber-400 font-bold text-sm">31.3 °C (Elevated)</span>
            </div>
            <div className="bg-bio-bg/80 border border-bio-border rounded-xl p-2 overflow-hidden shadow-inner">
              <WaveformCanvas height={110} color="#F5B942" hertz={hertz} speed={1.4} amplitude={14} />
            </div>
            <div className="text-[11px] text-bio-faint font-mono">Thermal hysteresis tracking</div>
          </div>

          {/* Card 3: Rhizosphere Soil Moisture */}
          <div className="bg-bio-card border border-bio-border rounded-2xl p-5 space-y-3 hover:border-bio-accent/40 transition-all">
            <div className="flex justify-between items-baseline font-mono text-xs">
              <span className="text-bio-muted font-medium">Rhizosphere Soil Moisture</span>
              <span className="text-blue-400 font-bold text-sm">62% (Optimum)</span>
            </div>
            <div className="bg-bio-bg/80 border border-bio-border rounded-xl p-2 overflow-hidden shadow-inner">
              <WaveformCanvas height={110} color="#4DA3FF" hertz={hertz} speed={1.2} amplitude={12} />
            </div>
            <div className="text-[11px] text-bio-faint font-mono">Root osmotic pressure sensor</div>
          </div>
        </div>

        {/* Carousel arrow on right side */}
        <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-bio-elevated border border-bio-border text-bio-text flex items-center justify-center shadow-lg hover:border-bio-accent transition-all font-bold text-sm hidden lg:flex">
          ›
        </button>
      </div>

      {/* AI Stress & Anomaly Classification History Table */}
      <div className="bg-bio-card border border-bio-border rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-bio-border/60 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-bio-accent/10 border border-bio-accent/30 text-bio-accent flex items-center justify-center text-xs">
              🧠
            </span>
            <h3 className="text-base font-bold text-bio-text tracking-tight">
              AI Stress & Anomaly Classification History
            </h3>
          </div>
          <span className="bg-bio-elevated border border-bio-border px-3 py-1 rounded-full text-xs font-mono text-bio-muted">
            5 EVENTS LOGGED
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead>
              <tr className="text-bio-muted border-b border-bio-border/40 text-[11px]">
                <th className="py-3 px-4">DEVICE NODE</th>
                <th className="py-3 px-4">DIAGNOSTIC CONDITION</th>
                <th className="py-3 px-4">PHYSIOLOGICAL RATIONALE</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4 text-right">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bio-border/30">
              {EVENTS.map((item, idx) => {
                const isNormal = item.condition === "NORMAL";
                const isHeat = item.condition === "HEAT STRESS";
                const isFire = item.condition === "FIRE RISK";

                const badgeClass = isNormal
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : isHeat
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : isFire
                  ? "bg-red-500/10 text-red-400 border-red-500/30"
                  : "bg-purple-500/10 text-purple-400 border-purple-500/30";

                const severityColor = isNormal ? "text-emerald-400" : isHeat ? "text-amber-400" : "text-red-400";

                return (
                  <tr key={idx} className="hover:bg-bio-elevated/40 transition-all">
                    <td className="py-3.5 px-4 font-semibold text-bio-text flex items-center gap-2">
                      <span className="text-bio-accent">🌿</span>
                      <span>{item.node}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${badgeClass}`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-bio-muted">{item.rationale}</td>
                    <td className={`py-3.5 px-4 font-bold ${severityColor} flex items-center gap-1.5`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isNormal ? "bg-emerald-400" : isHeat ? "bg-amber-400" : "bg-red-400"}`} />
                      {item.severity}
                    </td>
                    <td className="py-3.5 px-4 text-right text-bio-faint">{item.timestamp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}