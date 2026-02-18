import { NIT_LOGO } from "../assets/images";
import FadeIn from "./FadeIn";

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    title: "ReGen Hackathon 2025",
    desc: "3rd Place (2nd Runner-Up) — IIC, NIT Manipur",
    year: "2025",
  },
  {
    icon: "⚡",
    title: "LeetCode Rating 1717",
    desc: "Top 10% globally in competitive programming",
    year: "2024",
  },
  {
    icon: "💡",
    title: "600+ Problems Solved",
    desc: "LeetCode + GeeksforGeeks — DSA mastery",
    year: "2024",
  },
];

export default function Education({ darkMode }) {
  const t = darkMode;

  const cardStyle = {
    borderRadius: 30,
    padding: 30,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    background: t ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.88)",
    border: t
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(0,0,0,0.07)",
    boxShadow: t
      ? "0 8px 40px rgba(0,0,0,0.4)"
      : "0 8px 40px rgba(0,0,0,0.07)",
    height: "100%",
  };

  return (
    <section id="education" style={{ padding: "90px 24px" }}>
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
                  ? "rgba(99,102,241,0.2)"
                  : "rgba(99,102,241,0.09)",
                color: t ? "#a5b4fc" : "#4f46e5",
              }}
            >
              Background
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
              Education & Achievements
            </h2>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* Education card */}
          <FadeIn delay={0}>
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  margin: "0 0 28px",
                  color: t ? "#fff" : "#111",
                }}
              >
                🎓 Education
              </h3>

              {/* Timeline */}
              <div
                style={{
                  position: "relative",
                  paddingLeft: 26,
                  borderLeft: "2px solid rgba(139,92,246,0.28)",
                }}
              >
                {/* Dot 1 */}
                <div
                  style={{
                    position: "absolute",
                    left: -9,
                    top: 2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#8b5cf6",
                    boxShadow: "0 0 0 4px rgba(139,92,246,0.22)",
                  }}
                />

                <div style={{ marginBottom: 32 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 10,
                    }}
                  >
                    <img
                      src={NIT_LOGO}
                      alt="NIT Manipur"
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        objectFit: "contain",
                        background: "white",
                        padding: 3,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 900,
                          fontSize: 15,
                          color: t ? "#fff" : "#111",
                        }}
                      >
                        NIT Manipur
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: t
                            ? "rgba(255,255,255,0.38)"
                            : "rgba(0,0,0,0.38)",
                        }}
                      >
                        National Institute of Technology
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: t ? "#c4b5fd" : "#7c3aed",
                    }}
                  >
                    B.Tech in Computer Science & Engineering
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      marginTop: 5,
                      color: t
                        ? "rgba(255,255,255,0.38)"
                        : "rgba(0,0,0,0.42)",
                    }}
                  >
                    6th Semester · Expected 2027 · Manipur, India
                  </div>
                </div>

                {/* Dot 2 */}
                <div
                  style={{
                    position: "absolute",
                    left: -9,
                    top: 145,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#6366f1",
                    boxShadow: "0 0 0 4px rgba(99,102,241,0.22)",
                  }}
                />
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: t ? "#fff" : "#111",
                    }}
                  >
                    XII — UP Board
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      marginTop: 4,
                      color: t
                        ? "rgba(255,255,255,0.38)"
                        : "rgba(0,0,0,0.42)",
                    }}
                  >
                    Maharshi Arvind Vidya Mandir, Kushinagar, UP
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div
                style={{
                  marginTop: 30,
                  paddingTop: 22,
                  borderTop: t
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: t ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
                    marginBottom: 14,
                  }}
                >
                  💼 Experience
                </h4>
                <div
                  style={{
                    borderRadius: 18,
                    padding: 17,
                    background: t
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)",
                    border: t
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 900,
                      fontSize: 14,
                      color: t ? "#fff" : "#111",
                    }}
                  >
                    Edunet Foundation
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: t
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(0,0,0,0.42)",
                      marginTop: 2,
                    }}
                  >
                    AICTE IBM SkillsBuild · AI & Cloud Intern
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#8b5cf6",
                      marginTop: 5,
                      fontWeight: 600,
                    }}
                  >
                    Jul 2025 – Aug 2025
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: 1.65,
                      color: t
                        ? "rgba(255,255,255,0.42)"
                        : "rgba(0,0,0,0.5)",
                      marginTop: 10,
                    }}
                  >
                    AI, Cloud Computing & Data Analytics. Hands-on with RAG
                    pipelines, IBM Cloud, AI chatbots, and ML experiments.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Achievements card */}
          <FadeIn delay={0.12}>
            <div style={cardStyle}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  margin: "0 0 24px",
                  color: t ? "#fff" : "#111",
                }}
              >
                🏆 Achievements
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ACHIEVEMENTS.map((a, i) => (
                  <FadeIn key={a.title} delay={i * 0.08}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "15px 17px",
                        borderRadius: 20,
                        background: t
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.03)",
                        border: t
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "1px solid rgba(0,0,0,0.05)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = t
                          ? "0 8px 30px rgba(0,0,0,0.3)"
                          : "0 8px 30px rgba(0,0,0,0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{ fontSize: 30 }}>{a.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: 14,
                            color: t ? "#fff" : "#111",
                          }}
                        >
                          {a.title}
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            marginTop: 4,
                            color: t
                              ? "rgba(255,255,255,0.44)"
                              : "rgba(0,0,0,0.5)",
                          }}
                        >
                          {a.desc}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 9,
                          background: t
                            ? "rgba(139,92,246,0.22)"
                            : "rgba(139,92,246,0.1)",
                          color: t ? "#c4b5fd" : "#7c3aed",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.year}
                      </span>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* LeetCode CTA */}
              <div
                style={{
                  marginTop: 24,
                  paddingTop: 22,
                  borderTop: t
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <a
                  href="https://leetcode.com/u/patelvivek8874/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "17px 20px",
                    borderRadius: 20,
                    textDecoration: "none",
                    background:
                      "linear-gradient(135deg, rgba(245,158,11,0.11), rgba(251,191,36,0.11))",
                    border: "1px solid rgba(245,158,11,0.22)",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.45)";
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(245,158,11,0.22)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 14,
                        color: t ? "#fff" : "#111",
                      }}
                    >
                      LeetCode Profile
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#f59e0b",
                        marginTop: 3,
                        fontWeight: 600,
                      }}
                    >
                      Rating 1717 · Top 10% Globally
                    </div>
                  </div>
                  <span
                    style={{
                      color: "#f59e0b",
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
