import { useState, useEffect, useRef } from "react";
import {NIT_LOGO} from "../assets/images";

// Inline NIT_LOGO placeholder - replace with actual import
// import { NIT_LOGO } from "../assets/images";
//const NIT_LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/NIT_Manipur_logo.png/220px-NIT_Manipur_logo.png";

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "ReGen Hackathon 2025",
    desc: "3rd Place (2nd Runner-Up) — IIC, NIT Manipur",
    year: "2025",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.35)",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(251,191,36,0.06))",
  },
  {
    icon: "⚡",
    title: "LeetCode Rating 1717",
    desc: "Top 10% globally in competitive programming",
    year: "2024",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.35)",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(167,139,250,0.06))",
  },
  {
    icon: "💡",
    title: "600+ Problems Solved",
    desc: "LeetCode + GeeksforGeeks — DSA mastery",
    year: "2024",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.35)",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.12), rgba(34,211,238,0.06))",
  },
];

// Keyframe injection
const injectStyles = () => {
  if (document.getElementById("edu-animations")) return;
  const style = document.createElement("style");
  style.id = "edu-animations";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap');

    @keyframes floatUp {
      0% { opacity: 0; transform: translateY(40px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 var(--glow-color, rgba(139,92,246,0.4)); }
      50% { box-shadow: 0 0 0 8px var(--glow-color, rgba(139,92,246,0)); }
    }
    @keyframes scanLine {
      0% { transform: translateY(-100%); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100%); opacity: 0; }
    }
    @keyframes borderFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes fadeSlideIn {
      0% { opacity: 0; transform: translateX(-20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes countUp {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes dotPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.4); opacity: 0.7; }
    }
    @keyframes cardEntrance {
      0% { opacity: 0; transform: translateY(30px) rotateX(8deg); }
      100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
    }
    @keyframes glowPulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @keyframes ribbonSlide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes iconBounce {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-6px) rotate(-5deg); }
      75% { transform: translateY(-3px) rotate(5deg); }
    }
    @keyframes particleFloat {
      0% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
      33% { transform: translateY(-15px) translateX(8px); opacity: 1; }
      66% { transform: translateY(-8px) translateX(-5px); opacity: 0.8; }
      100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    }
    @keyframes titleGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(139,92,246,0.3); }
      50% { text-shadow: 0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(99,102,241,0.3); }
    }

    .edu-card {
      transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
                  box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      perspective: 1000px;
    }
    .edu-card:hover {
      transform: translateY(-8px) scale(1.01);
    }

    .achievement-row {
      transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      overflow: hidden;
    }
    .achievement-row::before {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
      transition: left 0.5s ease;
    }
    .achievement-row:hover::before {
      left: 150%;
    }
    .achievement-row:hover {
      transform: translateX(8px) scale(1.02);
    }

    .lc-cta {
      transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      overflow: hidden;
    }
    .lc-cta::after {
      content: '';
      position: absolute;
      top: 50%; left: 50%;
      width: 0; height: 0;
      background: radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: width 0.5s ease, height 0.5s ease;
      border-radius: 50%;
    }
    .lc-cta:hover::after {
      width: 400px; height: 400px;
    }
    .lc-cta:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: rgba(245,158,11,0.6) !important;
      box-shadow: 0 12px 40px rgba(245,158,11,0.25) !important;
    }

    .exp-card {
      transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .exp-card:hover {
      transform: translateY(-4px);
    }

    .timeline-dot {
      animation: dotPulse 2.5s ease-in-out infinite;
    }
    .timeline-dot-2 {
      animation: dotPulse 2.5s ease-in-out infinite 0.8s;
    }

    .section-badge {
      transition: all 0.3s ease;
    }
    .section-badge:hover {
      transform: scale(1.05);
    }

    .card-shine {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      border-radius: 30px 30px 0 0;
    }
  `;
  document.head.appendChild(style);
};

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        animation: visible ? `cardEntrance 0.7s cubic-bezier(0.23,1,0.32,1) ${delay}s both` : "none",
        opacity: visible ? 1 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Education({ darkMode }) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [hoveredAchievement, setHoveredAchievement] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const t = darkMode;

  useEffect(() => {
    injectStyles();
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardBase = {
    borderRadius: 28,
    padding: isMobile ? 22 : 32,
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    background: t
      ? "rgba(15, 10, 30, 0.75)"
      : "rgba(255,255,255,0.92)",
    border: t
      ? "1px solid rgba(139,92,246,0.18)"
      : "1px solid rgba(0,0,0,0.08)",
    boxShadow: t
      ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
      : "0 20px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
    width: "100%",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  };

  return (
    <section
      id="education"
      style={{
        padding: isMobile ? "60px 16px" : "100px 24px",
        overflowX: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background ambient blobs */}
      {t && (
        <>
          <div style={{
            position: "absolute", top: "10%", left: "5%",
            width: 400, height: 400, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
            filter: "blur(60px)", pointerEvents: "none", animation: "glowPulse 4s ease infinite",
          }} />
          <div style={{
            position: "absolute", bottom: "10%", right: "5%",
            width: 500, height: 500, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            filter: "blur(80px)", pointerEvents: "none", animation: "glowPulse 5s ease infinite 1.5s",
          }} />
        </>
      )}

      <div style={{ maxWidth: 1060, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: isMobile ? 44 : 64 }}>
            <span
              className="section-badge"
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "6px 20px",
                borderRadius: 40,
                background: t
                  ? "rgba(99,102,241,0.18)"
                  : "rgba(99,102,241,0.08)",
                color: t ? "#a5b4fc" : "#4f46e5",
                border: t
                  ? "1px solid rgba(139,92,246,0.3)"
                  : "1px solid rgba(99,102,241,0.15)",
                boxShadow: t ? "0 0 20px rgba(139,92,246,0.2)" : "none",
                cursor: "default",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Background
            </span>

            <h2
              style={{
                fontSize: isMobile ? 32 : 46,
                fontWeight: 900,
                margin: "16px 0 0",
                letterSpacing: -1.5,
                color: t ? "#fff" : "#0a0a14",
                fontFamily: "'Syne', sans-serif",
                animation: t ? "titleGlow 3s ease infinite" : "none",
                lineHeight: 1.1,
              }}
            >
              Education &{" "}
              <span style={{
                background: "linear-gradient(135deg, #8b5cf6, #6366f1, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Achievements
              </span>
            </h2>
          </div>
        </FadeIn>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 28,
            alignItems: "start",
            width: "100%",
          }}
        >

          {/* ── Education Card ── */}
          <FadeIn delay={0.1}>
            <div
              className="edu-card"
              style={{
                ...cardBase,
                boxShadow: hoveredCard === "edu"
                  ? t
                    ? "0 30px 80px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 30px 80px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.15)"
                  : cardBase.boxShadow,
              }}
              onMouseEnter={() => setHoveredCard("edu")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card shine line */}
              <div className="card-shine" />

              {/* Ambient corner glow */}
              {t && (
                <div style={{
                  position: "absolute", top: -60, right: -60,
                  width: 200, height: 200, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              )}

              <h3 style={{
                fontSize: 15,
                fontWeight: 800,
                margin: "0 0 26px",
                color: t ? "#fff" : "#111",
                fontFamily: "'Syne', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}>
                <span style={{ fontSize: 20 }}>🎓</span> Education
              </h3>

              {/* Timeline */}
              <div style={{ position: "relative", paddingLeft: 28 }}>
                {/* Animated gradient line */}
                <div style={{
                  position: "absolute",
                  left: 6, top: 8, bottom: 0, width: 2,
                  background: "linear-gradient(180deg, #8b5cf6, #6366f1, rgba(99,102,241,0.1))",
                  borderRadius: 2,
                }} />

                {/* NIT Dot */}
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: -2, top: 6,
                    width: 18, height: 18,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                    boxShadow: "0 0 0 4px rgba(139,92,246,0.2), 0 0 16px rgba(139,92,246,0.5)",
                  }}
                />

                <div style={{ marginBottom: 32 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                    flexWrap: "wrap",
                  }}>
                    <div style={{
                      position: "relative",
                      width: 50, height: 50,
                      borderRadius: 14,
                      overflow: "hidden",
                      flexShrink: 0,
                      boxShadow: t
                        ? "0 4px 20px rgba(0,0,0,0.4)"
                        : "0 4px 16px rgba(0,0,0,0.1)",
                    }}>
                      <img
                        src={NIT_LOGO}
                        alt="NIT Manipur"
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "contain",
                          background: "white",
                          padding: 4,
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: t ? "#fff" : "#111", fontFamily: "'Syne', sans-serif" }}>
                        NIT Manipur
                      </div>
                      <div style={{ fontSize: 11, color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)", marginTop: 2 }}>
                        National Institute of Technology
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: "inline-block",
                    fontSize: 13, fontWeight: 700,
                    color: t ? "#c4b5fd" : "#7c3aed",
                    background: t ? "rgba(139,92,246,0.12)" : "rgba(139,92,246,0.07)",
                    padding: "4px 12px",
                    borderRadius: 8,
                    border: t ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(139,92,246,0.1)",
                  }}>
                    B.Tech — Computer Science & Engineering
                  </div>

                  <div style={{
                    fontSize: 12, marginTop: 8,
                    color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.42)",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                    6th Semester · Expected 2027 · Manipur, India
                  </div>
                </div>

                {/* XII Dot */}
                <div
                  className="timeline-dot-2"
                  style={{
                    position: "absolute",
                    left: -2, top: 162,
                    width: 18, height: 18,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #818cf8)",
                    boxShadow: "0 0 0 4px rgba(99,102,241,0.2), 0 0 16px rgba(99,102,241,0.4)",
                  }}
                />

                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: t ? "#fff" : "#111", fontFamily: "'Syne', sans-serif" }}>
                    XII — UP Board
                  </div>
                  <div style={{ fontSize: 12, marginTop: 5, color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.42)" }}>
                    Maharshi Arvind Vidya Mandir, Kushinagar, UP
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: t ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
              }}>
                <h4 style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: t ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)",
                  marginBottom: 14,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  💼 Experience
                </h4>

                <div
                  className="exp-card"
                  style={{
                    borderRadius: 20,
                    padding: "18px 20px",
                    background: t
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(0,0,0,0.03)",
                    border: t
                      ? "1px solid rgba(139,92,246,0.15)"
                      : "1px solid rgba(0,0,0,0.05)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: t ? "inset 0 1px 0 rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "100%", height: 2,
                    background: "linear-gradient(90deg, #8b5cf6, #6366f1, #8b5cf6)",
                    backgroundSize: "200% 100%",
                    animation: "borderFlow 3s linear infinite",
                  }} />

                  <div style={{ fontWeight: 800, fontSize: 14, color: t ? "#fff" : "#111", fontFamily: "'Syne', sans-serif" }}>
                    Edunet Foundation
                  </div>

                  <div style={{
                    fontSize: 12,
                    color: t ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.42)",
                    marginTop: 3,
                  }}>
                    AICTE IBM SkillsBuild · AI & Cloud Intern
                  </div>

                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#a78bfa",
                    marginTop: 8,
                    fontWeight: 600,
                    background: "rgba(139,92,246,0.1)",
                    padding: "3px 10px",
                    borderRadius: 6,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#a78bfa" }} />
                    Jul 2025 – Aug 2025
                  </div>

                  <p style={{
                    fontSize: 12.5,
                    lineHeight: 1.7,
                    color: t ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)",
                    marginTop: 12,
                    margin: "12px 0 0",
                  }}>
                    AI, Cloud Computing & Data Analytics. Hands-on with RAG pipelines, IBM Cloud, AI chatbots, and ML experiments.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* ── Achievements Card ── */}
          <FadeIn delay={0.2}>
            <div
              className="edu-card"
              style={{
                ...cardBase,
                boxShadow: hoveredCard === "ach"
                  ? t
                    ? "0 30px 80px rgba(245,158,11,0.2), 0 0 0 1px rgba(245,158,11,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 30px 80px rgba(245,158,11,0.12)"
                  : cardBase.boxShadow,
              }}
              onMouseEnter={() => setHoveredCard("ach")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-shine" />

              {t && (
                <div style={{
                  position: "absolute", top: -60, left: -60,
                  width: 200, height: 200, borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              )}

              <h3 style={{
                fontSize: 15,
                fontWeight: 800,
                margin: "0 0 24px",
                color: t ? "#fff" : "#111",
                fontFamily: "'Syne', sans-serif",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 20 }}>🏆</span> Achievements
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={a.title}
                    className="achievement-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "16px 18px",
                      borderRadius: 20,
                      background: hoveredAchievement === i
                        ? a.gradient
                        : t ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)",
                      border: hoveredAchievement === i
                        ? `1px solid ${a.color}33`
                        : t
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(0,0,0,0.05)",
                      cursor: "default",
                      boxSizing: "border-box",
                      boxShadow: hoveredAchievement === i
                        ? `0 8px 30px ${a.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`
                        : "none",
                      animation: `fadeSlideIn 0.5s ease ${i * 0.1 + 0.3}s both`,
                    }}
                    onMouseEnter={() => setHoveredAchievement(i)}
                    onMouseLeave={() => setHoveredAchievement(null)}
                  >
                    {/* Icon with bounce on hover */}
                    <div style={{
                      fontSize: 30,
                      flexShrink: 0,
                      animation: hoveredAchievement === i ? "iconBounce 0.6s ease" : "none",
                      filter: hoveredAchievement === i
                        ? `drop-shadow(0 0 8px ${a.glow})`
                        : "none",
                      transition: "filter 0.3s ease",
                    }}>
                      {a.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontWeight: 800, fontSize: 14,
                        color: hoveredAchievement === i
                          ? (t ? "#fff" : "#0a0a14")
                          : (t ? "rgba(255,255,255,0.88)" : "#111"),
                        transition: "color 0.3s",
                        fontFamily: "'Syne', sans-serif",
                      }}>
                        {a.title}
                      </div>
                      <div style={{
                        fontSize: 12,
                        marginTop: 4,
                        color: hoveredAchievement === i
                          ? a.color
                          : (t ? "rgba(255,255,255,0.44)" : "rgba(0,0,0,0.5)"),
                        wordBreak: "break-word",
                        transition: "color 0.3s",
                      }}>
                        {a.desc}
                      </div>
                    </div>

                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 10,
                      background: hoveredAchievement === i
                        ? `${a.color}22`
                        : (t ? "rgba(139,92,246,0.15)" : "rgba(139,92,246,0.08)"),
                      color: hoveredAchievement === i ? a.color : (t ? "#c4b5fd" : "#7c3aed"),
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      border: hoveredAchievement === i ? `1px solid ${a.color}44` : "1px solid transparent",
                      transition: "all 0.3s",
                      fontFamily: "'Syne', sans-serif",
                    }}>
                      {a.year}
                    </span>
                  </div>
                ))}
              </div>

              {/* LeetCode CTA */}
              <div style={{
                marginTop: 24,
                paddingTop: 22,
                borderTop: t ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.06)",
              }}>
                <a
                  href="https://leetcode.com/u/vivek8874151688/"
                  target="_blank"
                  rel="noreferrer"
                  className="lc-cta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 22px",
                    borderRadius: 20,
                    textDecoration: "none",
                    background: "linear-gradient(135deg, rgba(245,158,11,0.10), rgba(251,191,36,0.06))",
                    border: "1px solid rgba(245,158,11,0.25)",
                    boxSizing: "border-box",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Moving ribbon */}
                  <div style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "40%", height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)",
                    animation: "ribbonSlide 3s ease-in-out infinite",
                    pointerEvents: "none",
                  }} />

                  <div style={{ position: "relative" }}>
                    <div style={{
                      fontWeight: 800, fontSize: 14,
                      color: t ? "#fff" : "#111",
                      fontFamily: "'Syne', sans-serif",
                    }}>
                      LeetCode Profile
                    </div>
                    <div style={{
                      fontSize: 12,
                      color: "#f59e0b",
                      marginTop: 4,
                      fontWeight: 600,
                    }}>
                      Rating 1717 · Top 10% Globally
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38, height: 38,
                    borderRadius: "50%",
                    background: "rgba(245,158,11,0.15)",
                    border: "1px solid rgba(245,158,11,0.3)",
                    color: "#f59e0b",
                    fontWeight: 800,
                    fontSize: 16,
                    flexShrink: 0,
                    position: "relative",
                    transition: "all 0.3s",
                  }}>
                    →
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}