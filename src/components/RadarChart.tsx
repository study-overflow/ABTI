"use client";

import type { DimensionScore } from "@/lib/scoring";

interface Props {
  dimensions: DimensionScore[];
  size?: number;
}

const modelLabels: Record<string, string> = {
  B: "边界观",
  R: "关系观",
  I: "身份观",
  L: "劳动观",
  F: "未来观",
};

const modelColors: Record<string, string> = {
  B: "#8DA101", // brand green
  R: "#35A77C", // aqua
  I: "#3A94C5", // blue
  L: "#DFA000", // yellow
  F: "#F57D26", // orange
};

export default function RadarChart({ dimensions, size = 300 }: Props) {
  const models = ["B", "R", "I", "L", "F"];
  const n = models.length;
  const pad = 45;
  const vw = size + pad * 2;
  const vh = size + pad * 2;
  const cx = vw / 2;
  const cy = vh / 2;
  const maxR = size * 0.34;
  const levels = 3;

  const modelScores = models.map((m) => {
    const modelDims = dimensions.filter((d) => d.model === m);
    if (modelDims.length === 0) return 50;
    return modelDims.reduce((s, d) => s + d.percentage, 0) / modelDims.length;
  });

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const r = (value / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const r = ((level + 1) / levels) * maxR;
    return Array.from({ length: n }, (_, i) => {
      const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  });

  const dataPoints = modelScores.map((s, i) => getPoint(i, s));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vw} ${vh}`}
      className="radar-chart"
    >
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8DA101" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#35A77C" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {gridPaths.map((points, i) => (
        <polygon
          key={i}
          points={points}
          fill="none"
          stroke="#BDC3AF"
          strokeWidth="1"
          opacity={0.35 + i * 0.08}
        />
      ))}

      {models.map((_, i) => {
        const p = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="#BDC3AF"
            strokeWidth="1"
            opacity={0.3}
          />
        );
      })}

      <polygon
        points={dataPath}
        fill="url(#radarFill)"
        stroke="#8DA101"
        strokeWidth="2.5"
      />

      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle
            cx={p.x}
            cy={p.y}
            r="7"
            fill={modelColors[models[i]]}
            opacity="0.2"
          />
          <circle
            cx={p.x}
            cy={p.y}
            r="4.5"
            fill={modelColors[models[i]]}
            stroke="white"
            strokeWidth="2"
          />
        </g>
      ))}

      {models.map((m, i) => {
        const lp = getPoint(i, 130);
        return (
          <g key={i}>
            <text
              x={lp.x}
              y={lp.y - 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill={modelColors[m]}
            >
              {modelLabels[m]}
            </text>
            <text
              x={lp.x}
              y={lp.y + 10}
              textAnchor="middle"
              fontSize="10"
              fill="#939F91"
            >
              {Math.round(modelScores[i])}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
