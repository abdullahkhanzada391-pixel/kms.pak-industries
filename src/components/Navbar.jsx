import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Solutions', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Partners', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || location.pathname !== '/'
          ? 'bg-[#181C1B]/95 backdrop-blur-md border-b border-[#343B37] py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#111315]/90 via-[#111315]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-[#343B37] bg-[#24282A] shadow-md group-hover:border-[#216447] transition-colors">
            <img
              src="/assets/kps-logo-sq.jpg"
              alt="Keen Power Solutions Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/kps-logo.jpg';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-[#E8ECE9] group-hover:text-white transition-colors">
              KEEN POWER <span className="text-[#216447] group-hover:text-[#2E8B62] transition-colors">SOLUTIONS</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#929A96] uppercase">
              Engineering Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isCurrent(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold tracking-wider uppercase transition-all py-1.5 relative ${
                  active
                    ? 'text-[#E8ECE9] font-bold'
                    : 'text-[#929A96] hover:text-[#E8ECE9]'
                }`}
              >
                <span>{link.name}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#216447] rounded-full shadow-[0_0_8px_rgba(33,100,71,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side: Crimson "Get a Quote" CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="btn-crimson inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            <span>Get a Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-3">
          <Link
            to="/contact"
            className="btn-crimson px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider"
          >
            <span>Quote</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#E8ECE9] hover:text-white border border-[#343B37] rounded-lg bg-[#24282A] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181C1B]/98 backdrop-blur-xl border-b border-[#343B37] px-5 pt-4 pb-7 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    active
                      ? 'text-[#E8ECE9] bg-[#174D38]/30 font-bold border-l-2 border-[#216447]'
                      : 'text-[#929A96] hover:text-[#E8ECE9] hover:bg-[#24282A]'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-2 h-2 rounded-full bg-[#216447]" />}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#343B37]">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-crimson w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
