
import Navbar from "./components/ui/navbar";
import Lanyard from "./components/Lanyard";


function App() {
  return (
    <main>
      

      
          
<Navbar />


        {/* Lanyard */}
        <div className="w-full h-full relative z-10">
          <Lanyard
            position={[0, 0, -20]}
            gravity={[0, -40, 0]}
          />
        </div>
      










    </main>
  );
}

export default App;