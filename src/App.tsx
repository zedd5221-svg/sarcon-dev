import RippleGrid from "./components/ui/RippleGrid";
import PillNav from "./components/PillNav";
import logo from "./assets/logo.png";
import Lanyard from "./components/Lanyard";
import FuzzyText from "./components/FuzzyText";

function App() {
  return (
    <main className="relative w-screen h-screen overflow-x-visible overflow-y-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#2C3947"
          rippleIntensity={0.05}
          gridSize={30}
          gridThickness={15}
          mouseInteraction
          mouseInteractionRadius={0.8}
          opacity={1}
          fadeDistance={3.0}
          vignetteStrength={0.5}
          glowIntensity={1.1}
          gridRotation={20}
        />
      </div>

      {/* Navigation */}
      <div className="navbar relative z-100 flex justify-center w-full">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Contact", href: "#contact" }
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#547A95"
          pillColor="#ffffff"
          initialLoadAnimation
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full h-[calc(100vh-80px)]">

        {/* Welcome Text */}
        <div className="absolute left-[2%] top-[50%] z-30">
          <FuzzyText
            fontSize="clamp(1.5rem, 6vw, 5rem)"
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover
            color="#ff0000"
          >
            404 Portfolio
          </FuzzyText>
          <FuzzyText
            fontSize="clamp(1.5rem, 6vw, 5rem)"
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover
            color="#695959"
          >
            NOT FINISHED
          </FuzzyText>
        </div>

        {/* Lanyard */}
        <div className="absolute right-0 top-0 z-31">
          <Lanyard
            position={[0, 0, -20]}
            gravity={[0, -40, 0]}
          />
        </div>

      </section>

    </main>
  );
}

export default App;