import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LiveMonitoring from "./pages/LiveMonitoring";
import Analytics from "./pages/Analytics";
import Devices from "./pages/Devices";
import MapView from "./pages/MapView";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { TelemetryProvider } from "./context/TelemetryContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const authVal = localStorage.getItem("isAuthenticated");
  const isAuthenticated = authVal === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <TelemetryProvider>
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
            <Route path="/live" element={<LiveMonitoring />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TelemetryProvider>
  );
}