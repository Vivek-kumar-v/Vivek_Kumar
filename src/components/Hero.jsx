import { useState, useEffect } from "react";
import { PHOTO_SPEAKING, PHOTO_LAPTOP } from "../assets/images";

const GREETINGS = [
  { text: "Hello 👋", lang: "English" },
  { text: "नमस्ते 🙏", lang: "Hindi" },
  { text: "Hola 👋", lang: "Spanish" },
  { text: "Bonjour 👋", lang: "French" },
  { text: "こんにちは 👋", lang: "Japanese" },
  { text: "안녕하세요 👋", lang: "Korean" },
];

const PHOTOS = [
  { img: PHOTO_LAPTOP, label: "💻 Working" },
  { img: PHOTO_SPEAKING, label: "🎤 Speaking" },
];

export default function Hero({ darkMode }) {
  const [gi, setGi] = useState(0);
  const [fade, setFade] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoFade, setPhotoFade] = useState(true);
  const t = darkMode;

  // Greeting rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setGi((i) => (i + 1) % GREETINGS.length);
        setFade(true);
      }, 280);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Photo cycling every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoFade(false);
      setTimeout(() => {
        setPhotoIndex((i) => (i + 1) % PHOTOS.length);
        setPhotoFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "110px 24px 70px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            {/* Animated greeting */}
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                minHeight: 68,
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(-10px)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
                background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {GREETINGS[gi].text}
            </div>

            {/* Name + title */}
            <div>
              <h1
                style={{
                  fontSize: 40,
                  fontWeight: 900,
                  letterSpacing: -1.5,
                  margin: 0,
                  lineHeight: 1.1,
                  color: t ? "#fff" : "#0a0a14",
                }}
              >
                I'm{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6, #6366f1, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Vivek Kumar
                </span>
              </h1>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: t ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.48)",
                  margin: "8px 0 0",
                }}
              >
                Full Stack Developer · ML Engineer · Problem Solver
              </p>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: t ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.48)",
                maxWidth: 480,
              }}
            >
              B.Tech CSE @ NIT Manipur '27 · Building elegant web applications
              and intelligent ML systems. LeetCode Top 10% with 600+ problems
              solved.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  padding: "14px 30px",
                  borderRadius: 16,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "inherit",
                  boxShadow: "0 8px 30px rgba(139,92,246,0.38)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04) translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(139,92,246,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(139,92,246,0.38)";
                }}
              >
                View Projects →
              </button>

              <a
                href="/resume.pdf"
                download="Vivek_Kumar_Resume.pdf"
                style={{
                  padding: "14px 30px",
                  borderRadius: 16,
                  border: t
                    ? "1.5px solid rgba(255,255,255,0.14)"
                    : "1.5px solid rgba(0,0,0,0.12)",
                  color: t ? "#fff" : "#333",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  background: "transparent",
                  transition: "transform 0.2s, background 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.04) translateY(-1px)";
                  e.currentTarget.style.background = t
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1) translateY(0)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                ↓ Download Resume
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 36, paddingTop: 4 }}>
              {[
                ["600+", "Problems Solved"],
                ["1717", "LC Rating"],
                ["Top 10%", "Globally"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: t ? "#fff" : "#111",
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: t
                        ? "rgba(255,255,255,0.38)"
                        : "rgba(0,0,0,0.38)",
                      marginTop: 2,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                borderRadius: 30,
                padding: 4,
                background: t
                  ? "linear-gradient(135deg, rgba(139,92,246,0.45), rgba(99,102,241,0.45))"
                  : "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(99,102,241,0.22))",
                boxShadow: t
                  ? "0 24px 70px rgba(139,92,246,0.32)"
                  : "0 24px 70px rgba(139,92,246,0.16)",
                position: "relative",
              }}
            >
              {/* Mac dots */}
              <div
                style={{
                  position: "absolute",
                  top: 13,
                  left: 13,
                  display: "flex",
                  gap: 4,
                  zIndex: 2,
                }}
              >
                {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: c,
                    }}
                  />
                ))}
              </div>

              {/* Image frame */}
              <div
                style={{
                  width: 270,
                  height: 350,
                  borderRadius: 26,
                  overflow: "hidden",
                  display: "block",
                }}
              >
                <img
                  src={PHOTOS[photoIndex].img}
                  alt="Vivek Kumar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    opacity: photoFade ? 1 : 0,
                    transform: photoFade ? "scale(1)" : "scale(1.04)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                    display: "block",
                  }}
                />
              </div>
            </div>

            {/* Label + indicator dots */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: t
                    ? "rgba(255,255,255,0.07)"
                    : "rgba(0,0,0,0.06)",
                  color: t
                    ? "rgba(255,255,255,0.38)"
                    : "rgba(0,0,0,0.38)",
                  fontWeight: 600,
                }}
              >
                {PHOTOS[photoIndex].label}
              </div>

              {/* Indicator dots */}
              <div style={{ display: "flex", gap: 5 }}>
                {PHOTOS.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === photoIndex ? 18 : 5,
                      height: 5,
                      borderRadius: 3,
                      background:
                        i === photoIndex
                          ? "linear-gradient(90deg, #8b5cf6, #6366f1)"
                          : t
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.15)",
                      transition: "all 0.4s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}