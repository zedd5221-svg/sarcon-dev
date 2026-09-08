

import Lanyard from "./components/Lanyard";


function App() {
  return (
    <main>

      <section className="w-screen h-screen flex align-center">
          <div className="w-full h-full relative">
            <div className="NAME p-4">SARCON</div>
            <nav className="">
              <a href="#" className="hover:underline">HOME</a>
              <a href="#" className="hover:underline">ABOUT</a>
              <a href="#" className="hover:underline">WORKS</a>
            </nav>
          </div>



        {/* Lanyard */}
        <div className="w-full h-full relative z-10">
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