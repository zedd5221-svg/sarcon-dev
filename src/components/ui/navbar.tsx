function navbar() {
  return (
     <nav className="fixed inset-0 z-20 grid grid-cols-2 grid-rows-2 p-4 md:p-8 pointer-events-none">
      <div className="flex items-start justify-start"><a href="#home" className="pointer-events-auto font-bold text-lg sm:text-[2vw]">SARCON</a></div>
       <div className="flex items-start justify-end gap-4">
           <a href="#home" className="pointer-events-auto relative text-sm sm:text-[1.50vw] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">HOME</a> 
           <a href="#techstack" className="pointer-events-auto relative text-sm sm:text-[1.50vw] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">STACK</a> 
           <a href="#" className="pointer-events-auto relative text-sm sm:text-[1.50vw] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">WORKS</a>
        </div>
         <div className="flex items-end justify-start"><a href="#" className="pointer-events-auto relative font-bold text-sm sm:text-[1.50vw] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">CONTACTS</a></div>
         <div className="flex items-end justify-end"><a href="#" className="pointer-events-auto relative font-bold text-sm sm:text-[1.50vw] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100">DEVELOPER</a></div>

    </nav>
  );
  }

  export default navbar;