import { useId } from "react";

/**
 * Signature visual: a minimal glowing tree whose roots and branches carry
 * slow bioluminescent pulses that resolve into a bio-signal waveform.
 * "The tree is communicating." — slow, elegant, never dramatic.
 */
export default function TreeSignalVisual({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");

  const branchPaths = [
    "M300 260 C300 200 260 170 230 120",
    "M300 260 C300 190 330 160 360 110",
    "M300 260 C300 210 280 190 250 165",
    "M300 260 C300 210 320 195 350 175",
  ];

  const rootPaths = [
    "M300 300 C300 340 250 355 210 400",
    "M300 300 C300 345 340 360 385 405",
    "M300 300 C300 335 280 350 255 390",
    "M300 300 C300 335 320 355 345 395",
    "M300 300 C300 350 300 375 300 420",
  ];

  return (
    <div className={className}>
      <svg viewBox="0 0 600 520" className="w-full h-full" role="img" aria-label="Animated tree bio-signal visualization">
        <defs>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="52%" r="55%">
            <stop offset="0%" stopColor="#27E6B0" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#27E6B0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`trunk-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D3A2E" />
            <stop offset="100%" stopColor="#0D1C16" />
          </linearGradient>
          <filter id={`soft-${uid}`}>
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        <circle cx="300" cy="280" r="230" fill={`url(#glow-${uid})`} />

        {/* Static structure: trunk, branches, roots */}
        <g stroke="#19382B" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d={`M300 300 L300 260`} stroke={`url(#trunk-${uid})`} strokeWidth="10" />
          {branchPaths.map((d, i) => (
            <path key={`b-${i}`} d={d} />
          ))}
          {rootPaths.map((d, i) => (
            <path key={`r-${i}`} d={d} />
          ))}
        </g>

        {/* Canopy - minimal, not cartoonish */}
        <g fill="#123326" stroke="#1D4433" strokeWidth="1">
          <ellipse cx="300" cy="140" rx="95" ry="60" opacity="0.9" />
          <ellipse cx="230" cy="120" rx="55" ry="38" opacity="0.75" />
          <ellipse cx="365" cy="115" rx="60" ry="40" opacity="0.75" />
        </g>

        {/* Traveling bioluminescent pulses along branches (root -> trunk -> branch) */}
        {branchPaths.map((d, i) => (
          <circle key={`pb-${i}`} r="3.4" fill="#27E6B0" filter={`url(#soft-${uid})`}>
            <animateMotion dur={`${5 + i * 0.6}s`} repeatCount="indefinite" path={d} begin={`${i * 0.9}s`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${5 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.9}s`} />
          </circle>
        ))}

        {/* Traveling pulses along roots (upward toward trunk) */}
        {rootPaths.map((d, i) => (
          <circle key={`pr-${i}`} r="3" fill="#27E6B0" filter={`url(#soft-${uid})`}>
            <animateMotion dur={`${6 + i * 0.5}s`} repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" begin={`${i * 0.7}s`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur={`${6 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.7}s`} />
          </circle>
        ))}

        {/* Trunk pulse -> resolves into waveform on the right */}
        <circle r="4" fill="#27E6B0" filter={`url(#soft-${uid})`}>
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M300 300 L300 260" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="3.6s" repeatCount="indefinite" />
        </circle>

        {/* Bio-signal waveform baseline, glowing */}
        <g transform="translate(0,340)">
          <line x1="60" y1="30" x2="540" y2="30" stroke="#123326" strokeWidth="1" />
          <path
            d="M60 30 L120 30 L140 8 L160 52 L180 18 L200 30 L260 30 L280 4 L300 56 L320 30 L380 30 L400 14 L420 44 L440 30 L540 30"
            fill="none"
            stroke="#27E6B0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            style={{ filter: "drop-shadow(0 0 6px rgba(39,230,176,0.55))" }}
          />
        </g>
      </svg>
    </div>
  );
}
