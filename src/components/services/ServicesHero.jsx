import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function ServicesHero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageFrameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 640;

      // Entrance animations with slight stagger
      gsap.fromTo(
        '.hero-animate-text',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        imageFrameRef.current,
        { opacity: 0, scale: 0.96, x: isMobile ? 0 : 20, y: isMobile ? 16 : 0 },
        { opacity: 1, scale: 1, x: 0, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToCatalog = (e) => {
    e.preventDefault();
    const target = document.getElementById('services-catalog');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-white pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-slate-100"
    >
      {/* Subtle Architectural Grid Background Accent (Pure 70% White base) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#102C4E 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
        aria-hidden="true"
      />

      {/* Subtle Golden Geometric Guide Line */}
      <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-[#C8A34D]/20 via-[#C8A34D]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Copy & CTAs (7 cols) */}
          <div ref={textRef} className="lg:col-span-7 space-y-6">
            
            {/* Main Headline */}
            <h1 className="hero-animate-text text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#102C4E] tracking-tight leading-[1.15]">
              Engineering Solutions <br className="hidden sm:inline" />
              <span className="relative inline-block">
                Built for Performance.
                {/* Underline Golden Accent Line */}
                <span className="absolute left-0 -bottom-1.5 w-full h-[3px] bg-gradient-to-r from-[#C8A34D] via-[#C8A34D]/80 to-transparent rounded-full" />
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="hero-animate-text text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed font-normal">
              From power generation and electrical engineering to industrial fabrication and renewable energy, 
              KPS delivers comprehensive engineering solutions designed to keep businesses running efficiently.
            </p>

            {/* CTAs */}
            <div className="hero-animate-text flex flex-wrap items-center gap-4 pt-4">
              {/* Primary CTA */}
              <button
                onClick={scrollToCatalog}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#102C4E] hover:bg-[#1E5A91] text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md active:translate-y-0.5"
              >
                <span>Explore Our Services</span>
                <ArrowDown className="w-4 h-4 text-[#C8A34D] transition-transform duration-200 group-hover:translate-y-0.5" />
              </button>

              {/* Secondary CTA */}
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-gradient-to-r hover:from-[#C59B27] hover:to-[#F59E0B] text-[#102C4E] hover:text-[#0B192C] font-semibold text-sm border border-[#102C4E]/20 hover:border-[#F59E0B] transition-all duration-300 shadow-sm hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Request a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0B192C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </Link>
            </div>

          </div>

          {/* Right Column: Industrial Hero Visual with Geometric Framing (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageFrameRef}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Geometric Golden Frame Offset */}
              <div 
                className="absolute -top-3 -right-3 w-full h-full border-2 border-[#C8A34D]/40 rounded-2xl pointer-events-none transform translate-x-1 translate-y-1"
                aria-hidden="true"
              />

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/assets/services/turnkey-engineering-facility.webp"
                  alt="HK Power Industries Engineering Facility & Plant Assembly"
                  width="389"
                  height="280"
                  className="w-full h-full object-cover object-top filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/services/generator-workshop.jpg';
                  }}
                />
                
                {/* Subtle Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/85 via-[#0B192C]/20 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/95 z-10 pointer-events-none">
                  <div>
                    <p className="text-[11px] font-mono tracking-wider uppercase text-[#C8A34D]">
                      ENGINEERING FACILITY
                    </p>
                    <p className="text-sm font-semibold tracking-tight text-white">
                      Full-Scale Assembly & Load Banking
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
