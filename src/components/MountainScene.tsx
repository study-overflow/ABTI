"use client";

/**
 * Minimal landing background. Replaces the original CBTI sunset mountain scene
 * with a restrained grid + soft radial glow that fits the Everforest Light palette.
 */
export default function MountainScene() {
  return (
    <div className="landing-bg">
      <div className="grid-lines" />
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8DA101" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#35A77C" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Faint concentric rings — a nod to radar / signals */}
        <g stroke="url(#ringGrad)" fill="none" strokeWidth="1" opacity="0.45">
          <circle cx="720" cy="450" r="120" />
          <circle cx="720" cy="450" r="220" />
          <circle cx="720" cy="450" r="340" strokeDasharray="2 6" />
          <circle cx="720" cy="450" r="480" strokeDasharray="2 10" opacity="0.4" />
        </g>

        {/* A single subtle horizon line */}
        <line x1="0" y1="640" x2="1440" y2="640" stroke="#BDC3AF" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}
