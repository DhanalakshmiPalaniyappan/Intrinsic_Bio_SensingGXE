import { useState } from "react";

interface NodeMarker {
  id: string;
  name: string;
  species: string;
  lat: number;
  lng: number;
  x: number; // grid percentage for SVG/CSS rendering
  y: number;
  status: "healthy" | "warning" | "critical";
  bioelectric_mv: number;
  temperature: number;
  moisture: number;
}

const DUMMY_NODES: NodeMarker[] = [
  { id: "esp32-01", name: "Tree Node Alpha (Oak)", species: "Quercus robur", lat: 12.9716, lng: 77.5946, x: 35, y: 40, status: "healthy", bioelectric_mv: 14.2, temperature: 29.5, moisture: 48 },
  { id: "esp32-02", name: "Tree Node Beta (Pine)", species: "Pinus sylvestris", lat: 12.9722, lng: 77.5960, x: 55, y: 30, status: "warning", bioelectric_mv: 3.8, temperature: 38.2, moisture: 24 },
  { id: "esp32-03", name: "Tree Node Gamma (Teak)", species: "Tectona grandis", lat: 12.9708, lng: 77.5930, x: 25, y: 65, status: "healthy", bioelectric_mv: 16.8, temperature: 30.1, moisture: 52 },
  { id: "esp32-04", name: "Tree Node Delta (Eucalyptus)", species: "Eucalyptus globulus", lat: 12.9730, lng: 77.5980, x: 75, y: 50, status: "critical", bioelectric_mv: 48.5, temperature: 43.1, moisture: 12 },
  { id: "esp32-05", name: "Tree Node Epsilon (Redwood)", species: "Sequoia sempervirens", lat: 12.9695, lng: 77.5995, x: 80, y: 75, status: "healthy", bioelectric_mv: 13.5, temperature: 28.9, moisture: 50 },
];

export default function MapView() {
  const [selectedNode, setSelectedNode] = useState<NodeMarker>(DUMMY_NODES[0]);
  const [filter, setFilter] = useState<string>("all");

  const filteredNodes = DUMMY_NODES.filter((n) => {
    if (filter === "all") return true;
    return n.status === filter;
  });

  return (
    <div className="text-bio-text space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-bio-text">Forest Sensor Geospatial Map</h1>
          <p className="text-sm text-bio-muted mt-1">
            Spatial distribution and real-time health telemetry across monitored forest zones
          </p>
        </div>

        <div className="flex items-center gap-2 bg-bio-card p-1.5 rounded-xl border border-bio-border text-xs">
          <span className="text-bio-muted px-2 font-mono">FILTER:</span>
          {["all", "healthy", "warning", "critical"].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1 rounded-lg capitalize transition-all ${
                filter === st
                  ? "bg-bio-accent/20 text-bio-accent font-semibold border border-bio-accent/30"
                  : "text-bio-muted hover:text-bio-text"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-bio-card border border-bio-border rounded-xl p-4 relative min-h-[480px] flex flex-col justify-between overflow-hidden">
          {/* Map Grid Pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#19382B_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

          {/* Map Header */}
          <div className="relative z-10 flex justify-between items-center bg-bio-bg/80 backdrop-blur border border-bio-border px-3 py-2 rounded-lg text-xs font-mono text-bio-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bio-accent animate-pulse"></span>
              ZONE 4B — TROPICAL FOREST PRESERVE
            </span>
            <span>GRID COORDS: 12.9716° N, 77.5946° E</span>
          </div>

          {/* Interactive Map Visual Surface */}
          <div className="relative w-full h-[380px] my-auto">
            {/* Topography contour lines overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-bio-accent" fill="none" strokeWidth="1">
              <path d="M 50,100 Q 200,50 350,150 T 600,200" />
              <path d="M 30,200 Q 180,160 400,220 T 700,180" />
              <path d="M 100,300 Q 300,250 500,310 T 800,280" />
            </svg>

            {/* Tree Node Markers */}
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              const colorClass =
                node.status === "healthy"
                  ? "bg-emerald-500 shadow-emerald-500/50"
                  : node.status === "warning"
                  ? "bg-amber-500 shadow-amber-500/50 animate-pulse"
                  : "bg-red-500 shadow-red-500/50 animate-ping";

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className={`relative flex items-center justify-center`}>
                    <div
                      className={`w-6 h-6 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-black font-bold text-[10px] transition-transform ${
                        isSelected ? "scale-125 ring-4 ring-bio-accent/40" : "group-hover:scale-110"
                      }`}
                    >
                      🌿
                    </div>
                    {/* Node Tag */}
                    <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-bio-bg/90 border border-bio-border text-[10px] font-mono px-2 py-0.5 rounded shadow-lg text-bio-text pointer-events-none">
                      {node.id} ({node.bioelectric_mv}mV)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Footer Legend */}
          <div className="relative z-10 flex items-center justify-between bg-bio-bg/80 backdrop-blur border border-bio-border px-3 py-2 rounded-lg text-xs font-mono">
            <div className="flex items-center gap-4 text-bio-muted">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Healthy</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Heat Stress</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical / Fire</span>
            </div>
            <span className="text-bio-faint">ACTIVE NODES: {DUMMY_NODES.length}</span>
          </div>
        </div>

        {/* Selected Node Telemetry Sidebar */}
        <div className="bg-bio-card border border-bio-border rounded-xl p-5 space-y-4">
          <div className="border-b border-bio-border pb-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-bio-accent">{selectedNode.id}</span>
                <h3 className="text-lg font-bold text-bio-text">{selectedNode.name}</h3>
                <p className="text-xs text-bio-muted italic">{selectedNode.species}</p>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                  selectedNode.status === "healthy"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : selectedNode.status === "warning"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    : "bg-red-500/10 text-red-400 border border-red-500/30"
                }`}
              >
                {selectedNode.status}
              </span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="bg-bio-bg p-3 rounded-lg border border-bio-border flex justify-between items-center">
              <span className="text-bio-muted">Bio-Potential Difference:</span>
              <span className="text-bio-accent font-bold text-sm">{selectedNode.bioelectric_mv} mV</span>
            </div>
            <div className="bg-bio-bg p-3 rounded-lg border border-bio-border flex justify-between items-center">
              <span className="text-bio-muted">Ambient Temperature:</span>
              <span className="text-bio-text font-bold text-sm">{selectedNode.temperature} °C</span>
            </div>
            <div className="bg-bio-bg p-3 rounded-lg border border-bio-border flex justify-between items-center">
              <span className="text-bio-muted">Soil Volumetric Moisture:</span>
              <span className="text-bio-text font-bold text-sm">{selectedNode.moisture} %</span>
            </div>
            <div className="bg-bio-bg p-3 rounded-lg border border-bio-border flex justify-between items-center">
              <span className="text-bio-muted">Coordinates:</span>
              <span className="text-bio-muted/80">{selectedNode.lat}, {selectedNode.lng}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(`Ping request sent to ${selectedNode.id}`)}
              className="w-full py-2.5 rounded-lg bg-bio-accent/20 hover:bg-bio-accent/30 text-bio-accent border border-bio-accent/40 font-semibold text-xs transition-all"
            >
              Ping Node Diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
