
import Navbar from "./components/ui/navbar";
import Lanyard from "./components/Lanyard";
import Hero from "./components/Hero";
import Techstack from "./components/Techstack";
import RandomScrollTheme from "./components/RandomScrollTheme";


function App() {
  return (
    <main className="relative min-h-screen">
      <RandomScrollTheme />

      
          
<Navbar />
      <div className="relative z-0">
        <Hero />
        <Techstack />
      </div>


        {/* Lanyard */}
        <div className="absolute inset-0 z-10">
          <Lanyard
            position={[0, 0, -20]}
            gravity={[0, -40, 0]}
          />
            
        </div>
      
      
  









    </main>
  );
}

export default App;