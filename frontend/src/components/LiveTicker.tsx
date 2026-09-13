interface TickerItem {
  time: string;
  message: string;
  severity: "normal" | "warning" | "critical";
}

const severityColor = {
  normal: "text-bio-accent",
  warning: "text-bio-warning",
  critical: "text-bio-critical",
};

export default function LiveTicker({ items }: { items: TickerItem[] }) {
  return (
    <div className="bg-bio-card border border-bio-accent/10 rounded-lg p-4 h-64 overflow-hidden">
      <div className="text-xs text-bio-accent uppercase tracking-wide mb-3">Live Feed</div>
      <div className="space-y-2 overflow-y-auto h-52 pr-1">
        {items.length === 0 && (
          <div className="text-bio-muted/60 text-sm">Awaiting telemetry...</div>
        )}
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs border-b border-bio-accent/10 pb-2 animate-[fadeIn_0.3s_ease-in]"
          >
            <span className="text-bio-muted/70 shrink-0">{item.time}</span>
            <span className={severityColor[item.severity]}>{item.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}