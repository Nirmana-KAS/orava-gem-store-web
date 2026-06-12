"use client";

import React, { useRef, useEffect } from "react";

/* ================================================================
   GemParade — A single brilliant-cut gem drawn in FRONT ELEVATION
   (side profile) that bounces left <-> right across a thin strip,
   cycling colour through the full gem spectrum on every wall hit.

   Shape matches the "Anatomy of a Diamond" reference:
     • flat TABLE on top
     • CROWN facets (star + bezel rows) sloping to the girdle
     • GIRDLE at the widest point
     • PAVILION facets converging to the CULET point at the bottom

   Drop-in client component. Requires the `.hero-gem-parade`
   wrapper styles from hero.css.
   ================================================================ */

export default function GemParade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0, H = 0, GR = 22;
    let raf = 0, lastTs = 0, lightAngle = -Math.PI / 3;
    type Trail = { x: number; y: number; h: number; s: number; l: number; age: number };
    let trail: Trail[] = [];

    /* full gem-species colour palette [hue, sat, light] */
    const COLS = [
      [0, 88, 42], [355, 82, 38], [18, 90, 48], [36, 92, 52],
      [42, 94, 52], [55, 80, 45], [80, 65, 42], [130, 62, 38],
      [145, 72, 36], [175, 62, 50], [185, 60, 50], [205, 78, 44],
      [220, 80, 42], [245, 62, 44], [260, 65, 48], [290, 68, 50],
      [310, 70, 55], [330, 68, 62],
    ];

    const gem = {
      x: 0, y: 0, vx: 1.85, phase: 0, ci: 0, ct: 0,
      fH: COLS[0][0], fS: COLS[0][1], fL: COLS[0][2],
      tH: COLS[1][0], tS: COLS[1][1], tL: COLS[1][2],
    };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      W = rect.width || canvas!.offsetWidth || 480;
      H = rect.height || canvas!.offsetHeight || 76;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      GR = Math.min(H * 0.34, 23);
      gem.y = H / 2;
      if (gem.x < 1 || gem.x > W - 1) gem.x = GR * 2.5;
    }

    const lerpH = (a: number, b: number, tt: number) => {
      const d = (((b - a) % 360) + 540) % 360 - 180;
      return (a + d * tt + 360) % 360;
    };
    const lerp = (a: number, b: number, tt: number) => a + (b - a) * tt;
    const ease = (tt: number) => (tt < 0.5 ? 2 * tt * tt : -1 + (4 - 2 * tt) * tt);

    function curCol() {
      const e = ease(Math.min(1, gem.ct));
      return [lerpH(gem.fH, gem.tH, e), lerp(gem.fS, gem.tS, e), lerp(gem.fL, gem.tL, e)];
    }
    function advanceColor() {
      gem.ci = (gem.ci + 1) % COLS.length;
      const cc = curCol();
      const nc = COLS[gem.ci];
      gem.fH = cc[0]; gem.fS = cc[1]; gem.fL = cc[2];
      gem.tH = nc[0]; gem.tS = nc[1]; gem.tL = nc[2];
      gem.ct = 0;
    }
    const hsl = (h: number, s: number, l: number) =>
      `hsl(${Math.round(((h % 360) + 360) % 360)},${Math.round(
        Math.max(0, Math.min(100, s))
      )}%,${Math.round(Math.max(5, Math.min(98, l)))}%)`;

    function drawGem(gx: number, gy: number, Rr: number, h: number, s: number, l: number, phase: number, la: number) {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(Math.sin(phase) * 0.085);

      const S = Rr;
      const yT = -0.95 * S, yM = -0.66 * S, yG = -0.42 * S, yC = 1.02 * S;
      const Wt = 0.5 * S, Wm = 0.8 * S, Wg = 1.0 * S;

      const g = ctx.createRadialGradient(0, 0, Rr * 0.2, 0, 0, Rr * 2.6);
      g.addColorStop(0, `hsla(${h},${s}%,${l + 22}%,0.32)`);
      g.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(0, 0, Rr * 2.6, 0, Math.PI * 2); ctx.fill();

      const lf = (dx: number, dy: number) => {
        const ln = Math.hypot(dx, dy) || 1;
        const lxx = Math.cos(la), lyy = Math.sin(la);
        return Math.max(0, (dx / ln) * lxx + (dy / ln) * lyy) * 0.7 + 0.3;
      };
      const facet = (pts: number[][], ll: number) => {
        let ccx = 0, ccy = 0;
        for (const p of pts) { ccx += p[0]; ccy += p[1]; }
        ccx /= pts.length; ccy /= pts.length;
        const b = lf(ccx, ccy);
        ctx.fillStyle = hsl(h, s, ll + b * 10);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k][0], pts[k][1]);
        ctx.closePath(); ctx.fill();
      };

      const n = 4, m = 6;
      let i: number, alt: number;

      for (i = 0; i < n; i++) {
        alt = i % 2 === 0 ? 1 : -1;
        const t0 = -Wt + (2 * Wt * i) / n, t1 = -Wt + (2 * Wt * (i + 1)) / n;
        const m0 = -Wm + (2 * Wm * i) / n, m1 = -Wm + (2 * Wm * (i + 1)) / n;
        facet([[t0, yT], [t1, yT], [m0, yM]], l + 22 + alt * 5);
        facet([[t1, yT], [m1, yM], [m0, yM]], l + 16 - alt * 5);
      }
      for (i = 0; i < n; i++) {
        alt = i % 2 === 0 ? 1 : -1;
        const p0 = -Wm + (2 * Wm * i) / n, p1 = -Wm + (2 * Wm * (i + 1)) / n;
        const q0 = -Wg + (2 * Wg * i) / n, q1 = -Wg + (2 * Wg * (i + 1)) / n;
        facet([[p0, yM], [p1, yM], [q0, yG]], l + 6 + alt * 12);
        facet([[p1, yM], [q1, yG], [q0, yG]], l - 2 - alt * 12);
      }
      for (i = 0; i < m; i++) {
        alt = i % 2 === 0 ? 1 : -1;
        const x0 = -Wg + (2 * Wg * i) / m, x1 = -Wg + (2 * Wg * (i + 1)) / m;
        const midx = (x0 + x1) * 0.5;
        const centre = 1 - Math.min(1, Math.abs(midx) / Wg);
        facet([[x0, yG], [x1, yG], [0, yC]], l - 8 + centre * 30 + alt * 9);
      }

      const tg = ctx.createLinearGradient(0, yT, 0, yM);
      tg.addColorStop(0, hsl(h + 8, s * 0.25, 95));
      tg.addColorStop(1, hsl(h, s * 0.4, 80));
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.moveTo(-Wt, yT); ctx.lineTo(Wt, yT);
      ctx.lineTo(Wt * 0.62, yT + (yM - yT) * 0.04);
      ctx.lineTo(-Wt * 0.62, yT + (yM - yT) * 0.04);
      ctx.closePath(); ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.34)";
      ctx.lineWidth = 0.5;
      for (i = 0; i <= n; i++) {
        ctx.beginPath();
        ctx.moveTo(-Wt + (2 * Wt * i) / n, yT);
        ctx.lineTo(-Wm + (2 * Wm * i) / n, yM);
        ctx.lineTo(-Wg + (2 * Wg * i) / n, yG);
        ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(-Wm, yM); ctx.lineTo(Wm, yM); ctx.stroke();
      for (i = 0; i <= m; i++) {
        ctx.beginPath();
        ctx.moveTo(-Wg + (2 * Wg * i) / m, yG);
        ctx.lineTo(0, yC);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(28,40,80,0.22)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-Wt, yT); ctx.lineTo(Wt, yT);
      ctx.lineTo(Wg, yG); ctx.lineTo(0, yC);
      ctx.lineTo(-Wg, yG); ctx.closePath();
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(-Wg, yG); ctx.lineTo(Wg, yG); ctx.stroke();

      const sp = ctx.createRadialGradient(-Wt * 0.4, yT, 0, -Wt * 0.4, yT, Rr * 1.1);
      sp.addColorStop(0, "rgba(255,255,255,0.55)");
      sp.addColorStop(0.4, "rgba(255,255,255,0.08)");
      sp.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sp;
      ctx.beginPath();
      ctx.moveTo(-Wt, yT); ctx.lineTo(Wt, yT);
      ctx.lineTo(Wg, yG); ctx.lineTo(0, yC);
      ctx.lineTo(-Wg, yG); ctx.closePath();
      ctx.fill();

      ctx.restore();
    }

    function tick(ts: number) {
      const dt = ts > 0 && lastTs > 0 ? Math.min((ts - lastTs) / 16.67, 3) : 1;
      lastTs = ts;

      ctx.clearRect(0, 0, W, H);

      gem.x += gem.vx * dt;
      gem.phase += 0.045 * dt;
      lightAngle += 0.014 * dt;
      gem.ct = Math.min(1, gem.ct + 0.009 * dt);

      const margin = GR * 2.0;
      if (gem.vx > 0 && gem.x >= W - margin) { gem.x = W - margin; gem.vx = -gem.vx; advanceColor(); }
      if (gem.vx < 0 && gem.x <= margin) { gem.x = margin; gem.vx = -gem.vx; advanceColor(); }

      const col = curCol();
      const ch = col[0], cs = col[1], cl = col[2];

      trail.push({ x: gem.x, y: gem.y, h: ch, s: cs, l: cl, age: 0 });
      if (trail.length > 10) trail.shift();
      for (let j = 0; j < trail.length - 1; j++) {
        const tr = trail[j]; tr.age++;
        const a = Math.max(0, 1 - tr.age / 11) * 0.16;
        const tr2 = GR * 0.6 * (1 - tr.age / 12);
        if (tr2 > 0.5 && a > 0.004) {
          const tgr = ctx.createRadialGradient(tr.x, tr.y, 0, tr.x, tr.y, tr2 * 2.8);
          tgr.addColorStop(0, `hsla(${tr.h},${tr.s}%,${tr.l + 12}%,${a})`);
          tgr.addColorStop(1, `hsla(${tr.h},${tr.s}%,${tr.l}%,0)`);
          ctx.fillStyle = tgr;
          ctx.beginPath(); ctx.arc(tr.x, tr.y, tr2 * 2.8, 0, Math.PI * 2); ctx.fill();
        }
      }

      drawGem(gem.x, gem.y, GR, ch, cs, cl, gem.phase, lightAngle);
      raf = requestAnimationFrame(tick);
    }

    resize();
    gem.x = GR * 2.5; gem.y = H / 2;
    const onResize = () => { resize(); trail = []; };
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="hero-gem-parade">
      <canvas ref={canvasRef} />
    </div>
  );
}
