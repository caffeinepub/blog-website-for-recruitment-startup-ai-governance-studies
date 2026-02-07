import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Zap, Shield, CheckCircle2, TrendingUp, Users } from 'lucide-react';

export default function RecruitmentPage() {
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
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Powered by INVARIANT</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                  The Intelligence Layer{' '}
                  <span className="text-primary">Powering Recruitment</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  INVARIANT transforms recruitment from guesswork into precision—analyzing patterns, verifying data, and delivering matches that last.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/invariant">
                  <Button size="lg" className="w-full sm:w-auto group text-base">
                    Explore INVARIANT
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
                  src="/assets/generated/recruitment-hero-neon.dim_1600x700.png"
                  alt="INVARIANT recruitment intelligence system"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Traditional Recruitment Is Broken</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Hiring decisions are made on gut feeling, incomplete data, and outdated processes. The result? Mismatches, turnover, and wasted resources.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-xl text-white">Blind Screening</h3>
              <p className="text-gray-400 leading-relaxed">
                Resumes are scanned manually, patterns are missed, and top talent slips through the cracks while unqualified candidates advance.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-xl text-white">No Verification</h3>
              <p className="text-gray-400 leading-relaxed">
                Claims go unchecked, market data is ignored, and hiring decisions are made without real-time intelligence or cross-validation.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-xl text-white">High Turnover</h3>
              <p className="text-gray-400 leading-relaxed">
                Poor matches lead to early exits, costing companies months of productivity and forcing the cycle to repeat endlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 mb-4">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">INVARIANT Changes Everything</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              An intelligence layer that sits between candidates and clients, analyzing every data point, detecting hidden patterns, and verifying claims in real time.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Pattern Recognition at Scale</h3>
              <p className="text-gray-400 leading-relaxed">
                INVARIANT processes thousands of candidate profiles, job requirements, and historical placements to identify what actually predicts success—not just what looks good on paper.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Skill-role compatibility scoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Career trajectory analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Cultural fit indicators</span>
                </li>
              </ul>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Real-Time Verification</h3>
              <p className="text-gray-400 leading-relaxed">
                Every claim is cross-checked against live market data, industry benchmarks, and verified sources—ensuring accuracy before decisions are made.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Salary range validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Market demand analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Credential verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">The INVARIANT Process</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Four stages that transform raw data into intelligent hiring decisions.
              </p>
            </div>
            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  1
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Ingest</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    INVARIANT collects candidate profiles, job descriptions, company requirements, and historical placement data—building a comprehensive knowledge base.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  2
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Analyze</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    The system identifies patterns across thousands of data points—what skills predict success, which career paths align, and where mismatches occur.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  3
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Verify</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    Every finding is cross-checked with real-time market data, industry benchmarks, and verified sources—no assumptions, only facts.
                  </p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary text-black flex items-center justify-center font-bold text-2xl">
                  4
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="text-2xl font-semibold text-white">Match</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    INVARIANT delivers precise candidate-job pairings backed by data, optimized for long-term success, and ranked by compatibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Built for Both Sides</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              INVARIANT serves candidates seeking the right opportunity and clients searching for the perfect hire.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-6">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Candidates</h3>
              <p className="text-gray-400 leading-relaxed">
                Stop applying to hundreds of jobs. Let INVARIANT analyze your profile and match you with roles where you'll actually succeed and grow.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Personalized role recommendations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Career path optimization</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Market-aligned salary insights</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-6">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">For Clients</h3>
              <p className="text-gray-400 leading-relaxed">
                Stop wasting time on unqualified candidates. INVARIANT delivers pre-vetted talent ranked by compatibility and verified by data.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Data-driven candidate screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Reduced time-to-hire</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Lower turnover rates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-black border-t border-primary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to See INVARIANT in Action?</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Discover how the intelligence layer transforms recruitment from guesswork into precision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/invariant">
                <Button size="lg" className="w-full sm:w-auto group text-base">
                  Explore the System
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
        </div>
      </section>
    </div>
  );
}
