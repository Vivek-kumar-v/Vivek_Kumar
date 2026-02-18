import { useRef, useEffect } from "react";
import { SKILLS } from "../data/skills";
import FadeIn from "./FadeIn";

function SkillCanvas({ darkMode }) {
  const canvasRef  = useRef(null);
  const animRef    = useRef(null);
  const stateRef   = useRef({ theta: 0, phi: 0, vx: 0.0018, vy: 0.0005 });
  const mouseRef   = useRef({ x: null, y: null });
  const hoveredRef = useRef(null);
  const dragRef    = useRef({ dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 480, H = 480;
    canvas.width  = W;
    canvas.height = H;
    const cx = W / 2, cy = H / 2, R = 172;

    const golden = Math.PI * (3 - Math.sqrt(5));
    const n = SKILLS.length;

    // Per-skill animated hover scale (1 = normal, TARGET_SCALE = hovered)
    const hoverScales = new Array(n).fill(1);
    const TARGET_SCALE = 1.36;

    const basePos = SKILLS.map((skill, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, skill, origIdx: i };
    });

    function rotatePoint(p, rx, ry) {
      const cy2 = Math.cos(ry), sy2 = Math.sin(ry);
      let x =  p.x * cy2 + p.z * sy2;
      let z = -p.x * sy2 + p.z * cy2;
      const cx2 = Math.cos(rx), sx2 = Math.sin(rx);
      let y =  p.y * cx2 - z * sx2;
          z =  p.y * sx2 + z * cx2;
      return { x, y, z, skill: p.skill, origIdx: p.origIdx };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const s = stateRef.current;

      // Slow rotation while hovering (but not while dragging)
      const isHovering = hoveredRef.current !== null;
      const isDragging = dragRef.current.dragging;
      if (!isDragging) {
        s.vx += ((isHovering ? 0.0004 : 0.0018) - s.vx) * 0.06;
        s.vy += ((isHovering ? 0.0001 : 0.0005) - s.vy) * 0.06;
      } else {
        // Dampen velocity during drag so momentum builds from drag delta
        s.vx *= 0.8;
        s.vy *= 0.8;
      }
      s.theta += s.vx;
      s.phi   += s.vy;

      // Project all points
      const pts = basePos.map((p) => {
        const rp = rotatePoint(p, s.phi, s.theta);
        return { ...rp, px: cx + rp.x * R, py: cy - rp.y * R };
      });
      pts.sort((a, b) => a.z - b.z);

      // ── Hit-test mouse against current pill bounds ──────────────────────────
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      let newHovered = null;

      if (mx !== null) {
        for (let i = pts.length - 1; i >= 0; i--) {
          const p   = pts[i];
          const hs  = hoverScales[p.origIdx];
          const scale    = (p.z + 1.5) / 2.5;
          const fontSize = Math.round(8.5 + scale * 7.5) * hs;
          ctx.font = `${scale > 0.65 ? "700" : "500"} ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`;
          const textW = ctx.measureText(p.skill).width;
          const pad   = 8 * hs;
          const bW = textW + pad * 2;
          const bH = fontSize + pad;
          if (mx >= p.px - bW/2 && mx <= p.px + bW/2 &&
              my >= p.py - bH/2 && my <= p.py + bH/2) {
            newHovered = p.origIdx;
            break;
          }
        }
      }
      hoveredRef.current = newHovered;
      canvas.style.cursor = dragRef.current.dragging
        ? "grabbing"
        : newHovered !== null
        ? "pointer"
        : "grab";

      // Animate hover scales toward target
      for (let i = 0; i < n; i++) {
        const target = i === newHovered ? TARGET_SCALE : 1;
        hoverScales[i] += (target - hoverScales[i]) * 0.13;
      }

      // ── Draw pills ──────────────────────────────────────────────────────────
      pts.forEach((p) => {
        const scale    = (p.z + 1.5) / 2.5;
        const isHov    = p.origIdx === newHovered;
        const hs       = hoverScales[p.origIdx];
        const alpha    = 0.22 + scale * 0.78;
        const fontSize = Math.round(8.5 + scale * 7.5) * hs;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${scale > 0.65 || isHov ? "700" : "500"} ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`;

        const textW = ctx.measureText(p.skill).width;
        const pad   = 8 * hs;
        const bW = textW + pad * 2;
        const bH = fontSize + pad;
        const br = bH / 2;

        // Draw pill shape
        ctx.beginPath();
        ctx.moveTo(p.px - bW/2 + br, p.py - bH/2);
        ctx.arcTo(p.px + bW/2, p.py - bH/2, p.px + bW/2, p.py + bH/2, br);
        ctx.arcTo(p.px + bW/2, p.py + bH/2, p.px - bW/2, p.py + bH/2, br);
        ctx.arcTo(p.px - bW/2, p.py + bH/2, p.px - bW/2, p.py - bH/2, br);
        ctx.arcTo(p.px - bW/2, p.py - bH/2, p.px + bW/2, p.py - bH/2, br);
        ctx.closePath();

        // ── Fill ───────────────────────────────────────────────────────────────
        if (isHov) {
          const g = ctx.createLinearGradient(p.px - bW/2, p.py, p.px + bW/2, p.py);
          g.addColorStop(0, darkMode ? "rgba(129,140,248,0.92)" : "rgba(99,102,241,0.9)");
          g.addColorStop(1, darkMode ? "rgba(192,132,252,0.92)" : "rgba(168,85,247,0.9)");
          ctx.fillStyle = g;
          ctx.shadowColor = darkMode ? "rgba(139,92,246,0.8)" : "rgba(99,102,241,0.5)";
          ctx.shadowBlur  = 18 * hs;
        } else if (scale > 0.58) {
          const g = ctx.createLinearGradient(p.px - bW/2, p.py, p.px + bW/2, p.py);
          g.addColorStop(0, darkMode ? "rgba(99,102,241,0.6)"  : "rgba(99,102,241,0.22)");
          g.addColorStop(1, darkMode ? "rgba(168,85,247,0.6)"  : "rgba(168,85,247,0.22)");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // ── Border ─────────────────────────────────────────────────────────────
        ctx.strokeStyle = isHov
          ? (darkMode ? "rgba(192,132,252,0.95)" : "rgba(99,102,241,0.95)")
          : (scale > 0.58 ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.1)");
        ctx.lineWidth = isHov ? 1.4 : 0.8;
        ctx.stroke();

        // ── Text ───────────────────────────────────────────────────────────────
        ctx.fillStyle = isHov
          ? "#fff"
          : (scale > 0.58
              ? (darkMode ? "#e2e8f0" : "#1e1b4b")
              : (darkMode ? "rgba(226,232,240,0.42)" : "rgba(30,27,75,0.32)"));
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.skill, p.px, p.py);

        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [darkMode]);

  function getCanvasPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (480 / rect.width),
      y: (clientY - rect.top)  * (480 / rect.height),
      clientX, clientY,
    };
  }

  function handleMouseDown(e) {
    const pos = getCanvasPos(e);
    dragRef.current = { dragging: true, lastX: pos.clientX, lastY: pos.clientY };
  }

  function handleMouseMove(e) {
    const pos = getCanvasPos(e);
    mouseRef.current = { x: pos.x, y: pos.y };

    if (dragRef.current.dragging) {
      const dx = pos.clientX - dragRef.current.lastX;
      const dy = pos.clientY - dragRef.current.lastY;
      stateRef.current.theta += dx * 0.007;
      stateRef.current.phi   += dy * 0.007;
      // Store delta as momentum for when drag ends
      stateRef.current.vx = dx * 0.003;
      stateRef.current.vy = dy * 0.003;
      dragRef.current.lastX = pos.clientX;
      dragRef.current.lastY = pos.clientY;
    }
  }

  function handleMouseUp() {
    dragRef.current.dragging = false;
  }

  function handleMouseLeave() {
    dragRef.current.dragging = false;
    mouseRef.current   = { x: null, y: null };
    hoveredRef.current = null;
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      style={{
        width: "100%",
        maxWidth: 480,
        height: 480,
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}

export default function SkillsSphere({ darkMode }) {
  const t = darkMode;

  return (
    <section id="skills" style={{ padding: "90px 24px" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "5px 16px",
                borderRadius: 20,
                background: t ? "rgba(139,92,246,0.2)" : "rgba(139,92,246,0.09)",
                color: t ? "#c4b5fd" : "#7c3aed",
              }}
            >
              Skills
            </span>
            <h2
              style={{
                fontSize: 38,
                fontWeight: 900,
                margin: "14px 0 10px",
                letterSpacing: -1,
                color: t ? "#fff" : "#0a0a14",
              }}
            >
              Tech Stack
            </h2>
            <p style={{ color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)", fontSize: 14 }}>
              Hover a skill to highlight · drag to rotate
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div
            style={{
              borderRadius: 32,
              padding: "36px 28px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: t ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
              border: t
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
              boxShadow: t
                ? "0 24px 70px rgba(0,0,0,0.45)"
                : "0 24px 70px rgba(0,0,0,0.07)",
            }}
          >
            <SkillCanvas darkMode={darkMode} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}