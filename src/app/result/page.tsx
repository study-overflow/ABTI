"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { calculateResult, type TestResult } from "@/lib/scoring";
import { getSiteUrl, AUTHOR_URL, VIBE_URL } from "@/lib/constants";
import CharacterSVG from "@/components/CharacterSVG";
import RadarChart from "@/components/RadarChart";
import QRCode from "qrcode";

const modelInfo: Record<string, { icon: string; name: string }> = {
  C: { icon: "💻", name: "代码信仰" },
  B: { icon: "🐛", name: "Bug应对" },
  T: { icon: "🤝", name: "团队协作" },
  D: { icon: "🚀", name: "驱动引擎" },
  A: { icon: "🤖", name: "AI共处" },
};

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [generatingPoster, setGeneratingPoster] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("cbti_data");
      if (!raw) { router.push("/"); return; }
      setResult(calculateResult(JSON.parse(raw).answers, JSON.parse(raw).hidden));
    } catch { router.push("/"); }
  }, [router]);

  const generatePoster = useCallback(async () => {
    if (!result || generatingPoster) return;
    setGeneratingPoster(true);
    const p = result.personality;
    const siteUrl = getSiteUrl();

    const S = 3; // 3x for retina
    const W = 750 * S, H = 1334 * S;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    const f = (v: number) => v * S; // scale helper

    // BG
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#fff7ed");
    bg.addColorStop(1, "#fffbf5");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Top bar
    const bar = ctx.createLinearGradient(0, 0, W, 0);
    bar.addColorStop(0, "#f97316");
    bar.addColorStop(1, "#fbbf24");
    ctx.fillStyle = bar;
    ctx.fillRect(0, 0, W, f(8));

    // Title "CBTI · 程序员行为类型测试" in one line
    ctx.textAlign = "center";
    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("CBTI · 程序员行为类型测试", W / 2, f(55));

    // Character image
    try {
      const charImg = new Image();
      charImg.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        charImg.onload = () => resolve();
        charImg.onerror = () => reject();
        const code = p.code === "//TODO" ? "TODO" : p.code;
        charImg.src = `/characters/${code}.png`;
      });
      const imgH = f(300);
      const imgW = imgH * (charImg.width / charImg.height);
      ctx.drawImage(charImg, (W - imgW) / 2, f(110), imgW, imgH);
    } catch { /* skip */ }

    // Code
    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(88)}px ui-monospace, monospace`;
    ctx.fillText(p.code, W / 2, f(475));

    // Name
    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(44)}px system-ui, sans-serif`;
    ctx.fillText(p.name, W / 2, f(530));

    // Motto
    ctx.fillStyle = "#78716c";
    ctx.font = `${f(22)}px system-ui, sans-serif`;
    ctx.fillText(`「${p.motto}」`, W / 2, f(570));

    // Similarity
    ctx.fillStyle = p.color;
    ctx.font = `900 ${f(64)}px system-ui, sans-serif`;
    ctx.fillText(`${result.similarity}%`, W / 2, f(650));
    ctx.fillStyle = "#a8a29e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    ctx.fillText("匹配度", W / 2, f(680));

    // Divider
    ctx.strokeStyle = "#fed7aa";
    ctx.lineWidth = f(2);
    ctx.beginPath();
    ctx.moveTo(f(60), f(710));
    ctx.lineTo(W - f(60), f(710));
    ctx.stroke();

    // Description (word wrap)
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(21)}px system-ui, sans-serif`;
    ctx.textAlign = "left";
    const maxTW = W - f(120);
    const desc = p.description.slice(0, 180) + (p.description.length > 180 ? "..." : "");
    let line = "";
    let ty = f(750);
    for (const char of desc) {
      const test = line + char;
      if (ctx.measureText(test).width > maxTW) {
        ctx.fillText(line, f(60), ty);
        line = char;
        ty += f(32);
        if (ty > f(900)) { ctx.fillText(line + "...", f(60), ty); line = ""; break; }
      } else { line = test; }
    }
    if (line) ctx.fillText(line, f(60), ty);

    // Strengths section
    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("💪 优势", f(60), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    p.strengths.forEach((s, i) => {
      ctx.fillText(`✓  ${s}`, f(85), f(995 + i * 34));
    });

    // Weaknesses
    ctx.fillStyle = "#d97706";
    ctx.font = `900 ${f(24)}px system-ui, sans-serif`;
    ctx.fillText("⚠️ 注意", W / 2 + f(10), f(960));
    ctx.fillStyle = "#57534e";
    ctx.font = `${f(20)}px system-ui, sans-serif`;
    p.weaknesses.forEach((w, i) => {
      ctx.fillText(`!  ${w}`, W / 2 + f(35), f(995 + i * 34));
    });

    // Bottom section - QR + CTA
    const bottomY = f(1110);
    const qrSize = f(140);

    // QR code
    try {
      const qrDataUrl = await QRCode.toDataURL(siteUrl, {
        width: qrSize,
        margin: 1,
        color: { dark: "#f97316", light: "#ffffff" },
      });
      const qrImg = new Image();
      await new Promise<void>((resolve) => {
        qrImg.onload = () => resolve();
        qrImg.src = qrDataUrl;
      });
      // QR border
      ctx.fillStyle = "#fff7ed";
      ctx.beginPath();
      ctx.roundRect(f(50), bottomY - f(10), qrSize + f(20), qrSize + f(20), f(12));
      ctx.fill();
      ctx.strokeStyle = "#fed7aa";
      ctx.lineWidth = f(2);
      ctx.stroke();
      ctx.drawImage(qrImg, f(60), bottomY, qrSize, qrSize);
    } catch { /* skip */ }

    // CTA text next to QR
    const ctaX = f(60) + qrSize + f(40);
    ctx.textAlign = "left";
    ctx.fillStyle = "#1c1917";
    ctx.font = `900 ${f(28)}px system-ui, sans-serif`;
    ctx.fillText("你是什么类型的程序员？", ctaX, bottomY + f(50));

    ctx.fillStyle = "#f97316";
    ctx.font = `900 ${f(22)}px system-ui, sans-serif`;
    ctx.fillText("扫码或访问", ctaX, bottomY + f(90));
    ctx.fillText("cbti.codefather.cn", ctaX, bottomY + f(120));

    ctx.fillStyle = "#a8a29e";
    ctx.font = `${f(18)}px system-ui, sans-serif`;
    ctx.fillText("30 道题 · 27 种编程人格", ctaX, bottomY + f(160));

    // Footer
    ctx.textAlign = "center";
    ctx.fillStyle = "#d6d3d1";
    ctx.font = `${f(16)}px system-ui, sans-serif`;
    ctx.fillText("CBTI · 程序员行为类型测试 · 作者 程序员鱼皮", W / 2, H - f(30));

    setPosterUrl(canvas.toDataURL("image/png", 1.0));
    setGeneratingPoster(false);
  }, [result, generatingPoster]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fffbf5] to-[#fff7ed]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-400 border-t-transparent mx-auto mb-4" />
          <p className="text-stone-400 text-sm">正在编译你的人格类型...</p>
        </div>
      </div>
    );
  }

  const { personality: p, similarity, dimensions: dims, matchDetails } = result;
  const siteUrl = getSiteUrl();
  const shareText = `我在 CBTI 程序员人格测试中测出了【${p.code} · ${p.name}】！\n「${p.motto}」\n匹配度 ${similarity}%\n\n你是 SUDO 还是 NULL？来测测 👉 ${siteUrl}`;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(shareText); } catch {
      const ta = document.createElement("textarea"); ta.value = shareText;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleSavePoster = () => {
    if (!posterUrl) return;
    const a = document.createElement("a");
    a.href = posterUrl;
    a.download = `CBTI-${p.code}.png`;
    a.click();
  };

  const models = ["C", "B", "T", "D", "A"];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffbf5] to-[#fff7ed]">
      <div className="grain-overlay" />

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.push("/")} className="text-stone-400 hover:text-orange-500 transition text-sm font-medium">← 首页</button>
          <span className="font-mono font-black text-orange-500 text-sm">CBTI</span>
          <span className="text-xs text-stone-400 font-mono">RESULT</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="slide-up">
          {/* Main Card */}
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-8 border border-orange-100" style={{ background: `linear-gradient(160deg, ${p.color}08, ${p.color}18, ${p.color}08)` }}>
            <div className="p-10 text-center relative">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`, opacity: 0.3 }} />
              {result.isSpecial && (
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-black px-4 py-1.5 rounded-lg mb-4">☕ 隐藏人格触发！</div>
              )}
              <div className="float-animation mb-6">
                <CharacterSVG type={p.code} size={170} className="mx-auto" />
              </div>
              <span className="text-5xl md:text-7xl font-black font-mono tracking-wider" style={{ color: p.color }}>{p.code}</span>
              <h1 className="text-2xl font-black text-stone-800 mt-3 mb-2">{p.name}</h1>
              <p className="text-stone-500 italic text-sm mb-6">「{p.motto}」</p>
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-5 py-2.5 rounded-full border border-orange-100">
                <span className="text-xs text-stone-400">匹配度</span>
                <span className="text-3xl font-black" style={{ color: p.color }}>{similarity}%</span>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur px-8 py-6 border-t border-orange-50">
              <p className="text-stone-600 leading-relaxed text-sm">{p.description}</p>
            </div>
          </div>

          {/* Radar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-50">
            <h3 className="font-black text-base mb-4 text-center text-stone-700">五维雷达图</h3>
            <div className="flex justify-center"><RadarChart dimensions={dims} size={300} /></div>
          </div>

          {/* Top Matches */}
          {matchDetails.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-50">
              <h3 className="font-black text-base mb-4 text-stone-700">匹配排行</h3>
              <div className="space-y-2.5">
                {matchDetails.map((m, i) => (
                  <div key={m.code} className="flex items-center gap-3">
                    <span className={`text-xs font-black w-6 h-6 rounded-lg flex items-center justify-center ${i === 0 ? "bg-orange-100 text-orange-600" : "bg-stone-100 text-stone-400"}`}>{i + 1}</span>
                    <span className="font-mono text-sm font-bold flex-1 text-stone-700">{m.code} · {m.name}</span>
                    <div className="w-20 h-2 bg-orange-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400" style={{ width: `${m.similarity}%` }} />
                    </div>
                    <span className="text-[11px] text-stone-400 w-10 text-right font-mono">{m.similarity}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dimension Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-50">
            <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between">
              <h3 className="font-black text-base text-stone-700">十五维度详细解读</h3>
              <span className={`text-stone-300 transition-transform text-sm ${showDetails ? "rotate-180" : ""}`}>▼</span>
            </button>
            {showDetails && (
              <div className="mt-6 space-y-8 fade-in">
                {models.map((m) => {
                  const info = modelInfo[m];
                  const modelDims = dims.filter((d) => d.model === m);
                  return (
                    <div key={m}>
                      <div className="flex items-center gap-2 mb-3"><span className="text-lg">{info.icon}</span><span className="font-black text-sm text-stone-700">{info.name}</span></div>
                      <div className="space-y-3 pl-1">
                        {modelDims.map((dim) => (
                          <div key={dim.code} className="border-l-2 border-orange-100 pl-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-stone-600">{dim.code} {dim.name}</span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${dim.level === "H" ? "bg-orange-100 text-orange-600" : dim.level === "M" ? "bg-amber-50 text-amber-600" : "bg-stone-100 text-stone-400"}`}>{dim.level}</span>
                            </div>
                            <div className="h-1.5 bg-orange-50 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-400 to-amber-400" style={{ width: `${dim.percentage}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-orange-50">
              <h4 className="font-black text-sm mb-3 text-orange-600">💪 优势</h4>
              <ul className="space-y-2">{p.strengths.map((s, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-orange-400 mt-0.5 font-bold">✓</span>{s}</li>)}</ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-orange-50">
              <h4 className="font-black text-sm mb-3 text-amber-600">⚠️ 注意</h4>
              <ul className="space-y-2">{p.weaknesses.map((w, i) => <li key={i} className="text-xs text-stone-600 flex items-start gap-2"><span className="text-amber-400 mt-0.5 font-bold">!</span>{w}</li>)}</ul>
            </div>
          </div>

          {/* Tech & Spirit */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 border border-orange-50">
            <div className="mb-4"><h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-1">🛠️ 技术栈</h4><p className="text-sm text-stone-700">{p.techStack}</p></div>
            <div><h4 className="font-black text-xs text-stone-400 uppercase tracking-wider mb-1">💬 灵魂格言</h4><p className="text-sm text-stone-700 italic">「{p.spirit}」</p></div>
          </div>

          {/* Share */}
          <div className="share-card rounded-2xl shadow-2xl p-6 text-center text-white mb-5 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <h3 className="font-black text-lg mb-2">分享你的编程人格</h3>
              <p className="text-white/60 text-xs mb-4">让更多程序员发现自己的类型</p>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-4 text-left border border-white/10">
                <p className="text-sm text-white/90 whitespace-pre-line">{shareText}</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button onClick={handleCopy} className="bg-white text-orange-600 px-5 py-2.5 rounded-full font-black text-sm hover:bg-orange-50 transition-all active:scale-95 shadow-lg">
                  {copied ? "✓ 已复制！" : "📋 复制文案"}
                </button>
                <button onClick={posterUrl ? handleSavePoster : generatePoster}
                  className="bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-full font-black text-sm hover:bg-white/30 transition-all active:scale-95">
                  {generatingPoster ? "生成中..." : posterUrl ? "💾 保存海报" : "🖼️ 生成海报"}
                </button>
              </div>
              {posterUrl && (
                <div className="mt-4 fade-in">
                  <p className="text-white/50 text-[11px] mb-2">长按图片保存到手机</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={posterUrl} alt="分享海报" className="w-full max-w-[320px] mx-auto rounded-xl shadow-lg" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { sessionStorage.removeItem("cbti_data"); router.push("/test"); }}
              className="flex-1 bg-white text-orange-500 border-2 border-orange-300 px-6 py-3 rounded-full font-black text-sm hover:bg-orange-50 transition-all">重新测试</button>
            <button onClick={() => router.push("/")}
              className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-full font-black text-sm hover:bg-orange-600 transition-all shadow-lg">回到首页</button>
          </div>

          <div className="mt-10 text-center text-[10px] text-stone-300 pb-8 space-y-1">
            <p><a href={VIBE_URL} target="_blank" rel="noopener noreferrer" className="text-orange-400 underline underline-offset-2 hover:text-orange-500 transition text-[11px]">想做同款？免费学 Vibe Coding →</a></p>
            <p className="font-mono">CBTI · 作者 <a href={AUTHOR_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">程序员鱼皮</a></p>
          </div>
        </div>
      </div>
    </main>
  );
}
