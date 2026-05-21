"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Gem } from "@/lib/products/data";
import { shade } from "@/lib/products/data";

interface FeaturedProps {
  gem: Gem;
}

export function Featured({ gem }: FeaturedProps) {
  return (
    <section className="mx-auto mt-8 max-w-[1300px] px-8">
      <div className="relative grid grid-cols-1 overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-[#2a4773] to-primary shadow-[0_30px_60px_-25px_rgba(28,52,90,.25),0_8px_20px_-10px_rgba(28,52,90,.12)] md:grid-cols-[1.1fr_1fr]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(255,255,255,.12), transparent 40%), radial-gradient(circle at 20% 80%, rgba(60,116,174,.3), transparent 40%)",
          }}
        />

        <div className="relative z-10 px-10 py-9 text-white">
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9d8ec] before:h-px before:w-6 before:bg-[#c9d8ec] before:content-['']">
            Gem of the Week
          </span>
          <h2 className="mt-3.5 font-serif text-[2.375rem] italic leading-[1.05]">{gem.name}</h2>
          <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-[#c9d8ec]">
            A rare {gem.colorName.toLowerCase()} {gem.variety.toLowerCase()} from {gem.origin}.
            {gem.treated === "None" ? " Wholly untreated." : ` ${gem.treated} treatment, fully disclosed.`}
            {" "}Lab report by {gem.certified}.
          </p>
          <div className="mb-6 mt-3 flex gap-6">
            <Meta label="Carats" value={gem.carat.toString()} />
            <Meta label="Shape" value={gem.shape} />
            <Meta label="USD" value={`$${gem.price.toLocaleString()}`} />
          </div>
          <Link
            href={`/products/${gem._realId || gem.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-navy transition-transform hover:translate-x-[3px]"
          >
            View Lab Report <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative grid min-h-[340px] place-items-center overflow-hidden">
          <GemStage color={gem.color} />
          <Sparkles />
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <b className="block font-serif text-[1.375rem] italic text-white">{value}</b>
      <span className="text-xs text-[#aac0db]">{label}</span>
    </div>
  );
}

function GemStage({ color }: { color: string }) {
  const lightest = shade(color, 110);
  const lighter  = shade(color, 70);
  const light    = shade(color, 35);
  const base     = color;
  const dark     = shade(color, -35);
  const darker   = shade(color, -70);
  const darkest  = shade(color, -110);

  const tL = 72, tR = 128, tY = 18;
  const gL = 10, gR = 190, gYu = 56, gYl = 62;
  const cx = 100, cy = 174;

  const profile = `M ${tL},${tY} L ${tR},${tY} L ${gR - 4},${gYu - 2} L ${gR},${gYu} L ${gR},${gYl} L ${gR - 4},${gYl + 2} L ${cx},${cy} L ${gL + 4},${gYl + 2} L ${gL},${gYl} L ${gL},${gYu} L ${gL + 4},${gYu - 2} Z`;

  const NC = 7;
  const crownVerts: Array<{ top: number; bot: number }> = [];
  for (let i = 0; i <= NC; i++) {
    const f = i / NC;
    const topRaw = gL + (gR - gL) * f;
    const topClamp = Math.max(tL, Math.min(tR, topRaw));
    const top =
      i === 0      ? gL + 6
    : i === NC     ? gR - 6
    : i === 1      ? Math.max(tL, gL + (gR - gL) * f - 6)
    : i === NC - 1 ? Math.min(tR, gL + (gR - gL) * f + 6)
    :                topClamp;
    crownVerts.push({ top, bot: gL + (gR - gL) * f });
  }

  const NP = 7;
  const pavBottoms: number[] = [];
  for (let i = 0; i <= NP; i++) pavBottoms.push(gL + (gR - gL) * (i / NP));

  const crownShades = [-25, 35, -10, 60, -15, 30, -25];
  const pavShades   = [10, -40, 25, -55, 20, -35, 5];

  return (
    <motion.div
      className="relative h-[320px] w-[320px] drop-shadow-[0_16px_28px_rgba(0,0,0,.45)] [filter:drop-shadow(0_16px_28px_rgba(0,0,0,.45))_drop-shadow(0_0_30px_rgba(60,116,174,.25))]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 200" className="block h-full w-full overflow-visible">
        <defs>
          <clipPath id="gem-clip-prof">
            <path d={profile} />
          </clipPath>
          <linearGradient id="crown-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={lighter} />
            <stop offset="60%"  stopColor={base} />
            <stop offset="100%" stopColor={dark} />
          </linearGradient>
          <linearGradient id="pav-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={base} />
            <stop offset="55%"  stopColor={dark} />
            <stop offset="100%" stopColor={darker} />
          </linearGradient>
          <linearGradient id="girdle-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={darker} />
            <stop offset="100%" stopColor={darkest} />
          </linearGradient>
          <radialGradient id="table-shine" cx="38%" cy="35%" r="70%">
            <stop offset="0%"   stopColor={lightest} stopOpacity=".95" />
            <stop offset="60%"  stopColor={lighter} />
            <stop offset="100%" stopColor={light} />
          </radialGradient>
        </defs>

        <g clipPath="url(#gem-clip-prof)">
          <rect x="0" y="0" width="200" height={gYu} fill="url(#crown-bg)" />
          <rect x="0" y={gYl} width="200" height={200 - gYl} fill="url(#pav-bg)" />
          <rect x="0" y={gYu} width="200" height={gYl - gYu} fill="url(#girdle-grad)" />

          <g>
            {Array.from({ length: NC }, (_, i) => {
              const a = crownVerts[i];
              const b = crownVerts[i + 1];
              return (
                <polygon
                  key={`c${i}`}
                  points={`${a.top},${tY} ${b.top},${tY} ${b.bot},${gYu} ${a.bot},${gYu}`}
                  fill={shade(base, crownShades[i])}
                  stroke={darkest}
                  strokeWidth=".5"
                  strokeOpacity=".5"
                  style={{ animation: `facet-flash-crown 3.2s ease-in-out ${i * 0.2}s infinite` }}
                />
              );
            })}
          </g>

          <g>
            {Array.from({ length: NP }, (_, i) => (
              <polygon
                key={`p${i}`}
                points={`${pavBottoms[i]},${gYl} ${pavBottoms[i + 1]},${gYl} ${cx},${cy}`}
                fill={shade(base, pavShades[i])}
                stroke={darkest}
                strokeWidth=".5"
                strokeOpacity=".5"
                style={{ animation: `facet-flash-pav 3.2s ease-in-out ${i * 0.25}s infinite` }}
              />
            ))}
          </g>

          <g opacity=".25">
            {Array.from({ length: NP - 1 }, (_, i) => {
              const x = (pavBottoms[i] + pavBottoms[i + 1]) / 2;
              return <line key={`pl${i}`} x1={x} y1={gYl} x2={cx} y2={cy} stroke={lighter} strokeWidth=".8" />;
            })}
          </g>

          <g style={{ animation: "inner-pulse 3.5s ease-in-out infinite" }}>
            <polygon points={`${cx - 12},${gYl + 8} ${cx + 12},${gYl + 8} ${cx + 8},${gYl + 22} ${cx - 8},${gYl + 22}`} fill={lightest} opacity=".55" />
            <polygon points={`${cx - 7},${gYl + 24} ${cx + 7},${gYl + 24} ${cx},${gYl + 38}`} fill={lighter} opacity=".7" />
          </g>

          <g style={{ animation: "sweep-x 3.5s cubic-bezier(.4,0,.6,1) infinite", mixBlendMode: "screen" }}>
            <ellipse cx="40" cy={gYu / 2} rx="14" ry={gYu / 2 - 2} fill={lightest} opacity=".55" />
            <ellipse cx="40" cy={gYl + (cy - gYl) * 0.45} rx="10" ry={(cy - gYl) * 0.4} fill={lightest} opacity=".4" />
            <ellipse cx="40" cy={gYu + (gYl - gYu) * 0.5} rx="6" ry="2" fill="#fff" opacity=".5" />
          </g>

          <polygon
            points={`${tL + 2},${tY + 1} ${tR - 2},${tY + 1} ${tR - 6},${gYu - 2} ${tL + 6},${gYu - 2}`}
            fill="url(#table-shine)"
            opacity=".55"
          />
          <path d={`M ${tL + 8},${tY + 3} L ${tR - 8},${tY + 3}`} stroke={lightest} strokeWidth="2" opacity=".85" strokeLinecap="round" />
          <path d={`M ${tL + 18},${tY + 6} L ${tR - 26},${tY + 6}`} stroke="#fff" strokeWidth="1" opacity=".55" strokeLinecap="round" />
        </g>

        <path d={profile} fill="none" stroke={darkest} strokeWidth="1.2" opacity=".7" />
        <ellipse cx={cx} cy="192" rx="55" ry="3" fill={base} opacity=".22" />
        <ellipse cx={cx} cy="194" rx="35" ry="2" fill={darker} opacity=".3" />
      </svg>
    </motion.div>
  );
}

function Sparkles() {
  const positions = [
    { top: "28%", left: "26%",  delay: 0 },
    { top: "36%", right: "24%", delay: 0.8 },
    { top: "52%", right: "38%", delay: 1.6 },
    { top: "30%", left: "50%",  delay: 2.2 },
  ];
  return (
    <>
      {positions.map((p, i) => (
        <motion.span
          key={i}
          className="absolute z-20 h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_10px_#fff,0_0_18px_rgba(255,255,255,.7)]"
          style={{ ...p }}
          animate={{ scale: [0.4, 1.6, 0.4], opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </>
  );
}
