import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useTelemetry } from "../context/TelemetryContext";

export default function Layout() {
  const { selectedStation, setSelectedStation } = useTelemetry();

  return (
    <div className="flex bio-grid-bg min-h-screen text-bio-text font-sans selection:bg-bio-accent selection:text-black">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top App Header */}
        <header className="h-14 border-b border-bio-border bg-bio-bg/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 text-xs">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-bio-faint">STATION:</span>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="bg-bio-card border border-bio-border text-bio-accent px-3 py-1 rounded-lg focus:outline-none focus:border-bio-accent cursor-pointer font-mono"
            >
              <option value="CANOPY-NODE-ALPHA (T-04)">CANOPY-NODE-ALPHA (T-04)</option>
              <option value="CANOPY-NODE-BETA (T-02)">CANOPY-NODE-BETA (T-02)</option>
              <option value="ROOT-NODE-GAMMA (T-03)">ROOT-NODE-GAMMA (T-03)</option>
            </select>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-mono text-bio-muted">
              <span className="flex items-center gap-1.5 text-bio-accent font-semibold">
                <span className="w-2 h-2 rounded-full bg-bio-accent animate-pulse" /> LIVE
              </span>
              <span className="text-bio-border">|</span>
              <span>Sep 10, 2026 10:24 AM</span>
            </div>

            <div className="flex items-center gap-2 font-mono bg-bio-card px-2.5 py-1 rounded-lg border border-bio-border text-bio-text">
              <span className="w-5 h-5 rounded-full bg-bio-accent/20 border border-bio-accent/40 text-bio-accent flex items-center justify-center font-bold text-[10px]">
                RT
              </span>
              <span>Research Team</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 md:px-8 py-6 max-w-[1440px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
