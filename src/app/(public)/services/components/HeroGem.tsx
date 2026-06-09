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

  const SEG = 10;

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
      const inf = Math.max(0, 1 - d / (s.R * 2.8));
      return inf * inf;
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

    function draw() {
      ctx.clearRect(0, 0, s.W, s.H);

      /* glow */
      if (s.t > 0.2) {
        const a = ((s.t - 0.2) / 0.8) * 0.32;
        const g = ctx.createRadialGradient(
          s.cx, s.cy, s.R * 0.2,
          s.cx, s.cy, s.R * 1.7
        );
        g.addColorStop(0, `rgba(60,116,174,${a})`);
        g.addColorStop(0.6, `rgba(74,134,200,${a * 0.35})`);
        g.addColorStop(1, "rgba(60,116,174,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s.W, s.H);
      }

      const nAmt = s.R * 0.3;

      for (let i = 0; i < SEG; i++) {
        const a1 = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / SEG) * Math.PI * 2 - Math.PI / 2;
        const am = (a1 + a2) / 2;

        const o1 = vtx(a1, s.R, nAmt, i * 4, s);
        const o2 = vtx(a2, s.R, nAmt, i * 4 + 1, s);
        const m = vtx(am, s.R * 0.6, nAmt * 0.55, i * 4 + 2, s);
        const t1 = vtx(a1, s.R * 0.34, nAmt * 0.28, i * 4 + 10, s);
        const t2 = vtx(a2, s.R * 0.34, nAmt * 0.28, i * 4 + 11, s);
        const c: [number, number] = [s.cx, s.cy];

        const rH = 35 + sn(i) * 15;
        const fH = 215 + sn(i) * 22;

        /* bezel kite left */
        const p1: [number, number][] = [o1, m, t1];
        let li = facetLight(p1, s);
        let h = rH + (fH - rH) * s.t;
        let sat = 16 + (58 - 16) * s.t + li * 22 * s.t;
        let l = 37 + (53 - 37) * s.t + li * 28 * s.t;
        if (s.t > 0.55 && li > 0.35)
          l += ((s.t - 0.55) / 0.45) * ((li - 0.35) / 0.65) * 32;
        drawFacet(p1, h, sat, l);

        /* bezel kite right */
        const p2: [number, number][] = [o2, t2, m];
        li = facetLight(p2, s);
        h = rH + 6 + (fH + 10 - rH - 6) * s.t;
        sat = 18 + (62 - 18) * s.t + li * 20 * s.t;
        l = 35 + (50 - 35) * s.t + li * 30 * s.t;
        if (s.t > 0.55 && li > 0.35)
          l += ((s.t - 0.55) / 0.45) * ((li - 0.35) / 0.65) * 34;
        drawFacet(p2, h, sat, l);

        /* star facet */
        const p3: [number, number][] = [m, t2, t1];
        li = facetLight(p3, s);
        h = rH - 4 + (fH + 18 - rH + 4) * s.t;
        sat = 14 + (68 - 14) * s.t + li * 16 * s.t;
        l = 40 + (60 - 40) * s.t + li * 24 * s.t;
        if (s.t > 0.55 && li > 0.35)
          l += ((s.t - 0.55) / 0.45) * ((li - 0.35) / 0.65) * 28;
        drawFacet(p3, h, sat, l);

        /* table triangle */
        const p4: [number, number][] = [t1, t2, c];
        li = facetLight(p4, s);
        h = rH + 3 + (fH + 6 - rH - 3) * s.t;
        sat = 10 + (42 - 10) * s.t + li * 14 * s.t;
        l = 46 + (72 - 46) * s.t + li * 18 * s.t;
        if (s.t > 0.45 && li > 0.25)
          l += ((s.t - 0.45) / 0.55) * ((li - 0.25) / 0.75) * 22;
        drawFacet(p4, h, sat, l);
      }

      /* outer girdle edge */
      ctx.beginPath();
      for (let i = 0; i < SEG; i++) {
        const a = (i / SEG) * Math.PI * 2 - Math.PI / 2;
        const v = vtx(a, s.R, nAmt, i * 4, s);
        if (i === 0) ctx.moveTo(v[0], v[1]);
        else ctx.lineTo(v[0], v[1]);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(26,41,66,${0.1 + s.t * 0.24})`;
      ctx.lineWidth = 1.2 + s.t;
      ctx.stroke();

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
        s.autoLightAngle += 0.007;
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
