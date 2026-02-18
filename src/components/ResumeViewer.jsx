import { useState, useRef } from "react";
import FadeIn from "./FadeIn";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500&display=swap');

  .resume-section {
    padding: 100px 24px;
    position: relative;
    overflow: hidden;
  }

  .resume-section::before {
    content: '';
    position: absolute;
    top: -200px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 6px 18px;
    border-radius: 100px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .badge::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .badge:hover::after {
    transform: translateX(100%);
  }

  .resume-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(38px, 6vw, 56px);
    font-weight: 900;
    margin: 16px 0 6px;
    letter-spacing: -2px;
    line-height: 1;
    background: linear-gradient(135deg, currentColor 30%, rgba(139,92,246,0.8));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .resume-subtitle {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.5px;
    opacity: 0.5;
    margin-top: 8px;
  }

  .window-wrapper {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    will-change: transform;
    cursor: default;
  }

  .window-wrapper:hover {
    transform: translateY(-8px) scale(1.005);
  }

  .window-wrapper::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 21px;
    background: linear-gradient(135deg, rgba(139,92,246,0.5), rgba(99,102,241,0.3), rgba(236,72,153,0.2));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .window-wrapper:hover::before {
    opacity: 1;
  }

  .titlebar {
    display: flex;
    align-items: center;
    padding: 14px 20px;
    position: relative;
    overflow: hidden;
  }

  .titlebar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent);
    transform: scaleX(0);
    transition: transform 0.5s ease;
  }

  .window-wrapper:hover .titlebar::after {
    transform: scaleX(1);
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                filter 0.3s ease;
  }

  .window-wrapper:hover .dot:nth-child(1) {
    transform: scale(1.25);
    filter: brightness(1.2) drop-shadow(0 0 4px #ff5f56);
  }
  .window-wrapper:hover .dot:nth-child(2) {
    transform: scale(1.25);
    filter: brightness(1.2) drop-shadow(0 0 4px #ffbd2e);
    transition-delay: 0.05s;
  }
  .window-wrapper:hover .dot:nth-child(3) {
    transform: scale(1.25);
    filter: brightness(1.2) drop-shadow(0 0 4px #27c93f);
    transition-delay: 0.1s;
  }

  .filename {
    flex: 1;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    font-family: 'DM Mono', 'SF Mono', monospace;
    letter-spacing: 0.3px;
    transition: opacity 0.3s;
  }

  .download-btn {
    padding: 7px 18px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    letter-spacing: 0.5px;
    color: #fff;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.3s ease;
    background: linear-gradient(135deg, #8b5cf6, #6366f1, #ec4899);
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .download-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .download-btn:hover {
    transform: scale(1.08) translateY(-1px);
    box-shadow: 0 8px 25px rgba(139,92,246,0.5);
  }

  .download-btn:hover::before {
    opacity: 1;
  }

  .download-btn:active {
    transform: scale(0.97);
  }

  .iframe-container {
    position: relative;
    overflow: hidden;
  }

  .iframe-container::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, transparent 90%, rgba(139,92,246,0.05));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .window-wrapper:hover .iframe-container::after {
    opacity: 1;
  }

  /* Floating particles */
  .particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: float linear infinite;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .window-wrapper:hover .particle {
    opacity: 1;
  }

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.3; }
    100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
  }

  .glow-line {
    height: 2px;
    background: linear-gradient(90deg, transparent, #8b5cf6, #6366f1, #ec4899, transparent);
    transform: scaleX(0);
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: left;
  }

  .window-wrapper:hover .glow-line {
    transform: scaleX(1);
  }

  .corner-accent {
    position: absolute;
    width: 60px;
    height: 60px;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .corner-accent.tl { top: -1px; left: -1px; transform: translate(-8px, -8px); }
  .corner-accent.br { bottom: -1px; right: -1px; transform: translate(8px, 8px) rotate(180deg); }

  .window-wrapper:hover .corner-accent {
    opacity: 1;
    transform: translate(0, 0);
  }

  .window-wrapper:hover .corner-accent.br {
    transform: translate(0, 0) rotate(180deg);
  }
`;

const particles = [
  { size: 4, left: "10%", delay: "0s", duration: "4s", color: "#8b5cf6" },
  { size: 3, left: "25%", delay: "1.2s", duration: "5s", color: "#6366f1" },
  { size: 5, left: "60%", delay: "0.5s", duration: "3.5s", color: "#ec4899" },
  { size: 3, left: "80%", delay: "2s", duration: "4.5s", color: "#8b5cf6" },
  { size: 4, left: "45%", delay: "1.5s", duration: "3.8s", color: "#6366f1" },
];

export default function ResumeViewer({ darkMode }) {
  const t = darkMode;

  return (
    <section
      id="resume"
      className="resume-section"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <style>{styles}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span
              className="badge"
              style={{
                background: t
                  ? "rgba(239,68,68,0.15)"
                  : "rgba(239,68,68,0.08)",
                color: t ? "#fca5a5" : "#dc2626",
                border: `1px solid ${t ? "rgba(239,68,68,0.25)" : "rgba(239,68,68,0.15)"}`,
              }}
            >
              ✦ Resume
            </span>

            <h2
              className="resume-title"
              style={{ color: t ? "#fff" : "#0a0a14" }}
            >
              My Résumé
            </h2>

            <p
              className="resume-subtitle"
              style={{ color: t ? "#fff" : "#0a0a14" }}
            >
              Crafted with care · Updated 2024
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ position: "relative" }}>
            {/* Ambient glow behind card */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
                height: "60%",
                background:
                  "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div
              className="window-wrapper"
              style={{
                border: t
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.06)",
                boxShadow: t
                  ? "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,92,246,0.05)"
                  : "0 32px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(139,92,246,0.03)",
                background: t ? "#0f0f1a" : "#fff",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Corner accents */}
              <svg className="corner-accent tl" viewBox="0 0 60 60" fill="none">
                <path d="M0 40 L0 0 L40 0" stroke="url(#grad1)" strokeWidth="2" fill="none"/>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
              <svg className="corner-accent br" viewBox="0 0 60 60" fill="none">
                <path d="M0 40 L0 0 L40 0" stroke="url(#grad2)" strokeWidth="2" fill="none"/>
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating particles */}
              {particles.map((p, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    width: p.size,
                    height: p.size,
                    left: p.left,
                    bottom: 20,
                    background: p.color,
                    animationDelay: p.delay,
                    animationDuration: p.duration,
                    boxShadow: `0 0 6px ${p.color}`,
                  }}
                />
              ))}

              {/* Glow line at top */}
              <div className="glow-line" />

              {/* Mac titlebar */}
              <div
                className="titlebar"
                style={{
                  background: t
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.025)",
                  borderBottom: t
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                  {[
                    { color: "#ff5f56", shadow: "#ff5f56" },
                    { color: "#ffbd2e", shadow: "#ffbd2e" },
                    { color: "#27c93f", shadow: "#27c93f" },
                  ].map((dot, i) => (
                    <div
                      key={i}
                      className="dot"
                      style={{ background: dot.color }}
                    />
                  ))}
                </div>

                <div
                  className="filename"
                  style={{
                    color: t
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(0,0,0,0.35)",
                  }}
                >
                  📄 vivek_kumar_resume.pdf
                </div>

                <a
                  href="/resume.pdf"
                  download="Vivek_Kumar_Resume.pdf"
                  className="download-btn"
                >
                  ↓ Download
                </a>
              </div>

              {/* PDF iframe */}
              <div
                className="iframe-container"
                style={{ background: t ? "#080812" : "#f5f5fa" }}
              >
                <iframe
                  src="/resume.pdf"
                  title="Vivek Kumar Resume"
                  style={{
                    width: "100%",
                    height: 720,
                    border: "none",
                    display: "block",
                  }}
                />
              </div>

              {/* Bottom glow line */}
              <div className="glow-line" style={{ transformOrigin: "right" }} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}