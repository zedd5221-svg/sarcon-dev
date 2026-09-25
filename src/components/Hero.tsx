function Hero() {
  return (
    <section className="hero-section relative grid h-screen w-screen grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-16">
        <p className="max-w-md text-xs font-light leading-tight text-justify sm:text-lg">
          I am <span className="font-bold text-base sm:text-[1.50vw]">SARCON</span>, a <span className="font-bold text-xs sm:text-[0.90vw]">BS Information Technology student at Cotabato State University</span> and an aspiring software engineer. I am passionate about learning how technology can solve real problems and about building useful, thoughtful digital experiences. Through my studies and personal projects, I continue developing my skills in programming, web development, and software design while preparing for a career in technology. I enjoy exploring new tools, improving my problem-solving skills, and turning ideas into simple and meaningful digital solutions. My goal is to create reliable software that helps people and reflects my continuous growth as a developer.
        </p>
      </div>
      <div className="flex items-center justify-center p-4 md:p-16">
        <img src="./src/assets/picture.jpg" alt="Hero Image" className="h-auto w-[300px] rounded-[20px] object-cover transition-[filter] duration-300 hover:blur-[4px]" />
      </div>
    </section>
  );
}

export default Hero;