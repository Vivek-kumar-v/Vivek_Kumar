import FadeIn from "./FadeIn";

export default function ResumeViewer({ darkMode }) {
  const t = darkMode;

  return (
    <section id="resume" style={{ padding: "90px 24px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                padding: "5px 16px",
                borderRadius: 20,
                background: t
                  ? "rgba(239,68,68,0.2)"
                  : "rgba(239,68,68,0.08)",
                color: t ? "#fca5a5" : "#dc2626",
              }}
            >
              Resume
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
              My Résumé
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              borderRadius: 30,
              overflow: "hidden",
              border: t
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.07)",
              boxShadow: t
                ? "0 24px 70px rgba(0,0,0,0.55)"
                : "0 24px 70px rgba(0,0,0,0.1)",
            }}
          >
            {/* Mac window titlebar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "13px 20px",
                background: t ? "#1a1a2e" : "#f0f0f2",
                borderBottom: t
                  ? "1px solid rgba(255,255,255,0.07)"
                  : "1px solid rgba(0,0,0,0.09)",
              }}
            >
              <div style={{ display: "flex", gap: 5 }}>
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)",
                }}
              >
                vivek_kumar_resume.pdf
              </div>
              <a
                href="/resume.pdf"
                download="Vivek_Kumar_Resume.pdf"
                style={{
                  padding: "6px 16px",
                  borderRadius: 11,
                  fontSize: 12,
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  color: "#fff",
                  textDecoration: "none",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.88";
                  e.currentTarget.style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                ↓ Download
              </a>
            </div>

            {/* PDF iframe */}
            <div style={{ background: t ? "#0a0a14" : "#f8f8fc" }}>
              <iframe
                src="/resume.pdf"
                title="Vivek Kumar Resume"
                style={{
                  width: "100%",
                  height: 700,
                  border: "none",
                  display: "block",
                }}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
