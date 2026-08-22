import DotGrid from "./components/ui/DotGrid";

function App() {
  return (
    <main className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0f0d13]">
      <DotGrid
        dotSize={5}
        gap={15}
        baseColor="#2F293A"
        activeColor="#f71010"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </main>
  );
}

export default App;