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

        window.clearTimeout(finishTransitionTimer);
        root.classList.remove("random-scroll-flashing");
        if (!nextDark) {
          root.classList.remove("random-scroll-dark");
          return;
        }

        // Restart the CSS animation for every theme transition.
        void root.offsetWidth;
        root.classList.add("random-scroll-flashing");

        finishTransitionTimer = window.setTimeout(() => {
          root.classList.add("random-scroll-dark");
          root.classList.remove("random-scroll-flashing");
        }, flashDuration);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(finishTransitionTimer);
      root.classList.remove("random-scroll-flashing");
      root.classList.remove("random-scroll-dark");
    };
  }, [consent]);

  if (consent !== "pending") return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
      <section
        aria-labelledby="flash-warning-title"
        aria-describedby="flash-warning-description"
        aria-modal="true"
        className="w-full max-w-md rounded-xl border border-black/10 bg-[#FAF7F3] p-6 text-[#202020] shadow-2xl sm:p-8"
        role="dialog"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#BF0404]">
          Motion warning
        </p>
        <h2 className="text-2xl font-bold" id="flash-warning-title">
          Flashing effect
        </h2>
        <p className="mt-3 text-sm leading-relaxed" id="flash-warning-description">
          Scrolling can trigger several rapid full-screen flashes and black-and-white theme changes. These effects may affect people with photosensitivity. Enable them only if you are comfortable viewing flashing content.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            autoFocus
            className="rounded-md border border-black/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF0404]"
            onClick={() => setConsent("declined")}
            type="button"
          >
            Continue without flashes
          </button>
          <button
            className="rounded-md bg-[#BF0404] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#970303] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BF0404]"
            onClick={() => setConsent("accepted")}
            type="button"
          >
            OK, enable flashes
          </button>
        </div>
      </section>
    </div>
  );
}

export default RandomScrollTheme;
