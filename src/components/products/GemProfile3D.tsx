"use client";

import { useId } from "react";
import { shadeHex } from "@/lib/productsDesignData";

interface GemProfile3DProps {
  color: string;
  className?: string;
}

export function GemProfile3D({ color, className }: GemProfile3DProps) {
  const uid = useId().replace(/:/g, "");
  const lightest = shadeHex(color, 110);
  const lighter = shadeHex(color, 70);
  const light = shadeHex(color, 35);
  const base = color;
  const dark = shadeHex(color, -35);
  const darker = shadeHex(color, -70);
  const darkest = shadeHex(color, -110);

  const tL = 72;
  const tR = 128;
  const tY = 18;
  const gL = 10;
  const gR = 190;
  const gYu = 56;
  const gYl = 62;
  const cx = 100;
  const cy = 174;

  const profile = `M ${tL},${tY} L ${tR},${tY} L ${gR - 4},${gYu - 2} L ${gR},${gYu} L ${gR},${gYl} L ${gR - 4},${gYl + 2} L ${cx},${cy} L ${gL + 4},${gYl + 2} L ${gL},${gYl} L ${gL},${gYu} L ${gL + 4},${gYu - 2} Z`;

  const NC = 7;
  const crownVerts: Array<{ top: number; bot: number }> = [];
  for (let i = 0; i <= NC; i++) {
    const f = i / NC;
    const topRaw = gL + (gR - gL) * f;
    const topClamp = Math.max(tL, Math.min(tR, topRaw));
    const top =
      i === 0
        ? gL + 6
        : i === NC
        ? gR - 6
        : i === 1
        ? Math.max(tL, gL + (gR - gL) * f - 6)
        : i === NC - 1
        ? Math.min(tR, gL + (gR - gL) * f + 6)
        : topClamp;
    const bot = gL + (gR - gL) * f;
    crownVerts.push({ top, bot });
  }

  const NP = 7;
  const pavBottoms: number[] = [];
  for (let i = 0; i <= NP; i++) {
    pavBottoms.push(gL + (gR - gL) * (i / NP));
  }

  const crownShades = [-25, 35, -10, 60, -15, 30, -25];
  const pavShades = [10, -40, 25, -55, 20, -35, 5];

  const clipId = `gem-clip-${uid}`;
  const crownBgId = `crown-bg-${uid}`;
  const pavBgId = `pav-bg-${uid}`;
  const girdleId = `girdle-grad-${uid}`;
  const tableShineId = `table-shine-${uid}`;

  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={profile} />
        </clipPath>
        <linearGradient id={crownBgId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lighter} />
          <stop offset="60%" stopColor={base} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <linearGradient id={pavBgId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="55%" stopColor={dark} />
          <stop offset="100%" stopColor={darker} />
        </linearGradient>
        <linearGradient id={girdleId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={darker} />
          <stop offset="100%" stopColor={darkest} />
        </linearGradient>
        <radialGradient id={tableShineId} cx="38%" cy="35%" r="70%">
          <stop offset="0%" stopColor={lightest} stopOpacity=".95" />
          <stop offset="60%" stopColor={lighter} />
          <stop offset="100%" stopColor={light} />
        </radialGradient>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="200" height={gYu} fill={`url(#${crownBgId})`} />
        <rect
          x="0"
          y={gYl}
          width="200"
          height={200 - gYl}
          fill={`url(#${pavBgId})`}
        />
        <rect
          x="0"
          y={gYu}
          width="200"
          height={gYl - gYu}
          fill={`url(#${girdleId})`}
        />

        {Array.from({ length: NC }, (_, i) => {
          const a = crownVerts[i];
          const b = crownVerts[i + 1];
          return (
            <polygon
              key={`c${i}`}
              points={`${a.top},${tY} ${b.top},${tY} ${b.bot},${gYu} ${a.bot},${gYu}`}
              fill={shadeHex(base, crownShades[i])}
              stroke={darkest}
              strokeWidth=".5"
              strokeOpacity=".5"
            />
          );
        })}

        {Array.from({ length: NP }, (_, i) => (
          <polygon
            key={`p${i}`}
            points={`${pavBottoms[i]},${gYl} ${pavBottoms[i + 1]},${gYl} ${cx},${cy}`}
            fill={shadeHex(base, pavShades[i])}
            stroke={darkest}
            strokeWidth=".5"
            strokeOpacity=".5"
          />
        ))}

        <g opacity=".25">
          {Array.from({ length: NP - 1 }, (_, i) => {
            const x = (pavBottoms[i] + pavBottoms[i + 1]) / 2;
            return (
              <line
                key={`pl${i}`}
                x1={x}
                y1={gYl}
                x2={cx}
                y2={cy}
                stroke={lighter}
                strokeWidth=".8"
              />
            );
          })}
        </g>

        <g>
          <polygon
            points={`${cx - 12},${gYl + 8} ${cx + 12},${gYl + 8} ${cx + 8},${gYl + 22} ${cx - 8},${gYl + 22}`}
            fill={lightest}
            opacity=".55"
          />
          <polygon
            points={`${cx - 7},${gYl + 24} ${cx + 7},${gYl + 24} ${cx},${gYl + 38}`}
            fill={lighter}
            opacity=".7"
          />
        </g>

        <g>
          <ellipse
            cx="40"
            cy={gYu / 2}
            rx="14"
            ry={gYu / 2 - 2}
            fill={lightest}
            opacity=".55"
          />
          <ellipse
            cx="40"
            cy={gYl + (cy - gYl) * 0.45}
            rx="10"
            ry={(cy - gYl) * 0.4}
            fill={lightest}
            opacity=".4"
          />
          <ellipse
            cx="40"
            cy={gYu + (gYl - gYu) * 0.5}
            rx="6"
            ry="2"
            fill="#fff"
            opacity=".5"
          />
        </g>

        <polygon
          points={`${tL + 2},${tY + 1} ${tR - 2},${tY + 1} ${tR - 6},${gYu - 2} ${tL + 6},${gYu - 2}`}
          fill={`url(#${tableShineId})`}
          opacity=".55"
        />
        <path
          d={`M ${tL + 8},${tY + 3} L ${tR - 8},${tY + 3}`}
          stroke={lightest}
          strokeWidth="2"
          opacity=".85"
          strokeLinecap="round"
        />
        <path
          d={`M ${tL + 18},${tY + 6} L ${tR - 26},${tY + 6}`}
          stroke="#fff"
          strokeWidth="1"
          opacity=".55"
          strokeLinecap="round"
        />
      </g>

      <path
        d={profile}
        fill="none"
        stroke={darkest}
        strokeWidth="1.2"
        opacity=".7"
      />

      <ellipse cx={cx} cy="192" rx="55" ry="3" fill={base} opacity=".22" />
      <ellipse cx={cx} cy="194" rx="35" ry="2" fill={darker} opacity=".3" />
    </svg>
  );
}
