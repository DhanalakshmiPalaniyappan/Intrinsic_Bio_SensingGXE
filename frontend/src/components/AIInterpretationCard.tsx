function NeuralIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" className="text-bio-accent">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="8" cy="9" r="2.4" />
        <circle cx="8" cy="25" r="2.4" />
        <circle cx="17" cy="17" r="2.6" />
        <circle cx="26" cy="9" r="2.4" />
        <circle cx="26" cy="25" r="2.4" />
        <line x1="10" y1="10.2" x2="15" y2="15.5" opacity="0.6" />
        <line x1="10" y1="23.8" x2="15" y2="18.5" opacity="0.6" />
        <line x1="19" y1="15.5" x2="24" y2="10.2" opacity="0.6" />
        <line x1="19" y1="18.5" x2="24" y2="23.8" opacity="0.6" />
      </g>
      <circle cx="17" cy="17" r="2.6" fill="currentColor" opacity="0.5" className="animate-breathe" />
    </svg>
  );
}

export default function AIInterpretationCard({
  title = "Possible Heat Stress",
  confidence = 87,
  explanation = "Significant variation in bio-signal pattern and temperature rise detected. Recommend checking soil moisture and surrounding conditions.",
}: {
  title?: string;
  confidence?: number;
  explanation?: string;
}) {
  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-bio-text flex items-center gap-2">
          <NeuralIcon /> AI Interpretation
        </h3>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-bio-warning font-semibold">{title}</span>
        <span className="text-xs font-medium bg-bio-warning/10 text-bio-warning px-2 py-1 rounded-full border border-bio-warning/30">
          {confidence}% Confidence
        </span>
      </div>

      <p className="text-sm text-bio-muted leading-relaxed mb-4">{explanation}</p>

      <button className="group inline-flex items-center gap-1 text-sm font-medium text-bio-accent border border-bio-accent/40 rounded-lg px-4 py-2 hover:bg-bio-accent/10 hover:shadow-glow-sm transition-all">
        View Recommendations
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
}
