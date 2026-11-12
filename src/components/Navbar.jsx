import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

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
    { name: 'About Us', path: '/about' },
    { name: 'Products & Services', path: '/services' },
    { name: 'Maintenance', path: '/maintenance' },
    { name: 'Turnkey Projects', path: '/projects' },
    { name: 'Partners & Clients', path: '/partners' },
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
          ? 'bg-kps-dark/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden border border-amber-500/40 bg-slate-900 shadow-md group-hover:border-amber-400 transition-colors">
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
            <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-slate-100 group-hover:text-amber-400 transition-colors">
              KEEN POWER <span className="text-amber-400">SOLUTIONS</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Engineering Excellence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isCurrent(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-semibold tracking-wide transition-all py-1 relative ${
                  active
                    ? 'text-amber-400 font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400'
                    : 'text-slate-300 hover:text-amber-400 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="flex xl:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white border border-slate-800 rounded-lg bg-slate-900/80 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-kps-dark/98 backdrop-blur-xl border-b border-slate-800 px-5 pt-4 pb-7 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1.5 pt-2">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'text-amber-400 bg-amber-500/10 font-bold border-l-2 border-amber-400'
                      : 'text-slate-200 hover:text-amber-400 hover:bg-slate-900/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
