import { useState, useRef, useCallback } from "react";
import { PROJECTS } from "../data/projects";
import FadeIn from "./FadeIn";

/* ─── Keyframe injector (runs once) ─────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes shimmerBorder {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes floatBubble {
    0%,100% { transform: translateY(0) scale(1);   opacity: 0.35; }
    50%      { transform: translateY(-18px) scale(1.12); opacity: 0.55; }
  }
  @keyframes pulseGlow {
    0%,100% { opacity: 0; }
    50%      { opacity: 1; }
  }
  @keyframes tagPop {
    0%   { transform: scale(0.8); opacity: 0; }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes arrowBounce {
    0%,100% { transform: translateX(0); }
    50%      { transform: translateX(6px); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(400%);  }
  }
  .project-card-btn:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; }
  .project-card-btn { transition: opacity 0.2s, transform 0.2s !important; }
`;

if (typeof document !== "undefined" && !document.getElementById("pc-styles")) {
  const s = document.createElement("style");
  s.id = "pc-styles";
  s.textContent = CSS;
  document.head.appendChild(s);
}

/* ─── Bubble particle ────────────────────────────────────────────────── */
function Bubble({ accent, x, y, size, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${accent}88, ${accent}11)`,
        animation: `floatBubble ${2.8 + delay}s ease-in-out ${delay}s infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── ProjectCard ────────────────────────────────────────────────────── */
function ProjectCard({ p, darkMode, delay }) {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const t = darkMode;

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const nx = (cx / rect.width - 0.5) * 2;   // -1 → 1
    const ny = (cy / rect.height - 0.5) * 2;
    setTilt({ x: ny * -9, y: nx * 9 });
    setSpotlight({ x: (cx / rect.width) * 100, y: (cy / rect.height) * 100 });
  }, []);

  const handleMouseEnter = () => setHov(true);
  const handleMouseLeave = () => {
    setHov(false);
    setTilt({ x: 0, y: 0 });
  };

  /* random bubbles per card (deterministic from index) */
  const bubbles = [
    { x: 10, y: 15, size: 32, delay: 0   },
    { x: 82, y: 8,  size: 18, delay: 0.7 },
    { x: 65, y: 78, size: 24, delay: 1.4 },
    { x: 20, y: 70, size: 14, delay: 0.3 },
  ];

  return (
    <FadeIn delay={delay}>
      {/* ── Shimmer border wrapper ── */}
      <div
        style={{
          borderRadius: 30,
          padding: 1.5,
          background: hov
            ? `linear-gradient(120deg, ${p.accent}, #fff4, ${p.accent}88, #fff2, ${p.accent})`
            : t
            ? "rgba(255,255,255,0.07)"
            : "rgba(0,0,0,0.06)",
          backgroundSize: "300% 300%",
          animation: hov ? "shimmerBorder 2.4s linear infinite" : "none",
          transition: "background 0.4s",
        }}
      >
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          style={{
            borderRadius: 29,
            padding: "30px 28px 26px",
            position: "relative",
            overflow: "hidden",
            background: t
              ? "linear-gradient(145deg, rgba(18,18,28,0.97), rgba(10,10,20,0.99))"
              : "linear-gradient(145deg, rgba(255,255,255,0.97), rgba(245,245,255,0.99))",
            boxShadow: hov
              ? `0 32px 72px ${p.accent}40, 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)`
              : t
              ? "0 4px 28px rgba(0,0,0,0.4)"
              : "0 4px 28px rgba(0,0,0,0.08)",
            transform: hov
              ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.025) translateY(-6px)`
              : "perspective(900px) rotateX(0) rotateY(0) scale(1)",
            transition: hov
              ? "box-shadow 0.3s ease, transform 0.12s ease"
              : "box-shadow 0.4s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
            cursor: "default",
            fontFamily: "'DM Sans', sans-serif",
            willChange: "transform",
          }}
        >
          {/* ── Spotlight ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 29,
              background: hov
                ? `radial-gradient(circle 180px at ${spotlight.x}% ${spotlight.y}%, ${p.accent}22 0%, transparent 70%)`
                : "none",
              pointerEvents: "none",
              transition: "opacity 0.2s",
              zIndex: 1,
            }}
          />

          {/* ── Card gradient bg ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: p.gradient,
              borderRadius: 29,
              opacity: hov ? 0.55 : 0.25,
              transition: "opacity 0.4s",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* ── Scanline streak ── */}
          {hov && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "35%",
                background: `linear-gradient(to bottom, transparent, ${p.accent}12, transparent)`,
                animation: "scanline 1.8s linear infinite",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          )}

          {/* ── Bubbles ── */}
          {bubbles.map((b, i) => (
            <Bubble key={i} accent={p.accent} {...b} />
          ))}

          {/* ── Content ── */}
          <div style={{ position: "relative", zIndex: 2 }}>

            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
              <div>
                {/* Icon with glow ring */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 54,
                    height: 54,
                    borderRadius: 18,
                    background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}0a)`,
                    border: `1.5px solid ${p.accent}40`,
                    fontSize: 28,
                    marginBottom: 14,
                    boxShadow: hov ? `0 0 24px ${p.accent}55` : "none",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  {p.icon}
                </div>

                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    margin: 0,
                    letterSpacing: "-0.5px",
                    fontFamily: "'Syne', sans-serif",
                    color: t ? "#f0f0ff" : "#080814",
                    textShadow: hov ? `0 0 40px ${p.accent}66` : "none",
                    transition: "text-shadow 0.3s",
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: 12,
                    margin: "5px 0 0",
                    fontWeight: 500,
                    letterSpacing: 0.3,
                    color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
                  }}
                >
                  {p.subtitle}
                </p>
              </div>

              {/* Arrow badge */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: hov ? `linear-gradient(135deg, ${p.accent}, ${p.accent}aa)` : `${p.accent}18`,
                  border: `1.5px solid ${p.accent}40`,
                  color: hov ? "#fff" : p.accent,
                  fontWeight: 900,
                  fontSize: 18,
                  flexShrink: 0,
                  animation: hov ? "arrowBounce 0.7s ease-in-out infinite" : "none",
                  transition: "background 0.3s, color 0.3s",
                  boxShadow: hov ? `0 0 20px ${p.accent}55` : "none",
                }}
              >
                →
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: hov
                  ? `linear-gradient(90deg, transparent, ${p.accent}66, transparent)`
                  : t
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)",
                marginBottom: 16,
                transition: "background 0.4s",
              }}
            />

            {/* Description */}
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: t ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.52)",
                marginBottom: 20,
                fontWeight: 400,
              }}
            >
              {p.description}
            </p>

            {/* Tech tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
              {p.tech.map((tech, idx) => (
                <span
                  key={tech}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: 8,
                    background: hov ? `${p.accent}22` : `${p.accent}10`,
                    color: p.accent,
                    border: `1px solid ${p.accent}${hov ? "44" : "25"}`,
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    animation: hov ? `tagPop 0.35s ease ${idx * 0.06}s both` : "none",
                    transition: "background 0.3s, border 0.3s",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="project-card-btn"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: 14,
                    cursor: "pointer",
                    background: `linear-gradient(135deg, ${p.accent}, ${p.accent}bb)`,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    boxShadow: hov ? `0 8px 28px ${p.accent}55` : "none",
                    transition: "box-shadow 0.3s !important",
                    letterSpacing: 0.2,
                  }}
                >
                  Live App ↗
                </a>
              )}
              {p.source && (
                <a
                  href={p.source}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="project-card-btn"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "12px",
                    borderRadius: 14,
                    background: "transparent",
                    border: t
                      ? "1.5px solid rgba(255,255,255,0.12)"
                      : "1.5px solid rgba(0,0,0,0.09)",
                    color: t ? "#ffffffcc" : "#333",
                    fontWeight: 700,
                    fontSize: 13,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    cursor: "pointer",
                    letterSpacing: 0.2,
                    backdropFilter: "blur(6px)",
                  }}
                >
                  Source Code
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Projects section ───────────────────────────────────────────────── */
export default function Projects({ darkMode }) {
  const t = darkMode;

  return (
    <section id="projects" style={{ padding: "100px 24px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 58 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                padding: "6px 18px",
                borderRadius: 20,
                background: t ? "rgba(16,185,129,0.18)" : "rgba(16,185,129,0.1)",
                color: t ? "#6ee7b7" : "#059669",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Projects
            </span>

            <h2
              style={{
                fontSize: 42,
                fontWeight: 900,
                margin: "16px 0 0",
                letterSpacing: -1.5,
                fontFamily: "'Syne', sans-serif",
                color: t ? "#f0f0ff" : "#080814",
              }}
            >
              Things I've Built
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
            gap: 26,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} darkMode={darkMode} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}