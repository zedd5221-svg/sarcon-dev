import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Bloom } from "./Flower";

const EMAIL = "zedd5221@gmail.com";
const GITHUB = "https://github.com/Zedd5221";
const channels = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "GitHub", value: "Zedd5221", href: GITHUB },
  { label: "In person", value: "Cotabato, Philippines", href: undefined },
];
const socials = [
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-channel]", {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} id="contact" className="relative w-full px-4 md:px-16">
      <p className="mb-10 max-w-xl text-base font-light sm:text-xl">
        Got an internship, a project or just a question about code? I read every message.
      </p>
      <div className="relative">
        <Bloom />
        <ul className="border-t border-current/20">
          {channels.map((channel) => {
            const Wrapper = channel.href ? "a" : "div";
            return (
              <li key={channel.label} className="overflow-hidden border-b border-current/20">
                <Wrapper
                  data-channel
                  {...(channel.href ? { href: channel.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between md:py-8"
                >
                  <span className="text-xs tracking-[0.3em] uppercase">{channel.label}</span>
                  <span className="relative flex items-center gap-3 font-['Koulen'] text-3xl break-all uppercase sm:text-5xl md:text-6xl">
                    {channel.value}
                    {channel.href && (
                      <ArrowUpRight aria-hidden="true" className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                    )}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-current transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" aria-hidden="true" />
                  </span>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 border border-current" aria-hidden="true" />
          <p className="text-xs tracking-widest uppercase sm:text-sm">© {new Date().getFullYear()} Sarcon. Built from scratch.</p>
        </div>
        <ul className="flex gap-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="relative text-xs tracking-widest uppercase after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 sm:text-sm"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </footer>

      <p aria-hidden="true" className="flex items-center justify-center gap-3 pb-16 text-xs tracking-[0.3em] uppercase">
        <span className="inline-block h-2 w-2 animate-bounce bg-current" />
        Keep scrolling. It starts again.
        <span className="inline-block h-2 w-2 animate-bounce bg-current" />
      </p>
    </div>
  );
}

export default Contact;
