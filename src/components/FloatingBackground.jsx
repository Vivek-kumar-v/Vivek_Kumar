export default function FloatingBackground({ darkMode }) {
  const t = darkMode;

  const blobs = [
    {
      size: 700,
      x: "-8%",
      y: "3%",
      color: t ? "rgba(139,92,246,0.07)" : "rgba(139,92,246,0.09)",
      anim: "blobA",
      duration: "12s",
    },
    {
      size: 550,
      x: "62%",
      y: "35%",
      color: t ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.07)",
      anim: "blobB",
      duration: "16s",
    },
    {
      size: 450,
      x: "18%",
      y: "68%",
      color: t ? "rgba(168,85,247,0.05)" : "rgba(168,85,247,0.06)",
      anim: "blobC",
      duration: "14s",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes blobA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-38px)} }
        @keyframes blobB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,28px)} }
        @keyframes blobC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,44px)} }
      `}</style>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            animation: `${b.anim} ${b.duration} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
