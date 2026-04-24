"use client";

import { useState } from "react";
import Link from "next/link";
import { personalities, specialPersonality } from "@/data/personalities";
import CharacterSVG from "@/components/CharacterSVG";
import Markdown from "@/components/Markdown";

export default function TypesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const allTypes = [...personalities, specialPersonality];
  const current = allTypes.find((p) => p.code === selected);

  return (
    <main className="min-h-screen bg-[#FDF6E3]">
      <div className="grain-overlay" />
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-[#E0DCC7]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-[#939F91] hover:text-[#8DA101] transition text-sm font-medium"
          >
            ← 首页
          </Link>
          <span className="font-mono font-black text-[#8DA101] text-sm">
            ABTI
          </span>
          <Link
            href="/test"
            className="text-sm text-[#8DA101] font-bold hover:underline underline-offset-4"
          >
            去测试 →
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-center text-[#8DA101] font-mono text-xs tracking-widest uppercase mb-2">
          All Types
        </p>
        <h1 className="text-3xl font-black text-center mb-2 text-[#3D484D]">
          全部存在姿态
        </h1>
        <p className="text-center text-[#939F91] mb-10 text-sm">
          16 种普通姿态 + 1 种隐藏姿态，点击查看详情
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 mb-8">
          {allTypes.map((p) => (
            <button
              key={p.code}
              onClick={() =>
                setSelected(selected === p.code ? null : p.code)
              }
              className={`bg-white rounded-xl p-3 card-hover text-center border-2 transition-all ${
                selected === p.code
                  ? "border-[#8DA101] shadow-md"
                  : "border-transparent"
              }`}
            >
              <CharacterSVG
                type={p.code}
                size={50}
                className="mx-auto mb-1"
              />
              <div
                className="font-mono text-[10px] font-black"
                style={{ color: p.color }}
              >
                {p.code}
              </div>
              <div className="font-bold text-[10px] text-[#5C6A72] truncate">
                {p.name}
              </div>
              {p.code === "TURING" && (
                <span className="inline-block text-[8px] bg-[#3D484D] text-[#FDF6E3] px-1.5 py-0.5 rounded mt-0.5 font-black">
                  隐藏
                </span>
              )}
            </button>
          ))}
        </div>

        {current && (
          <div className="fade-in bg-white rounded-2xl shadow-md p-6 mb-8 border border-[#E0DCC7]">
            <div className="flex items-center gap-5 mb-5">
              <CharacterSVG type={current.code} size={100} />
              <div>
                <div
                  className="font-mono text-3xl font-black"
                  style={{ color: current.color }}
                >
                  {current.code}
                </div>
                <div className="text-xl font-black text-[#3D484D]">
                  {current.name}
                </div>
                <div className="text-sm text-[#939F91] italic mt-0.5">
                  「{current.motto}」
                </div>
              </div>
            </div>
            <Markdown className="text-sm text-[#5C6A72] leading-relaxed mb-5">
              {current.description}
            </Markdown>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#F4F0D9] rounded-xl p-4 border border-[#E0DCC7]">
                <h4 className="font-black text-xs text-[#8DA101] mb-2">
                  💪 优势
                </h4>
                <ul className="space-y-1">
                  {current.strengths.map((s, i) => (
                    <li key={i} className="text-[11px] text-[#5C6A72]">
                      ✓ {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#EFEBD4] rounded-xl p-4 border border-[#E0DCC7]">
                <h4 className="font-black text-xs text-[#DFA000] mb-2">
                  ⚠️ 注意
                </h4>
                <ul className="space-y-1">
                  {current.weaknesses.map((w, i) => (
                    <li key={i} className="text-[11px] text-[#5C6A72]">
                      ! {w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-[#E6E2CC] rounded-xl p-4 border border-[#BDC3AF]/40">
              <p className="text-[11px] text-[#5C6A72] mb-1">
                🛠️ {current.techStack}
              </p>
              <p className="text-[11px] text-[#5C6A72] italic">
                💬 「{current.spirit}」
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
