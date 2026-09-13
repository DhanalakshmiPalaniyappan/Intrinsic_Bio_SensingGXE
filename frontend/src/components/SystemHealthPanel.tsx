import { useEffect, useState } from "react";
import api from "../lib/api";

interface HealthData {
  database: string;
  mqtt: string;
  ai_model: string;
  fastapi: string;
  last_checked: string;
  overall_status: string;
}

const statusColor = (status: string) => {
  const ok = ["healthy", "connected", "ready", "online", "operational"];
  return ok.includes(status) ? "bg-bio-accent" : "bg-bio-critical";
};

export default function SystemHealthPanel() {
  const [health, setHealth] = useState<HealthData | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await api.get("/system/health");
        setHealth(res.data);
      } catch {
        setHealth(null);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!health) {
    return (
      <div className="bg-bio-bg rounded-lg p-4 text-bio-muted text-sm border border-bio-accent/10">
        System health unavailable — backend unreachable
      </div>
    );
  }

  const rows: [string, string][] = [
    ["ESP32 / Data Source", health.mqtt === "connected" ? "connected" : "offline"],
    ["MQTT", health.mqtt],
    ["FastAPI", health.fastapi],
    ["Database", health.database],
    ["AI Model", health.ai_model],
  ];

  return (
    <div className="bg-bio-bg rounded-lg p-4 text-sm border border-bio-accent/10">
      <h3 className="text-bio-text font-medium mb-3">System Health</h3>
      <div className="space-y-2">
        {rows.map(([label, status]) => (
          <div key={label} className="flex justify-between items-center text-bio-muted">
            <span>{label}</span>
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${statusColor(status)}`} />
              {status}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-bio-accent/10 mt-3 pt-3 flex justify-between text-bio-muted">
        <span>Last Update</span>
        <span>{new Date(health.last_checked).toLocaleTimeString()}</span>
      </div>
      <div className="flex justify-between items-center mt-2 font-medium">
        <span className="text-bio-text">Overall Status</span>
        <span className="flex items-center gap-2 text-bio-text">
          <span className={`w-2 h-2 rounded-full ${statusColor(health.overall_status)}`} />
          {health.overall_status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}