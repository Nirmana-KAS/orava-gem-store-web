"use client";

import React, { useRef, useEffect, useState } from "react";

export default function HeroGem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("Rough stone");
  const scrubberRef = useRef<HTMLInputElement>(null);
  const isVisibleRef = useRef(true);

  const state = useRef({
    t: 0,
    targetT: 0,
    lightX: 0.6,
    lightY: 0.3,
    time: 0,
    sparkles: [] as Array<{
      x: number; y: number; sz: number;
      life: number; dec: number; rot: number;
    }>,
    isHovering: false,
    autoLightAngle: 0,
    userDrag: false,
    W: 0,
    H: 0,
    cx: 0,
    cy: 0,
    R: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.cx = s.W / 2;
      s.cy = s.H / 2;
      s.R = Math.min(s.W, s.H) * 0.38;
    }

    // Cushion cut color transition
    function stageHue(t: number, offset: number): number {
      if (t < 0.3) {
        return 35 + offset;
      } else if (t < 0.6) {
        const localT = (t - 0.3) / 0.3;
        return 35 + offset + localT * 180;
      } else {
        return 215 + offset;
      }
    }

    // Cushion cut outline — rounded square (top-down with 3/4 tilt)
    function cushionOutline(scale: number): [number, number][] {
      const pts: [number, number][] = [];
      const N = 40;
      const R = s.R * scale;
      const corner = 0.35;
      const tiltY = 0.85;

      for (let i = 0; i < N; i++) {
        const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const absC = Math.abs(cosA);
        const absS = Math.abs(sinA);
        const power = 4 + (1 - corner) * 4;
        const r = R / Math.pow(
          Math.pow(absC, power) + Math.pow(absS, power),
          1 / power
        );
        pts.push([s.cx + cosA * r, s.cy + sinA * r * tiltY]);
      }
      return pts;
    }

    // Table outline (smaller cushion shape, the flat top)
    function tableOutline(): [number, number][] {
      return cushionOutline(0.55);
    }

    function drawShape(pts: [number, number][]) {
      ctx!.beginPath();
      ctx!.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        ctx!.lineTo(pts[i][0], pts[i][1]);
      }
      ctx!.closePath();
    }

    function facetLight(cx: number, cy: number): number {
      const lx = s.lightX * s.W;
      const ly = s.lightY * s.H;
      const dx = lx - cx;
      const dy = ly - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const inf = Math.max(0, 1 - d / (s.R * 1.6));
      return Math.pow(inf, 1.4);
    }

    function draw() {
      ctx!.clearRect(0, 0, s.W, s.H);

      // Outer glow halo
      if (s.t > 0.1) {
        const a = ((s.t - 0.1) / 0.9) * 0.55;
        const g = ctx!.createRadialGradient(
          s.cx, s.cy, s.R * 0.5,
          s.cx, s.cy, s.R * 2.3
        );
        g.addColorStop(0, `rgba(60,116,174,${a})`);
        g.addColorStop(0.4, `rgba(74,134,200,${a * 0.5})`);
        g.addColorStop(1, "rgba(60,116,174,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, s.W, s.H);
      }

      // Drop shadow underneath
      const shadowGrad = ctx!.createRadialGradient(
        s.cx, s.cy + s.R * 0.9, 0,
        s.cx, s.cy + s.R * 0.9, s.R * 0.8
      );
      shadowGrad.addColorStop(0, `rgba(15,30,60,${0.18 + s.t * 0.12})`);
      shadowGrad.addColorStop(1, "rgba(15,30,60,0)");
      ctx!.fillStyle = shadowGrad;
      ctx!.beginPath();
      ctx!.ellipse(s.cx, s.cy + s.R * 0.95, s.R * 0.7, s.R * 0.15, 0, 0, Math.PI * 2);
      ctx!.fill();

      const outerPts = cushionOutline(1.0);
      const tablePts = tableOutline();
      const baseHue = stageHue(s.t, 0);
      const baseSat = 18 + (62 - 18) * s.t;
      const baseLight = 32 + (45 - 32) * s.t;

      // Base gem fill (solid color, no gaps)
      drawShape(outerPts);
      const baseGrad = ctx!.createLinearGradient(
        s.cx, s.cy - s.R,
        s.cx, s.cy + s.R
      );
      baseGrad.addColorStop(0, `hsl(${baseHue},${baseSat}%,${baseLight + 12}%)`);
      baseGrad.addColorStop(0.5, `hsl(${baseHue},${baseSat}%,${baseLight}%)`);
      baseGrad.addColorStop(1, `hsl(${baseHue},${baseSat}%,${baseLight - 10}%)`);
      ctx!.fillStyle = baseGrad;
      ctx!.fill();

      // Crown facets — 8 around the table connecting outer edge to table edge
      const N = 8;
      const outerLen = outerPts.length;
      const tableLen = tablePts.length;

      for (let i = 0; i < N; i++) {
        const oStartIdx = Math.floor((i / N) * outerLen);
        const oEndIdx = Math.floor(((i + 1) / N) * outerLen);
        const tStartIdx = Math.floor((i / N) * tableLen);
        const tEndIdx = Math.floor(((i + 1) / N) * tableLen);

        const oStart = outerPts[oStartIdx];
        const oEnd = outerPts[oEndIdx % outerLen];
        const tStart = tablePts[tStartIdx];
        const tEnd = tablePts[tEndIdx % tableLen];

        const cx = (oStart[0] + oEnd[0] + tStart[0] + tEnd[0]) / 4;
        const cy = (oStart[1] + oEnd[1] + tStart[1] + tEnd[1]) / 4;
        const li = facetLight(cx, cy);

        const variation = Math.sin(i * 1.7) * 0.5;
        const hueOffset = variation * 12;
        const h = stageHue(s.t, hueOffset);
        const isTopFacet = cy < s.cy;
        const baseBoost = isTopFacet ? 8 : -5;

        let sat = baseSat + li * 30 * s.t + variation * 8;
        let light = baseLight + baseBoost + li * 38 * s.t + variation * 4;

        if (s.t > 0.5 && li > 0.35) {
          light += ((s.t - 0.5) / 0.5) * ((li - 0.35) / 0.65) * 48;
        }

        sat = Math.max(8, Math.min(92, sat));
        light = Math.max(20, Math.min(94, light));

        ctx!.beginPath();
        ctx!.moveTo(oStart[0], oStart[1]);
        ctx!.lineTo(oEnd[0], oEnd[1]);
        ctx!.lineTo(tEnd[0], tEnd[1]);
        ctx!.lineTo(tStart[0], tStart[1]);
        ctx!.closePath();
        ctx!.fillStyle = `hsl(${h},${sat}%,${light}%)`;
        ctx!.fill();
        ctx!.strokeStyle = `rgba(15,30,60,${0.12 + s.t * 0.18})`;
        ctx!.lineWidth = 0.6 + s.t * 0.5;
        ctx!.stroke();
      }

      // Table (flat top) with bright reflection
      drawShape(tablePts);
      const lxPos = s.lightX * s.W;
      const lyPos = s.lightY * s.H;
      const tableGrad = ctx!.createRadialGradient(
        lxPos, lyPos - s.R * 0.1, 0,
        s.cx, s.cy, s.R * 0.7
      );
      tableGrad.addColorStop(0, `hsla(${baseHue},${baseSat - 10}%,${88 - s.t * 8}%,${0.85})`);
      tableGrad.addColorStop(0.4, `hsla(${baseHue},${baseSat}%,${65}%,${0.75})`);
      tableGrad.addColorStop(1, `hsla(${baseHue},${baseSat}%,${baseLight + 8}%,${0.7})`);
      ctx!.fillStyle = tableGrad;
      ctx!.fill();
      ctx!.strokeStyle = `rgba(255,255,255,${0.25 + s.t * 0.35})`;
      ctx!.lineWidth = 1 + s.t * 0.8;
      ctx!.stroke();

      // Inner pavilion reflection lines visible through table
      ctx!.save();
      ctx!.clip();
      const innerLines = 6;
      for (let i = 0; i < innerLines; i++) {
        const ang = (i / innerLines) * Math.PI * 2 + s.time * 0.1;
        const x1 = s.cx + Math.cos(ang) * s.R * 0.45 * 0.85;
        const y1 = s.cy + Math.sin(ang) * s.R * 0.45 * 0.85 * 0.85;
        ctx!.beginPath();
        ctx!.moveTo(s.cx, s.cy);
        ctx!.lineTo(x1, y1);
        ctx!.strokeStyle = `rgba(255,255,255,${0.15 + s.t * 0.2})`;
        ctx!.lineWidth = 0.4;
        ctx!.stroke();
      }
      ctx!.restore();

      // Bright center highlight on table
      if (s.t > 0.4) {
        const hlGrad = ctx!.createRadialGradient(
          lxPos, lyPos - s.R * 0.05, 0,
          lxPos, lyPos - s.R * 0.05, s.R * 0.25
        );
        hlGrad.addColorStop(0, `rgba(255,255,255,${0.4 * s.t})`);
        hlGrad.addColorStop(0.5, `rgba(255,255,255,${0.15 * s.t})`);
        hlGrad.addColorStop(1, "rgba(255,255,255,0)");
        ctx!.fillStyle = hlGrad;
        drawShape(tablePts);
        ctx!.fill();
      }

      // Outer outline (sharp edge of gem)
      drawShape(outerPts);
      ctx!.strokeStyle = `rgba(15,30,60,${0.25 + s.t * 0.25})`;
      ctx!.lineWidth = 1.5 + s.t * 0.8;
      ctx!.stroke();

      // Edge sparkles near cursor when finished
      if (s.t > 0.5) {
        for (let i = 0; i < outerPts.length; i += 4) {
          const p = outerPts[i];
          const li = facetLight(p[0], p[1]);
          if (li > 0.4) {
            const sz = 1.5 + li * 3.5 * s.t;
            const spGrad = ctx!.createRadialGradient(
              p[0], p[1], 0,
              p[0], p[1], sz
            );
            spGrad.addColorStop(0, `rgba(255,255,255,${li * s.t * 0.9})`);
            spGrad.addColorStop(0.5, `rgba(255,255,255,${li * s.t * 0.3})`);
            spGrad.addColorStop(1, "rgba(255,255,255,0)");
            ctx!.fillStyle = spGrad;
            ctx!.beginPath();
            ctx!.arc(p[0], p[1], sz, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // Cursor light blob (visible light source when hovering)
      if (s.isHovering && s.t > 0.4) {
        const dist = Math.sqrt(
          (lxPos - s.cx) ** 2 + (lyPos - s.cy) ** 2
        );
        if (dist < s.R * 1.4) {
          const blob = ctx!.createRadialGradient(
            lxPos, lyPos, 0,
            lxPos, lyPos, s.R * 0.45
          );
          blob.addColorStop(0, `rgba(255,255,255,${0.32 * s.t})`);
          blob.addColorStop(0.5, `rgba(200,220,255,${0.12 * s.t})`);
          blob.addColorStop(1, "rgba(255,255,255,0)");
          ctx!.fillStyle = blob;
          ctx!.globalCompositeOperation = "screen";
          ctx!.fillRect(0, 0, s.W, s.H);
          ctx!.globalCompositeOperation = "source-over";
        }
      }

      // Sparkle particles floating around
      if (s.t > 0.3 && Math.random() < (s.t - 0.3) * 0.18) {
        const sa = Math.random() * Math.PI * 2;
        const sd = s.R * (0.3 + Math.random() * 0.9);
        s.sparkles.push({
          x: s.cx + Math.cos(sa) * sd,
          y: s.cy + Math.sin(sa) * sd * 0.85,
          sz: 1.5 + Math.random() * 4.5 * s.t,
          life: 1,
          dec: 0.012 + Math.random() * 0.025,
          rot: Math.random() * Math.PI,
        });
      }

      for (let j = s.sparkles.length - 1; j >= 0; j--) {
        const sp = s.sparkles[j];
        sp.life -= sp.dec;
        sp.rot += 0.05;
        if (sp.life <= 0) {
          s.sparkles.splice(j, 1);
          continue;
        }
        ctx!.save();
        ctx!.translate(sp.x, sp.y);
        ctx!.rotate(sp.rot);
        ctx!.globalAlpha = sp.life * Math.min(1, s.t * 1.5);
        ctx!.fillStyle = "#fff";
        const sz = sp.sz;
        ctx!.beginPath();
        ctx!.moveTo(0, -sz);
        ctx!.lineTo(sz * 0.25, -sz * 0.25);
        ctx!.lineTo(sz, 0);
        ctx!.lineTo(sz * 0.25, sz * 0.25);
        ctx!.lineTo(0, sz);
        ctx!.lineTo(-sz * 0.25, sz * 0.25);
        ctx!.lineTo(-sz, 0);
        ctx!.lineTo(-sz * 0.25, -sz * 0.25);
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }
      ctx!.globalAlpha = 1;
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
        s.lightX = 0.5 + Math.cos(s.autoLightAngle) * 0.32;
        s.lightY = 0.4 + Math.sin(s.autoLightAngle * 0.72) * 0.22;
      }

      if (scrubberRef.current && !s.userDrag) {
        scrubberRef.current.value = String(Math.round(s.t * 100));
      }

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

    const io = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
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
      window.removeEventListener("resize", resize);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("click", onClick);
      io.disconnect();
    };
  }, []);

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
