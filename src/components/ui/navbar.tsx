function navbar() {
  return (
     <nav className="fixed inset-0 z-20 grid grid-cols-2 grid-rows-2 p-4 md:p-8 pointer-events-none">
       <div className="flex items-start justify-start"><span className="font-bold text-[2vw]">SARCON</span></div>
       <div className="flex items-start justify-end gap-4">
          <a href="#" className="pointer-events-auto text-[1.50vw]">HOME</a> 
          <a href="#" className="pointer-events-auto text-[1.50vw]">ABOUT</a> 
          <a href="#" className="pointer-events-auto text-[1.50vw]">WORKS</a>
        </div>
       <div className="flex items-end justify-start"><a href="#" className="pointer-events-auto font-bold text-[1.50vw]">CONTACTS</a></div>
       <div className="flex items-end justify-end"><a href="#" className="pointer-events-auto font-bold text-[1.50vw]">DEVELOPER</a></div>

    </nav>
  );
  }

  export default navbar;