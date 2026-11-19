import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
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

  return (
    <footer className="relative bg-[#0B192C] border-t border-[#1E3A8A] text-slate-300 text-xs font-sans overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/footer-generator.webp"
          alt="HK Power Industries Generator Facility"
          className="w-full h-full object-cover object-center scale-105"
          loading="lazy"
        />
        {/* Dark Navy Atmospheric Overlays for crisp text contrast */}
        <div className="absolute inset-0 bg-[#0B192C]/85 backdrop-blur-[1.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-[#0B192C]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B192C]/95 via-[#0B192C]/80 to-[#0B192C]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-12 border-b border-[#1E3A8A]/60">
          {/* Col 1: Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#1E3A8A] bg-white shrink-0 shadow-sm transition-transform group-hover:scale-105 p-1 flex items-center justify-center">
                <img
                  src="/assets/hk-power-logo.png"
                  alt="HK Power Industries Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white tracking-wider block group-hover:text-[#F59E0B] transition-colors">
                  HK POWER <span className="text-[#F59E0B] font-sans font-extrabold">INDUSTRIES</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block">
                  ENGINEERED FOR POWER
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-300/90 leading-relaxed sm:pr-4 font-sans">
              Quality-driven engineering entity having commands in electrical products and services, generator power plants (15–2500 kVA), fabrication, solar projects, and turnkey nationwide engineering solutions.
            </p>
          </div>

          {/* Col 2: Navigation Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/" onClick={scrollToTop} className="hover:text-[#F59E0B] transition-colors py-1 inline-block">Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop} className="hover:text-[#F59E0B] transition-colors py-1 inline-block">About Us</Link></li>
              <li><Link to="/services" onClick={scrollToTop} className="hover:text-[#F59E0B] transition-colors py-1 inline-block">Solutions</Link></li>
              <li><Link to="/projects" onClick={scrollToTop} className="hover:text-[#F59E0B] transition-colors py-1 inline-block">Projects</Link></li>
              <li><Link to="/contact" onClick={scrollToTop} className="hover:text-[#F59E0B] transition-colors py-1 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Corporate Headquarters (col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-bold">
              Headquarters
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span className="text-white leading-snug">
                  26B Block B, Nawab Town, Raiwind Road, Lahore, Pakistan.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <a href="tel:04235957670" className="text-white hover:text-[#F59E0B] font-mono transition-colors min-h-[44px] flex items-center font-bold">
                  0423 595 7670
                </a>
              </div>

              {/* Map Location */}
              <div className="pt-1">
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-[#1E3A8A] bg-[#07101E] shadow-inner">
                  <iframe
                    title="HK Power Industries Head Office Location Map"
                    src="https://maps.google.com/maps?q=26B+Block+B,+Nawab+Town,+Raiwind+Road,+Lahore,+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 filter contrast-[1.05] opacity-90 transition-opacity duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} HK Power Industries. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
