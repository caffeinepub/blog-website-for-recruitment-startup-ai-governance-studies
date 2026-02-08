import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import LoginButton from '../auth/LoginButton';
import { ProfilesSkillsJobsGraphBackground } from './ProfilesSkillsJobsGraphBackground';

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const topics = [
    { label: 'Recruitment', value: 'Recruitment' },
    { label: 'Attrition', value: 'Attrition' },
    { label: 'AI Ethics', value: 'AI Ethics' },
  ];

  const handleTopicClick = (topic: string) => {
    navigate({ to: '/articles', search: { topic } });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Global interactive graph background */}
      <ProfilesSkillsJobsGraphBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-seafoam bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/generated/beyond-the-resume-logo-mark.dim_256x256.png"
                alt="Beyond the Resume"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-foreground">Beyond the Resume</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/articles" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
                Articles
              </Link>
              <Link to="/about" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link to="/newsletter" className="text-sm font-medium text-foreground hover:text-foreground transition-colors">
                Newsletter
              </Link>
              
              {/* Topics Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-sm font-medium text-foreground hover:text-foreground">
                    Topics
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-seafoam">
                  {topics.map((topic) => (
                    <DropdownMenuItem
                      key={topic.value}
                      onClick={() => handleTopicClick(topic.value)}
                      className="cursor-pointer text-foreground hover:text-foreground"
                    >
                      {topic.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <LoginButton />
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card border-seafoam">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    to="/"
                    className="text-base font-medium text-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/articles"
                    className="text-base font-medium text-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Articles
                  </Link>
                  <Link
                    to="/about"
                    className="text-base font-medium text-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/newsletter"
                    className="text-base font-medium text-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Newsletter
                  </Link>
                  
                  <div className="border-t border-seafoam pt-4 mt-2">
                    <p className="text-sm font-semibold text-foreground mb-3">Topics</p>
                    {topics.map((topic) => (
                      <button
                        key={topic.value}
                        onClick={() => handleTopicClick(topic.value)}
                        className="block w-full text-left text-base font-medium text-foreground hover:text-foreground transition-colors py-2"
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-seafoam pt-4 mt-2">
                    <LoginButton />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-seafoam bg-background relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img
                  src="/assets/generated/beyond-the-resume-logo-mark.dim_256x256.png"
                  alt="Beyond the Resume"
                  className="h-8 w-8"
                />
                <span className="text-lg font-bold text-foreground">Beyond the Resume</span>
              </Link>
              <p className="text-sm text-foreground">
                Exploring fair AI in recruitment and retention
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-sm text-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link to="/articles" className="text-sm text-foreground hover:text-foreground transition-colors">
                  Articles
                </Link>
                <Link to="/about" className="text-sm text-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link to="/newsletter" className="text-sm text-foreground hover:text-foreground transition-colors">
                  Newsletter
                </Link>
              </nav>
            </div>

            {/* Topics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Topics</h3>
              <nav className="flex flex-col gap-2">
                {topics.map((topic) => (
                  <button
                    key={topic.value}
                    onClick={() => handleTopicClick(topic.value)}
                    className="text-left text-sm text-foreground hover:text-foreground transition-colors"
                  >
                    {topic.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-seafoam text-center text-sm text-foreground">
            <p>
              © 2026. Built with ❤️ using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
