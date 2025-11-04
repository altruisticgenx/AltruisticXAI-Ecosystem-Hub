import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DiscoveredProject } from "@/hooks/use-discovered-projects"
import { GitBranch, Star, X } from "@phosphor-icons/react"
import { Progress } from "@/components/ui/progress"

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

export default function DiscoveredProjectCard({ project, onRemove }: DiscoveredProjectCardProps) {
  const { repo, analysis } = project
  const relevanceColor = analysis.relevanceScore >= 80 ? 'text-green-600' : 
                        analysis.relevanceScore >= 60 ? 'text-yellow-600' : 'text-gray-600'

  return (
    <Card className="flex flex-col border-2 transition-all hover:border-primary hover:shadow-lg">
      <CardHeader>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-xl">{repo.name}</CardTitle>
            <a 
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {repo.full_name}
            </a>
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(repo.id)}
              className="shrink-0"
            >
              <X size={20} />
            </Button>
          )}
        </div>
        <CardDescription className="line-clamp-2">
          {repo.description || 'No description available'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Relevance Score</span>
            <span className={`text-sm font-bold ${relevanceColor}`}>
              {analysis.relevanceScore}/100
            </span>
          </div>
          <Progress value={analysis.relevanceScore} className="h-2" />
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Category & Sector</h4>
          <div className="flex flex-wrap gap-2">
            <Badge className={categoryColors[analysis.category]}>
              {analysis.category}
            </Badge>
            <Badge variant="outline">{analysis.recommendedSector}</Badge>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Potential Use Case</h4>
          <p className="text-sm text-muted-foreground">{analysis.potentialUseCase}</p>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Alignment Reason</h4>
          <p className="text-sm text-muted-foreground">{analysis.alignmentReason}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star size={16} weight="fill" className="text-yellow-500" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          {repo.language && (
            <Badge variant="secondary" className="font-normal">
              {repo.language}
            </Badge>
          )}
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Topics</h4>
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
      <CardFooter>
        <Button 
          asChild
          className="w-full"
          size="lg"
        >
          <a 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <GitBranch size={20} weight="bold" />
            View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
