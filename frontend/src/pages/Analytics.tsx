import { useEffect, useState } from "react";
import api from "../lib/api";

interface Prediction {
  device_id: string;
  timestamp: string;
  condition: string;
  reason: string;
  is_alert: number;
}

export default function Analytics() {
  const [history, setHistory] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/predictions?limit=50");
        setHistory(res.data);
      } catch {
        setHistory([]);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-bio-bg min-h-screen text-bio-text">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      <div className="bg-bio-card rounded-lg p-4 border border-bio-accent/10">
        <h3 className="text-sm text-bio-muted mb-3">Classification History</h3>
        {history.length === 0 ? (
          <div className="text-bio-muted/60 text-sm">No predictions logged yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-bio-muted border-b border-bio-accent/10">
                <th className="py-2">Device</th>
                <th className="py-2">Condition</th>
                <th className="py-2">Reason</th>
                <th className="py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((p, i) => (
                <tr key={i} className="border-b border-bio-accent/5">
                  <td className="py-2">{p.device_id}</td>
                  <td
                    className={`py-2 ${
                      p.is_alert ? "text-bio-critical" : "text-bio-accent"
                    }`}
                  >
                    {p.condition}
                  </td>
                  <td className="py-2 text-bio-muted">{p.reason}</td>
                  <td className="py-2 text-bio-muted/70">
                    {new Date(p.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}