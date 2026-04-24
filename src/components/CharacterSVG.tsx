"use client";

import Image from "next/image";

interface Props {
  type?: string;
  className?: string;
  size?: number;
}

/**
 * 16 primary personalities + 1 hidden (TURING).
 * "/dev/null" must be special-cased because a filename can't contain "/".
 * It maps to the filesystem name "DEVNULL".
 */
const ALL_CODES = new Set([
  "LUDDITE",
  "WRAPPER",
  "PROMPT",
  "AGENT",
  "NPC",
  "CLONE",
  "GHOST",
  "HUMAN",
  "UTOPIA",
  "DOOMER",
  "COPE",
  "CYBORG",
  "/dev/null",
  "CONTEXT",
  "VIBE",
  "CTRL-Z",
  "TURING",
]);

/**
 * Map personality code → on-disk PNG basename in public/characters/.
 * Keep in sync with the equivalent block in src/app/result/page.tsx (poster canvas).
 */
export function codeToFilename(code: string): string {
  if (code === "/dev/null") return "DEVNULL";
  return code;
}

function resolveCode(type: string): string | null {
  if (ALL_CODES.has(type)) return type;
  return null;
}

export default function CharacterSVG({
  type = "HUMAN",
  className = "",
  size = 200,
}: Props) {
  const code = resolveCode(type) ?? "HUMAN";
  const filename = codeToFilename(code);

  return (
    <Image
      src={`/characters/${filename}.png`}
      alt={type}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      priority={size >= 150}
    />
  );
}
