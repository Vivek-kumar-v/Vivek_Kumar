import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./index.css";
import GreetingSplash from "./components/GreetingSplash";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  // ✅ FIX: you MUST store splashDone value also
  const [splashDone, setSplashDone] = useState(false);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: darkMode ? "#0a0a14" : "#f8f8fc",
        color: darkMode ? "#fff" : "#0a0a14",
        fontFamily:
          "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        position: "relative",
        transition: "background 0.5s ease, color 0.5s ease",
        overflowX: "hidden",
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Splash screen */}
      {!splashDone && (
        <GreetingSplash onDone={() => setSplashDone(true)} />
      )}

      {/* Main content — fades in after splash */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          opacity: splashDone ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
          pointerEvents: splashDone ? "all" : "none",
        }}
      >
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Home darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}
