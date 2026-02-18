import { useState, useEffect } from "react";

const GREETINGS = [
  { text: "Hello 👋", lang: "English" },
  { text: "नमस्ते 🙏", lang: "Hindi" },
  { text: "Hola 👋", lang: "Spanish" },
  { text: "Bonjour 👋", lang: "French" },
  { text: "こんにちは 👋", lang: "Japanese" },
  { text: "안녕하세요 👋", lang: "Korean" },
];

export default function GreetingSplash({ onDone }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => {
          const next = i + 1;
          if (next >= GREETINGS.length) {
            // Last greeting shown — start exit
            clearInterval(interval);
            setTimeout(() => {
              setExiting(true);
              setTimeout(onDone, 800);
            }, 700);
          }
          return next < GREETINGS.length ? next : i;
        });
        setFade(true);
      }, 300);
    }, 600);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a0a14 0%, #1a0a2e 50%, #0a0a14 100%)",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Glow orb behind text */}
      <div style={{
        position: "absolute",
        width: 600,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Greeting text */}
      <div
        style={{
          fontSize: "clamp(52px, 10vw, 100px)",
          fontWeight: 900,
          letterSpacing: -2,
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0) scale(1)" : "translateY(-16px) scale(0.97)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          background: "linear-gradient(135deg, #a78bfa, #818cf8, #c084fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          userSelect: "none",
          textAlign: "center",
        }}
      >
        {GREETINGS[index].text}
      </div>

      {/* Language label */}
      <div
        style={{
          marginTop: 16,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          opacity: fade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {GREETINGS[index].lang}
      </div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 8, marginTop: 48 }}>
        {GREETINGS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 24 : 6,
              height: 6,
              borderRadius: 3,
              background: i === index
                ? "linear-gradient(90deg, #8b5cf6, #6366f1)"
                : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}