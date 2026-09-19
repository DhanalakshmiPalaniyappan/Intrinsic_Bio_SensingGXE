export default function InteractiveTree({ activeNode = "Trunk", onSelectNode }: { activeNode?: string; onSelectNode?: (name: string) => void }) {
  // activeNode passed for future node highlight
  void activeNode;
  return (
    <div className="relative w-full h-[280px] flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#0D1C16]/80 to-[#07110D]/95 border border-[#19382B]/60 p-4">
      {/* Bioluminescent Ambient Glow */}
      <div className="absolute w-44 h-44 rounded-full bg-[#27E6B0]/10 blur-3xl pointer-events-none -top-4"></div>
      <div className="absolute w-36 h-36 rounded-full bg-[#27E6B0]/10 blur-2xl pointer-events-none -bottom-6"></div>

      <svg viewBox="0 0 400 320" className="w-full h-full max-h-[260px] drop-shadow-[0_0_12px_rgba(39,230,176,0.3)]">
        <defs>
          <linearGradient id="bioTrunk" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#11251C" />
            <stop offset="50%" stopColor="#19382B" />
            <stop offset="100%" stopColor="#27E6B0" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="rootGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#27E6B0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#19382B" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Canopy bioluminescent nodes & foliage clusters */}
        <g className="canopy-leaves opacity-75">
          <ellipse cx="200" cy="80" rx="90" ry="50" fill="#0A2218" stroke="#19382B" strokeWidth="1" />
          <ellipse cx="140" cy="95" rx="55" ry="35" fill="#0D2A1E" stroke="#27E6B0" strokeWidth="0.5" strokeOpacity="0.4" />
          <ellipse cx="260" cy="95" rx="55" ry="35" fill="#0D2A1E" stroke="#27E6B0" strokeWidth="0.5" strokeOpacity="0.4" />
          <circle cx="200" cy="65" r="45" fill="#113526" stroke="#27E6B0" strokeWidth="0.8" strokeOpacity="0.6" />
        </g>

        {/* Tree Trunk & Branches */}
        <path
          d="M200,210 Q200,160 200,130 Q180,110 145,95 M200,140 Q225,120 255,100 M200,120 Q195,90 200,65"
          fill="none"
          stroke="url(#bioTrunk)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated Bioluminescent Pulse Trunk -> Branches */}
        <path
          d="M200,225 L200,130 Q180,110 145,95 M200,140 Q225,120 255,100 M200,120 L200,65"
          fill="none"
          stroke="#27E6B0"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-tree-pulse"
          filter="url(#glow)"
        />

        {/* Roots System spreading downwards into Soil/Mycorrhizal Network */}
        <g stroke="url(#rootGlow)" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* Main Taproot */}
          <path d="M200,215 Q200,250 200,285" />
          {/* Lateral root branches */}
          <path d="M200,225 Q170,250 130,270 Q105,280 75,290" />
          <path d="M200,225 Q230,250 270,270 Q295,280 325,290" />
          <path d="M170,250 Q150,280 120,305" />
          <path d="M230,250 Q250,280 280,305" />
          <path d="M200,260 Q185,290 175,310" />
          <path d="M200,260 Q215,290 225,310" />
        </g>

        {/* Mycorrhizal network fine nodes */}
        <g fill="#27E6B0" filter="url(#glow)">
          <circle cx="75" cy="290" r="3" className="animate-ping opacity-60" />
          <circle cx="75" cy="290" r="2.5" />
          <circle cx="120" cy="305" r="2" />
          <circle cx="175" cy="310" r="2.5" />
          <circle cx="200" cy="285" r="3" className="animate-pulse" />
          <circle cx="225" cy="310" r="2.5" />
          <circle cx="280" cy="305" r="2" />
          <circle cx="325" cy="290" r="3" className="animate-ping opacity-60" />
        </g>

        {/* Bio-Signal Sensor Collar (Electrode Attachment Point on Trunk) */}
        <g
          className="cursor-pointer group"
          onClick={() => onSelectNode && onSelectNode("Electrode Array")}
        >
          <circle cx="200" cy="175" r="8" fill="#07110D" stroke="#27E6B0" strokeWidth="2" filter="url(#glow)" />
          <circle cx="200" cy="175" r="4" fill="#27E6B0" className="animate-pulse" />
          <text x="215" y="179" fill="#27E6B0" fontSize="9" fontFamily="IBM Plex Mono" fontWeight="600">
            CH-01 [742mV]
          </text>
        </g>

        {/* Sensor Node 2 (Branch / Foliage Potential) */}
        <g
          className="cursor-pointer group"
          onClick={() => onSelectNode && onSelectNode("Canopy Sensor")}
        >
          <circle cx="145" cy="95" r="6" fill="#07110D" stroke="#27E6B0" strokeWidth="1.5" />
          <circle cx="145" cy="95" r="3" fill="#27E6B0" />
          <text x="95" y="90" fill="#8FA99D" fontSize="8" fontFamily="IBM Plex Mono">
            LEAF TEMP 31.3°C
          </text>
        </g>

        {/* Sensor Node 3 (Root Impedance) */}
        <g
          className="cursor-pointer group"
          onClick={() => onSelectNode && onSelectNode("Rhizosphere Probe")}
        >
          <circle cx="200" cy="255" r="6" fill="#07110D" stroke="#27E6B0" strokeWidth="1.5" />
          <circle cx="200" cy="255" r="3" fill="#27E6B0" />
          <text x="215" y="259" fill="#8FA99D" fontSize="8" fontFamily="IBM Plex Mono">
            ROOT-MYCO 68%
          </text>
        </g>
      </svg>

      {/* Floating telemetry label */}
      <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#07110D]/80 border border-[#19382B] px-2.5 py-1 rounded-full text-[11px] font-mono text-[#8FA99D]">
        <span className="w-2 h-2 rounded-full bg-[#27E6B0] animate-pulse"></span>
        <span>PHYSIOLOGY: ACTIVE</span>
      </div>

      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-[#61766B]">
        3-NODE DIFFERENTIAL COUPLING
      </div>
    </div>
  );
}
