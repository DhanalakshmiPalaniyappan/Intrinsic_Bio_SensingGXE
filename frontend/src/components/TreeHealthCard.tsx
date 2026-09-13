import HealthIndexRing from "./HealthIndexRing";

export default function TreeHealthCard() {
  return (
    <div className="bg-bio-card border border-bio-border rounded-xl p-5 card-hover">
      <h3 className="font-semibold text-bio-text flex items-center gap-2 mb-4">
        <span className="text-bio-accent">🌳</span> Tree Health Index
      </h3>
      <div className="flex items-center gap-4">
        <HealthIndexRing score={78} />
        <p className="text-sm text-bio-muted leading-relaxed">
          Signal deviation detected. Possible heat stress.
        </p>
      </div>
      <button className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-bio-accent hover:text-bio-text transition-colors">
        View Details
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
}
