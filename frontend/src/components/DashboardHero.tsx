import InteractiveTree from "./InteractiveTree";

export default function DashboardHero() {
  return (
    <div className="relative bg-bio-card border border-bio-border rounded-2xl overflow-hidden mb-6 p-6 md:p-8">
      <div className="grid md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Hero Copy */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider">
            <span className="bg-bio-accent/10 text-bio-accent px-2.5 py-1 rounded-md border border-bio-accent/30 font-semibold">
              REAL-TIME MONITORING
            </span>
            <span className="bg-bio-elevated text-bio-muted px-2.5 py-1 rounded-md border border-bio-border flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bio-accent animate-pulse" />
              SIMULATED TELEMETRY
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-bio-text tracking-tight leading-tight">
            Intrinsic Bio-Sensing <br />
            <span className="text-bio-text">Monitor System</span>
          </h1>

          <p className="text-sm text-bio-muted leading-relaxed max-w-xl">
            Capturing the hidden physiological signals of trees. Using AI and IoT telemetry to
            detect heat stress, hydraulic embolism, and environmental shifts in real-time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-3.5 py-2 rounded-xl bg-bio-elevated border border-bio-border hover:border-bio-accent text-xs text-bio-text font-medium flex items-center gap-2 transition-all">
              <span>🌿</span>
              <span>Tree Bio-Signals</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-bio-elevated border border-bio-border hover:border-bio-accent text-xs text-bio-text font-medium flex items-center gap-2 transition-all">
              <span>🕸️</span>
              <span>Mycorrhizal Network</span>
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-bio-elevated border border-bio-border hover:border-bio-accent text-xs text-bio-text font-medium flex items-center gap-2 transition-all">
              <span>🧠</span>
              <span>AI-Powered Insights</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tree Interactive Visual Card */}
        <div className="md:col-span-5 relative">
          <InteractiveTree />
          {/* Carousel Arrow Button */}
          <button className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bio-elevated border border-bio-border text-bio-text flex items-center justify-center shadow-lg hover:border-bio-accent transition-all text-xs font-bold z-10">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
