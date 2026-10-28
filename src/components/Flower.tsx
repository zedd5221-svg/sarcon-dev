import { useEffect, useRef, type CSSProperties } from "react";

const PETALS = [0, 72, 144, 216, 288];
const PETAL = "M0 -4 C -16 -14, -15 -38, 0 -48 C 15 -38, 16 -14, 0 -4";
const VEIN = "M0 -10 C -3 -20, -3 -30, 0 -38";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_CLASS: Record<Corner, string> = {
  tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  tr: "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  bl: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
  br: "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Line-art flower. Every stroke has pathLength 1 so the CSS in index.css can
// draw it in (blossom, light theme) or burn it away (dark theme).
export function FlowerHead({ className }: { className?: string }) {
  return (
    <svg viewBox="-60 -60 120 120" className={className} aria-hidden="true">
      <path className="bloom-line" style={d(0)} pathLength={1} d="M8 6 C 18 22, 30 30, 46 34" />
      <path className="bloom-line" style={d(120)} pathLength={1} d="M24 24 C 22 38, 32 46, 42 46 C 42 34, 34 26, 24 24" />
      {PETALS.map((deg, i) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <g className="bloom-petal" style={d(200 + i * 90)}>
            <path className="bloom-line" style={d(200 + i * 90)} pathLength={1} d={PETAL} />
            <path className="bloom-line" style={d(320 + i * 90)} pathLength={1} d={VEIN} />
          </g>
          <circle className="bloom-ember" style={d(i * 60)} cx="0" cy="-48" r="2.5" />
        </g>
      ))}
      <circle className="bloom-line" style={d(700)} pathLength={1} r="7" />
      <circle className="bloom-line" style={d(780)} pathLength={1} r="2.5" />
    </svg>
  );
}

// Flowers pinned to the corners of the nearest positioned parent. They blossom
// while visible on the light theme and burn when the page turns dark.
export function Bloom({
  corners = ["tl", "tr", "bl", "br"],
  size = "h-10 w-10 md:h-14 md:w-14",
  delay = 0,
}: {
  corners?: Corner[];
  size?: string;
  delay?: number;
}) {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = () => root.classList.contains("random-scroll-dark");

    // Only flowers that were showing when the lights went out burn. One that
    // scrolls in while it is already dark stays hidden until the next blossom.
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
          if (entry.isIntersecting && isDark()) entry.target.classList.add("burnt");
        }),
      { threshold: 0.3 },
    );
    const theme = new MutationObserver(() => {
      if (!isDark()) refs.current.forEach((el) => el?.classList.remove("burnt"));
    });

    refs.current.forEach((el) => el && observer.observe(el));
    theme.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      theme.disconnect();
    };
  }, [corners.length]);

  return (
    <>
      {corners.map((corner, i) => (
        <span
          key={corner}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden="true"
          className={`bloom pointer-events-none absolute z-10 ${CORNER_CLASS[corner]} ${size}`}
          style={{ "--bloom-delay": `${delay + i * 140}ms` } as CSSProperties}
        >
          <FlowerHead className="h-full w-full overflow-visible" />
        </span>
      ))}
    </>
  );
}
