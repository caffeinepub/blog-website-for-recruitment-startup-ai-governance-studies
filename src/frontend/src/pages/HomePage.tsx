import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Exploring the Intersection of{' '}
                  <span className="text-primary">Recruitment</span> and{' '}
                  <span className="text-primary">AI Governance</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                  Research and insights on constraint geometry in AI governance, applied to modern
                  recruitment challenges and opportunities.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/articles">
                  <Button size="lg" className="w-full sm:w-auto">
                    Read Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-constraint-geometry.dim_1600x600.png"
                alt="Constraint Geometry Visualization"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">What We Explore</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bridging theoretical AI governance frameworks with practical recruitment innovation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-lg border border-border bg-card space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">AI Governance Research</h3>
              <p className="text-muted-foreground">
                Deep dives into constraint geometry frameworks, ethical AI deployment, and
                governance models that ensure responsible innovation.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border bg-card space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Recruitment Innovation</h3>
              <p className="text-muted-foreground">
                Practical insights on building modern recruitment systems, leveraging AI
                responsibly, and creating better hiring experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay Updated</h2>
            <p className="text-lg text-muted-foreground">
              Explore our latest articles and research on AI governance, constraint geometry, and
              recruitment technology.
            </p>
            <Link to="/articles">
              <Button size="lg">
                Browse All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
