

import Lanyard from "./components/Lanyard";


function App() {
  return (
    <main>

      <section className="w-screen h-screen flex align-center">
          



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