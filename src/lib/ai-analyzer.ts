import { GitHubRepo } from './github-api'

export interface ProjectAnalysis {
  relevanceScore: number
  category: 'explainability' | 'privacy' | 'fairness' | 'sustainability' | 'general-ethics'
  potentialUseCase: string
  alignmentReason: string
  recommendedSector: string
}

export async function analyzeProjectRelevance(repo: GitHubRepo): Promise<ProjectAnalysis> {
  const promptText = `You are an AI ethics expert evaluating open-source projects for alignment with ethical AI principles.

Project: ${repo.name}
Description: ${repo.description || 'No description'}
Topics: ${repo.topics.join(', ') || 'None'}
Language: ${repo.language || 'Unknown'}

Analyze this project and return a JSON object with:
1. relevanceScore (0-100): How relevant is this to ethical AI, explainability, privacy, or public interest?
2. category: One of 'explainability', 'privacy', 'fairness', 'sustainability', or 'general-ethics'
3. potentialUseCase: A brief use case for universities, hospitals, or government (1 sentence)
4. alignmentReason: Why this aligns with ethical AI principles (1 sentence)
5. recommendedSector: One of 'Healthcare', 'Education', 'Government', 'Energy', 'General'

Return ONLY valid JSON with these exact keys.`

  try {
    const response = await window.spark.llm(promptText, 'gpt-4o-mini', true)
    const analysis = JSON.parse(response)
    
    return {
      relevanceScore: analysis.relevanceScore || 50,
      category: analysis.category || 'general-ethics',
      potentialUseCase: analysis.potentialUseCase || 'General ethical AI application',
      alignmentReason: analysis.alignmentReason || 'Promotes transparency and accountability',
      recommendedSector: analysis.recommendedSector || 'General'
    }
  } catch (error) {
    console.error('AI analysis failed:', error)
    return {
      relevanceScore: 50,
      category: 'general-ethics',
      potentialUseCase: 'Potential application in ethical AI systems',
      alignmentReason: 'Open-source project in AI ethics space',
      recommendedSector: 'General'
    }
  }
}
