import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Bloom } from "./Flower";

interface StatementProps {
  text: string;
  cube?: string;
}

// A centered manifesto line between two outline squares. Each word lights up
// as the paragraph scrolls through the viewport.
function Statement({ text, cube }: StatementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from("[data-square]", {
        rotate: -90,
        scale: 0,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} data-cube={cube} className="relative w-full border-y border-current/20 px-4 py-16 md:px-16 md:py-24">
      <div className="relative mx-auto flex max-w-6xl items-start gap-4 md:gap-10">
        <Bloom corners={["tl", "br"]} />
        <span data-square aria-hidden="true" className="mt-2 inline-block h-3 w-3 shrink-0 border border-current md:mt-4 md:h-4 md:w-4" />
        <p className="flex-1 text-center text-2xl leading-tight font-medium uppercase sm:text-4xl md:text-5xl">
          {text.split(" ").map((word, i) => (
            <span key={i} data-word className="inline-block whitespace-pre">
              {word}{" "}
            </span>
          ))}
        </p>
        <span data-square aria-hidden="true" className="mt-2 inline-block h-3 w-3 shrink-0 border border-current md:mt-4 md:h-4 md:w-4" />
      </div>
    </div>
  );
}

export default Statement;
