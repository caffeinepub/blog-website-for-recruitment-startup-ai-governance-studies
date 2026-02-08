import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { SectionNameBox } from '@/components/marketing/SectionNameBox';
import { Section } from '@/components/marketing/Section';

export default function AboutPage() {
  return (
    <PageFadeIn>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background border-b border-seafoam">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <SectionNameBox name="About" />
            <InViewFade>
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground">
                  About{' '}
                  <span className="text-foreground">Beyond the resume</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  A blog exploring ethical AI in recruitment and retention
                </p>
              </div>
            </InViewFade>
          </div>
        </section>

        {/* Mission Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionNameBox name="Our Mission" />
            <InViewFade>
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">What We're About</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-foreground leading-relaxed">
                    Beyond the resume is a blog dedicated to exploring fair, transparent AI in recruitment and retention. We believe that AI systems used for high-stakes decisions like hiring must be explainable, verifiable, and trustworthy.
                  </p>
                  <p className="text-xl text-foreground leading-relaxed">
                    This isn't about selling a product or service. It's about sharing insights, technical approaches, and honest reflections on building AI that respects both candidates and organizations.
                  </p>
                  <p className="text-xl text-foreground leading-relaxed">
                    We write about the challenges, the trade-offs, and the practical realities of applying AI to talent management—from candidate screening to retention prediction to bias mitigation.
                  </p>
                </div>
              </div>
            </InViewFade>
          </div>
        </Section>

        {/* Topics Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionNameBox name="Topics" />
            <InViewFade>
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">What We Write About</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <InViewFade delay={100}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6 hover:border-seafoam transition-colors">
                      <h3 className="text-foreground font-bold text-xl mb-3">Recruitment AI</h3>
                      <p className="text-foreground leading-relaxed">
                        Context-aware candidate screening, transparent decision-making, and building systems that surface exceptional talent without bias.
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={200}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6 hover:border-seafoam transition-colors">
                      <h3 className="text-foreground font-bold text-xl mb-3">Retention & Attrition</h3>
                      <p className="text-foreground leading-relaxed">
                        Early warning signals, privacy-first analytics, and understanding why people stay or leave—without invasive surveillance.
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={300}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6 hover:border-seafoam transition-colors">
                      <h3 className="text-foreground font-bold text-xl mb-3">AI Ethics & Transparency</h3>
                      <p className="text-foreground leading-relaxed">
                        Building explainable AI, verifiable claims, auditable decisions, and systems that humans can understand and trust.
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={400}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6 hover:border-seafoam transition-colors">
                      <h3 className="text-foreground font-bold text-xl mb-3">Technical Deep Dives</h3>
                      <p className="text-foreground leading-relaxed">
                        Architecture patterns, implementation details, and lessons learned from building production AI systems for talent management.
                      </p>
                    </div>
                  </InViewFade>
                </div>
              </div>
            </InViewFade>
          </div>
        </Section>

        {/* Core Principles Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionNameBox name="Principles" />
            <InViewFade>
              <div className="max-w-4xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center">Core Principles</h2>
                <div className="space-y-6">
                  <InViewFade delay={100}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6">
                      <h3 className="text-foreground font-bold text-lg mb-2">Transparency First</h3>
                      <p className="text-foreground leading-relaxed">
                        AI decisions that affect people's careers must be explainable. No black boxes, no "trust the algorithm."
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={200}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6">
                      <h3 className="text-foreground font-bold text-lg mb-2">Privacy by Design</h3>
                      <p className="text-foreground leading-relaxed">
                        Effective AI doesn't require invasive surveillance. We explore privacy-preserving approaches that respect individuals.
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={300}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6">
                      <h3 className="text-foreground font-bold text-lg mb-2">Verifiable Claims</h3>
                      <p className="text-foreground leading-relaxed">
                        Every AI system makes claims about its capabilities. Those claims should be testable, auditable, and provable.
                      </p>
                    </div>
                  </InViewFade>
                  <InViewFade delay={400}>
                    <div className="bg-card border border-seafoam/30 rounded-lg p-6">
                      <h3 className="text-foreground font-bold text-lg mb-2">Human-Centered</h3>
                      <p className="text-foreground leading-relaxed">
                        AI should augment human judgment, not replace it. The goal is better decisions, not automated ones.
                      </p>
                    </div>
                  </InViewFade>
                </div>
              </div>
            </InViewFade>
          </div>
        </Section>

        {/* CTA Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Start Reading
                </h2>
                <p className="text-xl text-foreground leading-relaxed">
                  Explore our articles on fair hiring, AI transparency, and building better systems
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/articles">
                    <Button size="lg" className="interactive-element bg-seafoam hover:bg-seafoam/90 text-white">
                      Browse Articles
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/newsletter">
                    <Button size="lg" variant="outline" className="interactive-element border-seafoam text-foreground hover:bg-seafoam/10">
                      Subscribe to Newsletter
                    </Button>
                  </Link>
                </div>
              </div>
            </InViewFade>
          </div>
        </Section>
      </div>
    </PageFadeIn>
  );
}
