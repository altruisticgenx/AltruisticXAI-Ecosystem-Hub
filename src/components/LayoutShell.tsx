import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Flask, Briefcase, Scroll, ChartLineUp } from "@phosphor-icons/react"
import { motion } from "framer-motion"

interface LayoutShellProps {
  children: ReactNode
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const location = useLocation()

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/labs", label: "Labs", icon: Flask },
    { href: "/consulting", label: "Consulting", icon: Briefcase },
    { href: "/policy", label: "Policy", icon: Scroll },
    { href: "/impact-ledger", label: "Impact", icon: ChartLineUp }
  ]

  return (
    <div className="min-h-screen bg-background">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
        style={{ perspective: "1000px" }}
      >
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
          <div className="flex h-12 sm:h-14 items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <motion.div 
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-sm sm:text-base font-bold text-primary-foreground">AX</span>
              </motion.div>
              <div className="hidden xs:block">
                <h1 className="text-xs sm:text-sm font-bold text-foreground">AltruisticXAI</h1>
              </div>
            </Link>

            <nav className="flex items-center gap-0.5 sm:gap-1">
              {navItems.map((item, index) => {
                const isActive = item.href === "/" 
                  ? location.pathname === "/" 
                  : location.pathname.startsWith(item.href)
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 10,
                      z: 20
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-1 rounded-md px-1.5 py-1.5 sm:px-2.5 sm:py-2 text-xs sm:text-sm font-medium transition-all",
                        "shadow-sm",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-md"
                      )}
                      style={{
                        transform: isActive ? "translateZ(10px)" : "translateZ(0px)",
                        boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.15)" : undefined
                      }}
                    >
                      {Icon && <Icon size={14} weight={isActive ? "fill" : "regular"} className="sm:w-4 sm:h-4" />}
                      <span className="hidden xs:inline text-[10px] sm:text-xs">{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      <main>{children}</main>

      <footer className="border-t border-border bg-muted/30 mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">AltruisticXAI</h3>
              <p className="text-sm text-muted-foreground">
                Building ethical AI systems that serve the public interest through open-source innovation, 
                strategic consulting, and policy advocacy.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Three-Arm Approach</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Open Source Labs (Trust Engine)</li>
                <li>Consulting Studio (Revenue Engine)</li>
                <li>Policy Alliance (Influence Engine)</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Connect</h3>
              <p className="text-sm text-muted-foreground">
                Interested in collaborating? Reach out to discuss partnerships, pilot opportunities, 
                or policy initiatives.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2024 AltruisticXAI. Open Source · Public Interest · Ethical AI.
          </div>
        </div>
      </footer>
    </div>
  )
}
