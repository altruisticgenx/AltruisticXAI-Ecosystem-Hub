import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, useReducedMotion } from "framer-motion"

const LazyShaderAnimation = lazy(() => 
  import("@/components/ui/shader-animation")
    .then(module => ({
      default: module.ShaderAnimation
    }))
    .catch(() => 
      import("react").then(React => ({
        default: () => React.createElement("div", null)
      }))
    )
)

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.warn("WebGL component error:", error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

const GradientFallback = () => (
  <div
    className="absolute inset-0 h-full w-full"
    style={{
      background:
        "linear-gradient(135deg, oklch(0.22 0.04 280) 0%, oklch(0.68 0.14 340) 25%, oklch(0.85 0.25 280) 50%, oklch(0.75 0.28 120) 75%, oklch(0.22 0.04 280) 100%)",
      backgroundSize: "400% 400%",
      animation: "gradient-shift 15s ease infinite",
    }}
    aria-hidden="true"
  />
)

export function Hero() {
  const reduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.1,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5 },
    },
  }

  const handleExplore = () => {
    const vh = window.innerHeight
    window.scrollTo({ top: vh * 0.9, behavior: "smooth" })
  }

  return (
    <section
      className="relative flex min-h-[65vh] items-center overflow-hidden py-12 text-foreground sm:py-16 md:py-20"
      aria-labelledby="hero-heading"
      role="region"
    >
      <WebGLErrorBoundary fallback={<GradientFallback />}>
        {!reduceMotion && (
          <Suspense fallback={<GradientFallback />}>
            <LazyShaderAnimation />
          </Suspense>
        )}
        {reduceMotion && <GradientFallback />}
      </WebGLErrorBoundary>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-6"
        >
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 inline-flex items-center gap-1.5 border-primary/40 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary shadow-sm sm:mb-5 sm:gap-2 sm:text-xs"
              role="status"
              aria-label="Ethical AI strategy platform"
            >
              <Sparkle size={14} weight="fill" className="animate-pulse" aria-hidden="true" />
              <span>Ethical AI Strategy — Built for Good, Designed for Impact</span>
            </Badge>
          </motion.div>

          <motion.h1
            id="hero-heading"
            className="mb-4 leading-tight"
            variants={itemVariants}
          >
            <span className="mb-1 block text-2xl font-black drop-shadow-lg sm:text-3xl md:text-4xl lg:text-5xl">
              <span
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
                style={{ backgroundSize: "200% 200%" }}
              >
                Turn AI Vision
              </span>
            </span>
            <span className="block text-3xl font-black drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
              into Impact
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-6 max-w-xl text-xs font-normal leading-relaxed text-foreground/90 sm:text-sm md:text-base"
            variants={itemVariants}
          >
            We help organizations build trustworthy, local-first AI solutions — code-first labs,
            ROI-driven pilots, and policy that scales what works.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            variants={itemVariants}
          >
            <Button
              asChild
              size="lg"
              className="inline-flex items-center gap-2 rounded-full font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-[0.98]"
              aria-label="Book an Ecosystem Intro Call"
              data-analytics-event="book_call"
            >
              <a
                href="https://scheduler.zoom.us/altruistic-xai/altruisticxai-booking"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Call
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Button>

            <Button
              onClick={handleExplore}
              size="lg"
              variant="outline"
              className="rounded-full font-medium transition-all hover:scale-105 active:scale-[0.98]"
              aria-label="Explore our solutions"
              data-analytics-event="explore_solutions"
            >
              Explore Solutions
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}

export default Hero
