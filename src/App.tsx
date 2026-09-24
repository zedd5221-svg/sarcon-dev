//import RippleGrid from "./components/ui/RippleGrid";

import Lanyard from "./components/Lanyard";


function App() {
  return (
    <main className="relative w-screen h-screen overflow-x-visible overflow-y-hidden">

     

        {/* Lanyard */}
        <div className="absolute right-0 top-0 z-0">
          <Lanyard
            position={[0, 0, -20]}
            gravity={[0, -40, 0]}
          />
        </div>

  

    </main>
  );
}

export default App;