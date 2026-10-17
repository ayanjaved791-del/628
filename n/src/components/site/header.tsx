import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { CALENDLY, services } from "@/data/site";
import { cn } from "@/lib/utils";
import { ServicesDropdown } from "./services-dropdown";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About Us", href: "/about" },
  { label: "FAQs", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-border" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2" aria-label="six2eight home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) =>
            l.label === "Services" ? (
              <ServicesDropdown key={l.label} />
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="nav-trigger"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="pill hidden items-center gap-2 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            Start a Project
            <ArrowUpRight className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="pill inline-flex size-10 items-center justify-center border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((l) =>
              l.label === "Services" ? (
                <details key={l.label} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg text-foreground">
                    {l.label}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="flex flex-col pb-3 pl-3">
                    {services.map((s) => (
                      <a key={s.title} href="#services" onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                        {s.title}
                      </a>
                    ))}
                  </div>
                </details>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 text-lg text-foreground"
                >
                  {l.label}
                </a>
              ),
            )}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="pill mt-5 inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Start a Project <ArrowUpRight className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <span className="flex items-baseline text-2xl font-semibold tracking-tight text-foreground">
      six<span className="text-primary">2</span>eight
      <span className="ml-1 inline-block size-1.5 translate-y-[-2px] rounded-full bg-primary" />
    </span>
  );
}
