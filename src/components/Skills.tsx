import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const skills = [
  { title: "Frontend", text: "Responsive interfaces in React and TypeScript, styled with Tailwind and animated with GSAP." },
  { title: "Backend", text: "Server logic in PHP, REST endpoints and the plumbing between a form and a database." },
  { title: "Databases", text: "Relational schemas in MySQL, normalization and the queries that keep pages fast." },
  { title: "Design", text: "Wireframes and prototypes in Figma before the first line of code is written." },
  { title: "Workflow", text: "Git branches, readable commits and shipping small pieces instead of one big one." },
  { title: "Problem solving", text: "Reading the error, isolating the cause and writing it down so it stays fixed." },
];

function Skills() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-skill]", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id="skills" className="relative w-full px-4 pb-24 md:px-16">
      <div className="grid grid-cols-1 border-t border-l border-current/20 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <article key={skill.title} data-skill className="group flex min-h-56 flex-col justify-between gap-8 border-r border-b border-current/20 p-6 md:p-8">
            <div className="flex items-center justify-between">
              <span className="inline-block h-4 w-4 border border-current transition-all duration-500 group-hover:rotate-45 group-hover:bg-current" aria-hidden="true" />
              <span className="inline-block h-4 w-4 border border-current transition-all duration-500 group-hover:-rotate-45 group-hover:bg-current" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-['Koulen'] text-3xl uppercase sm:text-4xl">{skill.title}</h3>
              <p className="mt-2 text-sm leading-snug font-light sm:text-base">{skill.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Skills;
