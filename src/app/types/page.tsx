"use client";

import { useState } from "react";
import Link from "next/link";
import { personalities, specialPersonality } from "@/data/personalities";
import CharacterSVG from "@/components/CharacterSVG";

export default function TypesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const allTypes = [...personalities, specialPersonality];
  const current = allTypes.find((p) => p.code === selected);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffbf5] to-[#fff7ed]">
      <div className="grain-overlay" />
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100/50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-stone-400 hover:text-orange-500 transition text-sm font-medium">← 首页</Link>
          <span className="font-mono font-black text-orange-500 text-sm">CBTI</span>
          <Link href="/test" className="text-sm text-orange-500 font-bold hover:underline underline-offset-4">去测试 →</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-center text-orange-500 font-mono text-xs tracking-widest uppercase mb-2">All Personalities</p>
        <h1 className="text-3xl font-black text-center mb-2 text-stone-800">全部人格类型</h1>
        <p className="text-center text-stone-400 mb-10 text-sm">27 种普通人格 + 1 种隐藏人格，点击查看详情</p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2.5 mb-8">
          {allTypes.map((p, i) => (
            <button key={p.code} onClick={() => setSelected(selected === p.code ? null : p.code)}
              className={`bg-white rounded-xl p-3 card-hover text-center border-2 transition-all ${selected === p.code ? "border-orange-400 shadow-lg shadow-orange-100" : "border-transparent"}`}>
              <CharacterSVG type={p.code} size={50} className="mx-auto mb-1" />
              <div className="font-mono text-[10px] font-black" style={{ color: p.color }}>{p.code}</div>
              <div className="font-bold text-[10px] text-stone-600 truncate">{p.name}</div>
              {p.code === "JAVA" && <span className="inline-block text-[8px] bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded mt-0.5 font-black">隐藏</span>}
            </button>
          ))}
        </div>

        {current && (
          <div className="fade-in bg-white rounded-2xl shadow-xl p-6 mb-8 border border-orange-100">
            <div className="flex items-center gap-5 mb-5">
              <CharacterSVG type={current.code} size={100} />
              <div>
                <div className="font-mono text-3xl font-black" style={{ color: current.color }}>{current.code}</div>
                <div className="text-xl font-black text-stone-800">{current.name}</div>
                <div className="text-sm text-stone-400 italic mt-0.5">「{current.motto}」</div>
              </div>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed mb-5">{current.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <h4 className="font-black text-xs text-orange-600 mb-2">💪 优势</h4>
                <ul className="space-y-1">{current.strengths.map((s, i) => <li key={i} className="text-[11px] text-stone-600">✓ {s}</li>)}</ul>
              </div>
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <h4 className="font-black text-xs text-amber-600 mb-2">⚠️ 注意</h4>
                <ul className="space-y-1">{current.weaknesses.map((w, i) => <li key={i} className="text-[11px] text-stone-600">! {w}</li>)}</ul>
              </div>
            </div>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <p className="text-[11px] text-stone-500 mb-1">🛠️ {current.techStack}</p>
              <p className="text-[11px] text-stone-500 italic">💬 「{current.spirit}」</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
