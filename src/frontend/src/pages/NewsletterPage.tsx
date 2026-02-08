import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { Section } from '@/components/marketing/Section';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate submission (coming soon functionality)
    setSubmitted(true);
    setEmail('');
  };

  return (
    <PageFadeIn>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background border-b border-primary/20">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url(/assets/generated/proqruit-node-pattern-neon.dim_1200x1200.png)',
              backgroundSize: '800px 800px',
              backgroundRepeat: 'repeat'
            }}
          />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <InViewFade>
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-10 w-10 text-foreground" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                  Subscribe to Our Newsletter
                </h1>
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Get weekly insights on fair hiring, AI ethics, and building transparent recruitment systems
                </p>
              </div>
            </InViewFade>
          </div>
        </section>

        {/* Main Content */}
        <Section className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-2xl mx-auto space-y-8">
                {/* Subscription Form */}
                <Card className="bg-card border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-2xl text-foreground">Stay Updated</CardTitle>
                    <CardDescription className="text-base text-foreground">
                      Join our community of HR professionals, recruiters, and tech leaders exploring the future of fair AI in talent management.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full"
                          />
                          {error && (
                            <p className="text-sm text-foreground">{error}</p>
                          )}
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                          Subscribe Now
                        </Button>
                        <p className="text-xs text-foreground text-center">
                          We respect your privacy. Unsubscribe at any time.
                        </p>
                      </form>
                    ) : (
                      <Alert className="border-primary/30 bg-primary/5">
                        <CheckCircle2 className="h-5 w-5 text-foreground" />
                        <AlertDescription className="text-base ml-2 text-foreground">
                          <strong>Coming Soon!</strong> Newsletter subscriptions will be available shortly. Thank you for your interest in Beyond the Resume.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>

                {/* What You'll Get */}
                <Card className="bg-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">What You'll Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Weekly articles on AI-powered recruitment and retention strategies</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Case studies on building transparent, verifiable AI systems</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Insights on fairness, ethics, and context-aware hiring</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span>Early access to new research and thought leadership</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Back to Home */}
                <div className="text-center pt-4">
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back to Home
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
