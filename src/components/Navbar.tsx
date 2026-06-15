import { useState, useEffect } from 'react';
import { Menu, X, Phone, Sparkles } from 'lucide-react';
import type { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

export default function Navbar({ currentPage, navigateTo }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { page: Page; label: string }[] = [
    { page: 'home', label: 'Accueil' },
    { page: 'gallery', label: 'Réalisations' },
    { page: 'pricing', label: 'Tarifs' },
    { page: 'booking', label: 'Réservation' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-sport-500 to-sport-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-sport-500/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white tracking-tight">
                Nova Detail
              </span>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase hidden sm:block">
                Premium Detailing
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => navigateTo(page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* CTA Button & Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0493921474"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">04 93 92 14 74</span>
            </a>
            <button
              onClick={() => navigateTo('booking')}
              className="btn-primary text-sm"
            >
              Réserver
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-navy-900/98 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-6 space-y-2">
          {navLinks.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => {
                navigateTo(page);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                currentPage === page
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href="tel:0493921474"
              className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">04 93 92 14 74</span>
            </a>
            <button
              onClick={() => {
                navigateTo('booking');
                setIsMobileMenuOpen(false);
              }}
              className="w-full btn-primary mt-2"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
