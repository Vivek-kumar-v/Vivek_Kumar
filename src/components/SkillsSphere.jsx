import { useRef, useEffect } from "react";
import { SKILLS } from "../data/skills";
import FadeIn from "./FadeIn";

function SkillCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const state = useRef({ theta: 0, phi: 0, vx: 0.002, vy: 0.0006 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 480, H = 480;
    canvas.width = W;
    canvas.height = H;
    const cx = W / 2, cy = H / 2, R = 172;

    const golden = Math.PI * (3 - Math.sqrt(5));
    const n = SKILLS.length;

    const basePos = SKILLS.map((skill, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, skill };
    });

    function rotatePoint(p, rx, ry) {
      const cy2 = Math.cos(ry), sy2 = Math.sin(ry);
      let x = p.x * cy2 + p.z * sy2;
      let z = -p.x * sy2 + p.z * cy2;
      const cx2 = Math.cos(rx), sx2 = Math.sin(rx);
      let y = p.y * cx2 - z * sx2;
      z = p.y * sx2 + z * cx2;
      return { x, y, z, skill: p.skill };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const s = state.current;
      s.theta += s.vx;
      s.phi += s.vy;

      const pts = basePos.map((p) => rotatePoint(p, s.phi, s.theta));
      pts.sort((a, b) => a.z - b.z);

      pts.forEach((p) => {
        const scale = (p.z + 1.5) / 2.5;
        const px = cx + p.x * R;
        const py = cy - p.y * R;
        const alpha = 0.22 + scale * 0.78;
        const fontSize = Math.round(8.5 + scale * 7.5);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${scale > 0.65 ? "700" : "500"} ${fontSize}px 'Plus Jakarta Sans', system-ui, sans-serif`;

        const textW = ctx.measureText(p.skill).width;
        const pad = 8;
        const bW = textW + pad * 2;
        const bH = fontSize + pad;
        const br = bH / 2;

        ctx.beginPath();
        ctx.moveTo(px - bW / 2 + br, py - bH / 2);
        ctx.arcTo(px + bW / 2, py - bH / 2, px + bW / 2, py + bH / 2, br);
        ctx.arcTo(px + bW / 2, py + bH / 2, px - bW / 2, py + bH / 2, br);
        ctx.arcTo(px - bW / 2, py + bH / 2, px - bW / 2, py - bH / 2, br);
        ctx.arcTo(px - bW / 2, py - bH / 2, px + bW / 2, py - bH / 2, br);
        ctx.closePath();

        if (scale > 0.58) {
          const g = ctx.createLinearGradient(px - bW / 2, py, px + bW / 2, py);
          g.addColorStop(0, darkMode ? "rgba(99,102,241,0.6)" : "rgba(99,102,241,0.22)");
          g.addColorStop(1, darkMode ? "rgba(168,85,247,0.6)" : "rgba(168,85,247,0.22)");
          ctx.fillStyle = g;
        } else {
          ctx.fillStyle = darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0.04)";
        }
        ctx.fill();

        ctx.strokeStyle =
          scale > 0.58
            ? "rgba(139,92,246,0.5)"
            : "rgba(139,92,246,0.1)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.fillStyle =
          scale > 0.58
            ? darkMode
              ? "#e2e8f0"
              : "#1e1b4b"
            : darkMode
            ? "rgba(226,232,240,0.42)"
            : "rgba(30,27,75,0.32)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.skill, px, py);
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        maxWidth: 480,
        height: 480,
        display: "block",
        margin: "0 auto",
        cursor: "grab",
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
                background: t
                  ? "rgba(139,92,246,0.2)"
                  : "rgba(139,92,246,0.09)",
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
              Hover & explore the rotating 3D skill cloud
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
