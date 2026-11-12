import React, { useEffect, useRef } from 'react';
import { Handshake, Award, ShieldCheck, CheckCircle2, Users, Building, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersClients() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const counterCardRef = useRef(null);
  const counterNumRef = useRef(null);
  const alliancesRef = useRef(null);
  const marqueeContainerRef = useRef(null);

  // 28 real client & partner logos extracted from KPS company profile
  const allLogos = Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    src: `/assets/clients/client-partner-${i + 1}.jpg`,
    alt: `KPS Corporate Partner & Client Account ${i + 1}`
  }));

  const row1Logos = allLogos.slice(0, 14);
  const row2Logos = allLogos.slice(14, 28);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (counterNumRef.current) counterNumRef.current.innerText = '100';
      return;
    }

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

      // 2. Animated Number Counter for 100+ Satisfied Clients Statistic
      if (counterCardRef.current && counterNumRef.current) {
        // Card entrance
        gsap.fromTo(
          counterCardRef.current,
          { opacity: 0, scale: 0.92, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: counterCardRef.current,
              start: 'top 85%',
            }
          }
        );

        // Smooth counter tween from 0 to 100
        const counterObj = { val: 0 };
        gsap.to(counterObj, {
          val: 100,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counterCardRef.current,
            start: 'top 85%',
          },
          onUpdate: () => {
            if (counterNumRef.current) {
              counterNumRef.current.innerText = Math.round(counterObj.val);
            }
          }
        });
      }

      // 3. OEM Alliances Strip Entrance
      if (alliancesRef.current) {
        gsap.fromTo(
          alliancesRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: alliancesRef.current,
              start: 'top 88%',
            }
          }
        );
      }

      // 4. Logo Marquee Container Reveal
      if (marqueeContainerRef.current) {
        gsap.fromTo(
          marqueeContainerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marqueeContainerRef.current,
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
      id="partners"
      className="relative py-24 sm:py-32 bg-[#111315] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#174D38]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header & Milestone Metric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div ref={headerRef} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4">
              <Handshake className="w-3.5 h-3.5 text-[#216447]" />
              <span>National Alliances & Corporate Relationships</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
              Trusted by Industry Leaders Across Pakistan.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#929A96] leading-relaxed">
              Forging enduring alliances with global power equipment manufacturers and delivering mission-critical energy uptime to leading industrial conglomerates, textile mills, financial institutions, and hospitals.
            </p>
          </div>

          {/* 100+ Satisfied Clients Milestone Metric Card (Section 12: ACHIEVEMENTS) */}
          <div
            ref={counterCardRef}
            className="bg-gradient-to-br from-[#24282A] via-[#181C1B] to-[#111315] p-7 rounded-2xl border border-[#343B37] shadow-2xl shrink-0 min-w-[290px] text-center lg:text-left relative overflow-hidden group hover:border-[#216447] transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#174D38]/15 rounded-full blur-2xl group-hover:bg-[#174D38]/25 transition-colors" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#2E8B62] uppercase">
                OFFICIAL TRACK RECORD
              </span>
              <ShieldCheck className="w-4 h-4 text-[#216447]" />
            </div>
            <div className="flex items-baseline justify-center lg:justify-start gap-1">
              <span
                ref={counterNumRef}
                className="text-5xl sm:text-6xl font-extrabold text-[#E8ECE9] font-display tabular-nums"
              >
                0
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#B51F32] font-display">
                +
              </span>
              <span className="text-xl font-bold text-[#E8ECE9] font-display ml-2">
                CLIENTS
              </span>
            </div>
            <span className="text-xs text-[#929A96] font-mono block mt-1.5">
              100+ Satisfied Corporate Clients
            </span>
            <div className="mt-3.5 pt-3 border-t border-[#343B37] flex items-center justify-between text-[11px] font-mono text-[#929A96]">
              <span>National Operations</span>
              <span className="text-[#2E8B62] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#216447] animate-pulse" />
                Verified Track Record
              </span>
            </div>
          </div>
        </div>

        {/* Global OEM Engine & Electrical Alliances Strip */}
        <div
          ref={alliancesRef}
          className="p-6 rounded-2xl bg-[#181C1B] border border-[#343B37] space-y-3.5 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#929A96] gap-1">
            <span className="font-bold uppercase tracking-wider text-[#2E8B62]">
              GLOBAL OEM BRAND ALLIANCES & TECHNOLOGY PARTNERS:
            </span>
            <span>Certified Integration, Genuine Spares & Field Service</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs sm:text-sm font-display font-bold text-[#E8ECE9]">
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">PERKINS</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">CUMMINS</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">LOVOL</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">WEICHAI</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">DEEP SEA ELECTRONICS</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">SCHNEIDER ELECTRIC</span>
            <span className="px-4 py-2 rounded-lg bg-[#24282A] border border-[#343B37] text-[#E8ECE9] hover:border-[#216447] transition-colors">ABB</span>
          </div>
        </div>

        {/* Section 13: Continuous Smooth Logo Marquee with Pause on Hover */}
        <div ref={marqueeContainerRef} className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#929A96] pb-2 border-b border-[#343B37]">
            <span className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#216447]" />
              <span>OFFICIAL CLIENT & PARTNER MARQUEE</span>
            </span>
            <span className="text-[11px] text-[#929A96] hidden sm:inline">
              Hover over marquee to pause & inspect
            </span>
          </div>

          {/* Marquee Wrapper with edge masks and pause-on-hover */}
          <div className="relative overflow-hidden marquee-mask pause-on-hover py-2 space-y-4">
            {/* Track 1: Gliding Left */}
            <div className="overflow-hidden">
              <div className="animate-marquee-left flex gap-4 items-center">
                {row1Logos.map((item) => (
                  <div
                    key={`r1-a-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-[#24282A] border border-[#343B37] p-3.5 flex items-center justify-center shrink-0 hover:border-[#216447] hover:bg-[#2C3234] transition-all duration-300 shadow-md group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicate set of row1 for seamless loop */}
                {row1Logos.map((item) => (
                  <div
                    key={`r1-b-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-[#24282A] border border-[#343B37] p-3.5 flex items-center justify-center shrink-0 hover:border-[#216447] hover:bg-[#2C3234] transition-all duration-300 shadow-md group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 2: Gliding Right */}
            <div className="overflow-hidden">
              <div className="animate-marquee-right flex gap-4 items-center">
                {row2Logos.map((item) => (
                  <div
                    key={`r2-a-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-[#24282A] border border-[#343B37] p-3.5 flex items-center justify-center shrink-0 hover:border-[#216447] hover:bg-[#2C3234] transition-all duration-300 shadow-md group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* Duplicate set of row2 for seamless loop */}
                {row2Logos.map((item) => (
                  <div
                    key={`r2-b-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-[#24282A] border border-[#343B37] p-3.5 flex items-center justify-center shrink-0 hover:border-[#216447] hover:bg-[#2C3234] transition-all duration-300 shadow-md group"
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
