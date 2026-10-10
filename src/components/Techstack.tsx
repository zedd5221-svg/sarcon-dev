import { useEffect, useState } from "react";
import { LogoLoop, type LogoItem } from "./LogoLoop";
import OptionWheel from "./OptionWheel";
import type { LucideIcon } from "lucide-react";
import {
  Braces,
  Code2,
  CodeXml,
  Component,
  Database,
  GitBranch,
  PenTool,
  Wind,
} from "lucide-react";
import DecryptedText from "./DecryptedText";

const techStack = [
  { name: "HTML", icon: CodeXml, description: "Markup language for structuring web pages." },
  { name: "CSS", icon: Code2, description: "Styles and layouts that make web pages clear and responsive." },
  { name: "JavaScript", icon: Braces, description: "Programming language for interactive web experiences." },
  { name: "TypeScript", icon: Code2, description: "JavaScript with static types for safer application development." },
  { name: "React", icon: Component, description: "Component-based library for building user interfaces." },
  { name: "Tailwind CSS", icon: Wind, description: "Utility-first CSS framework for building custom interfaces." },
  { name: "Git", icon: GitBranch, description: "Version control for tracking and collaborating on code." },
  { name: "PHP", icon: Code2, description: "Server-side language for building dynamic web applications." },
  { name: "MySQL", icon: Database, description: "Relational database for storing and querying application data." },
  { name: "Figma", icon: PenTool, description: "Interface design and prototyping tool for digital products." },
];

const technologies: LogoItem[] = techStack.map(({ name, icon }) => ({
	node: <TechIcon icon={icon} />,
	title: name,
}));

function TechIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex min-w-24 items-center justify-center">
      <i className="not-italic" aria-hidden="true">
        <Icon aria-hidden="true" />
      </i>
    </div>
  );
}

function Techstack() {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [wheelFontSize, setWheelFontSize] = useState(1.8);
  const selectedTech = techStack[selectedIndex] ?? techStack[0];
  const SelectedIcon = selectedTech.icon;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const updateWheelSize = () => setWheelFontSize(desktopQuery.matches ? 2.15 : 1.8);
    updateWheelSize();
    desktopQuery.addEventListener("change", updateWheelSize);
    return () => desktopQuery.removeEventListener("change", updateWheelSize);
  }, []);

  return (
    <section
      id="techstack"
      className="relative grid min-h-screen w-screen grid-cols-1 grid-rows-[auto_minmax(18rem,1fr)_auto] md:h-screen"
    >
      <div className="w-full">
        <LogoLoop
          logos={technologies}
          speed={70}
          logoHeight={24}
          gap={40}
          pauseOnHover
          scaleOnHover
          ariaLabel="Technologies used in my portfolio"
        />
      </div>

      <div className="relative z-20 flex min-h-[18rem] items-center justify-center gap-2 px-3 py-6 sm:gap-6 sm:px-8 md:gap-12 md:px-16">
        <div className="h-[17rem] w-1/2 min-w-0 sm:h-[20rem] sm:w-5/12 md:h-[24rem] md:w-5/12">
          <OptionWheel
            items={techStack.map(({ name }) => name)}
            defaultSelected={2}
            textColor="#960101"
            activeColor="#ff0000"
            side="left"
            fontSize={wheelFontSize}
            spacing={1.4}
            curve={1}
            tilt={6}
            blur={0.5}
            fade={0.25}
            smoothing={200}
            inset={32}
            loop={true}
            draggable
            soundUrl="/assets/sounds/click-soft.mp3"
            soundVolume={0.5}
            onChange={(index) => setSelectedIndex(index)}
          />
        </div>

        <div
          aria-live="polite"
          className="flex w-1/2 min-w-0 flex-col items-center gap-3 text-center sm:w-5/12 md:w-1/3"
        >
          <SelectedIcon aria-hidden="true" className="h-12 w-12 text-[#BF0404] sm:h-16 sm:w-16" strokeWidth={1.5} />
          <h2 className="text-lg font-bold sm:text-2xl">{selectedTech.name}</h2>
          <p className="max-w-xs text-xs font-light leading-relaxed sm:text-base">
            {selectedTech.description}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-center px-4 pb-8 pt-2 md:px-16">
        <p className="max-w-md text-xs font-light leading-tight text-justify sm:text-lg">
          <DecryptedText
            text="These are the technologies I have experience with and have used in my projects. I am constantly learning and exploring new technologies to improve my skills and stay up-to-date with the latest trends in web development."
            animateOn="theme"
            speed={30}
            maxIterations={8}
          />
        </p>
      </div>
    </section>
  );
}

export default Techstack;
