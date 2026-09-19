import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bio-grid-bg px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-bio-card border border-bio-border rounded-xl shadow-glow-sm p-8 w-full max-w-sm"
      >
        <div className="flex items-center gap-2 text-bio-text font-bold tracking-tight mb-1">
          <span className="text-bio-accent text-xl">🌿</span>
          <span>INTRINSIC BIO-SENSING</span>
        </div>
        <p className="text-bio-muted text-xs mb-6">Forest Intelligence System</p>

        {error && (
          <div className="bg-bio-critical/10 border border-bio-critical/40 text-bio-critical text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <label className="block text-xs text-bio-muted mb-1">Username</label>
        <input
          className="w-full mb-4 px-3 py-2 rounded-lg bg-bio-elevated text-bio-text border border-bio-border focus:outline-none focus:border-bio-accent text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-xs text-bio-muted mb-1">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-3 py-2 rounded-lg bg-bio-elevated text-bio-text border border-bio-border focus:outline-none focus:border-bio-accent text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-bio-accent hover:shadow-glow disabled:opacity-50 text-bio-bg font-medium py-2 rounded-lg transition text-sm"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}