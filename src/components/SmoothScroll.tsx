import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export const LOOP_EVENT = "portfolio:loop";

// Smooth scrolling plus an endless page: the last screen is a clone of the
// first one, so when the visitor reaches the bottom we silently jump back to
// the top and the page keeps going.
function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
      anchors: true,
    });

    let looping = false;
    lenis.on("scroll", () => {
      ScrollTrigger.update();
      if (looping || lenis.limit <= 0) return;
      if (lenis.direction === 1 && lenis.scroll >= lenis.limit - 1) {
        looping = true;
        window.dispatchEvent(new Event(LOOP_EVENT));
        lenis.scrollTo(0, { immediate: true, force: true });
        ScrollTrigger.update();
        window.requestAnimationFrame(() => {
          looping = false;
        });
      }
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
