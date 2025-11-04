import LayoutShell from "@/components/LayoutShell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, GitBranch, Lightbulb, Code, Rocket, GitMerge, Flask, Sparkle, MagnifyingGlass } from "@phosphor-icons/react"
import { projects } from "@/data/projects"
import { useDiscoveredProjects } from "@/hooks/use-discovered-projects"
import DiscoveredProjectCard from "@/components/DiscoveredProjectCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { toast } from "sonner"

export default function LabsPage() {
  const labsProjects = projects.filter(p => p.origin === "labs")
  const { projects: discoveredProjects, isLoading, error, discoverNewProjects, removeProject, clearAll } = useDiscoveredProjects()
  const [selectedTopic, setSelectedTopic] = useState<string>('explainable-ai')

  const topics = [
    { value: 'explainable-ai', label: 'Explainable AI' },
    { value: 'ai-ethics', label: 'AI Ethics' },
    { value: 'fairness-ml', label: 'Fairness in ML' },
    { value: 'privacy-preserving-ml', label: 'Privacy-Preserving ML' },
    { value: 'federated-learning', label: 'Federated Learning' },
    { value: 'differential-privacy', label: 'Differential Privacy' },
    { value: 'bias-detection', label: 'Bias Detection' },
    { value: 'ai-transparency', label: 'AI Transparency' },
    { value: 'responsible-ai', label: 'Responsible AI' },
    { value: 'interpretable-ml', label: 'Interpretable ML' }
  ]

  const handleDiscover = async () => {
    const newProjects = await discoverNewProjects(selectedTopic, 5)
    if (newProjects && newProjects.length > 0) {
      toast.success(`Discovered ${newProjects.length} relevant project${newProjects.length !== 1 ? 's' : ''}!`, {
        description: `AI analyzed and found high-quality matches for ${topics.find(t => t.value === selectedTopic)?.label}`
      })
    } else if (!error) {
      toast.info('No new projects found', {
        description: 'Try a different topic or check back later'
      })
    }
  }

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Flask size={32} weight="duotone" className="text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">
            Open Source Labs
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Experimental projects pushing the boundaries of explainable AI, energy transparency, and ethical technology.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-center text-3xl font-semibold text-foreground">
            How We Work
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="text-primary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Ideation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Identify real-world problems where AI explainability and transparency can create measurable impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Code className="text-primary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Prototype</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Build rapid proof-of-concept implementations using modern, open-source technology stacks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GitBranch className="text-primary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Public Repo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Release validated prototypes as open-source projects with comprehensive documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GitMerge className="text-primary" size={24} weight="duotone" />
                </div>
                <CardTitle className="text-lg">Pilot Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Partner with organizations to deploy and refine solutions in real-world environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="our-projects" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="our-projects">Our Projects</TabsTrigger>
            <TabsTrigger value="discover">
              <Sparkle size={16} className="mr-2" weight="fill" />
              AI Discovery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="our-projects">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold text-foreground">
                Active Projects
              </h2>
              <p className="text-muted-foreground">
                Open-source initiatives advancing transparency, privacy, and ethical AI.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {labsProjects.map((project) => (
                <Card key={project.id} className="flex flex-col border-2 transition-all hover:border-primary hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <CardTitle className="text-2xl">{project.title}</CardTitle>
                      <Badge 
                        variant={project.status === "active" ? "default" : project.status === "pilot" ? "secondary" : "outline"}
                        className="shrink-0"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">Sector</h4>
                        <Badge variant="outline" className="font-normal">
                          {project.sector}
                        </Badge>
                      </div>
                      {project.tags && project.tags.length > 0 && (
                        <div>
                          <h4 className="mb-2 text-sm font-semibold text-foreground">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="font-normal">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-foreground">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <Badge key={tech} variant="secondary" className="font-normal">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      asChild
                      className="w-full"
                      size="lg"
                    >
                      <a 
                        href={`https://github.com/altruisticxai-labs/${project.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <GitBranch size={20} weight="bold" />
                        View Repository
                        <ArrowRight size={20} weight="bold" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discover">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-semibold text-foreground">
                Discover Aligned Open-Source Projects
              </h2>
              <p className="text-muted-foreground">
                Use AI to discover and analyze open-source projects that align with our ethical AI mission.
              </p>
            </div>

            <Card className="mb-8 border-2 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MagnifyingGlass size={24} weight="duotone" className="text-primary" />
                  Search for Projects
                </CardTitle>
                <CardDescription>
                  Select a topic and let AI analyze GitHub repositories for relevance to ethical AI principles.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.value} value={topic.value}>
                            {topic.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleDiscover} 
                    disabled={isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkle size={20} weight="fill" />
                        Discover Projects
                      </>
                    )}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {(discoveredProjects || []).length > 0 && (
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      {(discoveredProjects || []).length} project{(discoveredProjects || []).length !== 1 ? 's' : ''} discovered
                    </p>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {(discoveredProjects || []).length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {(discoveredProjects || []).map((project) => (
                  <DiscoveredProjectCard
                    key={project.repo.id}
                    project={project}
                    onRemove={removeProject}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <MagnifyingGlass size={64} weight="duotone" className="mb-4 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    No Projects Discovered Yet
                  </h3>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Select a topic and click "Discover Projects" to find open-source repositories that align with our ethical AI mission. AI will analyze each project for relevance.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-16 rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
          <Rocket size={48} weight="duotone" className="mx-auto mb-4 text-primary" />
          <h3 className="mb-3 text-2xl font-semibold text-foreground">
            Have an idea for a Labs project?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            We're always looking for new challenges in AI transparency, privacy-preserving ML, and sustainable technology. 
            Reach out to discuss potential collaborations.
          </p>
          <Button size="lg" variant="default">
            Get in Touch
          </Button>
        </div>
      </div>
    </LayoutShell>
  )
}
