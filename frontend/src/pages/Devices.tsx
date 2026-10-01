import { useState } from "react";
import { useTelemetry } from "../context/TelemetryContext";
import WaveformCanvas from "../components/WaveformCanvas";

const MICROVOLT_LEVELS = [-50, -25, 0, 25, 50, 75, 100];

export default function Devices() {
  const { devices, updateDeviceMicrovolts, microvolts } = useTelemetry();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const onlineCount = devices.filter((d) => d.status === "ONLINE").length;

  const formatUv = (val: number) => (val > 0 ? `+${val} µV` : `${val} µV`);

  return (
    <div className="text-bio-text space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
            <span className="bg-bio-accent/10 text-bio-accent px-2.5 py-0.5 rounded border border-bio-accent/30 font-semibold">
              HARDWARE FLEET
            </span>
            <span className="text-bio-muted font-bold">
              {onlineCount} / {devices.length} OPERATIONAL
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-bio-text flex items-center gap-3">
            <span className="text-bio-accent">📟</span>
            ESP32 IoT Nodes & Bio-Amplifiers
          </h1>
          <p className="text-xs text-bio-muted mt-1">
            Live telemetry status for 24-bit differential instrumentation amplifiers (-50 µV to +100 µV range).
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bio-card border border-bio-border hover:border-bio-accent text-xs font-mono text-bio-text transition-all self-start md:self-auto"
        >
          <span className={refreshing ? "animate-spin" : ""}>🔄</span>
          <span>Refresh Fleet</span>
        </button>
      </div>

      {/* Global Microvolts Status Bar (-50 µV to +100 µV) */}
      <div className="bg-bio-card border border-bio-border rounded-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-bio-accent font-bold">BIO-POTENTIAL SIGNAL RANGE:</span>
          <span className="bg-bio-elevated text-bio-accent px-3 py-1 rounded-lg border border-bio-border font-bold">
            {formatUv(microvolts)}
          </span>
          <span className="text-bio-faint">(-50 µV to +100 µV Active Range)</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-bio-muted mr-1">Select Level:</span>
          {MICROVOLT_LEVELS.map((uv) => (
            <button
              key={uv}
              onClick={() => updateDeviceMicrovolts("esp32-01", uv)}
              className={`px-2.5 py-1 rounded-md transition-all font-mono text-xs ${
                microvolts === uv
                  ? "bg-bio-accent text-black font-bold shadow-glow-sm"
                  : "bg-bio-elevated text-bio-muted hover:text-bio-text border border-bio-border"
              }`}
            >
              {formatUv(uv)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of ESP32 IoT Node Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => {
          const isOnline = device.status === "ONLINE";
          const currentUv = device.microvolts ?? microvolts;

          return (
            <div
              key={device.id}
              className={`bg-bio-card border rounded-2xl p-6 space-y-5 transition-all shadow-md hover:shadow-lg ${
                isOnline
                  ? "border-bio-border hover:border-bio-accent/60"
                  : "border-red-500/30 bg-bio-card/70"
              }`}
            >
              {/* Card Top Row */}
              <div className="flex justify-between items-center border-b border-bio-border/40 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-bio-elevated border border-bio-border flex items-center justify-center text-bio-accent text-base font-mono shadow-inner">
                    📟
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-bio-text flex items-center gap-1.5">
                      {device.name} <span className="text-xs text-bio-muted font-normal font-mono">({device.code})</span>
                    </h3>
                    <div className="text-[11px] font-mono text-bio-faint mt-0.5">
                      MQTT PROTOCOL: {isOnline ? "ACTIVE" : "INACTIVE"}
                    </div>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                    isOnline
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-red-500/10 text-red-400 border-red-500/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-emerald-400 animate-pulse" : "bg-red-400"}`} />
                  {device.status}
                </span>
              </div>

              {/* Waveform preview container - enlarged with height 65 for clean, uncropped visualization */}
              <div className="rounded-xl overflow-hidden border border-bio-border/40 bg-bio-bg/80 p-2 shadow-inner">
                {isOnline ? (
                  <WaveformCanvas
                    height={65}
                    color={currentUv < 0 ? "#F5B942" : "#27E6B0"}
                    hertz={Math.abs(currentUv) + 150}
                    speed={1.6}
                    amplitude={14}
                    showGrid={false}
                  />
                ) : (
                  <div className="h-[65px] flex items-center justify-center text-xs font-mono text-bio-faint border border-dashed border-bio-border/30 rounded-lg bg-bio-bg/40">
                    <span className="flex items-center gap-2 opacity-60">
                      <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                      OFFLINE - NO SIGNAL TRANSMISSION
                    </span>
                  </div>
                )}
              </div>

              {/* Card Telemetry Details */}
              <div className="space-y-3 text-xs font-mono pt-1">
                <div className="flex justify-between items-center text-bio-muted">
                  <span className="flex items-center gap-2">
                    <span>📶</span> Link RSSI
                  </span>
                  <span className={isOnline ? "text-bio-text font-bold" : "text-bio-faint"}>
                    {device.rssi}
                  </span>
                </div>

                <div className="flex justify-between items-center text-bio-muted">
                  <span className="flex items-center gap-2">
                    <span>🔋</span> Battery
                  </span>
                  <span className={device.battery > 20 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {device.battery}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-bio-muted">
                  <span>Bio-Potential (µV)</span>
                  {isOnline ? (
                    <select
                      value={currentUv}
                      onChange={(e) => updateDeviceMicrovolts(device.id, Number(e.target.value))}
                      className="bg-bio-elevated border border-bio-border text-bio-accent px-2.5 py-1 rounded-lg text-xs focus:outline-none focus:border-bio-accent cursor-pointer font-bold transition-all hover:border-bio-accent/60"
                    >
                      {MICROVOLT_LEVELS.map((uv) => (
                        <option key={uv} value={uv}>
                          {formatUv(uv)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-bio-faint font-semibold">Standby</span>
                  )}
                </div>

                <div className="flex justify-between items-center text-bio-muted pt-2 border-t border-bio-border/30 text-[11px]">
                  <span>Last Reading:</span>
                  <span className="text-bio-faint font-semibold">{device.lastReading}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}