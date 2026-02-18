import { useState } from "react";
import { PROJECTS } from "../data/projects";
import FadeIn from "./FadeIn";

function ProjectCard({ p, darkMode, delay }) {
  const [hov, setHov] = useState(false);
  const t = darkMode;

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 28,
          padding: 28,
          position: "relative",
          overflow: "hidden",
          background: t ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.88)",
          border: t
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: hov
            ? `0 28px 65px ${p.accent}38`
            : t
            ? "0 4px 24px rgba(0,0,0,0.32)"
            : "0 4px 24px rgba(0,0,0,0.07)",
          transform: hov
            ? "scale(1.018) translateY(-5px)"
            : "scale(1) translateY(0)",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",

          // ✅ IMPORTANT: card should NOT look clickable
          cursor: "default",
        }}
      >
        {/* Gradient background (DO NOT BLOCK CLICKS) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: p.gradient,
            borderRadius: 28,
            pointerEvents: "none", // ✅ FIX
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 38, marginBottom: 10 }}>{p.icon}</div>

              <h3
                style={{
                  fontSize: 21,
                  fontWeight: 900,
                  margin: 0,
                  color: t ? "#fff" : "#0a0a14",
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontSize: 13,
                  margin: "4px 0 0",
                  color: t ? "rgba(255,255,255,0.48)" : "rgba(0,0,0,0.42)",
                }}
              >
                {p.subtitle}
              </p>
            </div>

            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${p.accent}18`,
                border: `1px solid ${p.accent}35`,
                color: p.accent,
                fontWeight: 800,
                fontSize: 16,
                transition: "transform 0.25s",
                transform: hov ? "translateX(4px)" : "none",
                flexShrink: 0,
              }}
            >
              →
            </div>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.72,
              color: t ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.54)",
              marginBottom: 20,
            }}
          >
            {p.description}
          </p>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 22,
            }}
          >
            {p.tech.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "4px 11px",
                  borderRadius: 9,
                  background: `${p.accent}14`,
                  color: p.accent,
                  border: `1px solid ${p.accent}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()} // ✅ FIX
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px",
                  borderRadius: 15,
                  cursor: "pointer",
                  background: `linear-gradient(135deg, ${p.accent}, ${p.accent}cc)`,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.88")
                }
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Live App ↗
              </a>
            )}

            {p.source && (
              <a
                href={p.source}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()} // ✅ FIX
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "11px",
                  borderRadius: 15,
                  background: "transparent",
                  border: t
                    ? "1.5px solid rgba(255,255,255,0.13)"
                    : "1.5px solid rgba(0,0,0,0.1)",
                  color: t ? "#fff" : "#333",
                  fontWeight: 700,
                  fontSize: 13,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = t
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.04)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Projects({ darkMode }) {
  const t = darkMode;

  return (
    <section id="projects" style={{ padding: "90px 24px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "5px 16px",
                borderRadius: 20,
                background: t
                  ? "rgba(16,185,129,0.2)"
                  : "rgba(16,185,129,0.1)",
                color: t ? "#6ee7b7" : "#059669",
              }}
            >
              Projects
            </span>

            <h2
              style={{
                fontSize: 38,
                fontWeight: 900,
                margin: "14px 0 0",
                letterSpacing: -1,
                color: t ? "#fff" : "#0a0a14",
              }}
            >
              Things I've Built
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              darkMode={darkMode}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
