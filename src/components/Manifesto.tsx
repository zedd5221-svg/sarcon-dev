import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const scenes = [
  {
    kicker: "Rule one",
    title: ["Every program", "starts as an", "empty file"],
    notes: ["A blinking cursor. No errors yet. No features either.", "The only way out is to type something."],
  },
  {
    kicker: "Rule two",
    title: ["It breaks", "before", "it works"],
    notes: ["Red text in the terminal is not failure.", "It is the computer telling you where to look."],
  },
  {
    kicker: "Rule three",
    title: ["Read the error.", "Change one thing.", "Run it again."],
    notes: ["Small steps beat clever guesses.", "Patience is a debugging tool."],
  },
  {
    kicker: "Rule four",
    title: ["Ship it.", "Then make it", "better"],
    notes: ["Done and improving beats perfect and unseen.", "Every version teaches the next one."],
  },
];

// Pinned sequence: the section sticks to the screen while each scene rises in
// and dissolves out, driven entirely by scroll position.
function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * items.length * 1.1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      items.forEach((scene, i) => {
        const lines = scene.querySelectorAll("[data-mline]");
        const notes = scene.querySelectorAll("[data-mnote]");
        tl.set(scene, { autoAlpha: 1 }, i)
          .fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.08, duration: 0.4, ease: "power3.out" }, i)
          .fromTo(notes, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3 }, i + 0.2)
          .to(`[data-dot="${i}"]`, { scale: 1.6, backgroundColor: "currentColor", duration: 0.2 }, i);
        if (i < items.length - 1) {
          tl.to(lines, { yPercent: -110, stagger: 0.05, duration: 0.3, ease: "power2.in" }, i + 0.75)
            .to(notes, { opacity: 0, duration: 0.2 }, i + 0.75)
            .to(`[data-dot="${i}"]`, { scale: 1, backgroundColor: "transparent", duration: 0.2 }, i + 0.9)
            .set(scene, { autoAlpha: 0 }, i + 1);
        }
      });
      tl.to("[data-progress]", { scaleX: 1, ease: "none", duration: items.length }, 0);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="manifesto" data-cube="180,540,90,1.6,0" className="relative h-screen w-full overflow-hidden">
      {scenes.map((scene, i) => (
        <div key={scene.kicker} data-scene className="invisible absolute inset-0 flex flex-col justify-center gap-10 px-4 md:px-16">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] uppercase sm:text-sm">{scene.kicker}</p>
            <h2 className="font-['Koulen'] text-[13vw] leading-[0.85] uppercase md:text-[8.5vw]">
              {scene.title.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-mline className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>
          </div>
          <div className="grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {scene.notes.map((note) => (
              <div key={note} data-mnote className="flex items-start gap-3">
                <span className="mt-1.5 inline-block h-3 w-3 shrink-0 border border-current" aria-hidden="true" />
                <p className="text-sm font-light uppercase sm:text-lg">{note}</p>
              </div>
            ))}
          </div>
          <span className="sr-only">{`Scene ${i + 1} of ${scenes.length}`}</span>
        </div>
      ))}

      <div aria-hidden="true" className="absolute right-4 bottom-24 left-4 flex items-center gap-4 md:right-16 md:left-16">
        <div className="flex gap-3">
          {scenes.map((scene, i) => (
            <span key={scene.kicker} data-dot={i} className="inline-block h-2 w-2 border border-current" />
          ))}
        </div>
        <div className="h-px flex-1 bg-current/20">
          <div data-progress className="h-px origin-left scale-x-0 bg-current" />
        </div>
      </div>
    </section>
  );
}

export default Manifesto;
