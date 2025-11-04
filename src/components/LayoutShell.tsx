import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Flask, Briefcase, Scroll, ChartBar } from "@phosphor-icons/react"

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
    { href: "/impact-ledger", label: "Impact Ledger", icon: ChartBar },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">AltruisticXAI</span>
          </Link>

          <motion.div 
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.href)
              
              return (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {Icon && <Icon size={14} weight={isActive ? "fill" : "regular"} />}
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">About</h3>
              <p className="text-sm text-muted-foreground">
                Building trust in AI through open-source innovation, strategic consulting, 
                and evidence-based policy advocacy.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/labs" className="hover:text-foreground">Open Source Labs</Link></li>
                <li><Link to="/consulting" className="hover:text-foreground">Consulting Studio</Link></li>
                <li><Link to="/policy" className="hover:text-foreground">Policy Alliance</Link></li>
                <li><Link to="/impact-ledger" className="hover:text-foreground">Impact Ledger</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Learn more about how we can work together to advance ethical AI.
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 AltruisticXAI. Building ethical AI for the public good.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
