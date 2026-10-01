import { useState, useEffect } from "react";

interface TrialArchive {
  id: string;
  title: string;
  code: string;
  subject: string;
  date: string;
  duration: string;
  status: "Completed" | "In Progress";
}

const ARCHIVES: TrialArchive[] = [
  { id: "1", title: "High Temperature Thermal Response", code: "EXP-001", subject: "Tree T-04", date: "Sep 09, 2026", duration: "04:12:00", status: "Completed" },
  { id: "2", title: "Rhizosphere Drought Inducement", code: "EXP-002", subject: "Tree T-02", date: "Sep 05, 2026", duration: "06:45:00", status: "Completed" },
  { id: "3", title: "Micro-Vibrational Mechanical Impulse", code: "EXP-003", subject: "Tree T-01", date: "Aug 28, 2026", duration: "01:20:00", status: "Completed" },
];

export default function Reports() {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(9258); // 02:34:18 initial
  const [dataPoints, setDataPoints] = useState(1420);

  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setDataPoints((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatDuration = (sec: number) => {
    const hrs = Math.floor(sec / 3600).toString().padStart(2, "0");
    const mins = Math.floor((sec % 3600) / 60).toString().padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleExportCSV = () => {
    // Generate static CSV download
    const csvContent = "data:text/csv;charset=utf-8,Device_ID,Timestamp,Bioelectric_mV,Soil_Moisture,Temperature_C,Humidity,Condition\nESP32-01,2026-09-10T10:24:00Z,742,68,31.3,68,NORMAL\nESP32-02,2026-09-10T10:24:00Z,48,42,33.1,58,ILLEGAL CUTTING\nESP32-03,2026-09-10T10:24:00Z,12,10,44.5,15,FIRE RISK\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "intrinsic_bio_sensing_dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-bio-text space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono mb-2">
            <span className="bg-bio-accent/10 text-bio-accent px-2.5 py-0.5 rounded border border-bio-accent/30 font-semibold">
              RESEARCH LAB & TRIALS
            </span>
            <span className="text-bio-muted uppercase font-mono">IEEE RESEARCH PROTOCOL</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-bio-text flex items-center gap-3">
            <span className="text-bio-accent">📄</span>
            Scientific Experiments & Trial Logging
          </h1>
          <p className="text-xs text-bio-muted mt-1">
            Record physiological reaction cycles under controlled perturbations (thermal rise, drought, mechanical stimulus).
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bio-card border border-bio-border hover:border-bio-accent text-xs font-mono text-bio-text transition-all shadow-md self-start md:self-auto"
        >
          <span>📥</span>
          <span>Export Dataset (CSV)</span>
        </button>
      </div>

      {/* Main Active Experiment Card */}
      <div className="bg-bio-card border border-bio-border rounded-2xl p-6 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-bio-border/60 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-bio-accent animate-pulse" />
            <h3 className="text-base font-bold text-bio-text tracking-tight font-mono">
              Heat Stress & Sap-Flow Attenuation
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Sub-grid info boxes */}
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-bio-bg p-4 rounded-xl border border-bio-border/60 font-mono">
              <div className="text-[10px] text-bio-muted mb-1 uppercase">TEST SUBJECT</div>
              <div className="text-xs font-bold text-bio-text">Tree T-04 (Canopy Reference)</div>
            </div>

            <div className="bg-bio-bg p-4 rounded-xl border border-bio-border/60 font-mono">
              <div className="text-[10px] text-bio-muted mb-1 uppercase">RECORDED DURATION</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span>⏱️</span>
                <span>{formatDuration(seconds)}</span>
                <span className="text-[10px] font-normal text-emerald-400/80">({isRunning ? "Active" : "Paused"})</span>
              </div>
            </div>

            <div className="bg-bio-bg p-4 rounded-xl border border-bio-border/60 font-mono">
              <div className="text-[10px] text-bio-muted mb-1 uppercase">DATA POINTS LOGGED</div>
              <div className="text-xs font-bold text-bio-text">{dataPoints} points</div>
            </div>
          </div>

          {/* Action Button & Carousel Arrow */}
          <div className="md:col-span-3 flex items-center justify-end gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-bio-accent text-black font-mono font-bold text-xs hover:bg-bio-accent/90 transition-all shadow-glow flex items-center justify-center gap-2"
            >
              <span>{isRunning ? "⏸ PAUSE EXPERIMENT" : "▶ START EXPERIMENT"}</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-bio-elevated border border-bio-border text-bio-text flex items-center justify-center font-bold text-xs hover:border-bio-accent transition-all hidden sm:flex">
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Historical Trial Archives Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-bio-text tracking-tight font-mono">
          Historical Trial Archives
        </h3>

        <div className="space-y-3">
          {ARCHIVES.map((item) => (
            <div
              key={item.id}
              className="bg-bio-card border border-bio-border/60 hover:border-bio-accent/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-bio-elevated border border-bio-border flex items-center justify-center text-bio-accent text-sm">
                  ⚡
                </div>
                <div>
                  <h4 className="font-bold text-sm text-bio-text">{item.title}</h4>
                  <div className="text-xs font-mono text-bio-muted mt-0.5">
                    {item.code} • {item.subject} • {item.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs self-end sm:self-auto">
                <span className="text-bio-muted">{item.duration}</span>
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5 font-semibold">
                  <span>✓</span>
                  <span>{item.status}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
