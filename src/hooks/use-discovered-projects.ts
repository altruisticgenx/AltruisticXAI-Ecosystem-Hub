import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { searchEthicalAIProjects, GitHubRepo } from '@/lib/github-api'
import { analyzeProjectRelevance, ProjectAnalysis } from '@/lib/ai-analyzer'

export interface DiscoveredProject {
  repo: GitHubRepo
  analysis: ProjectAnalysis
  discoveredAt: string
}

export function useDiscoveredProjects() {
  const [projects, setProjects] = useKV<DiscoveredProject[]>('discovered-projects', [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const discoverNewProjects = async (topic?: string, count: number = 5) => {
    setIsLoading(true)
    setError(null)

    try {
      const searchResult = await searchEthicalAIProjects(topic, count)
      const newProjects: DiscoveredProject[] = []

      for (const repo of searchResult.items) {
        const existingProject = (projects || []).find(p => p.repo.id === repo.id)
        if (existingProject) continue

        const analysis = await analyzeProjectRelevance(repo)
        
        if (analysis.relevanceScore >= 60) {
          newProjects.push({
            repo,
            analysis,
            discoveredAt: new Date().toISOString()
          })
        }
      }

      if (newProjects.length > 0) {
        setProjects(current => [...newProjects, ...(current || [])].slice(0, 50))
      }

      setIsLoading(false)
      return newProjects
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to discover projects')
      setIsLoading(false)
      return []
    }
  }

  const removeProject = (repoId: number) => {
    setProjects(current => (current || []).filter(p => p.repo.id !== repoId))
  }

  const clearAll = () => {
    setProjects([])
  }

  return {
    projects,
    isLoading,
    error,
    discoverNewProjects,
    removeProject,
    clearAll
  }
}
