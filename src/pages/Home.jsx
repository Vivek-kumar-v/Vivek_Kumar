import Hero from "../components/Hero";
import SkillsSphere from "../components/SkillsSphere";
import Projects from "../components/Projects";
import Education from "../components/Education";
import ResumeViewer from "../components/ResumeViewer";
import Footer from "../components/Footer";
import FloatingBackground from "../components/FloatingBackground";

export default function Home({ darkMode, setDarkMode }) {
  return (
    <>
      <FloatingBackground darkMode={darkMode} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero darkMode={darkMode} />
        <SkillsSphere darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Education darkMode={darkMode} />
        <ResumeViewer darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
