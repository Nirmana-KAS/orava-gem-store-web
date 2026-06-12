"use client";

import React, { useRef, useEffect, useState } from "react";

/* ================================================================
   HeroGem — Interactive round-brilliant gem, 3/4 PERSPECTIVE view.
   Mirrors the "Anatomy of a Diamond" reference (the grey line
   drawing): octagonal table seen at a tilt, crown bezel + star
   facets, octagonal girdle, pavilion facets converging to a culet
   point. A tiny 3-D renderer builds a unit model, displaces it
   toward a rough lump at t=0, rotates (tilt + gentle yaw),
   projects, depth-sorts, and shades each facet by its normal vs.
   the light. Colour: rough warm-grey stone -> royal blue.

   Drop-in client component. Requires the matching `.gem-stage`,
   `.gem-scrubber`, `.gem-stage-label` styles from hero.css.
   ================================================================ */

export default function HeroGem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubberRef = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState("Rough stone");

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const scrubber = scrubberRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const DEG = Math.PI / 180;

    let W = 0, H = 0, cx = 0, cy = 0, R = 0;
    let t = 0, targetT = 0, time = 0, yaw = 0;
    let isHovering = false, cursorNear = 0, mx = 0.5, my = 0.35;
    let userDrag = false;
    type Sparkle = { x: number; y: number; sz: number; life: number; dec: number; rot: number };
    let sparkles: Sparkle[] = [];
    let raf = 0;

    /* —— model proportions (unit, gem axis = +Y up) —— */
    const TABLE_Y = 0.34, GIRDLE_Y = 0.0, CULET_Y = -0.92;
    const RT = 0.55, RG = 1.0, RV = 0.965;

    const V: number[][] = [];
    const tableIdx: number[] = [];
    const girdle: number[] = [];
    let culetIdx = 0;

    for (let k = 0; k < 8; k++) {
      const a = (22.5 + 45 * k) * DEG;
      tableIdx.push(V.length);
      V.push([Math.cos(a) * RT, TABLE_Y, Math.sin(a) * RT]);
    }
    for (let k = 0; k < 8; k++) {
      const am = (22.5 + 45 * k) * DEG;
      girdle.push(V.length); V.push([Math.cos(am) * RG, GIRDLE_Y, Math.sin(am) * RG]);
      const av = (45 + 45 * k) * DEG;
      girdle.push(V.length); V.push([Math.cos(av) * RV, GIRDLE_Y, Math.sin(av) * RV]);
    }
    culetIdx = V.length; V.push([0, CULET_Y, 0]);

    const gAt = (j: number) => girdle[((j % 16) + 16) % 16];
    const gMain = (k: number) => girdle[(2 * k) % 16];
    const gVal = (k: number) => girdle[(2 * k + 1) % 16];

    type Face = { idx: number[]; type: "table" | "bezel" | "star" | "pav"; par: number };
    const faces: Face[] = [];
    faces.push({ idx: tableIdx.slice(), type: "table", par: 0 });
    for (let k = 0; k < 8; k++) {
      const I0 = tableIdx[k], I1 = tableIdx[(k + 1) % 8];
      const Om = gMain(k), Ov = gVal(k), Om1 = gMain((k + 1) % 8);
      faces.push({ idx: [I0, Om, Ov], type: "bezel", par: k % 2 });
      faces.push({ idx: [I1, Ov, Om1], type: "bezel", par: (k + 1) % 2 });
      faces.push({ idx: [I0, Ov, I1], type: "star", par: k % 2 });
    }
    for (let j = 0; j < 16; j++) {
      faces.push({ idx: [gAt(j), gAt(j + 1), culetIdx], type: "pav", par: j % 2 });
    }

    const rough: number[][] = [];
    for (let i = 0; i < V.length; i++) {
      rough.push([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1]);
    }

    function resize() {
      const rect = stage!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + "px"; canvas!.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W / 2; cy = H / 2;
      R = Math.min(W, H) * 0.4;
    }

    function transform() {
      const pitch = 0.4;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const cyw = Math.cos(yaw), syw = Math.sin(yaw);
      const rf = (1 - t) * 0.36;
      const out: number[][] = [];
      for (let i = 0; i < V.length; i++) {
        const v = V[i];
        let x = v[0], y = v[1], z = v[2];
        if (rf > 0.0001) {
          const ro = rough[i];
          const wob = 1 + 0.4 * Math.sin(time * 0.6 + i);
          x += ro[0] * rf * wob; y += ro[1] * rf * wob; z += ro[2] * rf * wob;
        }
        x *= R; y *= R; z *= R;
        const x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y1 = y;
        const y2 = y1 * cp - z1 * sp, z2 = y1 * sp + z1 * cp;
        out.push([x1, y2, z2]);
      }
      return out;
    }

    function normal(p: number[][], idx: number[]) {
      const a = p[idx[0]], b = p[idx[1]], c = p[idx[2]];
      const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
      const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const ln = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      return [nx / ln, ny / ln, nz / ln];
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      if (t > 0.15) {
        const ga = ((t - 0.15) / 0.85) * 0.26;
        const grd = ctx.createRadialGradient(cx, cy, R * 0.08, cx, cy, R * 1.95);
        grd.addColorStop(0, `rgba(30,60,180,${ga * 1.2})`);
        grd.addColorStop(0.45, `rgba(60,116,200,${ga * 0.6})`);
        grd.addColorStop(1, "rgba(30,60,180,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }

      const P = transform();

      let lx: number, ly: number, lz: number;
      if (isHovering) { lx = (mx - 0.5) * 1.6; ly = (0.5 - my) * 1.6; lz = 0.85; }
      else { lx = Math.cos(time * 0.5) * 0.5; ly = 0.55; lz = 0.8; }
      const ll = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
      lx /= ll; ly /= ll; lz /= ll;

      /* Royal blue color path: warm grey rough -> deep royal blue finished
         Skips pink/purple, goes through neutral gray to blue smoothly */
      // Royal blue sapphire color path — matches real sapphire
      // reference photo. Hue stays in pure blue range, very high
      // saturation, deeper darks
      const bH = 32 + (222 - 32) * t;  // 32° warm grey → 222° royal blue
      const bS = 8 + (92 - 8) * t;     // 8% (rough) → 92% (vivid royal sapphire)

      const list: { f: Face; z: number }[] = [];
      for (const fc of faces) {
        let zsum = 0;
        for (const k of fc.idx) zsum += P[k][2];
        list.push({ f: fc, z: zsum / fc.idx.length });
      }
      list.sort((a, b) => a.z - b.z);

      for (const item of list) {
        const fc = item.f;
        const idx = fc.idx;
        const nrm = normal(P, idx);
        const sgn = nrm[2] < 0 ? -1 : 1;
        const br = Math.max(0, nrm[0] * sgn * lx + nrm[1] * sgn * ly + nrm[2] * sgn * lz);
        const alt = fc.par ? 1 : -1;

        let base: number, amp: number, sat: number, hue = bH;
        if (fc.type === "table") {
          // Table: bright sky-blue with white center reflection
          base = 58; amp = 22; sat = bS * 0.5; hue = bH - 2 * t;
        }
        else if (fc.type === "bezel") {
          // Crown bezel: classic royal blue medium tone
          base = 30; amp = 58; sat = bS * 1.0; hue = bH + alt * 2 * t;
        }
        else if (fc.type === "star") {
          // Star facets: brighter medium blue
          base = 48; amp = 36; sat = bS * 0.75; hue = bH + 4 * t;
        }
        else {
          // Pavilion: deep dark navy (the sapphire heart)
          base = 14; amp = 50; sat = bS * 1.15; hue = bH + alt * 3 * t;
        }

        const roughL = 40 + alt * 3;
        const litL = base + br * amp;
        let lgt = roughL * (1 - t) + litL * t;
        const crisp = fc.type === "bezel" || fc.type === "pav" ? alt * 6 * t : 0;
        lgt += crisp;

        ctx.beginPath();
        ctx.moveTo(cx + P[idx[0]][0], cy - P[idx[0]][1]);
        for (let v = 1; v < idx.length; v++) ctx.lineTo(cx + P[idx[v]][0], cy - P[idx[v]][1]);
        ctx.closePath();

        if (fc.type === "table" && t > 0.2) {
          const ctr = [0, 0];
          for (const q of idx) { ctr[0] += P[q][0]; ctr[1] += P[q][1]; }
          ctr[0] = cx + ctr[0] / idx.length; ctr[1] = cy - ctr[1] / idx.length;
          const tg = ctx.createRadialGradient(ctr[0] - R * 0.12, ctr[1] - R * 0.12, 0, ctr[0], ctr[1], R * 0.7);
          tg.addColorStop(0, `hsl(${Math.round(hue)},${Math.round(sat * 0.4)}%,${Math.min(98, lgt + 38)}%)`);
          tg.addColorStop(0.4, `hsl(${Math.round(hue)},${Math.round(sat * 0.7)}%,${Math.min(94, lgt + 18)}%)`);
          tg.addColorStop(1, `hsl(${Math.round(hue)},${Math.round(sat)}%,${Math.min(90, lgt + 4)}%)`);
          ctx.fillStyle = tg;
        } else {
          ctx.fillStyle = `hsl(${Math.round(((hue % 360) + 360) % 360)},${Math.round(
            Math.max(0, Math.min(100, sat))
          )}%,${Math.round(Math.max(6, Math.min(96, lgt)))}%)`;
        }
        ctx.fill();

        ctx.strokeStyle = `rgba(255,255,255,${0.05 + t * 0.26})`;
        ctx.lineWidth = 0.4 + t * 0.5;
        ctx.stroke();
      }

      /* girdle outline */
      ctx.beginPath();
      for (let gi = 0; gi < 16; gi++) {
        const gp = P[gAt(gi)];
        if (gi === 0) ctx.moveTo(cx + gp[0], cy - gp[1]);
        else ctx.lineTo(cx + gp[0], cy - gp[1]);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(210,224,255,${0.12 + t * 0.4})`;
      ctx.lineWidth = 0.6 + t * 0.7;
      ctx.stroke();

      /* sparkles */
      const spP = t > 0.35 ? ((t - 0.35) / 0.65) * 0.24 + cursorNear * 0.09 : 0;
      if (Math.random() < spP) {
        const sa = Math.random() * Math.PI * 2;
        sparkles.push({
          x: cx + Math.cos(sa) * R * (0.05 + Math.random() * 0.92),
          y: cy + Math.sin(sa) * R * (0.05 + Math.random() * 0.78) - R * 0.08,
          sz: 1.8 + Math.random() * 6 * t + cursorNear * 2.5,
          life: 1, dec: 0.012 + Math.random() * 0.024,
          rot: Math.random() * Math.PI,
        });
      }
      for (let sj = sparkles.length - 1; sj >= 0; sj--) {
        const sp = sparkles[sj];
        sp.life -= sp.dec; sp.rot += 0.055;
        if (sp.life <= 0) { sparkles.splice(sj, 1); continue; }
        const al = sp.life * Math.min(1, t * 1.6);
        const sz = sp.sz;
        ctx.save();
        ctx.translate(sp.x, sp.y); ctx.rotate(sp.rot);
        ctx.globalAlpha = al; ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(0, -sz); ctx.lineTo(sz * 0.14, -sz * 0.14);
        ctx.lineTo(sz, 0); ctx.lineTo(sz * 0.14, sz * 0.14);
        ctx.lineTo(0, sz); ctx.lineTo(-sz * 0.14, sz * 0.14);
        ctx.lineTo(-sz, 0); ctx.lineTo(-sz * 0.14, -sz * 0.14);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    }

    function loop() {
      time += 0.016;
      t += (targetT - t) * 0.038;
      if (Math.abs(t - targetT) < 0.001) t = targetT;

      if (!isHovering) yaw = Math.sin(time * 0.22) * 0.16;
      else yaw = (mx - 0.5) * 0.5;

      if (scrubber && !userDrag) scrubber.value = String(Math.round(t * 100));

      let nl: string;
      if (t < 0.15) nl = "Rough stone";
      else if (t < 0.45) nl = "Shaping…";
      else if (t < 0.75) nl = "Faceting…";
      else if (t < 0.95) nl = "Polishing…";
      else nl = "Finished gem";
      setLabel((prev) => (prev !== nl ? nl : prev));

      draw();
      raf = requestAnimationFrame(loop);
    }

    const onEnter = () => { isHovering = true; };
    const onLeave = () => { isHovering = false; cursorNear = 0; };
    const onMove = (e: MouseEvent) => {
      const r = stage!.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
      const dx = e.clientX - r.left - W * 0.5;
      const dy = e.clientY - r.top - H * 0.5;
      cursorNear = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / (R * 1.2));
    };
    const onClick = () => {
      t = 0; targetT = 0; sparkles = [];
      setTimeout(() => { targetT = 1; }, 320);
    };
    const onScrubInput = () => { userDrag = true; targetT = Number(scrubber!.value) / 100; t = targetT; };
    const onScrubEnd = () => { userDrag = false; };

    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    stage.addEventListener("mousemove", onMove);
    canvas.addEventListener("click", onClick);
    scrubber?.addEventListener("input", onScrubInput);
    scrubber?.addEventListener("change", onScrubEnd);

    resize();
    window.addEventListener("resize", resize);
    t = 0; targetT = 0;
    const kick = setTimeout(() => { targetT = 1; }, 450);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(kick);
      window.removeEventListener("resize", resize);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      stage.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
      scrubber?.removeEventListener("input", onScrubInput);
      scrubber?.removeEventListener("change", onScrubEnd);
    };
  }, []);

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
        />
        <span className="gs-label fin">Finished</span>
      </div>
      <p className="gem-stage-label">{label}</p>
      <p className="gem-hint">Move cursor over gem · Click to replay cutting</p>
    </aside>
  );
}
