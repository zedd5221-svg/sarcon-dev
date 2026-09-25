function Hero() {
  return (
    <section className="hero-section relative grid min-h-screen w-screen grid-cols-1 md:h-screen md:grid-cols-2">
      <div className="order-2 flex flex-col items-center justify-center gap-4 p-4 md:order-1 md:p-16">
        <p className="max-w-md text-xs font-light leading-tight text-justify sm:text-lg">
          I am <span className="font-bold text-base sm:text-[1.50vw]">SARCON</span>, a <span className="font-bold text-xs sm:text-[0.90vw]">BS Information Technology student at Cotabato State University</span> and an aspiring software engineer. I am passionate about learning how technology can solve real problems and about building useful, thoughtful digital experiences. Through my studies and personal projects, I continue developing my skills in programming, web development, and software design while preparing for a career in technology. I enjoy exploring new tools, improving my problem-solving skills, and turning ideas into simple and meaningful digital solutions. My goal is to create reliable software that helps people and reflects my continuous growth as a developer.
        </p>
      </div>
      <div className="order-1 flex items-center justify-center p-4 md:order-2 md:p-16">
        <img src={`${import.meta.env.BASE_URL}picture.jpg`} alt="image not found" className="aspect-square h-auto w-[200px] rounded-full object-cover transition-[filter] duration-300 hover:blur-[4px] md:aspect-auto md:w-[300px] md:rounded-[20px]" />
      </div>
    </section>
  );
}

export default Hero;