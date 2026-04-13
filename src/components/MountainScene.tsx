"use client";

export default function MountainScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1917" />
            <stop offset="35%" stopColor="#431407" />
            <stop offset="65%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="mt1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#44403c" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
          <linearGradient id="mt2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#57534e" />
            <stop offset="100%" stopColor="#3f3937" />
          </linearGradient>
          <linearGradient id="mt3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78716c" />
            <stop offset="100%" stopColor="#57534e" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#skyGrad)" />

        {/* stars */}
        {[
          [120, 80], [340, 50], [560, 120], [780, 40], [950, 90], [1100, 60], [1300, 100],
          [200, 160], [450, 140], [680, 170], [880, 130], [1050, 150], [1250, 180],
          [80, 200], [300, 220], [520, 190], [740, 240], [960, 210], [1180, 230],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="white" opacity={0.3 + (i % 4) * 0.15} />
        ))}

        {/* sun glow */}
        <circle cx="720" cy="420" r="200" fill="url(#sunGlow)" />
        <circle cx="720" cy="420" r="70" fill="url(#sunGrad)" opacity="0.95" />
        <circle cx="720" cy="420" r="85" fill="#fbbf24" opacity="0.12" />
        <circle cx="720" cy="420" r="110" fill="#f97316" opacity="0.06" />

        {/* horizon glow line */}
        <rect x="0" y="580" width="1440" height="3" fill="#fbbf24" opacity="0.15" />

        {/* far mountains - dark silhouettes */}
        <path
          d="M0 620 L180 440 L320 500 L480 390 L630 460 L800 370 L940 440 L1080 380 L1230 450 L1440 400 L1440 900 L0 900Z"
          fill="url(#mt1)"
          opacity="0.9"
        />

        {/* mid mountains */}
        <path
          d="M0 660 L140 510 L280 570 L430 480 L580 540 L730 450 L880 530 L1030 470 L1180 540 L1340 490 L1440 520 L1440 900 L0 900Z"
          fill="url(#mt2)"
          opacity="0.85"
        />

        {/* near mountains */}
        <path
          d="M0 710 L90 590 L240 650 L390 560 L540 630 L690 540 L840 620 L990 550 L1140 610 L1290 570 L1440 600 L1440 900 L0 900Z"
          fill="url(#mt3)"
          opacity="0.8"
        />

        {/* trees */}
        <g opacity="0.5">
          {[110, 200, 340, 470, 600, 720, 840, 970, 1100, 1220, 1360].map(
            (x, i) => {
              const yBase = 650 + (i % 3) * 15;
              return (
                <g key={i}>
                  <polygon
                    points={`${x},${yBase - 20} ${x - 7},${yBase} ${x + 7},${yBase}`}
                    fill="#292524"
                  />
                  <polygon
                    points={`${x},${yBase - 30} ${x - 5},${yBase - 15} ${x + 5},${yBase - 15}`}
                    fill="#292524"
                  />
                </g>
              );
            }
          )}
        </g>

        {/* ground */}
        <path
          d="M0 760 Q360 740 720 750 Q1080 760 1440 745 L1440 900 L0 900Z"
          fill="url(#ground)"
          opacity="0.9"
        />
        <path
          d="M0 790 Q360 775 720 785 Q1080 795 1440 780 L1440 900 L0 900Z"
          fill="#9a3412"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
