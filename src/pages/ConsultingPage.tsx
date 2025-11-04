import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import MetricPill from "@/components/MetricPill"
import { projects } from "@/data/projects"
import { Briefcase, ArrowRight, CheckCircle, TrendUp, Sparkle, Rocket, Building, EnvelopeSimple, CalendarCheck, ChartBar, Funnel } from "@phosphor-icons/react"
import { useState } from "react"

const serviceTiers = [
  {
    id: "discovery",
    name: "Discovery Audit",
    duration: "4-6 weeks",
    icon: Sparkle,
    description: "Comprehensive assessment of your current AI systems, data infrastructure, and compliance posture.",
    outcomes: [
      "Detailed audit report with compliance gaps",
      "Prioritized roadmap for AI transparency",
      "Cost-benefit analysis for recommended solutions",
      "Technical specifications for next steps"
    ],
    caseStudies: [
      { sector: "Healthcare", example: "NYU Langone Health - 8 AI models monitored, 65% audit cost reduction" },
      { sector: "Education", example: "State University System - Campus-wide AI readiness assessment" },
      { sector: "Energy", example: "Regional Utility - Grid AI transparency framework development" }
    ]
  },
  {
    id: "pilot",
    name: "Pilot Deployment",
    duration: "3-6 months",
    icon: Rocket,
    description: "Deploy proven open-source tools from our Labs portfolio in a controlled environment with measurable impact.",
    outcomes: [
      "Production-ready implementation (1-3 systems)",
      "Custom integration with existing infrastructure",
      "Staff training and documentation",
      "Quantified impact metrics and case study"
    ],
    caseStudies: [
      { sector: "Healthcare", example: "7 hospitals, 50K+ patients, 100% privacy compliance" },
      { sector: "Education", example: "24 campus buildings, 12% energy reduction" },
      { sector: "Law", example: "Municipal court system - AI bias detection across 3 jurisdictions" },
      { sector: "Research", example: "National lab consortium - Federated learning toolkit deployment" }
    ]
  },
  {
    id: "scale",
    name: "Scale Program",
    duration: "12+ months",
    icon: Building,
    description: "Enterprise-wide rollout with ongoing support, continuous compliance monitoring, and custom feature development.",
    outcomes: [
      "Organization-wide deployment",
      "Dedicated engineering support",
      "Custom feature development",
      "Policy advocacy and regulatory support",
      "Contribution to open-source ecosystem"
    ],
    caseStudies: [
      { sector: "Healthcare", example: "Regional health system - 620K annual savings, 18-month payback" },
      { sector: "Education", example: "Multi-campus rollout - Energy optimization at scale" },
      { sector: "Law", example: "State judiciary - AI governance framework for 50+ courtrooms" },
      { sector: "Research", example: "Federal research network - Privacy-preserving data sharing platform" }
    ]
  }
]

export default function ConsultingPage() {
  const consultingProjects = projects.filter(p => p.origin === "consulting")
  const [selectedSector, setSelectedSector] = useState<string>("all")

  const recentWins = consultingProjects
    .filter(p => p.short_kpi_summary && p.annual_savings_usd && p.payback_months)
    .slice(-3)

  const allSectors = ["all", "Healthcare", "Education", "Energy", "Law", "Research"]
  
  const filteredProjects = selectedSector === "all" 
    ? consultingProjects 
    : consultingProjects.filter(p => p.sector.toLowerCase().includes(selectedSector.toLowerCase()))

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/15 to-secondary/5 shadow-lg ring-1 ring-secondary/20 sm:h-14 sm:w-14">
              <Briefcase size={24} weight="duotone" className="text-secondary sm:size-28" />
            </div>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Consulting Studio
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            We adapt our proven open-source tools for institutions that need ethical AI solutions. 
            <span className="font-medium text-foreground"> Our clients benefit from battle-tested technology while funding new Labs research and generating evidence for policy advocacy.</span>
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
            Service Tiers
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-xs text-muted-foreground sm:text-sm">
            Flexible engagement models designed to meet you where you are - from initial assessment to full-scale deployment.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceTiers.map((tier) => {
              const Icon = tier.icon
              return (
                <Card key={tier.id} className="flex flex-col border transition-all hover:border-secondary hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                      <Icon size={20} weight="duotone" className="text-secondary" />
                    </div>
                    <CardTitle className="text-base">{tier.name}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs">{tier.duration}</Badge>
                    <CardDescription className="pt-2 text-xs">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-3 pt-0">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="outcomes" className="border-none">
                        <AccordionTrigger className="py-2 text-xs font-semibold text-foreground hover:no-underline">
                          Key Outcomes
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1.5">
                            {tier.outcomes.map((outcome, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-secondary" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="case-studies" className="border-none">
                        <AccordionTrigger className="py-2 text-xs font-semibold text-foreground hover:no-underline">
                          Case Studies by Sector
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {tier.caseStudies.map((study, idx) => (
                              <li key={idx} className="text-xs">
                                <Badge variant="secondary" className="mb-1 text-[10px]">{study.sector}</Badge>
                                <p className="text-muted-foreground">{study.example}</p>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {recentWins.length > 0 && (
          <div className="mb-16">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-xl font-semibold text-foreground sm:text-2xl">
                Recent Wins
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Quantifiable impact from our latest consulting engagements
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentWins.map((project) => (
                <Card key={project.id} className="border transition-all hover:border-secondary hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <ChartBar size={20} weight="duotone" className="text-accent" />
                    </div>
                    <CardTitle className="text-base">{project.clientName}</CardTitle>
                    <Badge variant="outline" className="w-fit text-xs font-normal">
                      {project.sector}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {project.short_kpi_summary}
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                        <span className="text-xs font-medium text-muted-foreground">Annual Savings</span>
                        <span className="text-sm font-bold text-foreground">
                          ${(project.annual_savings_usd! / 1000).toFixed(0)}K
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-2">
                        <span className="text-xs font-medium text-muted-foreground">Payback Period</span>
                        <span className="text-sm font-bold text-foreground">
                          {project.payback_months} months
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
            Our Approach
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border transition-all hover:border-secondary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <CheckCircle className="text-secondary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-sm">Proven Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Every engagement builds on open-source tools validated through Labs research. 
                  You get production-ready solutions, not experimental prototypes.
                </p>
              </CardContent>
            </Card>

            <Card className="border transition-all hover:border-secondary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <TrendUp className="text-secondary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-sm">Measurable Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  We focus on quantifiable outcomes: cost savings, efficiency gains, compliance improvements. 
                  Our success metrics become evidence for policy recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border transition-all hover:border-secondary">
              <CardHeader className="pb-3">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <ArrowRight className="text-secondary" size={20} weight="duotone" />
                </div>
                <CardTitle className="text-sm">Aligned Incentives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Revenue from consulting funds new Labs projects and policy research. 
                  Your investment advances the broader ecosystem of ethical AI.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="mb-1 text-xl font-semibold text-foreground sm:text-2xl">
                Client Case Studies
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Real-world deployments with measurable impact across sectors.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Funnel size={16} className="text-muted-foreground" />
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[180px] text-xs">
                  <SelectValue placeholder="Filter by sector" />
                </SelectTrigger>
                <SelectContent>
                  {allSectors.map((sector) => (
                    <SelectItem key={sector} value={sector} className="text-xs">
                      {sector === "all" ? "All Sectors" : sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="flex flex-col border transition-all hover:border-secondary hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-base">{project.title}</CardTitle>
                      {project.clientName && (
                        <p className="mt-1 text-xs font-medium text-secondary">{project.clientName}</p>
                      )}
                    </div>
                    <Badge 
                      variant={project.status === "active" ? "default" : "secondary"}
                      className="shrink-0 text-xs"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold text-foreground">Sector</h4>
                    <Badge variant="outline" className="text-xs font-normal">
                      {project.sector}
                    </Badge>
                  </div>
                  {project.metrics && project.metrics.length > 0 && (
                    <div>
                      <h4 className="mb-1.5 text-xs font-semibold text-foreground">Impact Metrics</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {project.metrics.map((metric, idx) => (
                          <MetricPill
                            key={idx}
                            label={metric.label}
                            value={metric.value}
                            variant="secondary"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold text-foreground">Technology</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs font-normal">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent p-6 sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <Briefcase size={36} weight="duotone" className="mx-auto mb-4 text-secondary sm:size-40" />
            <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
              Ready to Deploy Ethical AI?
            </h3>
            <p className="mb-6 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              We work with universities, healthcare systems, and government agencies to implement 
              privacy-preserving AI, energy transparency tools, and compliance frameworks. 
              <span className="font-medium text-foreground"> Let's discuss how our proven solutions can address your specific challenges.</span>
            </p>
            
            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="sm" asChild className="w-full text-xs sm:w-auto sm:text-sm">
                <a 
                  href="https://scheduler.zoom.us/altruistic-xai/altruisticxai-booking" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <CalendarCheck size={16} weight="duotone" />
                  Schedule Discovery Call
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild className="w-full text-xs sm:w-auto sm:text-sm">
                <a 
                  href="mailto:consulting@altruisticxai.org"
                  className="gap-2"
                >
                  <EnvelopeSimple size={16} weight="duotone" />
                  Email Our Team
                </a>
              </Button>
            </div>

            <div className="rounded-lg bg-background/60 p-3 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Direct Contact:</span>{" "}
                <a 
                  href="mailto:consulting@altruisticxai.org" 
                  className="text-secondary underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  consulting@altruisticxai.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutShell>
  )
}
