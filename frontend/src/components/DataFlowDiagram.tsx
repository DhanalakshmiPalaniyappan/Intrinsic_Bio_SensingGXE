const PIPELINE_NODES = [
  { id: "NODE 01", icon: "🌲", label: "Tree", detail: "Biosignal Emission", color: "#27E6B0" },
  { id: "NODE 02", icon: "📈", label: "Root", detail: "Hydraulic Impedance", color: "#4DA3FF" },
  { id: "NODE 03", icon: "🕸️", label: "Mycorrhizal Network", detail: "Subsurface Bio-Coupling", color: "#F5B942" },
  { id: "NODE 04", icon: "📟", label: "Bio-Signal / Data", detail: "ADC & MQTT Ingestion", color: "#27E6B0" },
  { id: "NODE 05", icon: "🧠", label: "AI Inference", detail: "Physiological Classification", color: "#27E6B0" },
];

export default function DataFlowDiagram() {
  return (
    <div className="bg-bio-card border border-bio-border rounded-2xl p-6 space-y-6">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-bio-border/40 pb-4">
        <div>
          <h3 className="text-base font-bold text-bio-text font-mono tracking-tight">
            Tree → Root → Mycorrhizal Network → Data → AI
          </h3>
          <p className="text-xs text-bio-muted mt-0.5">
            From soil to signal. From signal to action.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-bio-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Tree Signal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Root Network
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Mycorrhizal Network
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-bio-accent" /> Data Flow
          </span>
        </div>
      </div>

      {/* 5 Pipeline Node Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {PIPELINE_NODES.map((node) => (
          <div
            key={node.id}
            className="bg-bio-bg/80 border border-bio-border hover:border-bio-accent/50 rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all group"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-bio-faint">{node.id}</span>
              <div className="w-8 h-8 rounded-lg bg-bio-elevated border border-bio-border flex items-center justify-center text-bio-accent text-sm group-hover:border-bio-accent transition-all">
                {node.icon}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-bio-text tracking-tight">{node.label}</h4>
              <p className="text-[11px] text-bio-muted mt-0.5 font-mono">{node.detail}</p>
            </div>

            <div className="pt-2 border-t border-bio-border/30 flex justify-between items-center text-[10px] font-mono text-bio-accent">
              <span>ACTIVE</span>
              <span className="w-3.5 h-3.5 rounded-full bg-bio-accent/20 border border-bio-accent flex items-center justify-center font-bold text-[8px]">
                ✓
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
