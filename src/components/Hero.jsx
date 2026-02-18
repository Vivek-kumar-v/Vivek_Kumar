import { useState, useEffect, useRef } from "react";
import { PHOTO_SPEAKING, PHOTO_LAPTOP } from "../assets/images";

/* ─── Inject keyframes once ─── */
const injectStyles = () => {
  if (document.getElementById("hero-styles")) return;
  const style = document.createElement("style");
  style.id = "hero-styles";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');

    @keyframes floatY {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      50%      { transform: translateY(-18px) rotate(2deg); }
    }
    @keyframes floatX {
      0%,100% { transform: translateX(0px); }
      50%      { transform: translateX(12px); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes pulse-glow {
      0%,100% { opacity: 0.4; transform: scale(1); }
      50%      { opacity: 0.85; transform: scale(1.08); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes blob-morph {
      0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      50%      { border-radius: 50% 60% 30% 60% / 30% 40% 70% 60%; }
      75%      { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
    }
    @keyframes cursor-blink {
      0%,100% { opacity: 1; }
      50%      { opacity: 0; }
    }
    @keyframes streak {
      0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
      20%  { opacity: 1; }
      100% { transform: translateX(400%) skewX(-15deg); opacity: 0; }
    }
    @keyframes ping {
      75%,100% { transform: scale(2); opacity: 0; }
    }

    .hero-stat-card:hover {
      transform: translateY(-6px) scale(1.04) !important;
    }
    .hero-btn-primary:hover {
      transform: translateY(-3px) scale(1.03) !important;
      box-shadow: 0 20px 50px rgba(99,102,241,0.55) !important;
    }
    .hero-btn-secondary:hover {
      transform: translateY(-3px) scale(1.03) !important;
      background: rgba(99,102,241,0.08) !important;
      border-color: rgba(99,102,241,0.5) !important;
    }
    .hero-photo-wrap:hover .hero-photo-img {
      transform: scale(1.06) !important;
    }
    .hero-photo-wrap:hover {
      box-shadow: 0 40px 100px rgba(99,102,241,0.45) !important;
    }
    .orbit-dot {
      animation: spin-slow 8s linear infinite;
      transform-origin: 50% 50%;
    }
    .orbit-dot-rev {
      animation: spin-slow 12s linear infinite reverse;
      transform-origin: 50% 50%;
    }
    .floating-badge {
      animation: floatY 4s ease-in-out infinite;
    }
    .floating-badge-2 {
      animation: floatX 5s ease-in-out infinite;
    }
    .noise-overlay {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.4;
    }
    .tag-pill {
      transition: all 0.25s ease;
    }
    .tag-pill:hover {
      transform: translateY(-2px) scale(1.06);
      background: rgba(99,102,241,0.18) !important;
      color: #a5b4fc !important;
    }
  `;
  document.head.appendChild(style);
};

const GREETINGS = [
  { text: "Hello 👋", lang: "English" },
  { text: "नमस्ते 🙏", lang: "Hindi" },
  { text: "Hola 👋", lang: "Spanish" },
  { text: "Bonjour 👋", lang: "French" },
  { text: "こんにちは 👋", lang: "Japanese" },
  { text: "안녕하세요 👋", lang: "Korean" },
];

const PHOTOS = [
  { img: PHOTO_LAPTOP, label: "💻 Building" },
  { img: PHOTO_SPEAKING, label: "🎤 Speaking" },
];

const TAGS = ["React", "Node.js", "Python", "ML/AI", "TypeScript", "MongoDB"];

export default function Hero({ darkMode }) {
  const sectionRef = useRef(null);

  const [gi, setGi] = useState(0);
  const [fade, setFade] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [photoFade, setPhotoFade] = useState(true);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const t = darkMode;

  useEffect(() => {
    injectStyles();
    // Trigger entrance animation
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Greeting rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setGi((i) => (i + 1) % GREETINGS.length);
        setFade(true);
      }, 280);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Photo cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoFade(false);
      setTimeout(() => {
        setPhotoIndex((i) => (i + 1) % PHOTOS.length);
        setPhotoFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll-triggered visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const parallaxX = (mousePos.x - 0.5) * 20;
  const parallaxY = (mousePos.y - 0.5) * 20;

  const bg = t
    ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%), #08080f"
    : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%), #fafafe";

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "100px 20px 60px" : "110px 24px 70px",
        background: bg,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Cabinet Grotesk', sans-serif",
      }}
    >
      {/* ── Background blobs ── */}
      <BlobLayer t={t} parallaxX={parallaxX} parallaxY={parallaxY} />

      {/* ── Grid lines ── */}
      <GridLines t={t} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 40 : 72,
            alignItems: "center",
          }}
        >
          {isMobile && (
            <PhotoBlock
              photoIndex={photoIndex}
              photoFade={photoFade}
              t={t}
              isMobile={isMobile}
              visible={visible}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            />
          )}

          {/* ── Left Content ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 20 : 28,
              flex: 1,
              width: "100%",
            }}
          >
            {/* Status badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px 6px 8px",
                borderRadius: 100,
                border: `1px solid ${t ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}`,
                background: t ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
                width: "fit-content",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "#22c55e",
                    animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: t ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)",
                  letterSpacing: 0.5,
                }}
              >
                Open to opportunities
              </span>
            </div>

            {/* Animated greeting */}
            <div
              style={{
                fontSize: isMobile ? 40 : 54,
                fontWeight: 800,
                minHeight: isMobile ? 56 : 72,
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0) skewX(0deg)" : "translateY(-12px) skewX(-2deg)",
                transition: "opacity 0.28s ease, transform 0.28s ease",
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 40%, #a78bfa 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
                letterSpacing: -1,
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {GREETINGS[gi].text}
            </div>

            {/* Name */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
              }}
            >
              <h1
                style={{
                  fontSize: isMobile ? 34 : 48,
                  fontWeight: 900,
                  letterSpacing: -2,
                  margin: 0,
                  lineHeight: 1.05,
                  color: t ? "#fff" : "#07070f",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                I'm{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #818cf8, #6366f1, #a78bfa, #818cf8)",
                    backgroundSize: "300% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 5s linear infinite",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  Vivek Kumar
                  {/* Underline decoration */}
                  <svg
                    style={{
                      position: "absolute",
                      bottom: -6,
                      left: 0,
                      width: "100%",
                      height: 6,
                    }}
                    viewBox="0 0 200 6"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,3 Q50,0 100,3 Q150,6 200,3"
                      stroke="url(#uline)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="uline" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p
                style={{
                  fontSize: isMobile ? 14 : 17,
                  fontWeight: 500,
                  color: t ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.42)",
                  margin: "14px 0 0",
                  letterSpacing: 0.3,
                }}
              >
                Full Stack Developer · ML Engineer · Problem Solver
              </p>
            </div>

            {/* Bio */}
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.8,
                color: t ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.45)",
                maxWidth: isMobile ? "100%" : 480,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
                margin: 0,
              }}
            >
              B.Tech CSE @ NIT Manipur '27 · Building elegant web applications
              and intelligent ML systems. LeetCode Top 10% with 600+ problems solved.
            </p>

            {/* Tech tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
              }}
            >
              {TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className="tag-pill"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    padding: "5px 12px",
                    borderRadius: 100,
                    border: `1px solid ${t ? "rgba(129,140,248,0.2)" : "rgba(99,102,241,0.15)"}`,
                    color: t ? "rgba(129,140,248,0.8)" : "rgba(79,70,229,0.75)",
                    background: t ? "rgba(99,102,241,0.07)" : "rgba(99,102,241,0.04)",
                    cursor: "default",
                    letterSpacing: 0.3,
                    transitionDelay: `${i * 0.04}s`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s",
              }}
            >
              <button
                className="hero-btn-primary"
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  padding: "15px 32px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #7c3aed 100%)",
                  backgroundSize: "200% 200%",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                  boxShadow: "0 10px 35px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  width: isMobile ? "100%" : "auto",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  View Projects
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {/* Shimmer streak */}
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "30%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    animation: "streak 3s ease-in-out infinite 1s",
                    zIndex: 0,
                  }}
                />
              </button>

              <a
                className="hero-btn-secondary"
                href="/resume.pdf"
                download="Vivek_Kumar_Resume.pdf"
                style={{
                  padding: "15px 32px",
                  borderRadius: 14,
                  border: t ? "1.5px solid rgba(255,255,255,0.1)" : "1.5px solid rgba(0,0,0,0.1)",
                  color: t ? "rgba(255,255,255,0.85)" : "#333",
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                  background: t ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                  fontFamily: "inherit",
                  letterSpacing: 0.3,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M7.5 2v8M4 7l3.5 3.5L11 7M2 13h11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Download Resume
              </a>
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: isMobile ? 12 : 16,
                paddingTop: 4,
                flexWrap: "wrap",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
              }}
            >
              {[
                { v: "600+", l: "Problems Solved", icon: "🧩" },
                { v: "1717", l: "LC Rating", icon: "⚡" },
                { v: "Top 10%", l: "Globally", icon: "🏆" },
              ].map(({ v, l, icon }, idx) => (
                <StatCard key={l} v={v} l={l} icon={icon} t={t} idx={idx} />
              ))}
            </div>
          </div>

          {/* Photo right on desktop */}
          {!isMobile && (
            <PhotoBlock
              photoIndex={photoIndex}
              photoFade={photoFade}
              t={t}
              isMobile={isMobile}
              visible={visible}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            />
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Stat Card ── */
function StatCard({ v, l, icon, t, idx }) {
  return (
    <div
      className="hero-stat-card"
      style={{
        flex: 1,
        minWidth: 90,
        padding: "14px 16px",
        borderRadius: 16,
        background: t
          ? "rgba(255,255,255,0.03)"
          : "rgba(99,102,241,0.04)",
        border: t
          ? "1px solid rgba(255,255,255,0.07)"
          : "1px solid rgba(99,102,241,0.1)",
        backdropFilter: "blur(10px)",
        cursor: "default",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        position: "relative",
        overflow: "hidden",
        animationDelay: `${idx * 0.1}s`,
      }}
    >
      <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 900,
          color: t ? "#e0e7ff" : "#3730a3",
          fontFamily: "'Clash Display', sans-serif",
          letterSpacing: -0.5,
        }}
      >
        {v}
      </div>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: t ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {l}
      </div>
      {/* Glow on hover via pseudo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          background: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent)",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}

/* ── Floating Photo Block ── */
function PhotoBlock({ photoIndex, photoFade, t, isMobile, visible, parallaxX, parallaxY }) {
  const size = isMobile ? Math.min((typeof window !== "undefined" ? window.innerWidth : 320) - 80, 280) : 290;

  return (
    <div
      style={{
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`
          : `translate(${parallaxX * 0.4}px, ${Number(parallaxY * 0.4) + 40}px)`,
        transition: visible
          ? "opacity 0.8s ease 0.2s, transform 0.08s linear"
          : "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
      }}
    >
      {/* Outer orbit ring */}
      <div style={{ position: "relative", width: size + 80, height: size + 100 }}>
        {/* Orbit rings */}
        <svg
          className="orbit-dot"
          style={{ position: "absolute", top: -20, left: -20, width: size + 120, height: size + 140, zIndex: 0 }}
          viewBox={`0 0 ${size + 120} ${size + 140}`}
        >
          <ellipse
            cx={(size + 120) / 2}
            cy={(size + 140) / 2}
            rx={(size + 100) / 2}
            ry={(size + 80) / 2}
            fill="none"
            stroke={t ? "rgba(129,140,248,0.12)" : "rgba(99,102,241,0.1)"}
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          {/* Dot on orbit */}
          <circle
            cx={(size + 120) / 2 + (size + 100) / 2}
            cy={(size + 140) / 2}
            r="5"
            fill="#818cf8"
            opacity="0.8"
          />
        </svg>

        <svg
          className="orbit-dot-rev"
          style={{ position: "absolute", top: 10, left: 10, width: size + 60, height: size + 80, zIndex: 0 }}
          viewBox={`0 0 ${size + 60} ${size + 80}`}
        >
          <ellipse
            cx={(size + 60) / 2}
            cy={(size + 80) / 2}
            rx={(size + 30) / 2}
            ry={(size + 20) / 2}
            fill="none"
            stroke={t ? "rgba(167,139,250,0.1)" : "rgba(139,92,246,0.08)"}
            strokeWidth="1"
            strokeDasharray="3 8"
          />
          <circle
            cx={(size + 60) / 2 - (size + 30) / 2}
            cy={(size + 80) / 2}
            r="4"
            fill="#a78bfa"
            opacity="0.7"
          />
        </svg>

        {/* Main photo card */}
        <div
          className="hero-photo-wrap"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 28,
            padding: 5,
            background: t
              ? "linear-gradient(145deg, rgba(99,102,241,0.5), rgba(167,139,250,0.3))"
              : "linear-gradient(145deg, rgba(99,102,241,0.3), rgba(167,139,250,0.2))",
            boxShadow: t
              ? "0 30px 80px rgba(99,102,241,0.35), 0 0 0 1px rgba(129,140,248,0.15)"
              : "0 30px 80px rgba(99,102,241,0.18), 0 0 0 1px rgba(99,102,241,0.12)",
            transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            cursor: "pointer",
            zIndex: 1,
            animation: "floatY 6s ease-in-out infinite",
          }}
        >
          {/* Mac dots */}
          <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 5, zIndex: 2 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}88` }} />
            ))}
          </div>

          {/* Image */}
          <div
            style={{
              width: size,
              height: isMobile ? 310 : 360,
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            <img
              className="hero-photo-img"
              src={PHOTOS[photoIndex].img}
              alt="Vivek Kumar"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                opacity: photoFade ? 1 : 0,
                transform: photoFade ? "scale(1)" : "scale(1.05)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Floating badges */}
        <div
          className="floating-badge"
          style={{
            position: "absolute",
            bottom: "18%",
            left: -20,
            padding: "8px 14px",
            borderRadius: 14,
            background: t ? "rgba(15,15,30,0.85)" : "rgba(255,255,255,0.92)",
            border: t ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(99,102,241,0.15)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 3,
            animationDelay: "0.5s",
          }}
        >
          <span style={{ fontSize: 20 }}>⚡</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: t ? "#e0e7ff" : "#1e1b4b" }}>1717 Rating</div>
            <div style={{ fontSize: 10, color: t ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontWeight: 500 }}>LeetCode</div>
          </div>
        </div>

        <div
          className="floating-badge-2"
          style={{
            position: "absolute",
            top: "15%",
            right: -16,
            padding: "8px 14px",
            borderRadius: 14,
            background: t ? "rgba(15,15,30,0.85)" : "rgba(255,255,255,0.92)",
            border: t ? "1px solid rgba(167,139,250,0.25)" : "1px solid rgba(139,92,246,0.15)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 3,
          }}
        >
          <span style={{ fontSize: 20 }}>🏆</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: t ? "#e0e7ff" : "#1e1b4b" }}>Top 10%</div>
            <div style={{ fontSize: 10, color: t ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontWeight: 500 }}>Global Rank</div>
          </div>
        </div>
      </div>

      {/* Label + dots */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginTop: -30 }}>
        <div
          style={{
            fontSize: 11,
            padding: "5px 14px",
            borderRadius: 20,
            background: t ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
            color: t ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
            fontWeight: 600,
            letterSpacing: 0.5,
            border: t ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {PHOTOS[photoIndex].label}
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {PHOTOS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === photoIndex ? 20 : 5,
                height: 5,
                borderRadius: 3,
                background: i === photoIndex
                  ? "linear-gradient(90deg, #6366f1, #a78bfa)"
                  : t ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.13)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Background Blobs ── */
function BlobLayer({ t, parallaxX, parallaxY }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "15%",
          width: 500,
          height: 500,
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          background: t
            ? "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          animation: "blob-morph 12s ease-in-out infinite, pulse-glow 6s ease-in-out infinite",
          transform: `translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px)`,
          transition: "transform 0.1s linear",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          background: t
            ? "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          animation: "blob-morph 15s ease-in-out infinite reverse, pulse-glow 8s ease-in-out infinite 2s",
          transform: `translate(${-parallaxX * 0.4}px, ${-parallaxY * 0.4}px)`,
          transition: "transform 0.1s linear",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "30%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: t
            ? "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
          animation: "pulse-glow 5s ease-in-out infinite 1s",
          pointerEvents: "none",
        }}
      />
    </>
  );
}

/* ── Subtle grid lines ── */
function GridLines({ t }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: t
          ? `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`
          : `linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
        pointerEvents: "none",
      }}
    />
  );
}