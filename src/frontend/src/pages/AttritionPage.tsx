import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, TrendingDown, Users, Shield, CheckCircle2, BarChart3 } from 'lucide-react';

export default function AttritionPage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-500">Retention Intelligence</span>
              </div>
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                  Predict Attrition{' '}
                  <span className="text-primary">Before It Happens</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                  INVARIANT detects early warning signals, identifies flight risks, and helps you retain top talent before they walk out the door.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/invariant">
                  <Button size="lg" className="w-full sm:w-auto group text-base">
                    See How It Works
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/recruitment">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/40 text-primary hover:bg-primary/10">
                    Back to Recruitment
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-red-500/30">
                <img
                  src="/assets/generated/attrition-hero-neon.dim_1600x700.png"
                  alt="INVARIANT attrition prediction system"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Cost Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">The Hidden Cost of Turnover</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Every employee who leaves takes knowledge, relationships, and momentum with them—costing far more than just their salary.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4 text-center">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto">
                <TrendingDown className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-3xl text-white">150-200%</h3>
              <p className="text-gray-400 leading-relaxed">
                Average cost of replacing an employee (as a percentage of their annual salary)
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4 text-center">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-3xl text-white">3-6 Months</h3>
              <p className="text-gray-400 leading-relaxed">
                Time required for a new hire to reach full productivity in most roles
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4 text-center">
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold text-3xl text-white">20-30%</h3>
              <p className="text-gray-400 leading-relaxed">
                Team productivity drop when a key member leaves unexpectedly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Warning Signals Section */}
      <section className="py-20 md:py-28 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">INVARIANT Detects the Signals</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Most attrition is predictable. INVARIANT analyzes behavioral patterns, engagement metrics, and external factors to identify flight risks before they resign.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Behavioral Indicators</h3>
              <p className="text-gray-400 leading-relaxed">
                INVARIANT tracks engagement drops, communication pattern shifts, and productivity changes that signal disengagement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Reduced collaboration frequency</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Declining meeting participation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Shortened response times</span>
                </li>
              </ul>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-6">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-2xl text-white">Market Context</h3>
              <p className="text-gray-400 leading-relaxed">
                The system monitors external hiring trends, competitor activity, and salary benchmarks to identify when employees are at risk of being poached.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Competitor hiring surges</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Market salary inflation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Industry talent shortages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Intervention Strategies Section */}
      <section className="py-20 md:py-28 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white">From Detection to Retention</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Identifying flight risks is only the first step. INVARIANT provides actionable intervention strategies tailored to each situation.
              </p>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">Risk Scoring</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Each employee receives a flight risk score based on behavioral signals, tenure patterns, and market conditions—updated continuously.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">Root Cause Analysis</h3>
                    <p className="text-gray-400 leading-relaxed">
                      INVARIANT identifies why disengagement is happening—compensation gaps, career stagnation, cultural misalignment, or external opportunities.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">Intervention Playbooks</h3>
                    <p className="text-gray-400 leading-relaxed">
                      The system recommends specific actions—compensation adjustments, role redesigns, mentorship programs, or career path conversations—based on the root cause.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 space-y-4">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">4</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-semibold text-white">Outcome Tracking</h3>
                    <p className="text-gray-400 leading-relaxed">
                      INVARIANT monitors whether interventions work, learning which strategies succeed and which fail—improving recommendations over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white">The Impact</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Organizations using INVARIANT's attrition intelligence see measurable improvements in retention, productivity, and hiring costs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-4 text-center">
              <h3 className="font-semibold text-4xl text-primary">40-60%</h3>
              <p className="text-gray-400 leading-relaxed">
                Reduction in unexpected departures when early interventions are applied
              </p>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-4 text-center">
              <h3 className="font-semibold text-4xl text-primary">3-6 Weeks</h3>
              <p className="text-gray-400 leading-relaxed">
                Average lead time for detecting flight risk before resignation
              </p>
            </div>
            <div className="bg-black border-2 border-primary/30 rounded-xl p-8 space-y-4 text-center">
              <h3 className="font-semibold text-4xl text-primary">25-35%</h3>
              <p className="text-gray-400 leading-relaxed">
                Lower total hiring costs when retention improves
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
              <h2 className="text-4xl md:text-5xl font-bold text-white">Stop Losing Your Best People</h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                INVARIANT gives you the intelligence to retain top talent before they start looking elsewhere.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/invariant">
                <Button size="lg" className="w-full sm:w-auto group text-base">
                  Explore INVARIANT
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/recruitment">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/40 text-primary hover:bg-primary/10">
                  See Recruitment Intelligence
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
