import React, { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import { ShieldCheck, Award, Factory, Cpu, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
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
    'Custom Fabrication, Fuel Piping Systems & Storage Tanks',
    'On-Grid, Off-Grid & Hybrid Solar Energy Installations',
    'Commercial Kitchen Equipment & Heavy Ducting Systems',
    'Fire Fighting Equipment Supply & Certified Field Installation',
    'Ultra-High-Resolution Indoor & Outdoor SMD Screen Displays'
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

      // 2. Story block & text reveal
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

      // 3. Capabilities pills staggered
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

      // 4. Metrics counters pop
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

      // 5. Image Mask Reveal & Subtle Scale on Scroll
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', opacity: 0.3 },
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

        gsap.to(imageWrapperRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 bg-[#181C1B] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[#174D38]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#216447]" />
            <span>WHO WE ARE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
            An Established Engineering Entity Built on Technical Precision.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#929A96] leading-relaxed">
            Keen Power Solutions (KPS) is a premier Pakistani engineering service provider delivering heavy electrical power generation, switchgear manufacturing, industrial fabrication, and nationwide turnkey infrastructure.
          </p>
        </div>

        {/* Asymmetrical Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 space-y-8">
            <div ref={storyRef} className="space-y-6 text-[#929A96] leading-relaxed text-base">
              <div className="border-l-2 border-[#216447] pl-5 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#2E8B62] font-bold block">
                  CORPORATE HERITAGE & PROFILE
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#E8ECE9] font-display">
                  Delivering Best Engineering Services with Customized Products
                </h3>
              </div>

              <p>
                Keen Power Solutions (KPS) is an engineering service provider having commands in electrical products and services and engineering solutions. The products line ranges from LT Panels, HT Panels, generators, soundproof canopies, trolleys, power transmissions, distribution and synchronization panels, indoor outdoor LED lights, solar panels, and specialized commercial equipment.
              </p>

              <p>
                KPS aspires for a leading market position by delivering best engineering services with customized products, reinforcing national and international brand alliances, and upholding best quality and ethical standards as the company's backbone of progressive growth.
              </p>
            </div>

            {/* Core Capabilities Pills */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8ECE9] font-bold mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B51F32]" />
                <span>INTEGRATED ENGINEERING SCOPE:</span>
              </h4>
              <div ref={capabilitiesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capabilities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#E8ECE9] bg-[#24282A] p-3 rounded-lg border border-[#343B37] hover:border-[#216447] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#216447] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Milestones */}
            <div ref={metricsRef} className="grid grid-cols-3 gap-4 pt-4 border-t border-[#343B37]">
              <div className="p-4 rounded-xl bg-[#24282A] border border-[#343B37]">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E8ECE9] font-display block">
                  2500<span className="text-sm font-mono text-[#216447]"> kVA</span>
                </span>
                <span className="text-[11px] font-mono text-[#929A96] block mt-1">
                  Peak Generator Capacity
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#24282A] border border-[#343B37]">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E8ECE9] font-display block">
                  100<span className="text-sm font-mono text-[#B51F32]">+</span>
                </span>
                <span className="text-[11px] font-mono text-[#929A96] block mt-1">
                  Verified Clients
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#24282A] border border-[#343B37]">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E8ECE9] font-display block">
                  24/7
                </span>
                <span className="text-[11px] font-mono text-[#929A96] block mt-1">
                  Emergency Dispatch
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Large Industrial Engineering Image with Subtle Mask Reveal */}
          <div className="lg:col-span-5 space-y-5">
            <div
              ref={imageWrapperRef}
              className="will-change-transform rounded-2xl overflow-hidden border border-[#343B37] bg-[#24282A] shadow-2xl relative group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111315]">
                <img
                  src="/assets/services/generator-workshop.jpg"
                  alt="Keen Power Solutions Central Engineering Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111315] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#181C1B]/90 backdrop-blur-md border border-[#343B37]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2E8B62] block">
                    LAHORE HEADQUARTERS & WORKSHOP
                  </span>
                  <p className="text-xs text-[#E8ECE9] mt-0.5 leading-snug">
                    Rebuild bays, resistive load banking, switchgear assembly floor & field depot.
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Tax Identification Box */}
            <div className="bg-[#24282A] p-5 rounded-xl border border-[#343B37] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#929A96]">Sales Tax Registration (STRN):</span>
                <span className="text-[#E8ECE9] font-bold">3277876180555</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#929A96]">National Tax Number (NTN):</span>
                <span className="text-[#E8ECE9] font-bold">5561026-7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
