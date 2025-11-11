import { CreativeEyes } from "@/components/ui/creative-eyes-hero-section-1"

export default function CreativeEyesHeroNew() {
  return (
    <div className="h-screen w-screen bg-background text-foreground font-sans cursor-crosshair overflow-hidden">
      <CreativeEyes />

      <div className="relative z-10 p-4 md:p-8 flex flex-col h-full box-border">
        <header
          role="banner"
          aria-label="Main Header"
          className="flex justify-between items-center w-full"
        >
          <div
            className="font-extrabold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-foreground/90 via-foreground to-foreground/70 bg-clip-text text-transparent"
            aria-label="Brand"
          >
            AltruisticXAI
          </div>

          <nav
            role="navigation"
            aria-label="Primary Navigation"
            className="hidden md:flex gap-6"
          >
            <a href="#services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Services
            </a>
            <a href="#sectors" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Sectors
            </a>
            <a href="#company" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
              Company
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="bg-white text-black py-2.5 px-5 rounded-full font-semibold text-sm transition-colors hover:bg-gray-200"
            >
              Book a Call
            </a>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-end items-center text-center pb-28 md:pb-32">
          <h1
            className="text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-black bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent"
            aria-label="AI Strategy That Works"
          >
            AI Strategy That Works
          </h1>

          <p className="max-w-3xl text-base md:text-xl mt-4 md:mt-5 opacity-90">
            We don&apos;t just talk about AI—we implement it. Our proven frameworks help
            organizations in education, healthcare, energy, and startups turn AI
            vision into measurable impact.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#cases"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2.5 text-sm backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              See Case Studies
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </main>

        <section
          id="sectors"
          aria-label="Sectors We Serve"
          className="mx-auto w-full max-w-5xl -mt-16 md:-mt-20"
        >
          <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md shadow-xl">
            <div className="px-4 md:px-6 py-4 md:py-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-sm md:text-base font-semibold tracking-wide">
                  Sectors We Serve
                </h2>
                <a
                  href="#services"
                  className="text-xs md:text-sm underline underline-offset-4 opacity-90 hover:opacity-100"
                >
                  View all services →
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <a
                  href="#education"
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 md:p-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="text-sm font-semibold">Education</div>
                  <p className="mt-1 text-[11px] md:text-xs opacity-80">
                    AI-powered questioning & assessment tools for K-12 educators
                  </p>
                  <span className="mt-2 inline-block text-[11px] md:text-xs underline opacity-90 group-hover:opacity-100">
                    Learn more
                  </span>
                </a>

                <a
                  href="#healthcare"
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 md:p-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="text-sm font-semibold">Healthcare</div>
                  <p className="mt-1 text-[11px] md:text-xs opacity-80">
                    Administrative automation with HIPAA-compliant AI solutions
                  </p>
                  <span className="mt-2 inline-block text-[11px] md:text-xs underline opacity-90 group-hover:opacity-100">
                    Learn more
                  </span>
                </a>

                <a
                  href="#energy"
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 md:p-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="text-sm font-semibold">Energy</div>
                  <p className="mt-1 text-[11px] md:text-xs opacity-80">
                    Enterprise-scale optimization for asset management & sustainability
                  </p>
                  <span className="mt-2 inline-block text-[11px] md:text-xs underline opacity-90 group-hover:opacity-100">
                    Learn more
                  </span>
                </a>

                <a
                  href="#startups"
                  className="group rounded-xl border border-white/10 bg-white/5 p-3 md:p-4 hover:bg-white/[0.08] transition-colors"
                >
                  <div className="text-sm font-semibold">Startups</div>
                  <p className="mt-1 text-[11px] md:text-xs opacity-80">
                    AI-native MVP development from idea to product-market fit
                  </p>
                  <span className="mt-2 inline-block text-[11px] md:text-xs underline opacity-90 group-hover:opacity-100">
                    Learn more
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="h-6 md:h-8" />
      </div>
    </div>
  )
}
