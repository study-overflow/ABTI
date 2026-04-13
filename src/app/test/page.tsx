"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { questions, hiddenQuestions } from "@/data/questions";
import CharacterSVG from "@/components/CharacterSVG";

type Phase = "main" | "hidden1" | "hidden2";

export default function TestPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const answersRef = useRef<Record<number, number>>({});
  const [phase, setPhase] = useState<Phase>("main");
  const [hiddenAnswers, setHiddenAnswers] = useState<{ drink?: string; drinkAttitude?: string }>({});

  const total = questions.length;
  const answered = Object.keys(answers).length;
  const progress = Math.round((answered / total) * 100);
  const currentQ = phase === "main" ? questions[currentIndex] : null;

  const handleSelect = (value: number) => {
    if (!currentQ) return;
    const next = { ...answersRef.current, [currentQ.id]: value };
    answersRef.current = next;
    setAnswers(next);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase("hidden1");
    }
  };

  const handleHidden1 = (value: string) => {
    setHiddenAnswers((p) => ({ ...p, drink: value }));
    if (value === "coffee") {
      setPhase("hidden2");
    } else {
      finish({ drink: value });
    }
  };

  const handleHidden2 = (value: string) => {
    finish({ ...hiddenAnswers, drink: "coffee", drinkAttitude: value });
  };

  const finish = (hidden: { drink?: string; drinkAttitude?: string }) => {
    sessionStorage.setItem("cbti_data", JSON.stringify({ answers: answersRef.current, hidden }));
    router.push("/result");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffbf5] to-[#fff7ed] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-stone-400 hover:text-orange-500 transition text-sm font-medium">← 首页</button>
          <span className="font-mono font-black text-orange-500 text-sm">
            {phase === "main" ? `${currentIndex + 1} / ${total}` : "BONUS"}
          </span>
          <span className="text-[11px] text-stone-400 font-mono">{answered} 已答</span>
        </div>
        <div className="h-1 bg-orange-100">
          <div className="h-full bg-gradient-to-r from-orange-400 to-amber-400 progress-bar rounded-r-full" style={{ width: `${phase === "main" ? progress : 100}%` }} />
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 pt-8 pb-4">
        <div className="w-full max-w-xl mx-auto">

          {phase === "main" && currentQ && (
            <div key={currentQ.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-lg">Q{currentQ.id}</span>
                <span className="text-[11px] text-stone-400 font-mono">{currentQ.dimension}</span>
              </div>

              <h2 className="text-lg md:text-xl font-bold mb-6 leading-relaxed text-stone-800">{currentQ.text}</h2>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const active = answers[currentQ.id] === opt.value;
                  return (
                    <button key={idx} onClick={() => handleSelect(opt.value)}
                      className={`option-btn w-full text-left p-3.5 rounded-2xl ${active ? "selected" : ""}`}>
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black mt-0.5 transition-colors ${
                          active ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-400"
                        }`}>{String.fromCharCode(65 + idx)}</span>
                        <span className="text-sm text-stone-700 leading-relaxed">{opt.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nav */}
              <div className="flex justify-between mt-6 items-center">
                <button onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="text-xs text-stone-400 hover:text-orange-500 disabled:opacity-20 transition font-medium">← 上一题</button>
                {answers[currentQ.id] != null && currentIndex < questions.length - 1 && (
                  <button onClick={() => setCurrentIndex(currentIndex + 1)}
                    className="text-xs text-orange-500 hover:text-orange-600 transition font-medium">下一题 →</button>
                )}
              </div>

              {/* Answer card */}
              <div className="mt-8 pt-5 border-t border-orange-100/60">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs text-stone-500 font-medium">答题卡</span>
                  <span className="text-xs text-stone-400">{answered}/{total}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {questions.map((q, i) => {
                    const done = q.id in answers;
                    const cur = i === currentIndex;
                    return done || cur ? (
                      <button key={q.id} onClick={() => setCurrentIndex(i)}
                        className={`w-6 h-6 rounded text-[10px] font-bold transition-all ${
                          cur ? "bg-orange-400 text-white ring-2 ring-orange-200"
                            : "bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-100"
                        }`}>{q.id}</button>
                    ) : (
                      <span key={q.id} className="w-6 h-6 rounded text-[10px] font-medium flex items-center justify-center bg-stone-100 text-stone-400">{q.id}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {phase === "hidden1" && (
            <div className="text-center pt-4">
              <CharacterSVG size={120} className="mx-auto mb-6 float-animation" />
              <div className="bg-orange-100 text-orange-600 text-xs font-black px-4 py-1.5 rounded-lg inline-block mb-4">🎁 彩蛋题</div>
              <h2 className="text-lg font-bold mb-6 text-stone-800">{hiddenQuestions[0].text}</h2>
              <div className="space-y-2.5">
                {hiddenQuestions[0].options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleHidden1(opt.value)}
                    className="option-btn w-full text-left p-3.5 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black mt-0.5 bg-orange-100 text-orange-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm text-stone-700">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "hidden2" && (
            <div className="text-center pt-4">
              <div className="text-5xl mb-6">☕</div>
              <div className="bg-amber-100 text-amber-700 text-xs font-black px-4 py-1.5 rounded-lg inline-block mb-4">☕ 咖啡因检测</div>
              <h2 className="text-lg font-bold mb-6 text-stone-800">{hiddenQuestions[1].text}</h2>
              <div className="space-y-2.5">
                {hiddenQuestions[1].options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleHidden2(opt.value)}
                    className="option-btn w-full text-left p-3.5 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black mt-0.5 bg-orange-100 text-orange-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm text-stone-700">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-3 text-[10px] text-stone-300 font-mono">CBTI · 仅供娱乐</footer>
    </main>
  );
}
