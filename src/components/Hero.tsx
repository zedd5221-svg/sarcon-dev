function Hero() {
  return (
    <section className="hero-section grid grid-cols-2 h-screen w-screen relative z-10">
      <div className="flex flex-col items-start justify-center gap-4 p-8 md:p-16">
        <p className="max-w-md text-lg font-light text-justify">
          Lorem ipsum <span className="font-bold text-[1.50vw]">SARCON</span> sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div className="flex items-center justify-end p-8 md:p-16">
        <img src="/path/to/your/image.jpg" alt="Hero Image" className="w-full h-auto object-cover" />
      </div>
    </section>
  );
}

export default Hero;