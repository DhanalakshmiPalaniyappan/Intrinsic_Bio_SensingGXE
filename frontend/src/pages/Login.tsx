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
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bio-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-bio-card p-8 rounded-lg shadow-xl w-full max-w-sm border border-bio-accent/10"
      >
        <h1 className="text-xl font-semibold text-bio-text mb-1">
          Intrinsic Bio-Sensing
        </h1>
        <p className="text-bio-muted text-sm mb-6">Tree Monitoring Platform</p>

        {error && (
          <div className="bg-bio-critical/10 text-bio-critical text-sm rounded px-3 py-2 mb-4 border border-bio-critical/30">
            {error}
          </div>
        )}

        <label className="block text-sm text-bio-muted mb-1">Username</label>
        <input
          className="w-full mb-4 px-3 py-2 rounded bg-bio-bg text-bio-text border border-bio-muted/30 focus:outline-none focus:border-bio-accent"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-sm text-bio-muted mb-1">Password</label>
        <input
          type="password"
          className="w-full mb-6 px-3 py-2 rounded bg-bio-bg text-bio-text border border-bio-muted/30 focus:outline-none focus:border-bio-accent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-bio-accent hover:bg-bio-accent/90 disabled:opacity-50 text-bio-bg font-semibold py-2 rounded transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}