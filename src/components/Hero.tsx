import React from "react"
import { ArrowRight, Sparkle } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { motion, useReducedMotion, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const itemTransition = {
    duration: prefersReducedMotion ? 0 : 0.4
  }

  const handleExplore = () => {
    window.open("https://github.com", "_blank")
  }

  return (
    <section className="space-y-6 sm:space-y-7 lg:space-y-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        <motion.div variants={itemVariants} transition={itemTransition}>
          <Badge variant="outline" className="mb-4 inline-flex items-center gap-1.5 border-primary/40 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary shadow-sm sm:mb-5 sm:gap-2 sm:text-xs">
            <Sparkle size={14} weight="fill" className="animate-pulse" />
            <span>Local-first AI · Energy · Education · Governance</span>
          </Badge>

          <motion.h1 className="mb-3 text-balance text-4xl font-extrabold leading-[1.1] sm:mb-4 sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.1]">
            Turn{" "}
            <span className="bg-gradient-to-r from-primary via-primary/90 to-secondary bg-clip-text text-transparent">
              open tools
            </span>{" "}
            into{" "}
            <span className="bg-gradient-to-r from-secondary via-secondary/90 to-accent bg-clip-text text-transparent">
              policy-backed pilots
            </span>{" "}
            that actually ship.
          </motion.h1>
          
          <motion.p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            AltruisticXAI is a connected ecosystem: we ship{" "}
            <span className="font-semibold text-foreground">open-source labs</span>, run{" "}
            <span className="font-semibold text-foreground">ROI-positive consulting pilots</span>, and translate what works into{" "}
            <span className="font-semibold text-foreground">durable funding and rules</span>. One flywheel—from GitHub, to campus, to statehouse.
          </motion.p>
        </motion.div>

        <motion.div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" variants={itemVariants} transition={itemTransition}>
          <Button 
            onClick={handleExplore}
            size="lg"
            className="w-full rounded-full bg-primary text-sm font-semibold shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105 active:scale-[0.98] sm:w-auto sm:px-8"
          >
            Explore Solutions
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
