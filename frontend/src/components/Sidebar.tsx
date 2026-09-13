import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/live", label: "Live Monitoring", icon: "〜" },
  { to: "/analytics", label: "Analytics", icon: "▤" },
  { to: "/devices", label: "Devices", icon: "📡" },
  { to: "/map", label: "Map View", icon: "◎" },
  { to: "/reports", label: "Reports", icon: "▥" },
  { to: "/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 border-r border-bio-border bg-bio-bg2 min-h-screen sticky top-0">
      <div className="px-5 py-6">
        <div className="flex items-center gap-2 text-bio-text font-bold tracking-tight">
          <span className="text-bio-accent text-xl">🌿</span>
          <span>INTRINSIC BIO-SENSING</span>
        </div>
        <div className="text-xs text-bio-muted mt-1 ml-7">Forest Intelligence System</div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all border-l-2 ${
                isActive
                  ? "bg-bio-elevated border-bio-accent text-bio-accent font-medium"
                  : "border-transparent text-bio-muted hover:text-bio-text hover:bg-bio-elevated/60"
              }`
            }
          >
            <span className="w-4 text-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 text-xs text-bio-faint border-t border-bio-border">
        <p>Healthy Trees Build a Healthier Tomorrow</p>
        <div className="mt-2 h-1 rounded-full bg-gradient-to-r from-bio-accent to-transparent" />
      </div>
    </aside>
  );
}
