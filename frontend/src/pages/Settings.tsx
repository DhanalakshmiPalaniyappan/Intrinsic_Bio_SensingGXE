import { useState, useEffect } from "react";
import api from "../lib/api";

export default function Settings() {
  const [apiStatus, setApiStatus] = useState<string>("Checking...");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/health")
      .then(() => setApiStatus("Online (FastAPI http://localhost:8000)"))
      .catch(() => setApiStatus("Offline / Unreachable"));
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="text-bio-text space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-bio-text">System & Network Settings</h1>
        <p className="text-sm text-bio-muted mt-1">
          Configure telemetry thresholds, API connections, and authentication parameters
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm">
          Settings updated successfully!
        </div>
      )}

      {/* Backend Status Card */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-5 space-y-4">
        <h3 className="text-base font-semibold text-bio-text border-b border-bio-border pb-3">
          Backend API & Service Health
        </h3>
        <div className="space-y-3 text-xs font-mono">
          <div className="flex justify-between items-center bg-bio-bg p-3 rounded-lg border border-bio-border">
            <span className="text-bio-muted">FastAPI REST Server:</span>
            <span className={apiStatus.includes("Online") ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
              {apiStatus}
            </span>
          </div>
          <div className="flex justify-between items-center bg-bio-bg p-3 rounded-lg border border-bio-border">
            <span className="text-bio-muted">MQTT Mosquitto Broker:</span>
            <span className="text-bio-accent font-bold">localhost:1883 (Topic: tree/sensor-data)</span>
          </div>
          <div className="flex justify-between items-center bg-bio-bg p-3 rounded-lg border border-bio-border">
            <span className="text-bio-muted">WebSocket Live Stream:</span>
            <span className="text-emerald-400 font-bold">ws://localhost:8000/ws/sensor-stream</span>
          </div>
        </div>
      </div>

      {/* Active Demo Credentials Info */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-5 space-y-4">
        <h3 className="text-base font-semibold text-bio-text border-b border-bio-border pb-3 flex justify-between items-center">
          <span>Active Authentication Credentials</span>
          <span className="text-xs text-bio-muted font-mono">app/core/security.py</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-bio-bg p-3 rounded-lg border border-bio-border">
            <span className="text-bio-muted block mb-1">DEMO USERNAME:</span>
            <span className="text-bio-accent font-bold text-sm">admin</span>
          </div>
          <div className="bg-bio-bg p-3 rounded-lg border border-bio-border">
            <span className="text-bio-muted block mb-1">DEMO PASSWORD:</span>
            <span className="text-bio-accent font-bold text-sm">dhana@1234</span>
          </div>
        </div>
      </div>

      {/* Alert Threshold Configurations */}
      <div className="bg-bio-card border border-bio-border rounded-xl p-5 space-y-4">
        <h3 className="text-base font-semibold text-bio-text border-b border-bio-border pb-3">
          Rule-Based Alert Thresholds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <label className="text-bio-muted block mb-1">Min Bioelectric Potential (mV):</label>
            <input
              type="number"
              defaultValue={5.0}
              className="w-full bg-bio-bg border border-bio-border rounded-lg p-2.5 text-bio-text focus:outline-none focus:border-bio-accent"
            />
          </div>
          <div>
            <label className="text-bio-muted block mb-1">Max Fire Risk Temp (°C):</label>
            <input
              type="number"
              defaultValue={40.0}
              className="w-full bg-bio-bg border border-bio-border rounded-lg p-2.5 text-bio-text focus:outline-none focus:border-bio-accent"
            />
          </div>
          <div>
            <label className="text-bio-muted block mb-1">Min Drought Soil Moisture (%):</label>
            <input
              type="number"
              defaultValue={15.0}
              className="w-full bg-bio-bg border border-bio-border rounded-lg p-2.5 text-bio-text focus:outline-none focus:border-bio-accent"
            />
          </div>
          <div>
            <label className="text-bio-muted block mb-1">Max Cutting Spike Threshold (mV):</label>
            <input
              type="number"
              defaultValue={35.0}
              className="w-full bg-bio-bg border border-bio-border rounded-lg p-2.5 text-bio-text focus:outline-none focus:border-bio-accent"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-bio-accent text-black font-semibold text-xs hover:bg-bio-accent/90 transition-all"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
