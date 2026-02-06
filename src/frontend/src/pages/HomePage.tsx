import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Building2, Brain, CheckCircle2, Target, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: 'url(/assets/generated/proqruit-node-pattern.dim_1200x1200.png)',
            backgroundSize: '600px 600px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Recruitment Intelligence</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Find the Right Fit with{' '}
                  <span className="text-primary">INVARIANT</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                  INVARIANT is an AI system that analyzes data, detects patterns, and cross-verifies with real-time information to help candidates find the right job and clients find the perfect match through intelligent recruitment.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/articles">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Explore Our Approach
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn About INVARIANT
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
                <img
                  src="/assets/generated/proqruit-hero-ai-recruitment.dim_1600x700.png"
                  alt="AI-powered recruitment platform connecting candidates and clients"
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg hidden md:block">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/generated/invariant-logo-convergence.dim_256x256.png"
                    alt="INVARIANT AI assistant"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm">INVARIANT</p>
                    <p className="text-xs text-muted-foreground">Your Digital Partner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVARIANT Introduction */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Meet INVARIANT</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                An AI architecture designed to support every recruitment decision with data-driven intelligence.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Processes candidate profiles, job requirements, and market trends to identify optimal matches.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Pattern Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Detects hiring patterns, success indicators, and potential red flags across thousands of placements.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Real-Time Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Cross-checks information with live data sources to ensure accuracy and relevance in every decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Pathways Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Who We Serve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're looking for your next opportunity or searching for the perfect hire, we're here to help.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Candidates Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">For Candidates</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Let INVARIANT analyze your skills, experience, and career goals to match you with opportunities that truly fit—not just any job, but the right job.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">AI-powered skill matching and career path analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Real-time market insights and salary benchmarking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Personalized job recommendations based on your profile</span>
                  </li>
                </ul>
                <Link to="/articles">
                  <Button className="w-full group/btn">
                    Explore Opportunities
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Clients Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 space-y-6">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">For Clients</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    INVARIANT processes thousands of candidate profiles, identifies patterns in successful hires, and delivers pre-vetted talent that matches your exact requirements.
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Data-driven candidate screening and ranking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Pattern analysis from successful placements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">Reduced time-to-hire with intelligent automation</span>
                  </li>
                </ul>
                <Link to="/about">
                  <Button variant="outline" className="w-full group/btn">
                    Learn How It Works
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">How INVARIANT Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined process powered by AI intelligence at every step.
              </p>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold">Data Collection</h3>
                  <p className="text-muted-foreground">
                    INVARIANT gathers comprehensive information from candidate profiles, job descriptions, and market data to build a complete picture.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold">Pattern Analysis</h3>
                  <p className="text-muted-foreground">
                    The system identifies trends, success factors, and potential matches by analyzing thousands of data points across previous placements and market conditions.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold">Real-Time Verification</h3>
                  <p className="text-muted-foreground">
                    INVARIANT cross-checks findings with live data sources to ensure every recommendation is current, accurate, and relevant.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-xl font-semibold">Intelligent Matching</h3>
                  <p className="text-muted-foreground">
                    The final step delivers precise candidate-job matches or job recommendations, backed by data and optimized for long-term success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Experience INVARIANT?</h2>
              <p className="text-lg text-muted-foreground">
                Discover how AI-powered recruitment intelligence can transform your hiring process or career search.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/articles">
                <Button size="lg" className="w-full sm:w-auto group">
                  Read Our Articles
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
