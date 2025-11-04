# AltruisticXAI - Ethical AI Platform

A comprehensive platform showcasing the three-arm approach to ethical AI: Open Source Labs, Consulting Studio, and Policy Alliance. Features real-time AI-powered project discovery and analysis of open-source ethical AI initiatives.

## Features

### Core Platform
- **Multi-page Application**: Home, Labs, Consulting, Policy, and Impact Ledger
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Real-time Data**: Integration with GitHub API for discovering ethical AI projects
- **AI-Powered Analysis**: Automatic relevance scoring and categorization of discovered projects

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

### Policy Alliance
- Policy memos and initiatives
- Evidence-based recommendations
- Status tracking (Concept, In Discussion, Enacted)

### Impact Ledger
- Comprehensive tracking of milestones across all three arms
- Filterable events by type (Pilot, Policy, Publication, Partnership)
- Quantified metrics for each impact event

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS v4
- **Icons**: Phosphor Icons
- **State Management**: React hooks + Spark KV persistence
- **AI Integration**: Spark LLM API (GPT-4o-mini)
- **API Integration**: GitHub REST API

## AI Features

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
│   └── projects.ts
├── hooks/
│   ├── use-discovered-projects.ts
│   └── use-mobile.ts
├── lib/
│   ├── ai-analyzer.ts    # AI-powered project analysis
│   ├── github-api.ts     # GitHub API integration
│   └── utils.ts
├── pages/
│   ├── HomePage.tsx
│   ├── LabsPage.tsx
│   ├── ConsultingPage.tsx
│   ├── PolicyPage.tsx
│   └── ImpactLedgerPage.tsx
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

## Development

The application uses Vite for development and builds. All AI and API functionality works in the browser with no backend required.

### API Rate Limits
- GitHub API: 60 requests/hour (unauthenticated)
- Spark LLM: Based on user's quota

### Future Enhancements
- GitHub authentication for higher rate limits
- More sophisticated AI prompts for better analysis
- Export discovered projects
- Create custom project collections
- Integration with academic databases
- Policy recommendation generator using AI
