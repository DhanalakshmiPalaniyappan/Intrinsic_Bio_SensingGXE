const NODES = [
  { icon: "🌳", label: "Tree" },
  { icon: "🌱", label: "Root" },
  { icon: "🕸️", label: "Mycorrhizal Network" },
  { icon: "〜", label: "Bio-Signal / Data" },
  { icon: "🧠", label: "AI" },
];

export default function DataFlowDiagram() {
  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-bio-text font-semibold">
          Tree → Root → Mycorrhizal Network → Data → AI
        </h3>
        <p className="text-sm text-bio-muted">From soil to signal. From signal to action.</p>
      </div>

      <div className="relative flex items-center justify-between">
        {/* connecting line */}
        <div className="absolute left-6 right-6 top-1/2 h-px bg-bio-border -translate-y-1/2" />
        <div className="absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 overflow-hidden">
          <div
            className="w-3 h-3 rounded-full bg-bio-accent -mt-1.5"
            style={{
              offsetPath: "path('M0 0 H1000')",
              animation: "travel 5s linear infinite",
              filter: "drop-shadow(0 0 6px #27E6B0)",
            }}
          />
        </div>

        {NODES.map((n, i) => (
          <div key={n.label} className="relative z-10 flex flex-col items-center gap-2 flex-1">
            <div className="w-12 h-12 rounded-full bg-bio-elevated border border-bio-accent/30 flex items-center justify-center text-lg shadow-glow-sm">
              {n.icon}
            </div>
            <span className="text-[11px] text-bio-muted text-center max-w-[80px]">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
