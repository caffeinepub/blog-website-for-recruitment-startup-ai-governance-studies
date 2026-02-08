import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { SectionNameBox } from '@/components/marketing/SectionNameBox';

export default function RecruitmentPage() {
  return (
    <PageFadeIn>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/recruitment-hero-neon.dim_1600x700.png"
              alt="Recruitment Intelligence"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
            <InViewFade>
              <SectionNameBox name="Recruitment" />
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                Transform Talent Acquisition
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Process vast candidate pools with unprecedented accuracy and transparency
              </p>
            </InViewFade>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <InViewFade>
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                      Beyond Keyword Matching
                    </h2>
                    <div className="space-y-4 text-lg text-foreground leading-relaxed">
                      <p>
                        INVARIANT revolutionizes talent acquisition by processing vast candidate pools with unprecedented accuracy and transparency. Our system doesn't just match keywords—it understands context, identifies non-obvious patterns, and surfaces exceptional candidates that traditional screening misses.
                      </p>
                      <p>
                        Every decision is auditable. Every recommendation is verifiable. Every candidate deserves to know why they were selected or filtered, and INVARIANT provides that clarity at scale.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/assets/generated/section-recruitment.dim_1200x800.png"
                      alt="Recruitment Intelligence"
                      className="rounded-lg shadow-2xl shadow-primary/20 border border-primary/20 interactive-card"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Context-Aware Screening</h3>
                    <p className="text-foreground leading-relaxed">
                      Understand candidate profiles beyond surface-level keywords. Identify transferable skills and hidden potential.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Transparent Decisions</h3>
                    <p className="text-foreground leading-relaxed">
                      Every recommendation comes with clear reasoning. Build trust with candidates and hiring teams alike.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Scale Without Compromise</h3>
                    <p className="text-foreground leading-relaxed">
                      Process thousands of applications while maintaining the quality and fairness of human review.
                    </p>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <p className="text-2xl font-semibold text-primary">
                    Transform volume into opportunity. Make every hire count.
                  </p>
                </div>
              </div>
            </InViewFade>
          </div>
        </section>
      </div>
    </PageFadeIn>
  );
}
