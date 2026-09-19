import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="text-bio-text">
      <h1 className="text-2xl font-semibold mb-4">{name}</h1>
      <div className="bg-bio-card border border-bio-border rounded-xl p-6 text-bio-muted">
        {name} view coming soon.
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/live" element={<Placeholder name="Live Monitoring" />} />
          <Route path="/analytics" element={<Placeholder name="Analytics" />} />
          <Route path="/devices" element={<Placeholder name="Devices" />} />
          <Route path="/map" element={<Placeholder name="Map View" />} />
          <Route path="/reports" element={<Placeholder name="Reports" />} />
          <Route path="/settings" element={<Placeholder name="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}