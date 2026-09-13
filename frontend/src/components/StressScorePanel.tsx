interface Props {
  condition: string | null;
  reason: string | null;
  temperature: number | null;
}

const conditionMeta: Record<string, { color: string; label: string; icon: string }> = {
  normal: { color: "text-bio-accent", label: "Normal", icon: "🟢" },
  heat_stress: { color: "text-bio-warning", label: "Potential Heat Stress", icon: "🟠" },
  fire_risk: { color: "text-bio-critical", label: "Fire Risk", icon: "🔴" },
  illegal_cutting: { color: "text-bio-critical", label: "Possible Cutting Detected", icon: "🔴" },
};

export default function StressScorePanel({ condition, reason, temperature }: Props) {
  if (!condition) {
    return (
      <div className="bg-bio-card rounded-lg p-4 text-bio-muted border border-bio-accent/10">
        No classification data yet
      </div>
    );
  }

  const meta = conditionMeta[condition] || conditionMeta.normal;

  return (
    <div className="bg-bio-card rounded-lg p-4 border border-bio-accent/10">
      <div className={`text-lg font-semibold ${meta.color} mb-2`}>
        {meta.icon} {meta.label}
      </div>
      <div className="text-sm text-bio-muted space-y-1">
        <div>Temperature: {temperature ?? "—"}°C</div>
        <div>Detected: {reason}</div>
      </div>
    </div>
  );
}