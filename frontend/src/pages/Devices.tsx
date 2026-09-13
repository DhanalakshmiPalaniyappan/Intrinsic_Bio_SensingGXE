import { useEffect, useState } from "react";
import api from "../lib/api";

interface Device {
  device_id: string;
  status: string;
  last_seen: string;
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await api.get("/devices");
        setDevices(res.data);
      } catch {
        setDevices([]);
      }
    };
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-bio-bg min-h-screen text-bio-text">
      <h1 className="text-2xl font-semibold mb-6">Devices</h1>

      {devices.length === 0 ? (
        <div className="bg-bio-card rounded-lg p-6 text-bio-muted border border-bio-accent/10">
          No devices reporting yet — check that your ESP32 / MQTT publisher is running.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {devices.map((d) => (
            <div
              key={d.device_id}
              className="bg-bio-card rounded-lg p-4 border border-bio-accent/10"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-bio-text">{d.device_id}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.status === "online" ? "bg-bio-accent" : "bg-bio-critical"
                  }`}
                />
              </div>
              <div className="text-sm text-bio-muted">Status: {d.status}</div>
              <div className="text-xs text-bio-muted/70 mt-1">
                Last seen: {new Date(d.last_seen).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}