interface Alert {
  device: string;
  message: string;
  time: string;
  level: "normal" | "warning" | "critical";
}

const LEVEL_STYLES: Record<Alert["level"], { dot: string; text: string; bg: string }> = {
  normal: { dot: "bg-bio-accent", text: "text-bio-accent", bg: "bg-bio-accent/10" },
  warning: { dot: "bg-bio-warning", text: "text-bio-warning", bg: "bg-bio-warning/10" },
  critical: { dot: "bg-bio-critical", text: "text-bio-critical", bg: "bg-bio-critical/10" },
};

const DEFAULT_ALERTS: Alert[] = [
  { device: "Tree T-07", message: "High Stress Detected", time: "09:45 AM", level: "critical" },
  { device: "Tree T-03", message: "Signal Deviation", time: "08:12 AM", level: "warning" },
  { device: "Tree T-11", message: "Temperature Slightly High", time: "07:32 AM", level: "warning" },
];

export default function AlertsPanel({ alerts = DEFAULT_ALERTS }: { alerts?: Alert[] }) {
  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-bio-text flex items-center gap-2">
          <span className="text-bio-accent">◔</span> Recent Alerts
        </h3>
        <button className="text-xs text-bio-muted hover:text-bio-accent transition-colors">View All →</button>
      </div>
      <div className="space-y-2">
        {alerts.map((a, i) => {
          const s = LEVEL_STYLES[a.level];
          return (
            <div
              key={`${a.device}-${i}`}
              className={`flex items-start gap-3 rounded-lg p-3 ${s.bg} border border-bio-border animate-fadeSlideUp`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className={`mt-1 w-2 h-2 rounded-full ${s.dot} shrink-0`} />
              <div className="min-w-0">
                <div className="text-sm text-bio-text font-medium">{a.device}</div>
                <div className={`text-sm ${s.text}`}>{a.message}</div>
                <div className="text-[11px] text-bio-faint mt-0.5">{a.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
