function navbar() {
  return (
    <nav className="grid grid-cols-2 grid-rows-2 fixed inset-0 p4 md:p-8">
       <div className="flex item-start justify-start">SARCON</div>
       <div className="flex item-start justify-end gap-4">
            <span className="font-bold">HOME</span> 
            <span className="font-bold">ABOUT</span> 
            <span className="font-bold">WORKS</span>
            </div>
       <div className="flex items-end justify-start">CONTACTS</div>
       <div className="flex items-end justify-end">DEVELOPER</div>

    </nav>
  );
  }

  export default navbar;