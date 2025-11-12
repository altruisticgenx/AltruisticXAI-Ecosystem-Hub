# AltruisticXAI - Ethical AI Platform

A comprehensive platform showcasing the three-arm approach to ethical AI: Open Source Labs, Consulting Studio, and Policy Alliance. Features real-time AI-powered project discovery and analysis of open-source ethical AI initiatives.

## Features

### 🎯 2025+ Data Guarantee

**All federal data integrated into this platform is from 2025 onwards.** We use a three-layer validation system to ensure data freshness and accuracy:

1. **API-Level Filtering**: All ingest scripts filter at the source (`time_period: start_date = "2025-01-01"`, `postedDateFrom = "2025-01-01"`)
2. **Client-Side Validation**: Double-check every record's date field and skip pre-2025 data
3. **Automated Verification**: Daily GitHub Action runs validation script and generates reports

**UI Transparency**: The site clearly shows:
- 📅 Last crawl timestamp
- 📊 Data coverage range (e.g., "2025-01-01 → 2025-06-30")
- ✅ Validation badge ("2025+ Validated")

See [DATA_FRESHNESS_2025.md](./DATA_FRESHNESS_2025.md) and [DATA_VALIDATION_2025.md](./DATA_VALIDATION_2025.md) for complete details.

### Core Platform
- **Multi-page Application**: Home, Labs, Consulting, Policy, Impact Ledger, and **Ripples**
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Real-time Data**: Integration with GitHub API and Grants.gov API
- **AI-Powered Analysis**: Automatic relevance scoring and categorization of discovered projects and grants
- **Live Federal Grant Discovery**: Connected to official Grants.gov API v2 for real-time federal funding opportunities
- **2025+ Data Only**: All federal sources filtered to 2025 or newer with transparent validation

### Open Source Labs
- Showcase of internal open-source projects
- **AI Discovery Tool**: Real-time discovery of aligned open-source projects from GitHub
- AI-powered analysis of project relevance to ethical AI principles
- Categorization by topic: explainability, privacy, fairness, sustainability
- Relevance scoring and sector recommendations

### Consulting Studio
- Service tier breakdown (Discovery, Pilot, Scale)
- Client case studies with measurable impact metrics
- Integration with Labs projects
- **Grant Opportunity Alignment**: Match consulting capabilities with federal funding

### Policy Alliance
- Policy memos and initiatives
- Evidence-based recommendations
- Status tracking (Concept, In Discussion, Enacted)
- **Federal Grant Intelligence**: Track policy-relevant funding opportunities

### Impact Ledger
- Comprehensive tracking of milestones across all three arms
- Filterable events by type (Pilot, Policy, Publication, Partnership, Grant Award)
- Quantified metrics for each impact event

### Data Integration Hub
- **Real Grants.gov API**: Live federal grant opportunity search via `api.grants.gov/v2`
- **AI Analysis**: Automated alignment scoring for discovered grants
- **Multi-Source Crawler**: Unified ingestion from Grants.gov, GitHub, Data.gov, and more
- **Persistent Storage**: Save and track promising opportunities across sessions

### Ripples: Truth Supply Chain

**What it is:** A community that turns claim-checking into training data for truth-seeking AI.

**The Inversion:** Build the Truth, not the App. Instead of shipping an app and hoping for meaning later, we create a *truth supply chain* first: workflows, evidence standards, and community norms. The UI comes after the epistemology.

#### Core Features

**1. Truth**  
A stance, not a slogan. Claims are tied to evidence, provenance, and falsifiability. In practice: every statement links to a source, uncertainty is labeled, and updates are logged.

**2. People (The Foundry)**  
Recruitment as metallurgy. We test for structural properties (reasoning under pressure, value alignment) with a **Binary Filter**: pass/fail prompts, not glossy portfolios. You're selecting for value-alignment over credentials—aligned minds > resumes. Result: fewer people, tighter mesh.

**3. Practice (The Intentool)**  
The core product loop. Users translate "lie → truth" in small, auditable steps using three honesty lenses (Realist, Empath, Skeptic). Those labeled transformations become training data. Daily reps build the muscle: check a claim, trace a source, write a small correction, log an uncertainty. Process > vibes.

**Human practice → dataset → better AI → faster practice.** A flywheel.

#### How it works

1. **Begin the Search** → Enter a claim or use "Find Real-Time Example" (powered by Gemini with Google Search Grounding)
2. **Select a Lens** → Choose your honesty profile: Realist, Empath, or Skeptic
3. **Translate** → Rewrite deceptive text into honest, clear communication
4. **Get Feedback** → Chat with the AI "Honesty Coach" for iterative improvement
5. **Verify Signal** → Submit your translation to the dataset
6. **Earn Score** → Leaderboard tracks: Evidence × Reproducibility ÷ Corrections against you

#### Why it matters

Small, honest actions compound. Publish tiny artifacts (notes, decisions, sources) that create downstream effects—**signal beats hype**. Mechanism: public commits/notes → visible deltas → trust accrues.

**We make the honest path faster than the performative one.**

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons
- **State Management**: React hooks + Spark KV persistence
- **AI Integration**: Spark LLM API (GPT-4o-mini)
- **API Integrations**: 
  - GitHub REST API (open-source project discovery)
  - **Grants.gov API v2** (federal grant opportunities)
  - Data.gov CKAN API (federal datasets)
  - NSF Awards API (research funding)
  - USAspending.gov API (federal contracts & awards)

## AI Features

### Grant Discovery & Analysis
The platform integrates with the official **Grants.gov API v2** to:

1. **Search Federal Grants** in real-time across categories:
   - Energy & AI
   - Education Technology
   - Local Government
   - University Research
2. **Analyze each grant** using AI (GPT-4o) to determine:
   - Alignment score (0-100) with AltruisticXAI mission
   - Recommended pillar (Labs/Consulting/Policy)
   - Key strengths and challenges
   - Actionable insights and next steps
3. **Filter by priority agencies**: DOE, NSF, ED, ARPA-E, EDA, EERE, NETL
4. **Track opportunities** with starring, notes, and persistent storage

**API Endpoint**: `POST https://api.grants.gov/v2/opportunities/search`

See [GRANTS_GOV_INTEGRATION.md](./GRANTS_GOV_INTEGRATION.md) for full documentation.

### Project Discovery
The platform includes an intelligent project discovery system that:

1. **Searches GitHub** for repositories tagged with ethical AI topics
2. **Analyzes each project** using AI to determine:
   - Relevance score (0-100)
   - Category (explainability, privacy, fairness, sustainability, general-ethics)
   - Potential use case for institutions
   - Alignment with ethical AI principles
   - Recommended sector (Healthcare, Education, Government, Energy, General)
3. **Filters** projects with relevance scores ≥60%
4. **Persists** discoveries for future reference

### Topics Supported
- Explainable AI
- AI Ethics
- Fairness in ML
- Privacy-Preserving ML
- Federated Learning
- Differential Privacy
- Bias Detection
- AI Transparency
- Responsible AI
- Interpretable ML

## Ripples: Deep Dive

### The Philosophy

Ripples inverts the traditional startup model. Instead of:
1. Build app → Launch → Hope for users → Pray for meaning

We do:
1. **Define epistemology** → Build truth workflows → Recruit aligned people → UI emerges naturally

### The Three Pillars

#### 1. Truth (The Foundation)
Not a marketing slogan—a structural commitment:
- **Every claim** → links to source
- **Every uncertainty** → explicitly labeled
- **Every update** → logged with provenance
- **Every correction** → tracked and attributed

This creates *verifiable deltas*: small, public changes that compound trust.

#### 2. People (The Foundry)
Traditional hiring asks "Where did you work?"  
The Foundry asks "How do you reason under uncertainty?"

**Binary Filter Examples:**
- "I believe a healthy system prioritizes **evidence** over **consensus**."
- "I work best when the goal is **clarity** rather than **growth**."

Pass/fail. No negotiation. No resume polish. Just structural alignment.

#### 3. Practice (The Intentool)
The core training loop converts self-work into labeled data:

**Input (Noise)**:  
Corporate jargon, political spin, influencer hype, dark patterns

**Transformation**:  
Apply an honesty lens (Realist/Empath/Skeptic)

**Output (Signal)**:  
Clear, honest, falsifiable statement

**Feedback Loop**:  
Chat with AI Honesty Coach → Iterate → Verify → Add to dataset

**Example Transformation:**

| Source Type | Input (Noise) | Lens | Output (Signal) |
|------------|---------------|------|-----------------|
| Corporate Jargon | "We are right-sizing our resource allocation" | Realist | "We are laying off 200 employees" |
| Political Spin | "We saw a 20% productivity increase" | Skeptic | "Tech sector productivity rose 20%, national average was flat" |
| Influencer Hype | "This literally cures everything!" | Empath | "This helped me manage symptoms. Your results may vary." |

### The Flywheel

```
Human translates lie → truth
    ↓
Translation becomes labeled data point
    ↓
Dataset trains AI to detect deception
    ↓
AI helps humans translate faster
    ↓
More translations = better AI
```

### Real-Time Grounding

The "Find Real-Time Example" feature uses **Gemini 2.0 Flash + Google Search Grounding** to:
1. Search the live web for recent deceptive text
2. Extract source, author, and context
3. Present it as a new challenge

This ensures the training data stays current and diverse.

### Technical Architecture

**Frontend**: React + TypeScript  
**State**: React hooks + Spark KV (persistent storage)  
**AI**: Gemini API with system instructions (Honesty Coach persona)  
**Data Flow**: 
- User input → Gemini analysis → Chat UI → User iteration → Dataset entry

**Key Files**:
- `src/pages/RipplesPage.tsx` - Main UI and chat logic
- `DECEPTIVE_SOURCES` - 15 curated examples across 15 deception categories
- `HONESTY_PROFILES` - 3 lenses for translation

### What Makes It Work

**1. Tiny Artifacts**  
Each translation is small (1-3 sentences). Low friction = high volume.

**2. Public Accountability**  
All contributions are attributed. Your score = Evidence × Reproducibility ÷ Corrections.

**3. Gamification Without Toxicity**  
Leaderboard rewards rigor, not hot takes. Negative points for sloppy claims that others have to correct.

**4. Immediate Feedback**  
AI Honesty Coach responds conversationally. No waiting, no judgment—just iterative improvement.

**5. Aligned Incentives**  
The honest path is faster and more rewarding than the performative path.

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── DiscoveredProjectCard.tsx
│   ├── ImpactTable.tsx
│   ├── LayoutShell.tsx
│   ├── MetricPill.tsx
│   └── SectionCard.tsx
├── data/
│   ├── impactEvents.ts
│   ├── policyMemos.ts
│   ├── projects.ts
│   └── schema.ts        # TypeScript interfaces for all data
├── data-ingest/
│   ├── apis/
│   │   ├── grantsGov.ts    # Real Grants.gov API integration
│   │   ├── usaspending.ts  # USAspending.gov API
│   │   ├── nsfAwards.ts    # NSF Awards API
│   │   └── dataGov.ts      # Data.gov CKAN API
│   ├── transform/
│   └── store/
├── hooks/
│   ├── use-grant-discovery.ts    # Grant discovery hook with AI
│   ├── use-discovered-projects.ts
│   └── use-mobile.ts
├── lib/
│   ├── ai-analyzer.ts        # AI-powered project analysis
│   ├── grant-analyzer.ts     # AI-powered grant analysis
│   ├── grants-api.ts         # Grants.gov API client
│   ├── github-api.ts         # GitHub API integration
│   └── utils.ts
├── pages/
│   ├── HomePage.tsx
│   ├── LabsPage.tsx
│   ├── ConsultingPage.tsx
│   ├── PolicyPage.tsx
│   ├── ImpactLedgerPage.tsx
│   ├── RipplesPage.tsx           # Truth supply chain & Intentool
│   └── DataIntegrationPage.tsx  # Grant & project discovery
├── App.tsx
└── index.css
```

## Key Improvements Made

### Architecture
1. **Modular API Layer**: Separated GitHub API calls into dedicated module
2. **AI Analysis System**: Created reusable AI analyzer for project evaluation
3. **Custom Hooks**: Built `useDiscoveredProjects` for state management
4. **Type Safety**: Full TypeScript coverage with proper interfaces

### Features
1. **Real-time Discovery**: GitHub API integration with AI-powered analysis
2. **Smart Filtering**: Only shows projects with 60%+ relevance scores
3. **Persistent Storage**: Discoveries saved using Spark KV store
4. **Error Handling**: Comprehensive error states and loading indicators
5. **Progressive Enhancement**: Graceful degradation when APIs fail

### UX/UI
1. **Tabbed Interface**: Clean separation of curated vs. discovered projects
2. **Visual Feedback**: Progress bars for relevance scores, loading states
3. **Color-coded Categories**: Easy visual identification of project types
4. **Responsive Cards**: Mobile-optimized project displays
5. **Empty States**: Helpful guidance when no projects are discovered

## Usage

### Discovering Projects
1. Navigate to the Labs page
2. Click the "AI Discovery" tab
3. Select a topic from the dropdown
4. Click "Discover Projects"
5. AI will analyze GitHub repositories and show relevant matches

### Managing Discoveries
- Remove individual projects with the X button
- Clear all discoveries with "Clear All"
- Discoveries persist between sessions

### Using Ripples (Truth Supply Chain)
1. Navigate to `/ripples`
2. **Truth Tab**: Read the manifesto on building the truth supply chain first
3. **People Tab (The Foundry)**: Complete the Binary Filter to find value-aligned collaborators
   - Fill in the mad-lib style prompts about your structural values
   - Broadcast your signal to find resonance with others
4. **Practice Tab (The Intentool)**: Train your honesty muscle
   - Click "⚡ Find Real-Time Example" to get live deceptive text from the web (powered by Gemini + Google Search)
   - Or work with curated examples of corporate jargon, political spin, and marketing hype
   - Select an honesty lens: Realist, Empath, or Skeptic
   - Translate the deceptive text into honest, clear communication
   - Click "✨ Get Feedback" to start a conversation with the AI Honesty Coach
   - Iterate on your translation through chat
   - Click "Verify Signal" to submit your translation to the dataset

**Result**: Each verified translation becomes a training data point. You're teaching AI what honesty looks like through deliberate practice.

## Development

The application uses Vite for development and builds. All AI and API functionality works in the browser with no backend required.

### API Rate Limits
- GitHub API: 60 requests/hour (unauthenticated)
- Grants.gov API: Standard federal API rate limits apply
- Gemini API (for Ripples): Configured via environment, used for AI feedback and real-time grounding
- Spark LLM: Based on user's quota

### Future Enhancements
- GitHub authentication for higher rate limits
- More sophisticated AI prompts for better analysis
- Export discovered projects
- Create custom project collections
- Integration with academic databases
- Policy recommendation generator using AI
- **Ripples Leaderboard**: Track evidence quality, reproducibility, and corrections
- **Ripples Community**: Public attribution system with contributor scoring
