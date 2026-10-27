import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import DecryptedText from "./DecryptedText";

interface SectionHeadingProps {
  id?: string;
  index: number;
  lines: [string, string];
  label: string;
  cube: string;
}

// Big two-word heading framed like a selected layer in a design tool: corner
// handles, guides and live pixel measurements of the heading box.
function SectionHeading({ id, index, lines, label, cube }: SectionHeadingProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      tl.from("[data-line]", { yPercent: 110, rotate: 3, duration: 1, ease: "expo.out", stagger: 0.12 })
        .from("[data-guide]", { scaleX: 0, scaleY: 0, duration: 0.8, ease: "power3.inOut", stagger: 0.05 }, 0.1)
        .from("[data-hud]", { autoAlpha: 0, duration: 0.3, stagger: 0.06 }, 0.5);

      // Parallax drift of the heading while it crosses the screen.
      gsap.to(boxRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const num = String(index).padStart(2, "0");
  const fmt = (n: number) => n.toFixed(1).replace(".", ",");

  return (
    <section
      ref={sectionRef}
      id={id}
      data-cube={cube}
      className="relative flex min-h-[80vh] w-full flex-col justify-center overflow-hidden px-4 py-24 md:px-16"
    >
      <div className="mb-8 flex items-center gap-3 text-xs tracking-[0.3em] uppercase sm:text-sm">
        <span className="inline-block h-3 w-3 bg-current" aria-hidden="true" />
        <DecryptedText text={`${num} / ${label}`} animateOn="view" speed={35} maxIterations={10} />
      </div>

      <div ref={boxRef} className="relative self-start px-3 py-2 md:px-6 md:py-4">
        <h2 className="font-['Koulen'] text-[18vw] leading-[0.82] uppercase md:text-[12vw]">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span data-line className="block origin-bottom-left">
                {line}
              </span>
            </span>
          ))}
        </h2>

        {/* Selection frame */}
        <span data-guide aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-current/60" />
        <span data-guide aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-right bg-current/60" />
        <span data-guide aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-top bg-current/60" />
        <span data-guide aria-hidden="true" className="absolute inset-y-0 right-0 w-px origin-bottom bg-current/60" />
        {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
          <span key={pos} data-hud aria-hidden="true" className={`absolute h-2 w-2 border border-current bg-[var(--page-bg)] ${pos}`} />
        ))}

        {/* Measurements */}
        <span data-hud aria-hidden="true" className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest whitespace-nowrap sm:text-xs">
          {fmt(size.w)} px
        </span>
        <span data-hud aria-hidden="true" className="absolute top-1/2 -right-3 translate-x-full -translate-y-1/2 text-[10px] tracking-widest whitespace-nowrap sm:text-xs">
          {fmt(size.h)} px
        </span>
        <span data-hud aria-hidden="true" className="absolute -bottom-6 left-0 text-[10px] tracking-widest sm:text-xs">
          X {num}0 · Y {fmt(size.h / 2)}
        </span>
      </div>
    </section>
  );
}

export default SectionHeading;
