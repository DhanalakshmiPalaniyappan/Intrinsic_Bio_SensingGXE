interface Props {
  label: string;
  value: number | null;
  unit: string;
  lastUpdated: string | null;
}

export default function SensorCard({ label, value, unit, lastUpdated }: Props) {
  return (
    <div className="bg-bio-card rounded-lg p-4 border border-bio-accent/10">
      <div className="text-bio-muted text-sm mb-1">{label}</div>
      {value === null ? (
        <div className="text-bio-muted/60 text-lg">No data / Signal unavailable</div>
      ) : (
        <div className="text-2xl font-semibold text-bio-text">
          {value} <span className="text-sm text-bio-muted">{unit}</span>
        </div>
      )}
      <div className="text-xs text-bio-muted/70 mt-2">
        {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : "Never updated"}
      </div>
    </div>
  );
}