

import Lanyard from "./components/Lanyard";


function App() {
  return (
    <main>

   
      

      

       

        {/* Lanyard */}
        <div>
          <Lanyard
            position={[0, 0, -20]}
            gravity={[0, -40, 0]}
          />
        </div>



    </main>
  );
}

export default App;