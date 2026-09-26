import { useEffect, useState } from "react";

function RandomScrollTheme() {
  const [consent, setConsent] = useState<"pending" | "accepted" | "declined">("pending");

  useEffect(() => {
    if (consent !== "accepted") return;

    const root = document.documentElement;
    const flashDuration = 420;
    let isDark = root.classList.contains("random-scroll-dark");
    let previousScrollY = window.scrollY;
    let frame = 0;
    let finishTransitionTimer = 0;
    let isTransitioning = false;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const currentScrollY = window.scrollY;
        if (currentScrollY === previousScrollY) return;

        const nextDark = currentScrollY > previousScrollY;
        previousScrollY = currentScrollY;
        if (nextDark === isDark) return;

        isDark = nextDark;
        if (isTransitioning) return;

        window.clearTimeout(finishTransitionTimer);
        root.classList.remove("random-scroll-flashing");
        if (!nextDark) {
          root.classList.remove("random-scroll-dark");
          return;
        }

        // Restart the CSS animation for every theme transition.
        void root.offsetWidth;
        isTransitioning = true;
        root.classList.add("random-scroll-flashing");

        finishTransitionTimer = window.setTimeout(() => {
          root.classList.toggle("random-scroll-dark", isDark);
          root.classList.remove("random-scroll-flashing");
          isTransitioning = false;
        }, flashDuration);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(finishTransitionTimer);
      isTransitioning = false;
      root.classList.remove("random-scroll-flashing");
      root.classList.remove("random-scroll-dark");
    };
  }, [consent]);

  if (consent !== "pending") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100000] p-3 sm:p-5">
      <section
        aria-labelledby="flash-warning-title"
        aria-describedby="flash-warning-description"
        className="pointer-events-auto mx-auto flex w-full max-w-4xl flex-col gap-3 rounded-xl border border-black/10 bg-[#FAF7F3]/95 p-3 text-[#202020] shadow-xl backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-4"
        role="region"
      >
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-bold text-[#BF0404]" id="flash-warning-title">
            Flashing effect warning
          </h2>
          <p className="mt-1 text-xs leading-snug sm:text-sm" id="flash-warning-description">
            Scrolling triggers up to three flashes and theme changes, which may affect people with photosensitivity.
          </p>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <button
            className="rounded-md border border-black/20 px-3 py-2 text-xs font-semibold transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF0404] sm:text-sm"
            onClick={() => setConsent("declined")}
            type="button"
          >
            No flashes
          </button>
          <button
            className="rounded-md bg-[#BF0404] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#970303] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF0404] sm:text-sm"
            onClick={() => setConsent("accepted")}
            type="button"
          >
            OK, enable
          </button>
        </div>
      </section>
    </div>
  );
}

export default RandomScrollTheme;
