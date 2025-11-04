export interface Project {
  title: str
  sector: strin
  origin: "labs" | "c
  status?: strin
  clientName?: string
  metrics?: Array<{ label: stri
  short_kpi_su
}
export const proj
    id: "1",
    description: 
    techStack: ["React", "D3.js", "Python", "Postgr
    slug: "campus-energy-dash
 

      { label: "Avg. Energy Reductio
  }
    id: "2",
    description: "An open-source tool
    techStack: ["PyTorch", "Python", "Docker", "FastAPI"],
    slug: "federated-learning-toolkit",
    tags: ["open source", "privacy", "federated learning", "machin
      { label: "Dow
      { label: "Organizations Using"
  },
    id: "3",
    descriptio
    techStack: ["Electron", "TensorFlow.
    slug: "healthcare-ai-compliance",
    tags: ["open source", "healthcare", "AI ethics", "
     
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
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" }
    ]
  },
  {
    status: 
    clientName: "Northeast Healthcare Consortiu
    short_kpi_summary: "7 hospitals collaborating on 3 ML models benefiting 50K+ patients with 100% privacy compliance",
    payback_months: 18,
      { label: "Hospitals", value: "7" },
      { label: "Patients 
    ]
]





















    annual_savings_usd: 620000,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Models Deployed", value: "3" },
      { label: "Patients Benefited", value: "50K+" },
      { label: "Privacy Compliance", value: "100%" }
    ]
  }
]
