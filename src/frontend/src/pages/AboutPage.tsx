import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PUBLIC_CONTACT } from '../config/publicContact';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">About</h1>
          <p className="text-xl text-muted-foreground">
            Bridging AI governance research with practical recruitment innovation.
          </p>
        </div>

        {/* Our Mission */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              We're building the future of recruitment while advancing the field of AI governance
              through constraint geometry frameworks. Our work sits at the intersection of
              theoretical research and practical application.
            </p>
            <p>
              By applying rigorous governance principles to recruitment technology, we aim to create
              systems that are not only effective but also ethical, transparent, and aligned with
              human values.
            </p>
          </div>
        </section>

        {/* Constraint Geometry in AI Governance */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Constraint Geometry in AI Governance</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Constraint geometry provides a mathematical framework for understanding and
              implementing AI governance. It allows us to model complex ethical boundaries,
              regulatory requirements, and operational constraints as geometric structures.
            </p>
            <p>
              This approach enables us to:
            </p>
            <ul>
              <li>Visualize and reason about multi-dimensional governance requirements</li>
              <li>Identify conflicts and trade-offs between different constraints</li>
              <li>Design AI systems that provably operate within defined boundaries</li>
              <li>Create auditable and explainable governance mechanisms</li>
            </ul>
          </div>
        </section>

        {/* Our Recruitment Work */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Our Recruitment Startup</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Our recruitment platform applies these governance principles to create a hiring
              ecosystem that's fair, efficient, and transparent. We're building tools that help
              organizations find the right talent while ensuring that AI-assisted decisions remain
              accountable and bias-free.
            </p>
            <p>
              Key areas of focus include:
            </p>
            <ul>
              <li>Bias detection and mitigation in candidate screening</li>
              <li>Transparent AI-assisted matching algorithms</li>
              <li>Privacy-preserving candidate evaluation</li>
              <li>Explainable hiring recommendations</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-4 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground">
            Interested in our research or recruitment solutions? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${PUBLIC_CONTACT.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={PUBLIC_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href={PUBLIC_CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
