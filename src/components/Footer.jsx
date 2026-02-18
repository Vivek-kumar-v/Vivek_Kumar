const LINKS = [
  { label: "✉️ Email", href: "mailto:patelvivek8874@gmail.com" },
  { label: "💼 LinkedIn", href: "https://www.linkedin.com/in/vivek-kumar-b52882290/" },
  { label: "🐙 GitHub", href: "https://github.com/Vivek-kumar-v" },
  { label: "⚡ LeetCode", href: "https://leetcode.com/u/vivek8874151688/" },
];

export default function Footer({ darkMode }) {
  const t = darkMode;

  return (
    <footer
      style={{
        padding: "52px 24px 36px",
        borderTop: t
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: -0.5,
                color: t ? "#fff" : "#111",
              }}
            >
              Vivek Kumar
            </div>
            <div
              style={{
                fontSize: 13,
                color: t ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.38)",
                marginTop: 5,
              }}
            >
              Full Stack Developer · ML Engineer · NIT Manipur '27
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "9px 18px",
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  background: t
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)",
                  color: t ? "rgba(255,255,255,0.68)" : "rgba(0,0,0,0.6)",
                  border: t
                    ? "1px solid rgba(255,255,255,0.07)"
                    : "1px solid rgba(0,0,0,0.06)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = t
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "scale(1.05) translateY(-1px)";
                  e.currentTarget.style.color = t ? "#fff" : "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = t
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.04)";
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.color = t
                    ? "rgba(255,255,255,0.68)"
                    : "rgba(0,0,0,0.6)";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            paddingTop: 22,
            borderTop: t
              ? "1px solid rgba(255,255,255,0.05)"
              : "1px solid rgba(0,0,0,0.05)",
            textAlign: "center",
            fontSize: 12,
            color: t ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.28)",
          }}
        >
          © 2025 Vivek Kumar · Built with React.js · Designed with ❤️ and lots of ☕
        </div>
      </div>
    </footer>
  );
}
