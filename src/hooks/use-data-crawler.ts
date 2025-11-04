import { useState, useCallback } from "react"
import { useKV } from "@github/spark/hooks"
import type { Project, GrantOpportunity, OpenDataset } from "@/data/schema"

interface CrawlerData {
  projects: Project[]
  grants: GrantOpportunity[]
  datasets: OpenDataset[]
  sources?: string[]
  isLoading: boolean
  error?: string
  lastIngestTimestamp?: string
}

async function runFullIngest() {
  return {
    projects: [] as Project[],
    grants: [] as GrantOpportunity[],
    datasets: [] as OpenDataset[],
    sources: [] as string[],
    timestamp: new Date().toISOString()
  }
}

export function useDataCrawler() {
  const [crawlerData, setCrawlerData] = useKV<CrawlerData>("data-crawler-state", {
    projects: [],
    grants: [],
    datasets: [],
    isLoading: false,
  })
  const [isIngesting, setIsIngesting] = useState(false)

  const runIngest = useCallback(async () => {
    setIsIngesting(true)
    setCrawlerData((current = {
      projects: [],
      grants: [],
      datasets: [],
      isLoading: false,
    }) => ({
      ...current,
      isLoading: true,
      error: undefined,
    }))

    try {
      const result = await runFullIngest()
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        projects: result.projects,
        grants: result.grants,
        datasets: result.datasets,
        sources: result.sources,
        isLoading: false,
        lastIngestTimestamp: result.timestamp,
      }))
      setIsIngesting(false)
    } catch (error) {
      setCrawlerData((current = {
        projects: [],
        grants: [],
        datasets: [],
        isLoading: false,
      }) => ({
        ...current,
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }))
      setIsIngesting(false)
    }
  }, [setCrawlerData])

  const getHighPriorityProjects = useCallback(() => {
    if (!crawlerData?.projects) return []
    return crawlerData.projects
      .filter(p => p.priorityScore && p.priorityScore > 70)
      .slice(0, 10)
  }, [crawlerData])

  const getTopDatasets = useCallback(() => {
    if (!crawlerData?.datasets) return []
    return crawlerData.datasets
      .filter(d => d.relevanceScore && d.relevanceScore > 60)
      .slice(0, 10)
  }, [crawlerData])

  const getMatchingGrants = useCallback(() => {
    if (!crawlerData?.grants) return []
    return crawlerData.grants
      .filter(g => g.alignmentScore && g.alignmentScore > 60)
      .sort((a, b) => (b.alignmentScore || 0) - (a.alignmentScore || 0))
  }, [crawlerData])

  return {
    crawlerData,
    isIngesting,
    runIngest,
    getHighPriorityProjects,
    getTopDatasets,
    getMatchingGrants,
  }
}











































