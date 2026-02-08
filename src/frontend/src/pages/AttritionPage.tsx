import { PageFadeIn, InViewFade } from '@/components/marketing/Motion';
import { SectionNameBox } from '@/components/marketing/SectionNameBox';

export default function AttritionPage() {
  return (
    <PageFadeIn>
      <div className="w-full">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/generated/attrition-hero-neon.dim_1600x700.png"
              alt="Attrition Prediction"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
          </div>
          
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
            <InViewFade>
              <SectionNameBox name="Attrition" />
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
                Predict Retention Risk
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Identify early warning signs before they become reality
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
                  <div className="relative">
                    <img
                      src="/assets/generated/section-attrition.dim_1200x800.png"
                      alt="Attrition Prediction"
                      className="rounded-lg shadow-2xl shadow-primary/20 border border-primary/20 interactive-card"
                    />
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                      Insight, Not Surveillance
                    </h2>
                    <div className="space-y-4 text-lg text-foreground leading-relaxed">
                      <p>
                        Predict retention risk before it becomes reality. INVARIANT analyzes behavioral patterns, engagement signals, and contextual factors to identify early warning signs of attrition—giving you time to act.
                      </p>
                      <p>
                        This isn't surveillance. It's insight. Our system respects privacy while providing actionable intelligence that helps you understand why people stay and why they leave.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Early Warning Signals</h3>
                    <p className="text-foreground leading-relaxed">
                      Detect subtle changes in engagement and behavior patterns before they escalate to resignation.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Privacy-First Analysis</h3>
                    <p className="text-foreground leading-relaxed">
                      Gain insights without invasive monitoring. Respect individual privacy while understanding team dynamics.
                    </p>
                  </div>
                  <div className="bg-card border border-primary/20 rounded-lg p-8 interactive-card">
                    <h3 className="text-primary font-bold text-xl mb-3">Actionable Intelligence</h3>
                    <p className="text-foreground leading-relaxed">
                      Get clear recommendations on interventions that work. Focus your retention efforts where they matter most.
                    </p>
                  </div>
                </div>

                <div className="mt-16 text-center">
                  <p className="text-2xl font-semibold text-primary">
                    Reduce regrettable attrition. Build teams that last.
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
