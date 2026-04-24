"use client";

import React from "react";

/**
 * Ultra-minimal inline markdown renderer for ABTI personality copy.
 *
 * Scope (intentional): only what we actually write in personalities.ts —
 *   **bold**   →  <strong>
 *   *italic*   →  <em>
 *   `code`     →  <code>
 *   \n         →  <br/>
 *
 * Why not react-markdown? 40+ transitive deps, a parser, plugins, etc. —
 * overkill for three inline patterns. This stays under 40 lines and has
 * zero deps.
 */

type Token =
  | { type: "text"; value: string }
  | { type: "strong"; value: string }
  | { type: "em"; value: string }
  | { type: "code"; value: string };

// Match (in priority order):
//   **bold**  — greedy-but-minimal inside, can span newlines via [\s\S]
//   `code`    — no newline inside
//   *italic*  — single-star, no ** boundaries
// Note: we use [\s\S] instead of the `s` (dotAll) flag so this compiles
// under ES2017 target (flag requires ES2018+).
const PATTERN = /\*\*([\s\S]+?)\*\*|`([^`\n]+?)`|\*([\s\S]+?)\*/g;

function tokenize(input: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of input.matchAll(PATTERN)) {
    const start = m.index!;
    if (start > last) out.push({ type: "text", value: input.slice(last, start) });
    if (m[1] !== undefined) out.push({ type: "strong", value: m[1] });
    else if (m[2] !== undefined) out.push({ type: "code", value: m[2] });
    else if (m[3] !== undefined) out.push({ type: "em", value: m[3] });
    last = start + m[0].length;
  }
  if (last < input.length) out.push({ type: "text", value: input.slice(last) });
  return out;
}

function renderLine(line: string, baseKey: string): React.ReactNode[] {
  return tokenize(line).map((t, i) => {
    const key = `${baseKey}-${i}`;
    switch (t.type) {
      case "strong":
        return (
          <strong key={key} className="font-black text-[#3D484D]">
            {t.value}
          </strong>
        );
      case "em":
        return (
          <em key={key} className="italic">
            {t.value}
          </em>
        );
      case "code":
        return (
          <code
            key={key}
            className="font-mono text-[0.92em] bg-[#EFEBD4] text-[#5C6A72] px-1.5 py-0.5 rounded"
          >
            {t.value}
          </code>
        );
      default:
        return <React.Fragment key={key}>{t.value}</React.Fragment>;
    }
  });
}

interface Props {
  children: string;
  className?: string;
}

/**
 * Inline-only Markdown. Paragraph-aware: "\n\n" splits into <p>, "\n" becomes <br/>.
 */
export default function Markdown({ children, className = "" }: Props) {
  const paragraphs = children.split(/\n{2,}/);
  return (
    <div className={className}>
      {paragraphs.map((para, pi) => {
        const lines = para.split("\n");
        return (
          <p key={pi} className={pi > 0 ? "mt-3" : ""}>
            {lines.map((line, li) => (
              <React.Fragment key={li}>
                {renderLine(line, `p${pi}-l${li}`)}
                {li < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Plain-text fallback: strip **_*`_** so we can feed raw descriptions to
 * contexts that don't support JSX (e.g. canvas poster, share text).
 */
export function stripMarkdown(input: string): string {
  return input.replace(/\*\*([\s\S]+?)\*\*/g, "$1")
              .replace(/`([^`\n]+?)`/g, "$1")
              .replace(/\*([\s\S]+?)\*/g, "$1");
}
