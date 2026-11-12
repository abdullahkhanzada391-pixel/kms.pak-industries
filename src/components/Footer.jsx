import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Phone, MapPin, Globe, Shield, Zap } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#111315] border-t border-[#343B37] text-[#929A96] text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#343B37]">
          {/* Col 1: Brand Info (col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#343B37] bg-[#24282A] shrink-0 group-hover:border-[#216447] transition-colors">
                <img
                  src="/assets/kps-logo-sq.jpg"
                  alt="Keen Power Solutions Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-display font-bold text-base text-[#E8ECE9] tracking-wider block group-hover:text-white transition-colors">
                  KEEN POWER <span className="text-[#216447]">SOLUTIONS</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#929A96] uppercase block">
                  ENGINEERING SERVICE PROVIDER
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#929A96] leading-relaxed pr-4">
              Quality-driven engineering entity having commands in electrical products and services, generator power plants (15–2500 kVA), fabrication, solar projects, and turnkey nationwide engineering solutions.
            </p>

            <div className="space-y-1 font-mono text-[11px] text-[#929A96]">
              <div>STRN: <span className="text-[#E8ECE9]">3277876180555</span></div>
              <div>NTN: <span className="text-[#E8ECE9]">5561026-7</span></div>
            </div>
          </div>

          {/* Col 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#E8ECE9] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Solutions</Link></li>
              <li><Link to="/maintenance" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Generator Maintenance</Link></li>
              <li><Link to="/projects" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Projects</Link></li>
              <li><Link to="/partners" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-[#E8ECE9] hover:text-[#B51F32] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Core Engineering Divisions (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#E8ECE9] font-bold">
              Engineering Divisions
            </h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">Diesel & Gas Generators (15–2500 kVA)</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">LT & HT Panels & ATS Switchgear</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">Acoustic Canopies & Fabrication</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">Solar Power (On-Grid / Off-Grid)</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">SMD Screens & LED Video Walls</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">Commercial Kitchen & Ducting</Link></li>
              <li><Link to="/services" className="hover:text-[#E8ECE9] transition-colors">Fire Fighting Life Safety Systems</Link></li>
            </ul>
          </div>

          {/* Col 4: Corporate Headquarters (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#E8ECE9] font-bold">
              Headquarters
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#216447] shrink-0 mt-0.5" />
                <span className="text-[#E8ECE9]">
                  26B Block B, Nawab Town, Raiwind Road, Lahore, Pakistan.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#216447] shrink-0" />
                <a href="tel:04235957670" className="text-[#E8ECE9] hover:text-[#B51F32] font-mono transition-colors">
                  0423 595 7670
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#216447] shrink-0" />
                <a href="http://www.kpspak.com" target="_blank" rel="noopener noreferrer" className="text-[#929A96] hover:text-[#E8ECE9] font-mono transition-colors">
                  www.kpspak.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-mono text-[#2E8B62] bg-[#174D38]/20 px-2.5 py-1 rounded border border-[#216447]/40 inline-block">
                ● 24/7 Field Dispatch Active
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#929A96]">
          <div>
            © {new Date().getFullYear()} Keen Power Solutions (KPS). All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#343B37] bg-[#181C1B] text-[#E8ECE9] hover:text-white hover:border-[#216447] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#216447]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
