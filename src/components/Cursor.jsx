import { useEffect, useRef, useState } from "react";

export default function Cursor({ darkMode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  const [isMoving, setIsMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [ripples, setRipples] = useState([]);

  const rafRef = useRef(null);
  const timeoutRef = useRef(null);

  // Mouse move
  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      setIsMoving(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsMoving(false), 90);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Smooth trailing animation (RAF)
  useEffect(() => {
    const animate = () => {
      setTrail((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pos]);

  // Hover detection on links/buttons
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // Drag detection
  useEffect(() => {
    const down = () => setIsDragging(true);
    const up = () => setIsDragging(false);

    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Click ripple animation
  useEffect(() => {
    const click = (e) => {
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX, y: e.clientY },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    window.addEventListener("click", click);
    return () => window.removeEventListener("click", click);
  }, []);

  const t = darkMode;

  // Colors (colorful mode when moving / dragging)
  const gradient = isDragging
    ? "linear-gradient(135deg, #00f5ff, #ff00d4, #ffe600)"
    : isMoving
    ? "linear-gradient(135deg, #7c3aed, #06b6d4, #22c55e)"
    : t
    ? "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.3))"
    : "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.25))";

  // Cursor sizes
  const ringSize = isHovering ? 72 : isDragging ? 64 : isMoving ? 46 : 36;
  const ringRadius = isHovering ? 18 : 999; // pill on hover
  const dotSize = isHovering ? 6 : isDragging ? 12 : isMoving ? 10 : 8;

  return (
    <>
      {/* Click Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: "fixed",
            top: r.y,
            left: r.x,
            width: 14,
            height: 14,
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 9997,
            border: `2px solid ${
              t ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.35)"
            }`,
            animation: "cursorRipple 0.65s ease-out forwards",
          }}
        />
      ))}

      {/* Main dot */}
      <div
        style={{
          position: "fixed",
          top: pos.y,
          left: pos.x,
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          background: t ? "#fff" : "#000",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.12s ease, height 0.12s ease",
          boxShadow: isDragging
            ? "0 0 18px rgba(0,245,255,0.6)"
            : t
            ? "0 0 12px rgba(255,255,255,0.5)"
            : "0 0 12px rgba(0,0,0,0.25)",
          mixBlendMode: t ? "normal" : "difference",
        }}
      />

      {/* Ring */}
      <div
        style={{
          position: "fixed",
          top: trail.y,
          left: trail.x,
          width: ringSize,
          height: ringSize,
          borderRadius: ringRadius,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9998,

          // Gradient ring + glow
          background: gradient,
          opacity: 0.22,
          filter: "blur(0px)",
          boxShadow: isDragging
            ? "0 0 30px rgba(255,0,212,0.35)"
            : isMoving
            ? "0 0 25px rgba(124,58,237,0.25)"
            : t
            ? "0 0 18px rgba(255,255,255,0.15)"
            : "0 0 18px rgba(0,0,0,0.12)",

          border: `2px solid ${
            isDragging
              ? "rgba(255,255,255,0.35)"
              : t
              ? "rgba(255,255,255,0.28)"
              : "rgba(0,0,0,0.25)"
          }`,

          backdropFilter: "blur(6px)",

          transition:
            "width 0.18s ease, height 0.18s ease, border-radius 0.18s ease, opacity 0.2s ease",

          animation:
            !isMoving && !isDragging ? "cursorPulse 1.6s infinite ease-in-out" : "none",
        }}
      />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes cursorPulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.20; }
            50% { transform: translate(-50%, -50%) scale(1.10); opacity: 0.12; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0.20; }
          }

          @keyframes cursorRipple {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
            100% { transform: translate(-50%, -50%) scale(7); opacity: 0; }
          }
        `}
      </style>
    </>
  );
}
