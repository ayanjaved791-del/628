import { ArrowUpRight } from "lucide-react";
import { clientLogos, services } from "@/data/site";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";

export function Services() {
  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal as="p" className="eyebrow" variant="left">
          <span className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
          Services
        </Reveal>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <Reveal variant="blur">
            <h2 className="text-display text-3xl sm:text-5xl">
              Your next stage of growth
              <br />
              starts with <span className="text-primary">connected digital systems.</span> One partner.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-muted-foreground">
              We partner with ambitious businesses to turn digital challenges into measurable opportunities. From strategy and branding to high-performance websites, customer acquisition, and AI-powered automation, we build connected systems designed to move businesses forward.
            </p>
            <Magnetic className="mt-6">
              <a
                href="#work"
                className="pill press sheen-hover inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
              >
                Explore Growth Concepts <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} variant="scale" delay={(i % 3) * 110}>
            <article
              className="group glass-card glass-polish hover-lift sheen-hover h-full overflow-hidden hover:border-primary/50"
            >

              <div className="relative h-40 overflow-hidden sm:h-48">

                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/80 to-transparent p-3">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="pill border border-white/20 bg-black/40 px-2.5 py-1 text-[11px] text-foreground backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-display text-xl">
                  {s.titleTop}
                  <span className="block text-muted-foreground">{s.titleBottom}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Growth-focused service <ArrowUpRight className="size-4" />
                </span>
              </div>
            </article>
            </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
}

function LogoPill({ name, slug }: { name: string; slug: string }) {
  return (
    <span className="pill group flex shrink-0 items-center gap-2.5 border border-border bg-surface px-4 py-2.5 transition-colors hover:border-primary/50 hover:bg-surface-2 sm:gap-3 sm:px-7 sm:py-3">
      <img
        src={`https://cdn.simpleicons.org/${slug}/9ca3af`}
        alt={`${name} logo`}
        loading="lazy"
        width={24}
        height={24}
        className="size-5 shrink-0 object-contain transition-opacity sm:size-6"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="whitespace-nowrap text-sm font-medium tracking-tight text-muted-foreground transition-colors group-hover:text-foreground sm:text-lg">
        {name}
      </span>
    </span>
  );
}


export function ClientLogos() {
  const row1 = clientLogos.slice(0, 15);
  const row2 = clientLogos.slice(15);


  return (
    <section className="border-t border-border py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="eyebrow justify-center w-full text-center">Brand Landscape · Not Client Endorsements</p>
      </div>
      <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-6">
        {[row1, row2].map((row, idx) => (
          <div key={idx} className="marquee-mask overflow-hidden">
            <div
              className={idx % 2 ? "flex w-max gap-3 animate-marquee-rev" : "flex w-max gap-3 animate-marquee"}
              style={{ ["--marquee-duration" as string]: idx % 2 ? "55s" : "45s" }}
            >
              {[...row, ...row].map((c, i) => (
                <LogoPill key={`${c.name}-${i}`} name={c.name} slug={c.slug} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

