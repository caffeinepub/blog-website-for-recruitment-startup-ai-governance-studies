import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu, X, Mail, Linkedin } from 'lucide-react';
import { useState } from 'react';
import LoginButton from '../auth/LoginButton';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { SiCoffeescript } from 'react-icons/si';
import { PUBLIC_CONTACT } from '../../config/publicContact';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isAuthenticated = !!identity;

  const navLinks = [
    { href: '/recruitment', label: 'Recruitment' },
    { href: '/attrition', label: 'Attrition' },
    { href: '/invariant', label: 'Invariant' },
  ];

  if (isAuthenticated && isAdmin) {
    navLinks.push({ href: '/admin', label: 'Admin' });
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img
                src="/assets/generated/invariant-logo-convergence-neon.dim_256x256.png"
                alt="INVARIANT Logo"
                className="h-10 w-10 object-contain"
              />
              <div className="hidden sm:block">
                <span className="font-bold text-lg text-white">INVARIANT</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={currentPath === link.href ? 'default' : 'ghost'}
                    className="text-sm font-medium"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
              <div className="ml-4">
                <LoginButton />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-primary/10 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-primary/20">
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} to={link.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant={currentPath === link.href ? 'default' : 'ghost'}
                      className="w-full justify-start text-sm font-medium"
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <div className="pt-2">
                  <LoginButton />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2026. Built with</span>
              <SiCoffeescript className="h-4 w-4 text-primary" />
              <span>using</span>
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors underline"
              >
                caffeine.ai
              </a>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/articles" className="text-gray-400 hover:text-primary transition-colors">
                Articles
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                About
              </Link>
              <a
                href={`mailto:${PUBLIC_CONTACT.email}`}
                className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={PUBLIC_CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
