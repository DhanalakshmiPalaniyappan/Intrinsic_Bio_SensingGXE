import React, { createContext, useContext, useState } from "react";

export interface DeviceNode {
  id: string;
  name: string;
  code: string;
  status: "ONLINE" | "OFFLINE";
  rssi: string;
  battery: number;
  microvolts: number; // in range -50 to +100 µV
  lastReading: string;
  bioelectric_mv: number;
  temperature: number;
  moisture: number;
  condition: string;
}

interface TelemetryContextType {
  microvolts: number;
  setMicrovolts: (uv: number) => void;
  hertz: number;
  devices: DeviceNode[];
  updateDeviceMicrovolts: (id: string, uv: number) => void;
  selectedStation: string;
  setSelectedStation: (s: string) => void;
}

const DEFAULT_DEVICES: DeviceNode[] = [
  { id: "esp32-01", name: "Tree T-01", code: "ESP32-01", status: "ONLINE", rssi: "-54 dBm (Stable)", battery: 98, microvolts: 50, lastReading: "9:45:52 PM", bioelectric_mv: 742, temperature: 31.3, moisture: 68, condition: "NORMAL" },
  { id: "esp32-02", name: "Tree T-02", code: "ESP32-02", status: "ONLINE", rssi: "-54 dBm (Stable)", battery: 95, microvolts: -25, lastReading: "9:45:52 PM", bioelectric_mv: 48, temperature: 33.1, moisture: 42, condition: "ILLEGAL CUTTING" },
  { id: "esp32-03", name: "Tree T-03", code: "ESP32-03", status: "ONLINE", rssi: "-54 dBm (Stable)", battery: 92, microvolts: -50, lastReading: "9:45:52 PM", bioelectric_mv: 12, temperature: 44.5, moisture: 10, condition: "FIRE RISK" },
  { id: "esp32-04", name: "Tree T-04", code: "ESP32-04", status: "ONLINE", rssi: "-54 dBm (Stable)", battery: 88, microvolts: 75, lastReading: "9:45:52 PM", bioelectric_mv: 742, temperature: 31.3, moisture: 68, condition: "NORMAL" },
  { id: "esp32-05", name: "Tree T-05", code: "ESP32-05", status: "ONLINE", rssi: "-54 dBm (Stable)", battery: 76, microvolts: 100, lastReading: "9:45:52 PM", bioelectric_mv: 3, temperature: 38.4, moisture: 24, condition: "HEAT STRESS" },
  { id: "esp32-06", name: "Tree T-06", code: "ESP32-06", status: "OFFLINE", rssi: "Disconnected", battery: 12, microvolts: 0, lastReading: "Standby", bioelectric_mv: 0, temperature: 0, moisture: 0, condition: "OFFLINE" },
];

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [microvolts, setMicrovolts] = useState<number>(50);
  const [devices, setDevices] = useState<DeviceNode[]>(DEFAULT_DEVICES);
  const [selectedStation, setSelectedStation] = useState<string>("CANOPY-NODE-ALPHA (T-04)");

  const updateDeviceMicrovolts = (id: string, uv: number) => {
    setDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, microvolts: uv } : d))
    );
    setMicrovolts(uv);
  };

  return (
    <TelemetryContext.Provider
      value={{
        microvolts,
        setMicrovolts,
        hertz: Math.abs(microvolts) + 200, // scaling helper for canvas animation
        devices,
        updateDeviceMicrovolts,
        selectedStation,
        setSelectedStation,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error("useTelemetry must be used within TelemetryProvider");
  }
  return context;
};
