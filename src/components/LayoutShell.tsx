import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

  children: ReactNode

  const location = useLocati
  const navItems = [
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const location = useLocation()

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/labs", label: "Labs", icon: Flask },
      <header className="sticky top-0 z-50 w-full border-b border-
          <Link to="/" className="flex items-center gap
              <span className="text-xl font-bold text-primary">A</span>
   


            <motion.div 
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
                const isActive = item.href === "/"
                  : location.pathname.startsWith(item.href)
                re
                    key={item.href}
                    animate
                   
                 

                    <Link
                      cl
                        isActive
                          : "text-mute
                      style={{
                      }}
                      {Icon && <Icon size={14} weight={
             
                )
            </motion.div>
        </div>

        {children}

        <div className="mx-au
            <div>
                Building trust in AI through open-source i
              </p>
            <div>
              <ul className="space-y-2 te
                <li>Consulting Studi
              </ul>
            <div>
              <p className="text-sm text-muted-foreground">
              </p>
          </div>
            © 2024 AltruisticXAI. Bu
        </div>
    </div>
}






















































