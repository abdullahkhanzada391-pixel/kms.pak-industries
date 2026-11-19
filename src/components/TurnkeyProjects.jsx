import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import TiltCard from './TiltCard';
import SpecularButton from './SpecularButton';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Factory, Cpu, Wrench, Zap, Sliders } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TurnkeyProjects() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const clipImageRef = useRef(null);
  const phasesListRef = useRef(null);

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

      // 2. Image Clipping Mask Reveal
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

      // 3. Execution Phases Stagger (Vertical on Mobile to Prevent Overflow, Horizontal on Desktop)
      if (phasesListRef.current) {
        const isMobile = window.innerWidth < 640;
        gsap.fromTo(
          phasesListRef.current.children,
          { opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
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
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-y border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Architectural Grid Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#C59B27]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12 lg:space-y-16">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C59B27] uppercase block mb-1">
            TURNKEY EPC METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
            Turnkey Project Delivery Stages.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#334155] leading-relaxed">
            From single-source electrical design and in-house switchgear fabrication to generator synchronization and lifecycle O&M contracts countrywide across Pakistan.
          </p>
        </div>

        {/* Turnkey Project Execution Lifecycle Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div ref={clipImageRef} className="will-change-transform rounded-2xl overflow-hidden shadow-warm-md">
              <TiltCard
                image="/assets/services/turnkey-site-engineering.jpg"
                alt="HK Power Industries On-Site Engineering Installation"
                title="On-Site Industrial Engineering Commissioning"
                subtitle="Full generator pad civil work, acoustic canopy placement, fuel piping, and resistive load banking."
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div ref={phasesListRef} className="space-y-3">
              {executionPhases.map((phase, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C59B27] transition-colors shadow-warm-xs"
                >
                  <span className="text-sm sm:text-base font-extrabold font-mono text-[#0B192C] bg-[#FFFBEB] border border-[#FDE68A] px-2.5 py-1 rounded shrink-0">
                    {phase.step}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0B192C]">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-snug">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <SpecularButton
                to="/contact"
                size="md"
                radius={14}
                tint="#0B192C"
                tintOpacity={1}
                hoverTint="#1E3A8A"
                textColor="#FFFFFF"
                lineColor="#F59E0B"
                baseColor="#071220"
                intensity={1.2}
                idleIntensity={0.35}
                thickness={1.4}
                glow={1.1}
                followMouse={true}
                className="font-bold text-xs uppercase tracking-wider min-h-[48px] px-6 py-3.5 shadow-warm-sm border border-[#C59B27]/40 w-full sm:w-auto"
              >
                <span>Discuss Your Project With Our Engineers</span>
                <ArrowRight className="w-4 h-4 text-[#F59E0B] transition-transform group-hover:translate-x-1" />
              </SpecularButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
