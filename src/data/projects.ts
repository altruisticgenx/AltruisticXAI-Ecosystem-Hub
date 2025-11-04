export interface Project {
  id: string
  title: string
  description: string
  sector: string
  techStack: string[]
  origin: "labs" | "consulting"
  slug: string
  status?: string
  client?: string
  clientName?: string
  tags?: string[]
  metrics?: Array<{ label: string; value: string }>
  annual_savings_usd?: number
  short_kpi_summary?: string
  payback_months?: number
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Dashboard",
    description: "An open-source energy monitoring and optimization platform designed for university campuses. Provides real-time insights into building energy consumption patterns and actionable recommendations for reducing carbon footprint.",
    sector: "Education & Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "MQTT"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "pilot",
    tags: ["open source", "sustainability", "IoT", "data visualization"],
    metrics: [
      { label: "Campuses", value: "3" },
      { label: "Buildings", value: "20" },
      { label: "Avg. Energy Reduction", value: "15%" }
    ]
  },
  {
    id: "2",
    title: "Federated Learning Toolkit",
    description: "An open-source toolkit for privacy-preserving machine learning across distributed datasets.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Python", "Docker", "FastAPI"],
    origin: "labs",
    slug: "federated-learning-toolkit",
    status: "active",
    tags: ["open source", "privacy", "federated learning", "machine learning"],
    metrics: [
      { label: "Downloads", value: "5K+" },
      { label: "Contributors", value: "12" },
      { label: "Organizations Using", value: "8" }
    ]
  },
  {
    id: "3",
    title: "Healthcare AI Compliance Suite",
    description: "Local-first AI audit toolkit for healthcare organizations to monitor AI model compliance.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React"],
    origin: "labs",
    slug: "healthcare-ai-compliance",
    status: "active",
    tags: ["open source", "healthcare", "AI ethics", "compliance"],
    metrics: [
      { label: "Models Supported", value: "15+" },
      { label: "Compliance Checks", value: "50+" },
      { label: "Organizations", value: "6" }
    ]
  },
  {
    id: "4",
    title: "Local-First AI Audit Toolkit",
    description: "Privacy-focused toolkit for auditing AI models without sending data to external services.",
    sector: "AI Ethics & Privacy",
    techStack: ["Electron", "TensorFlow.js", "Python", "React"],
    origin: "labs",
    slug: "local-first-ai-audit",
    status: "active",
    tags: ["open source", "privacy", "AI ethics", "audit"],
    metrics: [
      { label: "Audit Types", value: "12" },
      { label: "Models Analyzed", value: "200+" },
      { label: "Users", value: "1K+" }
    ]
  },
  {
    id: "5",
    title: "Healthcare AI Compliance Suite - NYU Langone",
    description: "Custom implementation of our Local-First AI Audit Toolkit for NYU Langone Health's diagnostic AI systems. Enabled continuous compliance monitoring across 8 AI models while maintaining HIPAA requirements and reducing audit costs by 65%.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React", "Docker"],
    origin: "consulting",
    slug: "nyu-healthcare-ai",
    status: "active",
    client: "NYU Langone Health",
    clientName: "NYU Langone Health",
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
    short_kpi_summary: "Monitoring 8 AI models with 65% cost reduction and 120 hrs/mo audit time saved",
    annual_savings_usd: 380000,
    payback_months: 11,
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" }
    ]
  },
  {
    id: "6",
    title: "Federal Energy Optimization - GSA",
    description: "Adapted our Campus Energy Dashboard for the General Services Administration to monitor and optimize energy usage across 12 federal buildings in the DC metro area. Achieved 18% energy reduction in first year through behavioral insights and predictive analytics.",
    sector: "Government & Sustainability",
    techStack: ["React", "D3.js", "Python", "PostgreSQL", "AWS"],
    origin: "consulting",
    slug: "gsa-energy-optimization",
    status: "active",
    client: "U.S. General Services Administration",
    clientName: "U.S. General Services Administration",
    tags: ["consulting", "government", "sustainability", "energy"],
    short_kpi_summary: "12 federal buildings with 18% energy reduction and $450K annual savings",
    annual_savings_usd: 450000,
    payback_months: 14,
    metrics: [
      { label: "Buildings", value: "12" },
      { label: "Energy Reduction", value: "18%" },
      { label: "Annual Savings", value: "$450K" },
      { label: "Payback Period", value: "14 months" }
    ]
  },
  {
    id: "7",
    title: "Multi-Hospital Federated ML Platform - Northeast Consortium",
    description: "Deployed production federated learning infrastructure enabling 7 hospitals to collaboratively train diagnostic AI models without sharing patient data. First cross-institutional ML collaboration to meet both HIPAA and state-level privacy requirements.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Kubernetes", "PostgreSQL", "FastAPI", "Azure"],
    origin: "consulting",
    slug: "northeast-federated-ml",
    status: "active",
    client: "Northeast Healthcare Consortium",
    clientName: "Northeast Healthcare Consortium",
    tags: ["consulting", "healthcare", "federated learning", "privacy", "HIPAA"],
    short_kpi_summary: "7 hospitals collaborating on 3 ML models benefiting 50K+ patients with 100% privacy compliance",
    annual_savings_usd: 620000,
    payback_months: 18,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Models Deployed", value: "3" },
      { label: "Patients Benefited", value: "50K+" },
      { label: "Privacy Compliance", value: "100%" }
    ]
  }
]
