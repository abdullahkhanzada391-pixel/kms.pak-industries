import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import { ShieldCheck, Award, Factory, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const storyRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const metricsRef = useRef(null);
  const imageWrapperRef = useRef(null);

  const capabilities = [
    'LT & HT Electrical Power Distribution & Synchronization Panels',
    'Industrial Diesel & Gas Generators (15 kVA to 2500 kVA)',
    'Heavy-Duty Acoustic & Weatherproof Soundproof Canopies',
    'Custom Fabrication, Fuel Piping Systems & Bulk Storage Tanks',
    'Commercial & Industrial Solar Photovoltaic Installations',
    'Commercial Kitchen Equipment & Heavy Exhaust Ducting Lines',
    'Fire Fighting Life Safety Equipment & Certified Installation',
    'Ultra-High-Resolution Indoor & Outdoor SMD Screen Video Walls'
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        headerRef.current.children,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      // 2. Story text entrance
      gsap.fromTo(
        storyRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: storyRef.current,
            start: 'top 82%',
          }
        }
      );

      // 3. Capabilities pills
      if (capabilitiesRef.current) {
        gsap.fromTo(
          capabilitiesRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: capabilitiesRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 4. Metrics entrance
      if (metricsRef.current) {
        gsap.fromTo(
          metricsRef.current.children,
          { opacity: 0, y: 25, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: metricsRef.current,
              start: 'top 90%',
            }
          }
        );
      }

      // 5. Image Mask Reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0.4 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Architectural Watermark */}
      <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-10 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-mono uppercase tracking-widest mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            <span>WHO WE ARE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0B192C] tracking-tight leading-tight">
            Engineering Solutions Built Around Your Needs.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#64748B] leading-relaxed">
            HK Power Industries is an established engineering service provider having commands in electrical products and services and engineering solutions.
          </p>
        </div>

        {/* Asymmetrical Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div ref={storyRef} className="space-y-5 sm:space-y-6 text-[#334155] leading-relaxed text-sm sm:text-base">
              <div className="border-l-2 border-[#C59B27] pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C59B27] font-bold block">
                  CORPORATE PHILOSOPHY & CAPABILITY
                </span>
                <h3 className="text-lg sm:text-2xl font-serif text-[#0B192C]">
                  Delivering Quality Engineering with Customized Products
                </h3>
              </div>

              <p>
                The products line ranges from LT Panels, HT Panels, generators, soundproof canopies, trolleys, power transmissions, distribution and synchronization panels, indoor outdoor LED lights, solar panels, and specialized commercial equipment.
              </p>

              <p className="text-xs sm:text-sm text-[#64748B]">
                HK Power Industries aspires for a leading market position by delivering best engineering services with customized products, reinforcing national and international brand alliances, and upholding best quality and ethical standards as the company's backbone of progressive growth.
              </p>

              {/* Subtle Learn More CTA */}
              <div className="pt-1">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 min-h-[44px] text-xs font-bold font-mono tracking-wider text-[#0B192C] uppercase hover:text-[#C59B27] active:scale-[0.98] transition-colors group"
                >
                  <span>Learn More About Our Capabilities</span>
                  <ArrowRight className="w-4 h-4 text-[#C59B27] transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Core Capabilities Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#0B192C] font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                <span>INTEGRATED ENGINEERING SCOPE:</span>
              </h4>
              <div ref={capabilitiesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs text-[#0B192C] bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-warm-sm hover:border-[#C59B27]/60 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Statistics Ribbon */}
            <div ref={metricsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-2 border-t border-[#E2E8F0]">
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-warm-sm flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#0B192C] block">
                    2500<span className="text-sm font-mono text-[#C59B27]"> kVA</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] block mt-0.5 sm:mt-1">
                    Peak Generator Capacity
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-warm-sm flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#0B192C] block">
                    100<span className="text-sm font-mono text-[#C59B27]">+</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] block mt-0.5 sm:mt-1">
                    Satisfied Clients
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-warm-sm flex sm:flex-col justify-between sm:justify-start items-center sm:items-start">
                <div>
                  <span className="text-2xl sm:text-3xl font-serif text-[#0B192C] block">
                    24/7
                  </span>
                  <span className="text-[11px] font-mono text-[#64748B] block mt-0.5 sm:mt-1">
                    Emergency Dispatch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Large Engineering Photograph with Frame */}
          <div className="lg:col-span-5 space-y-4">
            <div
              ref={imageWrapperRef}
              className="will-change-transform rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-warm-xl relative group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src="/assets/services/generator-workshop.jpg"
                  alt="HK Power Industries Central Engineering Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2E8F0] shadow-warm-md">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C59B27] block">
                    CENTRAL ENGINEERING FACILITY & WORKSHOP
                  </span>
                  <p className="text-xs text-[#0B192C] mt-0.5 leading-snug">
                    Engine testing bays, resistive load banking, switchgear assembly floor & field depot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
