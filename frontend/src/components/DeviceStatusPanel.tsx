interface Device {
  id: string;
  online: boolean;
  battery: number;
}

const DEFAULT_DEVICES: Device[] = [
  { id: "T-01", online: true, battery: 98 },
  { id: "T-02", online: true, battery: 95 },
  { id: "T-03", online: true, battery: 92 },
  { id: "T-04", online: true, battery: 88 },
  { id: "T-05", online: true, battery: 76 },
];

function BatteryIcon({ level }: { level: number }) {
  const color = level > 40 ? "#27E6B0" : level > 15 ? "#F5B942" : "#EF6262";
  return (
    <div className="flex items-center gap-1">
      <div className="w-6 h-3 rounded-[2px] border border-bio-muted/60 relative overflow-hidden">
        <div className="absolute inset-0.5 rounded-[1px]" style={{ width: `${level}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-bio-muted">{level}%</span>
    </div>
  );
}

export default function DeviceStatusPanel({ devices = DEFAULT_DEVICES }: { devices?: Device[] }) {
  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-bio-text flex items-center gap-2">
          <span className="text-bio-accent">📡</span> Device Status
        </h3>
        <button className="text-xs text-bio-muted hover:text-bio-accent transition-colors">View All →</button>
      </div>
      <div className="space-y-3">
        {devices.map((d) => (
          <div key={d.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${
                    d.online ? "bg-bio-accent animate-breathe" : "bg-bio-critical"
                  }`}
                />
              </span>
              <span className="text-bio-text font-medium">{d.id}</span>
              <span className="text-bio-muted text-xs">{d.online ? "Online" : "Offline"}</span>
            </div>
            <BatteryIcon level={d.battery} />
          </div>
        ))}
      </div>
    </div>
  );
}
