import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Zap, Shield, Target, CheckCircle2, Layers, Network } from 'lucide-react';
import { LAYER_LABELS, LAYER_ONE_LINERS } from '@/utils/layerMask';

export default function InvariantPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/proqruit-node-pattern-neon.dim_1200x1200.png)',
            backgroundSize: '800px 800px',
            backgroundRepeat: 'repeat'
          }}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Cognitive Architecture</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                  Meet{' '}
                  <span className="text-primary">INVARIANT</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  The intelligence layer that transforms recruitment from intuition into precision—analyzing data, detecting patterns, and verifying claims in real time.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/recruitment">
                  <Button size="lg" className="w-full sm:w-auto group text-base">
                    See Recruitment Intelligence
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/attrition">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/40 text-primary hover:bg-primary/10">
                    See Attrition Intelligence
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30">
                <img
                  src="/assets/generated/invariant-hero-neon.dim_1600x700.png"
                  alt="INVARIANT cognitive architecture"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Is INVARIANT Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">What Is INVARIANT?</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              INVARIANT is not a chatbot. It's not a resume parser. It's a multi-layered cognitive architecture designed to make recruitment decisions that humans can't—at a scale humans can't reach.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">A Layered System</h3>
              <p className="text-gray-400 leading-relaxed">
                INVARIANT operates through distinct cognitive layers—each with a specific function, each feeding into the next, creating a decision pipeline that's transparent and auditable.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Network className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Constraint-Governed</h3>
              <p className="text-gray-400 leading-relaxed">
                Unlike black-box AI, INVARIANT operates under explicit constraints—rules that prevent hallucination, enforce verification, and ensure every output is grounded in reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Four Layers Section */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 mb-4">
              <Brain className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">The Four Layers</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              INVARIANT is built on four specialized cognitive layers, each performing a distinct function in the decision pipeline.
            </p>
          </div>
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">{LAYER_LABELS.LAYER_1}: Possibility Generation</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_ONE_LINERS.LAYER_1}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Hypothesis Generation</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Maximum Entropy</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">No Filtering</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">{LAYER_LABELS.LAYER_3}: Reality Verification</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_ONE_LINERS.LAYER_3}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Fact Checking</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Real-Time Data</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">No Assumptions</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">{LAYER_LABELS.LAYER_2}: Governance & Constraint</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_ONE_LINERS.LAYER_2}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Decision Gating</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Risk Management</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Constraint Enforcement</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">{LAYER_LABELS.LAYER_4}: Execution</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_ONE_LINERS.LAYER_4}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Authorized Execution</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">No Interpretation</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">Terminal Layer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">The Decision Pipeline</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Every recruitment decision flows through INVARIANT's four-stage pipeline—from raw possibility to verified action.
              </p>
            </div>
            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  1
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Generate All Possibilities</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_LABELS.LAYER_1} explores every candidate-job pairing, every intervention strategy, every attrition scenario—without filtering or bias. The goal is maximum coverage, not premature optimization.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  2
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Verify Against Reality</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_LABELS.LAYER_3} cross-checks every claim—salary ranges, skill requirements, market trends—against live data sources. Anything unverifiable is flagged, not assumed.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  3
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Apply Governance</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_LABELS.LAYER_2} evaluates whether action is allowed under current constraints—timing, risk tolerance, resource availability. It can delay, refuse, or approve with conditions.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  4
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Execute Approved Actions</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {LAYER_LABELS.LAYER_4} carries out only what {LAYER_LABELS.LAYER_2} has authorized—candidate recommendations, intervention playbooks, attrition alerts—with no interpretation or deviation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Why This Architecture Matters</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Most AI recruitment tools are black boxes—you get an answer, but you don't know how it was reached or whether it's grounded in reality. INVARIANT is different.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Transparent by Design</h3>
              <p className="text-gray-400 leading-relaxed">
                Every decision can be traced back through the pipeline—what {LAYER_LABELS.LAYER_1} proposed, what {LAYER_LABELS.LAYER_3} verified, what {LAYER_LABELS.LAYER_2} approved, and what {LAYER_LABELS.LAYER_4} executed.
              </p>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Grounded in Reality</h3>
              <p className="text-gray-400 leading-relaxed">
                {LAYER_LABELS.LAYER_3} ensures that no recommendation is based on assumptions, outdated data, or hallucinated facts. If it can't be verified, it's flagged as UNVERIFIABLE.
              </p>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Constraint-Governed</h3>
              <p className="text-gray-400 leading-relaxed">
                {LAYER_LABELS.LAYER_2} enforces explicit rules—no premature action, no unauthorized execution, no silent failures. Governance precedes intelligence, always.
              </p>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Scalable Intelligence</h3>
              <p className="text-gray-400 leading-relaxed">
                INVARIANT processes thousands of candidates, jobs, and data points simultaneously—delivering insights at a scale and speed humans can't match.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-black border-t border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Experience INVARIANT in Action</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                See how the intelligence layer transforms recruitment and retention decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/recruitment">
                <Button size="lg" className="w-full sm:w-auto group text-base">
                  Explore Recruitment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/attrition">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/40 text-primary hover:bg-primary/10">
                  Explore Attrition
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
