import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Calendar, Loader2, Mail } from 'lucide-react';
import { useListPublishedArticles } from '../hooks/useQueries';
import { articleTemplates } from '../content/articleTemplates';
import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { Section } from '@/components/marketing/Section';
import { simplifyUserFacingText } from '../utils/textTransforms';
import { timestampToDate } from '../utils/articleDate';
import { format } from 'date-fns';

export default function HomePage() {
  const { data: articles = [], isLoading } = useListPublishedArticles();

  // Use backend articles if available, otherwise fall back to templates
  const displayArticles = articles.length > 0 
    ? articles.slice(0, 3)
    : articleTemplates.slice(0, 3).map((template, index) => ({
        id: BigInt(index + 1),
        slug: template.slug,
        title: template.title,
        textContent: template.content,
        author: template.author,
        tags: template.tags,
        published: true,
        timestamp: BigInt(Date.now() * 1000000),
        pdf: undefined,
        textAttachment: undefined,
      }));

  const featuredTopics = [
    {
      title: 'Recruitment',
      description: 'Context-aware candidate screening and transparent hiring decisions',
      image: '/assets/generated/post-featured-recruitment.dim_800x450.png',
      tag: 'Recruitment',
    },
    {
      title: 'Attrition',
      description: 'Privacy-first retention analytics and early warning systems',
      image: '/assets/generated/post-featured-attrition.dim_800x450.png',
      tag: 'Attrition',
    },
    {
      title: 'AI Ethics',
      description: 'Building explainable, verifiable, and trustworthy AI systems',
      image: '/assets/generated/post-featured-ai-ethics.dim_800x450.png',
      tag: 'AI Ethics',
    },
  ];

  return (
    <PageFadeIn>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background border-b border-seafoam">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <InViewFade>
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground">
                  Beyond the resume
                </h1>
                <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                  Exploring fair, transparent AI in recruitment and retention
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/articles">
                    <Button size="lg" className="interactive-element bg-seafoam hover:bg-seafoam/90 text-white">
                      Read Articles
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="interactive-element border-seafoam text-foreground hover:bg-seafoam/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </InViewFade>
          </div>
        </section>

        {/* Latest Articles Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Latest Articles</h2>
                <p className="text-lg text-foreground max-w-2xl mx-auto">
                  Insights on building fair, explainable AI for talent management
                </p>
              </div>
            </InViewFade>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-foreground" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayArticles.map((article, index) => (
                  <InViewFade key={article.id.toString()} delay={index * 100}>
                    <Link to="/articles/$slug" params={{ slug: article.slug }}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-card border-seafoam/30 hover:border-seafoam">
                        <CardHeader>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {article.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-foreground">
                                {simplifyUserFacingText(tag)}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="text-xl text-foreground line-clamp-2">
                            {simplifyUserFacingText(article.title)}
                          </CardTitle>
                          <CardDescription className="text-foreground">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(timestampToDate(article.timestamp), 'MMMM d, yyyy')}
                              </span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground line-clamp-3">
                            {simplifyUserFacingText(article.textContent.substring(0, 150))}...
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </InViewFade>
                ))}
              </div>
            )}

            <InViewFade delay={300}>
              <div className="text-center mt-12">
                <Link to="/articles">
                  <Button size="lg" variant="outline" className="interactive-element border-seafoam text-foreground hover:bg-seafoam/10">
                    View All Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </InViewFade>
          </div>
        </Section>

        {/* Featured Topics Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Topics</h2>
                <p className="text-lg text-foreground max-w-2xl mx-auto">
                  Explore our core areas of focus
                </p>
              </div>
            </InViewFade>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredTopics.map((topic, index) => (
                <InViewFade key={topic.tag} delay={index * 100}>
                  <Link to="/articles" search={{ topic: topic.tag }}>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-card border-seafoam/30 hover:border-seafoam overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={topic.image}
                          alt={topic.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl text-foreground">{topic.title}</CardTitle>
                        <CardDescription className="text-foreground">
                          {topic.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </InViewFade>
              ))}
            </div>
          </div>
        </Section>

        {/* About Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  About This Blog
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  Beyond the resume explores the intersection of AI, ethics, and talent management. 
                  We write about building transparent, verifiable AI systems for recruitment and retention—systems 
                  that respect both candidates and organizations.
                </p>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="interactive-element border-seafoam text-foreground hover:bg-seafoam/10">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </InViewFade>
          </div>
        </Section>

        {/* Newsletter CTA Section */}
        <Section>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <Card className="max-w-3xl mx-auto bg-card border-seafoam/30">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-seafoam/10 flex items-center justify-center mb-4">
                    <Mail className="h-8 w-8 text-foreground" />
                  </div>
                  <CardTitle className="text-3xl text-foreground">Stay Updated</CardTitle>
                  <CardDescription className="text-lg text-foreground">
                    Get weekly insights on fair hiring, AI ethics, and transparent recruitment systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1"
                    />
                    <Link to="/newsletter">
                      <Button size="lg" className="w-full sm:w-auto bg-seafoam hover:bg-seafoam/90 text-white">
                        Subscribe
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-foreground text-center">
                    Join our community exploring the future of fair AI in talent management
                  </p>
                </CardContent>
              </Card>
            </InViewFade>
          </div>
        </Section>
      </div>
    </PageFadeIn>
  );
}
