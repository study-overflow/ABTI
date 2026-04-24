"use client";

import Link from "next/link";
import MountainScene from "@/components/MountainScene";
import { AUTHOR_NAME, SITE_FULL_NAME, SITE_TAGLINE } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <MountainScene />
      <div className="grain-overlay" />

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <p className="text-[11px] font-mono tracking-[0.3em] text-[#8DA101] mb-6 uppercase">
          再揖别
        </p>
        <h1
          className="text-7xl md:text-[10rem] font-black mb-6"
          style={{
            letterSpacing: "0.08em",
            color: "#3D484D",
            textShadow: "0 2px 0 rgba(141, 161, 1, 0.08)",
          }}
        >
          ABTI
        </h1>
        <p className="text-sm md:text-base text-[#5C6A72] mb-2 font-mono">
          {SITE_FULL_NAME}
        </p>
        <p className="text-lg md:text-xl text-[#3D484D] mb-3 font-bold">
          {SITE_TAGLINE}
        </p>
        <p className="text-sm text-[#939F91] mb-12 leading-relaxed max-w-md mx-auto">
          当 AI 开始替代人的表达、人格、劳动，甚至关系——
          <br />
          你还剩下什么？30 道题，找到你在 AI 时代的存在姿态。
        </p>

        <Link
          href="/test"
          className="inline-flex items-center gap-2 bg-[#8DA101] text-white px-10 py-4 rounded-full text-base font-black hover:bg-[#6E7F00] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 pulse-glow"
        >
          <span>开始测试</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 4l8 6-8 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 text-center space-y-1.5">
        <p className="text-[#939F91] text-[11px]">
          <Link
            href="/types"
            className="underline underline-offset-4 hover:text-[#8DA101] transition"
          >
            查看全部 16 种类型
          </Link>
        </p>
        <p className="text-[#BDC3AF] text-[10px] font-mono">{AUTHOR_NAME}</p>
      </div>
    </main>
  );
}
