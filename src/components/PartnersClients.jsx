import React, { useEffect, useRef, useState } from 'react';
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
          duration: 2.4,
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
      className="relative py-24 sm:py-32 bg-kps-dark border-t border-slate-900 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header & Milestone Metric */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div ref={headerRef} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
              <Handshake className="w-3.5 h-3.5" />
              <span>National Alliances & Corporate Relationships</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              Trusted by Industry Leaders Across Pakistan.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Forging enduring alliances with global power equipment manufacturers and delivering mission-critical energy uptime to leading industrial conglomerates, textile mills, financial institutions, and hospitals.
            </p>
          </div>

          {/* 100+ Satisfied Clients Milestone Metric Card (GSAP ScrollTrigger Animated) */}
          <div
            ref={counterCardRef}
            className="bg-gradient-to-br from-kps-card via-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl border border-amber-500/40 shadow-2xl shrink-0 min-w-[280px] text-center lg:text-left relative overflow-hidden group hover:border-amber-400 transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors" />
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                OFFICIAL TRACK RECORD
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-center lg:justify-start gap-1">
              <span
                ref={counterNumRef}
                className="text-5xl sm:text-6xl font-extrabold text-white font-display tabular-nums"
              >
                0
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-display">
                +
              </span>
              <span className="text-xl font-bold text-amber-400/90 font-display ml-2">
                CLIENTS
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono block mt-1.5">
              100+ Verified Corporate Client Portfolio
            </span>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>National Operations</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Verified
              </span>
            </div>
          </div>
        </div>

        {/* Global OEM Engine & Electrical Alliances Strip */}
        <div
          ref={alliancesRef}
          className="p-6 rounded-2xl bg-kps-surface border border-slate-800 space-y-3.5 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-1">
            <span className="font-bold uppercase tracking-wider text-amber-400">
              GLOBAL OEM BRAND ALLIANCES & TECHNOLOGY PARTNERS:
            </span>
            <span>Certified Integration, Genuine Spares & Field Service</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs sm:text-sm font-display font-bold text-slate-300">
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">PERKINS</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">CUMMINS</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">LOVOL</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">WEICHAI</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">DEEP SEA ELECTRONICS</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">SCHNEIDER ELECTRIC</span>
            <span className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:border-amber-500/40 hover:text-amber-300 transition-colors">ABB</span>
          </div>
        </div>

        {/* Continuous Smooth Logo Marquee with Pause on Hover */}
        <div ref={marqueeContainerRef} className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              <span>CORPORATE CLIENT & ALLIANCE MARQUEE</span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Hover over marquee to inspect logos
            </span>
          </div>

          {/* Marquee Wrapper with edge masks and pause-on-hover */}
          <div className="relative overflow-hidden marquee-mask pause-on-hover py-2 space-y-4">
            {/* Track 1: Gliding Left */}
            <div className="overflow-hidden">
              <div className="animate-marquee-left flex gap-4 items-center">
                {/* First set of row1 */}
                {row1Logos.map((item) => (
                  <div
                    key={`r1-a-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-slate-900/90 border border-slate-800/90 p-3.5 flex items-center justify-center shrink-0 hover:border-amber-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md group"
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
                    className="w-40 sm:w-48 h-24 rounded-xl bg-slate-900/90 border border-slate-800/90 p-3.5 flex items-center justify-center shrink-0 hover:border-amber-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md group"
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
                {/* First set of row2 */}
                {row2Logos.map((item) => (
                  <div
                    key={`r2-a-${item.id}`}
                    className="w-40 sm:w-48 h-24 rounded-xl bg-slate-900/90 border border-slate-800/90 p-3.5 flex items-center justify-center shrink-0 hover:border-amber-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md group"
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
                    className="w-40 sm:w-48 h-24 rounded-xl bg-slate-900/90 border border-slate-800/90 p-3.5 flex items-center justify-center shrink-0 hover:border-amber-500/60 hover:bg-slate-900 transition-all duration-300 shadow-md group"
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
