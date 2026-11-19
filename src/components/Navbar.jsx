import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    scrollToTop();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Clients', path: '/partners' },
    { name: 'Contact', path: '/contact' },
  ];

  const isCurrent = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHomePage || mobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Only on Left Top */}
          <Link
            to="/"
            onClick={() => handleNavClick('/')}
            className="flex items-center group select-none min-h-[44px]"
            aria-label="HK Power Industries Home"
          >
            <img
              src={scrolled || !isHomePage || mobileMenuOpen ? '/assets/hk-power-logo.png' : '/assets/hk-power-logo-white.png'}
              alt="HK Power Industries Logo"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.src = '/assets/hk-power-logo.png';
              }}
            />
          </Link>

          {/* Desktop Navigation - Clean Spacing across Tablet & Desktop */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              const isLight = scrolled || !isHomePage;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative text-xs lg:text-sm tracking-wide font-medium transition-colors duration-200 py-2 px-1.5 min-h-[44px] flex items-center ${
                    active
                      ? (isLight ? 'text-[#0B192C] font-bold' : 'text-white font-bold')
                      : (isLight ? 'text-[#475569] hover:text-[#0B192C]' : 'text-white/80 hover:text-white')
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Animated Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border focus:outline-none transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 ${
                scrolled || !isHomePage || mobileMenuOpen
                  ? 'text-[#0B192C] border-[#E2E8F0] bg-white shadow-warm-xs'
                  : 'text-white border-white/30 bg-black/40 backdrop-blur-sm'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-x-0.5 bg-[#C59B27]'
                      : scrolled || !isHomePage
                      ? 'bg-[#0B192C]'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-200 ${
                    mobileMenuOpen
                      ? 'opacity-0 scale-x-0'
                      : scrolled || !isHomePage
                      ? 'bg-[#0B192C]'
                      : 'bg-white'
                  }`}
                />
                <span
                  className={`w-full h-0.5 rounded-full transition-all duration-300 transform origin-left ${
                    mobileMenuOpen
                      ? '-rotate-45 translate-x-0.5 bg-[#C59B27]'
                      : scrolled || !isHomePage
                      ? 'bg-[#0B192C]'
                      : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer & Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col animate-in fade-in duration-200">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-[#0B192C]/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Drawer Panel */}
          <div className="relative mt-[60px] sm:mt-[68px] flex-1 bg-white border-t border-[#E2E8F0] shadow-warm-2xl overflow-y-auto px-5 sm:px-6 py-6 flex flex-col justify-between space-y-6 animate-in slide-in-from-top-6 duration-300">
            {/* Primary Navigation Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#64748B] px-3 block mb-2 font-bold">
                NAVIGATION
              </span>
              {navLinks.map((link, idx) => {
                const active = isCurrent(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    style={{ animationDelay: `${idx * 40}ms` }}
                    className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 flex items-center justify-between min-h-[48px] active:scale-[0.99] ${
                      active
                        ? 'text-[#0B192C] bg-[#FFFBEB] font-bold border-l-4 border-[#C59B27] shadow-warm-xs'
                        : 'text-[#0B192C] hover:text-[#C59B27] hover:bg-[#F8FAFC] active:bg-[#F1F5F9]'
                    }`}
                  >
                    <span className="tracking-wide">{link.name}</span>
                    {active ? (
                      <span className="w-2 h-2 rounded-full bg-[#C59B27]" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#64748B]/60" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contact & Call to Action Cards */}
            <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
              {/* Highlighted Navy & Gold Contact CTA */}
              <Link
                to="/contact"
                onClick={() => handleNavClick('/contact')}
                className="btn-navy w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-warm-md min-h-[48px] active:scale-[0.98]"
              >
                <span>Request Project Quotation</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
              </Link>

              {/* Direct Tap-to-Call Button */}
              <a
                href="tel:04235957670"
                className="w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-[#0B192C] bg-white border border-[#E2E8F0] hover:bg-[#0B192C] hover:text-white hover:border-[#0B192C] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 transition-all duration-300 shadow-warm-xs min-h-[44px] group active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-[#C59B27] group-hover:text-[#F59E0B] transition-colors duration-300" />
                <span>Call: 0423 595 7670 (24/7 Desk)</span>
              </a>

              {/* Quick Info & Tax Registration */}
              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                  <span className="truncate text-[#0B192C]">Lahore HQ: 26B Block B, Nawab Town</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] text-[10px]">
                  <span>NTN: <strong className="text-[#0B192C]">5561026-7</strong></span>
                  <span>STRN: <strong className="text-[#0B192C]">3277876180555</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
