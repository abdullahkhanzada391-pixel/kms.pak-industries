import React, { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import { ShieldCheck, Award, Factory, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
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
        // Mask clip-path reveal
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

        // Subtle scale scrub as user continues scrolling past
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
      className="relative py-24 sm:py-32 bg-kps-dark border-t border-slate-900 overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Factory className="w-3.5 h-3.5" />
            <span>Company Profile & Engineering DNA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Engineering Service Provider Built On Precision, Trust & Quality.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Keen Power Solutions (KPS) is a premier engineering entity with established commands in electrical engineering, power generation, industrial fabrication, and turnkey energy infrastructure nationwide.
          </p>
        </div>

        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Authentic Editorial Story & Values */}
          <div ref={storyRef} className="lg:col-span-7 space-y-6">
            <div className="border-l-2 border-amber-500 pl-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 font-display">
                Delivering Excellence Without Interruption
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                KPS aspires for a leading market position by delivering best engineering services with customized products, reinforcing national and international brand alliances, and upholding the highest quality and ethical standards as the backbone of progressive growth.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              We raise the level of customer satisfaction through uncompromising field services and dedicated backup support for all our power equipment. By grouping highly qualified and experienced engineers, technicians, and specialized vendors, we conduct operations with top-tier legitimacy, contributing to technological progress and national infrastructure welfare.
            </p>

            {/* Core Capability Checklist */}
            <div className="pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3">
                Core Engineering Capabilities:
              </h4>
              <div ref={capabilitiesRef} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {capabilities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div ref={metricsRef} className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-3 bg-kps-card rounded-xl border border-slate-800 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">100+</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Satisfied Clients</span>
              </div>
              <div className="p-3 bg-kps-card rounded-xl border border-slate-800 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-100 font-display">2500</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Max kVA Range</span>
              </div>
              <div className="p-3 bg-kps-card rounded-xl border border-slate-800 text-center">
                <span className="block text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">24/7</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase">Emergency Service</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Depth Card with Mask Reveal */}
          <div ref={imageWrapperRef} className="lg:col-span-5 will-change-transform">
            <TiltCard
              image="/assets/services/generator-workshop.jpg"
              alt="Keen Power Solutions Generator Workshop and Engineering Facility"
              title="State-of-the-Art Generator Workshop"
              subtitle="Full testing facility, rebuild bays, load banking, and electrical synchronization testing at our Lahore engineering center."
              aspectRatio="aspect-[4/3]"
              maxTilt={10}
            >
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Head Office: Lahore, Pakistan</span>
                <span className="text-amber-400 font-semibold">NTN: 5561026-7</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
