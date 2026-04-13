"use client";

import Image from "next/image";

interface Props {
  type?: string;
  className?: string;
  size?: number;
}

const ALL_CODES = new Set([
  "SUDO", "README", "GIT-F", "CRUD", "BUG-0", "404", "VIBE",
  "LGTM", "NPM-i", "DEL-F", "FIXME", "HACK", "CTRL-C", "RUSH",
  "RTFM", "TODO", "996", "GOTO", "PING", "NULL", "SENIOR",
  "YAML", "STACK", "SLEEP", "FORK", "AGILE", "REGEX", "JAVA",
  "//TODO",
]);

function resolveCode(type: string): string | null {
  if (type === "//TODO") return "TODO";
  if (ALL_CODES.has(type)) return type;
  return null;
}

export default function CharacterSVG({ type = "default", className = "", size = 200 }: Props) {
  const code = resolveCode(type) ?? "SUDO";

  return (
    <Image
      src={`/characters/${code}.png`}
      alt={type}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
      priority={size >= 150}
    />
  );
}
