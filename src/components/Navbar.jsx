import { useState, useEffect } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Skills", "Projects", "Education", "Resume"];

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const t = darkMode;

  return (
    <div
      style={{
        position: "fixed",
        top: 12,
        left: "50%",
        transform: "translateX(-50%)",
        width: scrolled ? "90%" : "95%",
        maxWidth: 960,
        zIndex: 100,
        transition: "width 0.4s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderRadius: 22,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: t ? "rgba(10,10,20,0.88)" : "rgba(255,255,255,0.82)",
          border: t
            ? "1px solid rgba(255,255,255,0.09)"
            : "1px solid rgba(0,0,0,0.07)",
          boxShadow: t
            ? "0 8px 40px rgba(0,0,0,0.55)"
            : "0 8px 40px rgba(0,0,0,0.09)",
          transition: "all 0.4s ease",
        }}
      >
        {/* Mac traffic lights + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div
                key={c}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                  cursor: "pointer",
                  transition: "filter 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.filter = "brightness(1.2)")}
                onMouseLeave={(e) => (e.target.style.filter = "none")}
              />
            ))}
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "-0.5px",
              color: t ? "#fff" : "#111",
            }}
          >
            vivek.dev
          </span>
        </div>

        {/* Nav links — desktop */}
        <div
          style={{ display: "flex", gap: 2 }}
          className="nav-links"
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              style={{
                padding: "7px 15px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: "transparent",
                color: t ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = t
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.07)";
                e.target.style.color = t ? "#fff" : "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = t
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(0,0,0,0.6)";
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            fontSize: 17,
            background: t ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.12)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
