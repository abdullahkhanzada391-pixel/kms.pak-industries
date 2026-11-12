import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Factory, Network, Cpu, Wrench, Zap, Sliders } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TurnkeyProjects() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const clipImageRef = useRef(null);
  const showcaseGridRef = useRef(null);
  const phasesListRef = useRef(null);

  const showcaseAreas = [
    {
      title: 'Electrical Panels',
      category: 'Switchgear Engineering',
      desc: 'Custom LT & HT distribution panels, ATS/AMF automatic changeover synchronization boards, and power factor capacitor banks.',
      image: '/assets/services/electrical-panel-switchgear.jpg',
      stat: 'IEC 61439 Certified'
    },
    {
      title: 'New & Used Generators',
      category: '15 – 2500 kVA',
      desc: 'Supplying brand-certified diesel and gas generators with Lovol, Perkins, Weichai, and Cummins power units.',
      image: '/assets/services/generator-cummins-perkins.jpg',
      stat: 'Prime & Standby'
    },
    {
      title: 'Generator Servicing & Overhauls',
      category: '24/7 Field Dispatch',
      desc: 'Complete engine rebuilds, top-end overhauls, radiator cleaning, and resistive load bank testing up to full load.',
      image: '/assets/services/generator-maintenance-engine.jpg',
      stat: '9-Point Protocol'
    },
    {
      title: 'Electrical Panel Maintenance',
      category: 'Thermal Diagnostics',
      desc: 'Thermographic busbar inspection, contactor replacements, protection relay calibration, and power factor optimization.',
      image: '/assets/services/electrical-ats-panel.jpg',
      stat: 'Zero Downtime'
    },
    {
      title: 'Complete Engineering Solutions',
      category: 'Turnkey EPC Scope',
      desc: 'Integrated civil pad construction, acoustic canopy fabrication, exhaust ducting, fuel piping, and final handover.',
      image: '/assets/services/turnkey-engineering-facility.jpg',
      stat: 'Turnkey Single-Source'
    }
  ];

  const executionPhases = [
    { step: '01', title: 'Power Load Audit & SLD Electrical Design', desc: 'Comprehensive engineering calculation of peak starting inrush, harmonics, and cable sizing.' },
    { step: '02', title: 'Engine Selection & Switchgear Manufacturing', desc: 'Fabricating matching LT/HT distribution panels and synchronizing generator controllers.' },
    { step: '03', title: 'Acoustic Canopy, Fuel Piping & Civil Setup', desc: 'In-house heavy steel fabrication of soundproof enclosures and certified fuel storage tanks.' },
    { step: '04', title: 'Resistive Load Banking & Commissioning', desc: 'Full capacity testing under realistic step-loads with thermal imaging certification.' },
    { step: '05', title: 'Handover & Nationwide AMC Operations', desc: '24/7 emergency dispatch coverage, genuine OEM filters, and dedicated maintenance teams.' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 2. Showcase Grid Stagger
      if (showcaseGridRef.current) {
        gsap.fromTo(
          showcaseGridRef.current.children,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: showcaseGridRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 3. Image Clipping Mask Reveal
      if (clipImageRef.current) {
        gsap.fromTo(
          clipImageRef.current,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', scale: 1.06, opacity: 0.3 },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: clipImageRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // 4. Execution Phases Stagger
      if (phasesListRef.current) {
        gsap.fromTo(
          phasesListRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: phasesListRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="turnkey"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0D2E21] via-[#174D38] to-[#0A2017] border-y-2 border-[#216447]/60 overflow-hidden shadow-2xl"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-industrial-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#2E8B62]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header with Exact Prompt Heading */}
        <div ref={headerRef} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2E21]/80 border border-[#216447] text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4 shadow-md">
            <Network className="w-3.5 h-3.5 text-[#2E8B62]" />
            <span>FOREST GREEN FEATURE DIVISION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
            ENGINEERED FROM CONCEPT TO COMPLETION.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E8ECE9]/85 leading-relaxed">
            From single-source electrical design and in-house switchgear fabrication to generator synchronization and lifecycle O&M contracts countrywide across Pakistan.
          </p>
        </div>

        {/* Core Showcase: Electrical Panels, Generators, Servicing, Maintenance, Complete Solutions */}
        <div ref={showcaseGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseAreas.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border overflow-hidden shadow-2xl transition-all duration-300 flex flex-col justify-between group ${
                idx === 4
                  ? 'md:col-span-2 lg:col-span-2 bg-[#0D2E21]/90 border-[#216447]'
                  : 'bg-[#0D2E21]/80 border-[#216447]/50 hover:border-[#2E8B62]'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0A2017]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2E21] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#2E8B62] bg-[#0A2017]/90 px-2.5 py-1 rounded border border-[#216447]">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#E8ECE9] bg-[#0A2017]/90 px-2 py-0.5 rounded border border-[#216447]/60">
                    {item.stat}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#E8ECE9] font-display group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#E8ECE9]/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Prominent Crimson Call-to-Action Card */}
          <div className="rounded-2xl border border-[#B51F32]/60 bg-gradient-to-br from-[#B51F32]/25 via-[#0D2E21] to-[#0A2017] p-7 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#E83E55] uppercase block">
                TURNKEY CONSULTATION
              </span>
              <h3 className="text-2xl font-extrabold text-[#E8ECE9] font-display leading-snug">
                Have a Complex Industrial Power Project?
              </h3>
              <p className="text-xs text-[#E8ECE9]/80 leading-relaxed">
                Connect directly with our senior power engineers for single-line designs, equipment supply, and custom switchgear manufacturing.
              </p>
            </div>

            <Link
              to="/contact"
              className="btn-crimson inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider w-full shadow-xl"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Turnkey Project Execution Lifecycle Split */}
        <div className="pt-8 border-t border-[#216447]/40 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div ref={clipImageRef} className="will-change-transform rounded-2xl overflow-hidden border border-[#216447] shadow-2xl">
              <TiltCard
                image="/assets/services/turnkey-site-engineering.jpg"
                alt="Keen Power Solutions On-Site Engineering Installation"
                title="On-Site Industrial Engineering Commissioning"
                subtitle="Full generator pad civil work, acoustic canopy placement, fuel piping, and resistive load bank testing."
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#E8ECE9] font-display mb-3">
              Turnkey Project Delivery Stages
            </h3>

            <div ref={phasesListRef} className="space-y-2.5">
              {executionPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-3.5 rounded-xl bg-[#0D2E21]/70 border border-[#216447]/50 hover:border-[#2E8B62] transition-colors"
                >
                  <span className="text-base font-extrabold font-mono text-[#2E8B62] bg-[#0A2017] border border-[#216447] px-2.5 py-1 rounded shrink-0">
                    {phase.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#E8ECE9]">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-[#E8ECE9]/75 mt-0.5 leading-snug">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
