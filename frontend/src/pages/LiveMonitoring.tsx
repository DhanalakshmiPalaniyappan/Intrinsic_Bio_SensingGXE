import { useState } from "react";
import InteractiveTree from "../components/InteractiveTree";
import LiveSignalChart from "../components/LiveSignalChart";
import WaveformCanvas from "../components/WaveformCanvas";
import FrequencyAnalysis from "../components/FrequencyAnalysis";
import AIInterpretationCard from "../components/AIInterpretationCard";
import api from "../lib/api";

export default function LiveMonitoring() {
  const [selectedNode, setSelectedNode] = useState<string>("Electrode Array");
  const [simulating, setSimulating] = useState(false);
  const [lastCondition, setLastCondition] = useState<string | null>(null);

  const handleSimulate = async (condition: string) => {
    setSimulating(true);
    try {
      const res = await api.post(`/simulate?condition=${condition}`);
      setLastCondition(res.data.condition);
    } catch (e) {
      console.error("Simulation error:", e);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="text-bio-text space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-bio-text">Live Bio-Sensing & Pulse Telemetry</h1>
          <p className="text-sm text-bio-muted mt-1">
            Real-time electrophysiological tree signals & active stress detection
          </p>
        </div>

        {/* Condition Trigger Buttons for live testing */}
        <div className="flex flex-wrap items-center gap-2 bg-bio-card p-2 rounded-xl border border-bio-border">
          <span className="text-xs text-bio-muted px-2 font-mono">SIMULATE:</span>
          <button
            disabled={simulating}
            onClick={() => handleSimulate("normal")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          >
            Normal
          </button>
          <button
            disabled={simulating}
            onClick={() => handleSimulate("heat_stress")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
          >
            Heat Stress
          </button>
          <button
            disabled={simulating}
            onClick={() => handleSimulate("fire_risk")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            Fire Risk
          </button>
          <button
            disabled={simulating}
            onClick={() => handleSimulate("illegal_cutting")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
          >
            Acoustic / Cutting
          </button>
        </div>
      </div>

      {lastCondition && (
        <div className="bg-bio-accent/10 border border-bio-accent/30 text-bio-accent px-4 py-2 rounded-lg text-sm flex items-center justify-between">
          <span>Triggered synthetic signal burst: <strong className="uppercase font-mono">{lastCondition}</strong></span>
          <span className="text-xs text-bio-muted">Updated via backend endpoint</span>
        </div>
      )}

      {/* Main Signal Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-bio-card border border-bio-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-bio-text mb-3 flex items-center justify-between">
              <span>Bio-Potential Waveform Stream</span>
              <span className="text-xs font-mono text-bio-accent">CH-1 differential input</span>
            </h3>
            <WaveformCanvas height={220} />
          </div>

          <LiveSignalChart />
        </div>

        <div className="space-y-6">
          <div className="bg-bio-card border border-bio-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-bio-text mb-3">Tree Bio-Collar Array</h3>
            <InteractiveTree activeNode={selectedNode} onSelectNode={(name) => setSelectedNode(name)} />
            <div className="mt-3 text-xs font-mono text-bio-muted bg-bio-bg p-2.5 rounded-lg border border-bio-border flex justify-between items-center">
              <span>Selected Node:</span>
              <span className="text-bio-accent font-semibold">{selectedNode}</span>
            </div>
          </div>

          <AIInterpretationCard />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FrequencyAnalysis />
        <div className="bg-bio-card border border-bio-border rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-bio-text mb-2">Signal Processing Specs</h3>
            <div className="space-y-2 text-xs font-mono text-bio-muted">
              <div className="flex justify-between border-b border-bio-border/40 py-1.5">
                <span>Sampling Frequency (Fs):</span>
                <span className="text-bio-text">500 Hz</span>
              </div>
              <div className="flex justify-between border-b border-bio-border/40 py-1.5">
                <span>ADC Resolution:</span>
                <span className="text-bio-text">16-bit Delta-Sigma</span>
              </div>
              <div className="flex justify-between border-b border-bio-border/40 py-1.5">
                <span>Bandpass Filter:</span>
                <span className="text-bio-text">0.1 Hz – 50 Hz</span>
              </div>
              <div className="flex justify-between border-b border-bio-border/40 py-1.5">
                <span>Notch Filter:</span>
                <span className="text-bio-text">50 Hz / 60 Hz Active Rejection</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span>Impedance Matching:</span>
                <span className="text-bio-text">10 GΩ High-Z Buffer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
