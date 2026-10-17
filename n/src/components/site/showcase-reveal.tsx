import { useEffect, useRef } from "react";
import { heroImages, projects } from "@/data/site";

const pool = [...heroImages.map((h) => h.src), ...projects.map((p) => p.image)];

// curated collage columns: [imageIndex, aspect-ratio class]
const columns: { src: string; ratio: string }[][] = [
  [
    { src: pool[0]!, ratio: "aspect-4/5" },
    { src: pool[1]!, ratio: "aspect-3/4" },
    { src: pool[2]!, ratio: "aspect-square" },
  ],
  [
    { src: pool[3]!, ratio: "aspect-16/10" },
    { src: pool[4]!, ratio: "aspect-4/5" },
    { src: pool[5]!, ratio: "aspect-3/4" },
  ],
  [
    { src: pool[6]!, ratio: "aspect-3/4" },
    { src: pool[7]!, ratio: "aspect-square" },
    { src: pool[8]!, ratio: "aspect-4/5" },
  ],
  [
    { src: pool[9]!, ratio: "aspect-square" },
    { src: pool[10]!, ratio: "aspect-4/5" },
    { src: pool[11] ?? pool[0]!, ratio: "aspect-16/10" },
  ],
  [
    { src: pool[12] ?? pool[1]!, ratio: "aspect-3/4" },
    { src: pool[13] ?? pool[2]!, ratio: "aspect-16/10" },
    { src: pool[14] ?? pool[3]!, ratio: "aspect-4/5" },
  ],
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
// smooth, non-bouncy easing
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function ShowcaseReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    if (!section || !media) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      media.style.transform = "translate3d(-50%, -50%, 0) scale(1)";
      media.style.opacity = "1";
      return;
    }

    let raf = 0;
    let target = 0;
    let current = -1;

    const readProgress = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height - vh;
      return clamp(travel > 0 ? -rect.top / travel : 0);
    };

    const render = (p: number) => {
      const w = window.innerWidth;
      const e = easeOutCubic(p);

      const mobile = w < 640;
      const tablet = w >= 640 && w < 1024;
      const startY = mobile ? 12 : tablet ? 16 : 20; // vh
      const startScale = mobile ? 0.62 : tablet ? 0.55 : 0.46;

      const y = startY * (1 - e);
      const s = startScale + (1 - startScale) * e;

      media.style.transform = `translate3d(-50%, calc(-50% + ${y.toFixed(3)}vh), 0) scale(${s.toFixed(4)})`;
      media.style.opacity = String(0.6 + 0.4 * clamp(e * 1.6));
      if (glowRef.current) glowRef.current.style.opacity = String(0.35 * (1 - e));
    };

    // smooth both directions: grows on scroll down, shrinks back on scroll up
    const loop = () => {
      const diff = target - current;
      current += Math.abs(diff) < 0.0005 ? diff : diff * 0.12;
      render(current);
      raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      target = readProgress();
    };

    target = readProgress();
    current = target;
    render(current);
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      aria-label="Selected work showcase"
      className="relative -mt-8 h-[220vh] sm:h-[240vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-[160px]"
          style={{ background: "var(--color-primary)", opacity: 0.35 }}
        />
        <div
          ref={mediaRef}
          className="absolute left-1/2 top-1/2 w-[94vw] max-w-[1700px] will-change-transform"
          style={{ transformOrigin: "50% 50%" }}

        >
          <div className="relative h-[88vh] overflow-hidden rounded-[28px] border border-border bg-ink p-2.5 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)] sm:p-4">
            <div className="grid h-full grid-cols-2 gap-2.5 overflow-hidden sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
              {columns.map((col, ci) => (
                <div
                  key={ci}
                  className={`flex min-h-0 flex-col gap-2.5 sm:gap-3 ${
                    ci === 2 ? "hidden sm:flex" : ci > 2 ? "hidden lg:flex" : ""
                  }`}
                  style={{ transform: `translateY(${ci % 2 === 0 ? "-2%" : "-8%"})` }}
                >
                  {[...col, ...col].map((item, i) => (
                    <div
                      key={`${ci}-${i}`}
                      className={`${item.ratio} w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-surface`}
                    >
                      <img
                        src={item.src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
