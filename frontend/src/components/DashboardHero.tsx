import TreeSignalVisual from "./TreeSignalVisual";

export default function DashboardHero() {
  return (
    <div className="relative bg-bio-card border border-bio-border rounded-xl overflow-hidden mb-6">
      <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10 items-center">
        <div>
          <div className="flex items-center gap-2 text-xs text-bio-accent font-medium mb-3 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-bio-accent animate-breathe" />
            REAL-TIME FOREST MONITORING
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-bio-text leading-tight text-glow">
            Intrinsic Bio-Sensing Monitor System
          </h1>
          <p className="text-bio-muted mt-4 max-w-md leading-relaxed">
            Capturing the hidden signals of trees. Using AI and IoT to detect stress,
            protect forests and build a sustainable future.
          </p>

          <div className="flex flex-wrap gap-4 mt-6 text-xs text-bio-muted">
            <span className="flex items-center gap-1.5"><span className="text-bio-accent">〜</span> Tree Bio-Signals</span>
            <span className="flex items-center gap-1.5"><span className="text-bio-accent">🕸️</span> Mycorrhizal Network</span>
            <span className="flex items-center gap-1.5"><span className="text-bio-accent">🧠</span> AI-Powered Insights</span>
          </div>
        </div>

        <div className="relative h-64 md:h-80">
          <TreeSignalVisual className="w-full h-full" />
        </div>
      </div>

      <div className="absolute top-5 right-6 flex items-center gap-2 text-xs">
        <span className="flex items-center gap-1.5 text-bio-accent font-medium">
          <span className="w-2 h-2 rounded-full bg-bio-accent animate-breathe" /> LIVE
        </span>
      </div>
    </div>
  );
}
