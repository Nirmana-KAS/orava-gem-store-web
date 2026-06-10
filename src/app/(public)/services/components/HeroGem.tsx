"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

/* ================================================================
   HeroGem — Interactive faceted gem: rough -> finished
   Canvas-based. Cursor tracks light, scrubber controls cutting stage.
   Auto-plays cutting animation on mount. Click gem to replay.
   ================================================================ */

export default function HeroGem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("Rough stone");
  const scrubberRef = useRef<HTMLInputElement>(null);
  const isVisibleRef = useRef(true);

  interface Sparkle {
    x: number;
    y: number;
    sz: number;
    life: number;
    dec: number;
    rot: number;
  }

  /* all mutable animation state lives in a ref so the rAF loop
     doesn't depend on React renders */
  const state = useRef({
    t: 0,
    targetT: 0,
    lightX: 0.6,
    lightY: 0.3,
    time: 0,
    sparkles: [] as Sparkle[],
    isHovering: false,
    autoLightAngle: 0,
    userDrag: false,
    W: 0,
    H: 0,
    cx: 0,
    cy: 0,
    R: 0,
  });

  const SEG = 8; // octagonal silhouette (cushion cut)

  /* ---------- deterministic noise ---------- */
  const sn = (s: number) => Math.sin(s * 127.1) * Math.cos(s * 311.7);

  const vtx = useCallback(
    (
      angle: number,
      radius: number,
      noiseScale: number,
      seed: number,
      s: typeof state.current
    ): [number, number] => {
      const rough = 1 - s.t;
      const n =
        rough *
        noiseScale *
        (Math.sin(seed * 12.98 + angle * 3.5 + s.time * 0.45) * 0.55 +
          Math.sin(seed * 78.23 + angle * 7.1 + s.time * 0.28) * 0.45);
      const r = radius + n;
      return [s.cx + Math.cos(angle) * r, s.cy + Math.sin(angle) * r];
    },
    []
  );

  const facetLight = useCallback(
    (pts: [number, number][], s: typeof state.current) => {
      let mx = 0,
        my = 0;
      for (const p of pts) {
        mx += p[0];
        my += p[1];
      }
      mx /= pts.length;
      my /= pts.length;
      const lx = s.lightX * s.W,
        ly = s.lightY * s.H;
      const dx = lx - mx,
        dy = ly - my;
      const d = Math.sqrt(dx * dx + dy * dy);
      const inf = Math.max(0, 1 - d / (s.R * 1.8));
      return Math.pow(inf, 1.5);
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const s = state.current;
    let raf: number;

    function resize() {
      const rect = stage!.getBoundingClientRect();
      s.W = rect.width;
      s.H = rect.height;
      canvas!.width = s.W * dpr;
      canvas!.height = s.H * dpr;
      canvas!.style.width = s.W + "px";
      canvas!.style.height = s.H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.cx = s.W / 2;
      s.cy = s.H / 2;
      s.R = Math.min(s.W, s.H) * 0.37;
    }

    function drawFacet(
      pts: [number, number][],
      h: number,
      sat: number,
      l: number
    ) {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = `hsl(${h},${Math.min(100, sat)}%,${Math.min(97, l)}%)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.05 + s.t * 0.2})`;
      ctx.lineWidth = 0.35 + s.t * 0.7;
      ctx.stroke();
    }

    /* Hue journey that skips the muddy green band between amber
       and blue: amber -> violet -> settled blue. `base` adds
       per-facet variety. */
    function stageHue(t: number, base: number): number {
      if (t < 0.3) {
        return 35 + base;
      } else if (t < 0.6) {
        const localT = (t - 0.3) / 0.3;
        return 35 + base + localT * 180;
      } else {
        return 215 + base;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, s.W, s.H);

      /* premium outer halo */
      if (s.t > 0.1) {
        const a = ((s.t - 0.1) / 0.9) * 0.5;
        const g = ctx.createRadialGradient(
          s.cx, s.cy, s.R * 0.4,
          s.cx, s.cy, s.R * 2.2
        );
        g.addColorStop(0, `rgba(60,116,174,${a})`);
        g.addColorStop(0.3, `rgba(74,134,200,${a * 0.6})`);
        g.addColorStop(0.7, `rgba(60,116,174,${a * 0.2})`);
        g.addColorStop(1, "rgba(60,116,174,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s.W, s.H);
      }

      const nAmt = s.R * 0.3;

      /* Solid base gem shape so any inter-facet gaps blend in
         instead of reading as a star/snowflake. */
      ctx.beginPath();
      for (let i = 0; i < SEG; i++) {
        const a = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const v = vtx(a, s.R * 1.02, nAmt, i * 4, s);
        if (i === 0) ctx.moveTo(v[0], v[1]);
        else ctx.lineTo(v[0], v[1]);
      }
      ctx.closePath();
      const baseHue = stageHue(s.t, 0);
      const baseSat = 14 + (52 - 14) * s.t;
      const baseLight = 40 + (54 - 40) * s.t;
      ctx.fillStyle = `hsl(${baseHue},${baseSat}%,${baseLight}%)`;
      ctx.fill();

      for (let i = 0; i < SEG; i++) {
        const a1 = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / SEG) * Math.PI * 2 - Math.PI / 2;
        const am = (a1 + a2) / 2;

        const o1 = vtx(a1, s.R * 1.01, nAmt, i * 4, s);
        const o2 = vtx(a2, s.R * 1.01, nAmt, i * 4 + 1, s);
        const m = vtx(am, s.R * 0.62, nAmt * 0.55, i * 4 + 2, s);
        const t1 = vtx(a1, s.R * 0.36, nAmt * 0.28, i * 4 + 10, s);
        const t2 = vtx(a2, s.R * 0.36, nAmt * 0.28, i * 4 + 11, s);
        const c: [number, number] = [s.cx, s.cy];

        /* bezel kite left */
        const p1: [number, number][] = [o1, m, t1];
        let li = facetLight(p1, s);
        let h = stageHue(s.t, sn(i) * 18);
        let sat = 18 + (72 - 18) * s.t + li * 35 * s.t;
        let l = 32 + (50 - 32) * s.t + li * 45 * s.t;
        if (s.t > 0.5 && li > 0.4) {
          l += ((s.t - 0.5) / 0.5) * ((li - 0.4) / 0.6) * 55;
        }
        drawFacet(p1, h, Math.min(95, sat), Math.min(92, l));

        /* bezel kite right */
        const p2: [number, number][] = [o2, t2, m];
        li = facetLight(p2, s);
        h = stageHue(s.t, sn(i) * 18 + 8);
        sat = 20 + (74 - 20) * s.t + li * 32 * s.t;
        l = 28 + (46 - 28) * s.t + li * 50 * s.t;
        if (s.t > 0.5 && li > 0.4) {
          l += ((s.t - 0.5) / 0.5) * ((li - 0.4) / 0.6) * 58;
        }
        drawFacet(p2, h, Math.min(95, sat), Math.min(95, l));

        /* star facet */
        const p3: [number, number][] = [m, t2, t1];
        li = facetLight(p3, s);
        h = stageHue(s.t, sn(i) * 18 - 5);
        sat = 14 + (78 - 14) * s.t + li * 28 * s.t;
        l = 38 + (62 - 38) * s.t + li * 38 * s.t;
        if (s.t > 0.5 && li > 0.4) {
          l += ((s.t - 0.5) / 0.5) * ((li - 0.4) / 0.6) * 48;
        }
        drawFacet(p3, h, Math.min(95, sat), Math.min(96, l));

        /* pavilion shadow triangle (table now drawn separately) */
        const p4: [number, number][] = [t1, t2, c];
        li = facetLight(p4, s);
        h = stageHue(s.t, sn(i) * 18 + 4);
        sat = 10 + (52 - 10) * s.t + li * 20 * s.t;
        l = 42 + (60 - 42) * s.t + li * 30 * s.t;
        drawFacet(p4, h, Math.min(85, sat), Math.min(88, l));
      }

      /* central table (flat top of cushion cut) */
      const tableR = s.R * 0.42;
      ctx.beginPath();
      for (let i = 0; i < SEG; i++) {
        const a = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const v = vtx(a, tableR, nAmt * 0.15, i * 4 + 50, s);
        if (i === 0) ctx.moveTo(v[0], v[1]);
        else ctx.lineTo(v[0], v[1]);
      }
      ctx.closePath();

      const lx = s.lightX * s.W;
      const ly = s.lightY * s.H;
      const tableGrad = ctx.createRadialGradient(
        lx, ly, 0,
        s.cx, s.cy, tableR * 1.5
      );
      const tHue = stageHue(s.t, 0);
      const tSat = 14 + (62 - 14) * s.t;
      tableGrad.addColorStop(0, `hsla(${tHue},${tSat}%,${85 - s.t * 5}%,${0.6 + s.t * 0.3})`);
      tableGrad.addColorStop(0.5, `hsla(${tHue},${tSat}%,${65 - s.t * 5}%,${0.4 + s.t * 0.2})`);
      tableGrad.addColorStop(1, `hsla(${tHue},${tSat}%,${45 - s.t * 5}%,0)`);
      ctx.fillStyle = tableGrad;
      ctx.fill();

      ctx.strokeStyle = `rgba(255,255,255,${0.15 + s.t * 0.35})`;
      ctx.lineWidth = 0.8 + s.t * 0.6;
      ctx.stroke();

      /* outer girdle edge */
      ctx.beginPath();
      for (let i = 0; i < SEG; i++) {
        const a = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const v = vtx(a, s.R * 1.01, nAmt, i * 4, s);
        if (i === 0) ctx.moveTo(v[0], v[1]);
        else ctx.lineTo(v[0], v[1]);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(26,41,66,${0.1 + s.t * 0.24})`;
      ctx.lineWidth = 1.2 + s.t;
      ctx.stroke();

      /* bright sparkle highlights at facet edges near the cursor */
      const lxPos = s.lightX * s.W;
      const lyPos = s.lightY * s.H;
      for (let i = 0; i < SEG; i++) {
        const a = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const v = vtx(a, s.R * 0.95, nAmt, i * 4, s);
        const dx = lxPos - v[0];
        const dy = lyPos - v[1];
        const d = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - d / (s.R * 1.2));
        if (inf > 0.3 && s.t > 0.4) {
          const r = 2 + inf * 3 * s.t;
          ctx.beginPath();
          ctx.arc(v[0], v[1], r, 0, Math.PI * 2);
          const sparkleGrad = ctx.createRadialGradient(
            v[0], v[1], 0,
            v[0], v[1], r
          );
          sparkleGrad.addColorStop(0, `rgba(255,255,255,${inf * s.t})`);
          sparkleGrad.addColorStop(0.5, `rgba(255,255,255,${inf * 0.4 * s.t})`);
          sparkleGrad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = sparkleGrad;
          ctx.fill();
        }
      }

      /* sparkles */
      if (s.t > 0.3 && Math.random() < (s.t - 0.3) * 0.22) {
        const sa = Math.random() * Math.PI * 2;
        const sd = s.R * (0.12 + Math.random() * 1.15);
        s.sparkles.push({
          x: s.cx + Math.cos(sa) * sd,
          y: s.cy + Math.sin(sa) * sd,
          sz: 1.5 + Math.random() * 5.5 * s.t,
          life: 1,
          dec: 0.01 + Math.random() * 0.028,
          rot: Math.random() * Math.PI,
        });
      }
      for (let j = s.sparkles.length - 1; j >= 0; j--) {
        const sp = s.sparkles[j];
        sp.life -= sp.dec;
        sp.rot += 0.04;
        if (sp.life <= 0) {
          s.sparkles.splice(j, 1);
          continue;
        }
        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.rotate(sp.rot);
        ctx.globalAlpha = sp.life * Math.min(1, s.t * 1.6);
        ctx.fillStyle = "#fff";
        const sz = sp.sz;
        ctx.beginPath();
        ctx.moveTo(0, -sz);
        ctx.lineTo(sz * 0.2, -sz * 0.2);
        ctx.lineTo(sz, 0);
        ctx.lineTo(sz * 0.2, sz * 0.2);
        ctx.lineTo(0, sz);
        ctx.lineTo(-sz * 0.2, sz * 0.2);
        ctx.lineTo(-sz, 0);
        ctx.lineTo(-sz * 0.2, -sz * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;

      /* soft light blob following the cursor while hovering */
      if (s.isHovering && s.t > 0.4) {
        const lxFinal = s.lightX * s.W;
        const lyFinal = s.lightY * s.H;
        const dist = Math.sqrt(
          (lxFinal - s.cx) ** 2 + (lyFinal - s.cy) ** 2
        );
        if (dist < s.R * 1.3) {
          const blob = ctx.createRadialGradient(
            lxFinal, lyFinal, 0,
            lxFinal, lyFinal, s.R * 0.5
          );
          blob.addColorStop(0, `rgba(255,255,255,${0.3 * s.t})`);
          blob.addColorStop(0.5, `rgba(255,255,255,${0.1 * s.t})`);
          blob.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = blob;
          ctx.globalCompositeOperation = "screen";
          ctx.fillRect(0, 0, s.W, s.H);
          ctx.globalCompositeOperation = "source-over";
        }
      }
    }

    function loop() {
      if (!isVisibleRef.current) {
        raf = requestAnimationFrame(loop);
        return;
      }

      s.time += 0.016;
      s.t += (s.targetT - s.t) * 0.032;
      if (Math.abs(s.t - s.targetT) < 0.0008) s.t = s.targetT;

      if (!s.isHovering) {
        s.autoLightAngle += 0.004;
        s.lightX = 0.5 + Math.cos(s.autoLightAngle) * 0.36;
        s.lightY = 0.4 + Math.sin(s.autoLightAngle * 0.72) * 0.26;
      }

      if (scrubberRef.current && !s.userDrag) {
        scrubberRef.current.value = String(Math.round(s.t * 100));
      }

      /* label */
      let newLabel: string;
      if (s.t < 0.15) newLabel = "Rough stone";
      else if (s.t < 0.45) newLabel = "Shaping…";
      else if (s.t < 0.75) newLabel = "Faceting…";
      else if (s.t < 0.95) newLabel = "Polishing…";
      else newLabel = "Finished gem";
      setLabel((prev) => (prev !== newLabel ? newLabel : prev));

      draw();
      raf = requestAnimationFrame(loop);
    }

    /* events */
    const onEnter = () => { s.isHovering = true; };
    const onLeave = () => { s.isHovering = false; };
    const onMove = (e: MouseEvent) => {
      const r = stage!.getBoundingClientRect();
      s.lightX = (e.clientX - r.left) / r.width;
      s.lightY = (e.clientY - r.top) / r.height;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      const r = stage!.getBoundingClientRect();
      s.lightX = (touch.clientX - r.left) / r.width;
      s.lightY = (touch.clientY - r.top) / r.height;
    };
    const onClick = () => {
      s.t = 0;
      s.targetT = 0;
      s.sparkles = [];
      setTimeout(() => { s.targetT = 1; }, 350);
    };

    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("click", onClick);

    /* pause the rAF draw work when the gem is scrolled out of view */
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    io.observe(stage);

    resize();
    window.addEventListener("resize", resize);
    s.t = 0;
    s.targetT = 0;
    setTimeout(() => { s.targetT = 1; }, 500);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("click", onClick);
    };
  }, [vtx, facetLight]);

  const handleScrubInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = state.current;
    s.userDrag = true;
    s.targetT = Number(e.target.value) / 100;
    s.t = s.targetT;
  };
  const handleScrubEnd = () => { state.current.userDrag = false; };

  return (
    <aside className="s-header-aside">
      <div className="gem-stage" ref={stageRef}>
        <canvas ref={canvasRef} />
      </div>
      <div className="gem-scrubber-wrap">
        <span className="gs-label rough">Rough</span>
        <input
          ref={scrubberRef}
          type="range"
          className="gem-scrubber"
          min={0}
          max={100}
          defaultValue={100}
          onInput={handleScrubInput}
          onChange={handleScrubEnd}
          onTouchStart={() => { state.current.userDrag = true; }}
          onTouchEnd={handleScrubEnd}
        />
        <span className="gs-label fin">Finished</span>
      </div>
      <p className="gem-stage-label">{label}</p>
      <p className="gem-hint">Move cursor over gem · Click to replay cutting</p>
    </aside>
  );
}
