import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { SectionNameBox } from '@/components/marketing/SectionNameBox';

export default function InvariantPage() {
  return (
    <PageFadeIn>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/invariant-hero-neon.dim_1600x700.png"
              alt="INVARIANT System"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
            <InViewFade>
              <img
                src="/assets/generated/invariant-logo.dim_256x256.png"
                alt="INVARIANT"
                className="h-24 w-24 mx-auto mb-8 object-contain"
              />
              <SectionNameBox name="The System" />
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                INVARIANT
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A four-layer architecture designed for transparency, verifiability, and trust
              </p>
            </InViewFade>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Four-Layer Architecture
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Every decision flows through a transparent, auditable pipeline
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <div className="text-primary font-bold text-xl mb-3">Layer 1: Possibility</div>
                    <p className="text-foreground leading-relaxed">
                      Generate all plausible matches without premature filtering. Explore the full possibility space to ensure no exceptional candidate is missed.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <div className="text-primary font-bold text-xl mb-3">Layer 2: Verification</div>
                    <p className="text-foreground leading-relaxed">
                      Verify every claim against real data. Mark facts as TRUE, FALSE, or UNVERIFIABLE. No hallucinations, no assumptions.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <div className="text-primary font-bold text-xl mb-3">Layer 3: Governance</div>
                    <p className="text-foreground leading-relaxed">
                      Apply explicit rules: legal compliance, company policies, fairness constraints. Every decision must be authorized.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <div className="text-primary font-bold text-xl mb-3">Layer 4: Execution</div>
                    <p className="text-foreground leading-relaxed">
                      Execute only what's been authorized. Maintain full audit trail for every action taken by the system.
                    </p>
                  </div>
                </div>

                <div className="relative mb-16">
                  <img
                    src="/assets/generated/section-invariant.dim_1200x800.png"
                    alt="INVARIANT Architecture"
                    className="rounded-lg shadow-2xl shadow-primary/20 border border-primary/20 w-full interactive-card"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <h3 className="text-primary font-bold text-2xl mb-3">Transparent</h3>
                    <p className="text-foreground leading-relaxed">
                      Every decision is explainable. Every recommendation is traceable. No black boxes.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-primary font-bold text-2xl mb-3">Verifiable</h3>
                    <p className="text-foreground leading-relaxed">
                      All claims are checked against real data. Hallucinations are eliminated at the architecture level.
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-primary font-bold text-2xl mb-3">Trustworthy</h3>
                    <p className="text-foreground leading-relaxed">
                      Built for accountability. Designed for fairness. Engineered for human oversight.
                    </p>
                  </div>
                </div>
              </div>
            </InViewFade>
          </div>
        </section>
      </div>
    </PageFadeIn>
  );
}
