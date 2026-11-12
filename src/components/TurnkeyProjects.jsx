import React, { useEffect, useRef } from 'react';
import TiltCard from './TiltCard';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Factory, Network } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TurnkeyProjects() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const clipImageRef = useRef(null);
  const stepsListRef = useRef(null);

  const phases = [
    {
      step: '01',
      title: 'Power Load Audit & Electrical Design',
      desc: 'Engineers perform comprehensive single-line diagrams (SLD), transient motor starting calculations, and fault-current analysis.'
    },
    {
      step: '02',
      title: 'Equipment Supply & Generator Selection',
      desc: 'Sourcing of prime/standby diesel or gas generators (Lovol, Perkins, Weichai, Cummins) matched to precision duty requirements.'
    },
    {
      step: '03',
      title: 'Custom In-House Switchgear Fabrication',
      desc: 'Manufacturing of LT/HT distribution panels, ATS/AMF automatic changeover boards, and power factor correction banks.'
    },
    {
      step: '04',
      title: 'On-Site Civil, Mechanical & Fuel Piping',
      desc: 'Foundation pad engineering, soundproof acoustic canopy placement, exhaust ducting, and certified bulk fuel tank piping.'
    },
    {
      step: '05',
      title: 'Commissioning, Load Banking & Handover',
      desc: 'Full-load resistive bank testing, thermal imaging of busbars, protection relay calibration, and operator handover training.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
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

      // 2. Image Clipping Reveal (Horizontal Curtain Wipe)
      if (clipImageRef.current) {
        gsap.fromTo(
          clipImageRef.current,
          { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', scale: 1.08, opacity: 0.3 },
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

      // 3. Staggered Timeline Steps
      if (stepsListRef.current) {
        gsap.fromTo(
          stepsListRef.current.children,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsListRef.current,
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
      className="relative py-24 sm:py-32 bg-kps-surface border-t border-slate-900 overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Network className="w-3.5 h-3.5" />
            <span>End-to-End Execution</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Turnkey Engineering Solutions Countrywide.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From initial design to commissioning and long-term lifecycle support, KPS provides unified single-source engineering accountability for industrial and commercial projects across Pakistan.
          </p>
        </div>

        {/* Clean Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image with Clipping Mask Reveal */}
          <div className="lg:col-span-6 space-y-6">
            <div ref={clipImageRef} className="will-change-transform rounded-xl overflow-hidden">
              <TiltCard
                image="/assets/services/turnkey-engineering-facility.jpg"
                alt="Keen Power Solutions Turnkey Project Facility"
                title="Industrial Power Generation & Panel Infrastructure"
                subtitle="Turnkey substation, ATS synchronization board, and acoustic generator installation executed for premier commercial facilities."
                aspectRatio="aspect-[16/11]"
                maxTilt={8}
              >
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Integrated Engineering EPC</span>
                  <span className="text-amber-400 font-semibold">100% In-House Execution</span>
                </div>
              </TiltCard>
            </div>

            {/* Turnkey Pillars Banner */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-kps-card border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold text-sm block">Turnkey Deliverables</span>
                <p className="text-xs text-slate-400">
                  Panels + Generators + Ducting + Fabrication + Maintenance under single contract.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-kps-card border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold text-sm block">Countrywide Service</span>
                <p className="text-xs text-slate-400">
                  Rapid engineering dispatch covering Lahore, Karachi, Islamabad, and industrial hubs.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 5-Stage Turnkey Process Timeline */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-100 font-display mb-4">
              Turnkey Project Execution Lifecycle
            </h3>

            <div ref={stepsListRef} className="space-y-3">
              {phases.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-kps-card/70 border border-slate-800/80 hover:border-amber-500/40 hover:bg-kps-card transition-all will-change-transform"
                >
                  <span className="text-lg font-extrabold font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg shrink-0">
                    {p.step}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-200">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl transition-all"
              >
                <span>Discuss Your Turnkey Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
