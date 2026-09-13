import { useEffect, useRef, useState } from "react";

export interface LiveReading {
  device_id: string;
  timestamp: string;
  bioelectric_mv: number;
  soil_moisture: number;
  temperature_c: number;
  humidity: number;
  condition: string;
  reason: string;
  is_alert: number;
}

export function useLiveData() {
  const [latest, setLatest] = useState<LiveReading | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/live");
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      const data: LiveReading = JSON.parse(event.data);
      setLatest(data);
    };

    return () => ws.close();
  }, []);

  return { latest, connected };
}