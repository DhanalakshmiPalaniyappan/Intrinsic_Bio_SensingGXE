import { NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/live", label: "Live Monitoring", icon: "📈" },
  { to: "/analytics", label: "Analytics", icon: "📊" },
  { to: "/devices", label: "Devices", icon: "📟" },
  { to: "/reports", label: "Reports & Trials", icon: "📄" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-bio-border bg-bio-bg2 min-h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="px-5 py-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-bio-elevated border border-bio-border flex items-center justify-center text-bio-accent text-lg shadow-glow-sm">
          🌲
        </div>
        <div>
          <div className="text-bio-text font-bold text-sm tracking-wide leading-tight">
            INTRINSIC <span className="text-bio-accent">BIO-SENSING</span>
          </div>
          <div className="text-[11px] text-bio-muted mt-0.5">Intrinsic Bio-Sensing</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1.5 mt-2">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-bio-elevated text-bio-text border border-bio-border shadow-card"
                  : "text-bio-muted hover:text-bio-text hover:bg-bio-card/60"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-sm opacity-90">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-bio-accent shadow-glow" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer & Logout */}
      <div className="p-4 border-t border-bio-border space-y-3">
        <div className="text-[11px] font-mono text-bio-faint flex items-center justify-between">
          <span>BIO-TELEMETRY CORE</span>
          <span className="flex items-center gap-1.5 text-bio-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-bio-accent animate-pulse" />
            ACTIVE
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full py-2 px-3 rounded-lg bg-bio-card hover:bg-red-500/10 hover:text-red-400 text-bio-muted border border-bio-border/60 hover:border-red-500/30 text-xs font-mono transition-all flex items-center justify-center gap-2"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
