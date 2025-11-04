// data/projects.ts

export type ProjectOrigin = "labs" | "consulting";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  sector: string;
  techStack: string[];
  origin: ProjectOrigin;
  slug: string;
  status?: "active" | "planned" | "completed" | string;
  tags?: string[];
  clientName?: string;
  short_kpi_summary?: string;
  annual_savings_usd?: number;
  payback_months?: number;
  metrics?: ProjectMetric[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Campus Energy Intelligence Dashboard",
    description:
      "Interactive campus-wide energy dashboard built for a university, combining meter data, weather, and occupancy to surface real-time optimization opportunities.",
    sector: "Higher Education & Energy",
    techStack: ["React", "D3.js", "Python", "PostgreSQL"],
    origin: "labs",
    slug: "campus-energy-dashboard",
    status: "active",
    tags: ["open source", "energy", "visualization", "campus"],
    metrics: [
      { label: "Avg. Energy Reduction", value: "12%" },
      { label: "Buildings Covered", value: "24" },
      { label: "Data Latency", value: "< 5 min" },
    ],
  },
  {
    id: "2",
    title: "Federated Learning Toolkit",
    description:
      "Open-source toolkit for privacy-preserving machine learning across distributed datasets, enabling training without centralizing sensitive data.",
    sector: "Healthcare & Privacy",
    techStack: ["PyTorch", "Python", "Docker", "FastAPI"],
    origin: "labs",
    slug: "federated-learning-toolkit",
    status: "active",
    tags: ["open source", "privacy", "federated learning", "machine learning"],
    metrics: [
      { label: "Downloads", value: "5K+" },
      { label: "Contributors", value: "12" },
      { label: "Organizations Using", value: "8" },
    ],
  },
  {
    id: "3",
    title: "Healthcare AI Compliance Suite",
    description:
      "Local-first AI audit toolkit for healthcare organizations to monitor AI model behavior and compliance against internal and regulatory standards.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React"],
    origin: "labs",
    slug: "healthcare-ai-compliance",
    status: "active",
    tags: ["open source", "healthcare", "AI ethics", "compliance"],
    metrics: [
      { label: "Models Supported", value: "15+" },
      { label: "Compliance Checks", value: "50+" },
      { label: "Organizations", value: "6" },
    ],
  },
  {
    id: "4",
    title: "Local-First AI Audit Toolkit",
    description:
      "Privacy-focused toolkit for auditing AI models without sending any underlying data to external services, designed for regulated sectors.",
    sector: "AI Ethics & Privacy",
    techStack: ["Electron", "TensorFlow.js", "Python", "React"],
    origin: "labs",
    slug: "local-first-ai-audit",
    status: "active",
    tags: ["open source", "privacy", "AI ethics", "audit"],
    metrics: [
      { label: "Audit Types", value: "12" },
      { label: "Models Analyzed", value: "200+" },
      { label: "Users", value: "1K+" },
    ],
  },
  {
    id: "5",
    title: "Healthcare AI Compliance Suite – NYU Langone",
    description:
      "Custom implementation of the Local-First AI Audit Toolkit for NYU Langone Health's diagnostic AI systems, enabling continuous monitoring across models under HIPAA.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "TensorFlow.js", "PostgreSQL", "React", "Docker"],
    origin: "consulting",
    slug: "nyu-healthcare-ai",
    status: "active",
    clientName: "NYU Langone Health",
    tags: ["consulting", "healthcare", "AI ethics", "compliance", "HIPAA"],
    short_kpi_summary:
      "Monitored 8 diagnostic AI models with 65% audit cost reduction and 120 hours/month saved.",
    annual_savings_usd: 320000,
    payback_months: 9,
    metrics: [
      { label: "AI Models Monitored", value: "8" },
      { label: "Cost Reduction", value: "65%" },
      { label: "Audit Time Saved", value: "120 hrs/mo" },
    ],
  },
  {
    id: "6",
    title: "Regional Healthcare AI Audit Consortium",
    description:
      "Multi-hospital rollout of the Local-First AI Audit Toolkit for a Northeast healthcare consortium, aligning shared governance across several ML models.",
    sector: "Healthcare & AI Ethics",
    techStack: ["Electron", "Python", "PostgreSQL", "React"],
    origin: "consulting",
    slug: "northeast-healthcare-consortium",
    status: "active",
    clientName: "Northeast Healthcare Consortium",
    tags: ["consulting", "consortium", "healthcare", "AI governance"],
    short_kpi_summary:
      "7 hospitals collaborating on 3 ML models benefiting 50K+ patients with 100% privacy compliance.",
    annual_savings_usd: 620000,
    payback_months: 18,
    metrics: [
      { label: "Hospitals", value: "7" },
      { label: "Models Deployed", value: "3" },
      { label: "Patients Benefited", value: "50K+" },
      { label: "Privacy Compliance", value: "100%" },
    ],
  },
];