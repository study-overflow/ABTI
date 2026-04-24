import { questions } from "@/data/questions";
import { personalities, specialPersonality, type Personality } from "@/data/personalities";
import { dimensionDefs } from "@/data/dimensions";

export interface DimensionScore {
  code: string;
  name: string;
  model: string;
  modelName: string;
  raw: number;
  max: number;
  level: "L" | "M" | "H";
  levelNum: number; // 0,1,2
  percentage: number;
}

export interface TestResult {
  personality: Personality;
  similarity: number;
  dimensions: DimensionScore[];
  isSpecial: boolean;
  matchDetails: { code: string; name: string; similarity: number }[];
}

function rawToLevel(raw: number): "L" | "M" | "H" {
  if (raw <= 3) return "L";
  if (raw === 4) return "M";
  return "H";
}

function levelToNum(level: "L" | "M" | "H"): number {
  if (level === "L") return 0;
  if (level === "M") return 1;
  return 2;
}

export function calculateResult(
  answers: Record<number, number>,
  hiddenAnswers?: { opened?: string; usage?: string }
): TestResult {
  const dims = calculateDimensions(answers);

  // TURING trigger: the user opened AI during the test AND let AI pick answer(s) for them.
  // This is the meta joke — they took an AI-era-subjectivity test with AI assistance.
  if (
    hiddenAnswers?.opened === "yes" &&
    hiddenAnswers?.usage === "cheat"
  ) {
    return {
      personality: specialPersonality,
      similarity: 100,
      dimensions: dims,
      isSpecial: true,
      matchDetails: [],
    };
  }

  const userVector = dims.map((d) => d.levelNum);

  const ranked = personalities.map((p) => {
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < 15; i++) {
      const diff = Math.abs(userVector[i] - p.vector[i]);
      distance += diff;
      if (diff === 0) exact++;
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100));
    return { personality: p, distance, exact, similarity };
  });

  ranked.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (a.exact !== b.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  const best = ranked[0];

  const matchDetails = ranked.slice(0, 5).map((r) => ({
    code: r.personality.code,
    name: r.personality.name,
    similarity: r.similarity,
  }));

  return {
    personality: best.personality,
    similarity: best.similarity,
    dimensions: dims,
    isSpecial: false,
    matchDetails,
  };
}

function calculateDimensions(answers: Record<number, number>): DimensionScore[] {
  return dimensionDefs.map((def) => {
    const dimQuestions = questions.filter((q) => q.dimension === def.code);
    const max = dimQuestions.length * 3;
    let raw = 0;
    for (const q of dimQuestions) {
      raw += answers[q.id] ?? 2;
    }
    const percentage = Math.round((raw / max) * 100);
    const level = rawToLevel(raw);
    return {
      code: def.code,
      name: def.name,
      model: def.model,
      modelName: def.modelName,
      raw,
      max,
      level,
      levelNum: levelToNum(level),
      percentage,
    };
  });
}
