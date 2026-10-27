import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import DecryptedText from "./DecryptedText";

// Edit this list as projects are finished. `href` is optional.
const projects = [
  {
    title: "Portfolio",
    tagline: "This site.",
    description: "React, TypeScript, GSAP and Three.js. Smooth endless scroll, a 3D cube that follows the page and a physics lanyard.",
    tags: ["React", "TypeScript", "GSAP", "Three.js"],
    year: "2026",
    href: "https://github.com/zedd5221-svg/Portfolio-tsx",
  },
  {
    title: "AutoVideoBot",
    tagline: "Videos on autopilot.",
    description: "A tool that automates producing short videos. The client is built with Vue 3, TypeScript and Vite.",
    tags: ["Vue", "TypeScript", "Vite"],
    year: "2026",
    href: undefined,
  },
  {
    title: "School Systems",
    tagline: "Classroom to production.",
    description: "Web applications made for coursework at Cotabato State University, from database design to the PHP backend.",
    tags: ["PHP", "MySQL", "HTML", "CSS"],
    year: "2025",
    href: undefined,
  },
];

function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-project]").forEach((row) => {
        gsap.from(row, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id="projects" className="relative w-full px-4 pb-24 md:px-16">
      <ul className="border-t border-current/20">
        {projects.map((project, i) => {
          const Wrapper = project.href ? "a" : "div";
          return (
            <li key={project.title} data-project className="border-b border-current/20">
              <Wrapper
                {...(project.href ? { href: project.href, target: "_blank", rel: "noreferrer" } : {})}
                className="group grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 py-8 md:grid-cols-[3rem_1.2fr_1fr_auto] md:items-center md:gap-8 md:py-12"
              >
                <span className="flex items-center gap-3 text-xs tracking-widest">
                  <span className="inline-block h-3 w-3 bg-current transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="relative inline-block font-['Koulen'] text-4xl leading-none uppercase sm:text-6xl md:text-7xl">
                    <DecryptedText text={project.title} animateOn="hover" speed={30} maxIterations={8} />
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                  </h3>
                  <p className="mt-2 text-sm font-light italic sm:text-base">{project.tagline}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="max-w-md text-sm leading-snug font-light sm:text-base">{project.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag} className="border border-current/40 px-2 py-0.5 text-[10px] tracking-widest uppercase sm:text-xs">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="col-span-2 flex items-center gap-2 text-xs tracking-widest md:col-span-1 md:justify-end">
                  {project.year}
                  {project.href && (
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  )}
                </span>
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Projects;
