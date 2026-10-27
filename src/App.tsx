import Navbar from "./components/ui/navbar";
import Lanyard from "./components/Lanyard";
import Hero from "./components/Hero";
import Techstack from "./components/Techstack";
import RandomScrollTheme from "./components/RandomScrollTheme";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import ScrollCube from "./components/ScrollCube";
import SectionHeading from "./components/SectionHeading";
import Statement from "./components/Statement";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Manifesto from "./components/Manifesto";
import Contact from "./components/Contact";

// Cube keyframes are "rx,ry,rz,scale,x". The loop clone at the bottom must
// match the hero (same angles plus whole turns) so the jump back is invisible.
const HERO_CUBE = "20,45,0,0.9,0";
const LOOP_CUBE = "20,765,0,0.9,0";

function App() {
  return (
    <main className="relative min-h-screen">
      <LoadingScreen />
      <RandomScrollTheme />
      <SmoothScroll />
      <ScrollCube />

      <Navbar />
      <div className="relative z-[1]">
        <div className="relative" data-cube={HERO_CUBE}>
          <Hero />
          <div className="absolute inset-x-0 top-0 z-10 h-screen">
            <Lanyard position={[0, 0, -20]} gravity={[0, -40, 0]} />
          </div>
        </div>

        <SectionHeading id="about" index={1} label="About" lines={["Curious.", "Driven."]} cube="-25,120,10,1.4,1.6" />
        <Statement text="I am a student first. I learn by building, break things on purpose and keep what works." />

        <SectionHeading index={2} label="Stack" lines={["Tools.", "Craft."]} cube="45,160,-20,0.7,-1.8" />
        <Techstack />

        <SectionHeading index={3} label="Works" lines={["Built.", "Shipped."]} cube="10,200,0,1.2,1.8" />
        <Projects />

        <SectionHeading index={4} label="Skills" lines={["Learning.", "Always."]} cube="90,270,45,0.8,-1.8" />
        <Skills />

        <Statement text="Good software is quiet. It just works, and the person using it never has to think about why." cube="120,360,45,1,0" />
        <Manifesto />

        <SectionHeading index={5} label="Contact" lines={["Here.", "Reachable."]} cube="0,660,0,1,1.8" />
        <Contact />

        {/* Copy of the first screen. Reaching it sends the scroll back to the top. */}
        <div aria-hidden="true" inert className="relative h-screen overflow-hidden" data-cube={LOOP_CUBE}>
          <Hero clone />
        </div>
      </div>
    </main>
  );
}

export default App;
