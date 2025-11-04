import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiscoveredProject } from "@/hooks/use-discovered-projects"
import { GitBranch, Star, X, Lightbulb, RocketLaunch, Code } from "@phosphor-icons/react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

interface DiscoveredProjectCardProps {
  project: DiscoveredProject
  onRemove?: (repoId: number) => void
}

const categoryColors = {
  'explainability': 'bg-blue-100 text-blue-800 border-blue-300',
  'privacy': 'bg-purple-100 text-purple-800 border-purple-300',
  'fairness': 'bg-green-100 text-green-800 border-green-300',
  'sustainability': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'general-ethics': 'bg-gray-100 text-gray-800 border-gray-300'
}

const impactColors = {
  'high': 'bg-green-50 text-green-700 border-green-200',
  'medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'low': 'bg-gray-50 text-gray-700 border-gray-200'
}

const complexityColors = {
  'advanced': 'bg-red-50 text-red-700 border-red-200',
  'intermediate': 'bg-orange-50 text-orange-700 border-orange-200',
  'beginner': 'bg-green-50 text-green-700 border-green-200'
}

export default function DiscoveredProjectCard({ project, onRemove }: DiscoveredProjectCardProps) {
  const { repo, analysis } = project
  const relevanceColor = analysis.relevanceScore >= 80 ? 'text-green-600' : 
                        analysis.relevanceScore >= 60 ? 'text-yellow-600' : 'text-gray-600'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="flex h-full flex-col overflow-hidden border border-border/50 shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.04)]">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="mb-2 flex items-start justify-between gap-2 sm:mb-3 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-start gap-2.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 shadow-inner ring-1 ring-primary/10">
                <GitBranch size={18} weight="duotone" className="text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-lg sm:text-xl">{repo.name}</CardTitle>
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-xs text-primary hover:underline sm:text-sm"
                >
                  {repo.full_name}
                </a>
              </div>
            </div>
            {onRemove && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(repo.id)}
                className="h-8 w-8 shrink-0 sm:h-10 sm:w-10"
              >
                <X size={18} className="sm:h-5 sm:w-5" />
              </Button>
            )}
          </div>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {repo.description || 'No description available'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 sm:space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground sm:text-sm">AI Relevance Score</span>
              <span className={`text-sm font-bold sm:text-base ${relevanceColor}`}>
                {analysis.relevanceScore}/100
              </span>
            </div>
            <Progress value={analysis.relevanceScore} className="h-2" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-foreground sm:text-sm">Integration Readiness</span>
              <span className="text-sm font-semibold sm:text-base text-muted-foreground">
                {analysis.integrationReadiness}/100
              </span>
            </div>
            <Progress value={analysis.integrationReadiness} className="h-2" />
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold text-foreground sm:text-sm">Classification</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              <Badge className={categoryColors[analysis.category] + " text-xs font-medium"}>
                {analysis.category}
              </Badge>
              <Badge variant="outline" className="text-xs">{analysis.recommendedSector}</Badge>
              <Badge className={impactColors[analysis.impactPotential] + " text-xs border"}>
                {analysis.impactPotential} impact
              </Badge>
              <Badge className={complexityColors[analysis.technicalComplexity] + " text-xs border"}>
                {analysis.technicalComplexity}
              </Badge>
            </div>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Potential Use Case</h4>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{analysis.potentialUseCase}</p>
          </div>

          <div>
            <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Alignment Reason</h4>
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{analysis.alignmentReason}</p>
          </div>

          {analysis.keyInsights && analysis.keyInsights.length > 0 && (
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground sm:text-sm">
                <Lightbulb size={14} weight="duotone" className="text-primary" />
                AI Insights
              </h4>
              <ul className="space-y-1">
                {analysis.keyInsights.map((insight, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    <span className="mt-1 text-primary">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:gap-3 sm:text-sm">
            <div className="flex items-center gap-1">
              <Star size={14} weight="fill" className="text-yellow-500 sm:h-4 sm:w-4" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            {repo.language && (
              <Badge variant="secondary" className="text-xs font-normal">
                <Code size={12} className="mr-1" />
                {repo.language}
              </Badge>
            )}
          </div>

          {repo.topics && repo.topics.length > 0 && (
            <div>
              <h4 className="mb-1.5 text-xs font-semibold text-foreground sm:mb-2 sm:text-sm">Topics</h4>
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 5).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs font-normal">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            asChild
            className="w-full touch-manipulation"
            size="lg"
          >
            <a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <RocketLaunch size={18} weight="bold" className="sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">View on GitHub</span>
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
