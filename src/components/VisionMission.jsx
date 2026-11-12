import React, { useEffect, useRef } from 'react';
import { Compass, Target, Sparkles, CheckCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionMission() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const visionCardRef = useRef(null);
  const missionCardRef = useRef(null);
  const visionQuoteRef = useRef(null);
  const missionQuoteRef = useRef(null);
  const visionListRef = useRef(null);
  const missionListRef = useRef(null);

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

      // 2. Vision & Mission Cards staggered entrance
      gsap.fromTo(
        [visionCardRef.current, missionCardRef.current],
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visionCardRef.current,
            start: 'top 82%',
          }
        }
      );

      // 3. Line-by-line typography reveal in Vision Quote
      if (visionQuoteRef.current) {
        gsap.fromTo(
          visionQuoteRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visionQuoteRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 4. Line-by-line typography reveal in Mission Quote
      if (missionQuoteRef.current) {
        gsap.fromTo(
          missionQuoteRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionQuoteRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // 5. Checklist items staggered
      if (visionListRef.current) {
        gsap.fromTo(
          visionListRef.current.children,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visionListRef.current,
              start: 'top 90%',
            }
          }
        );
      }

      if (missionListRef.current) {
        gsap.fromTo(
          missionListRef.current.children,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionListRef.current,
              start: 'top 90%',
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
      className="relative py-24 sm:py-32 bg-[#111315] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#174D38]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#B51F32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#216447]" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
            Our Vision & Mission.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#929A96]">
            Strategic pillars shaping our engineering discipline, client relationships, and technological advancement.
          </p>
        </div>

        {/* Editorial Two-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Card: Forest Green Accents */}
          <div
            ref={visionCardRef}
            className="relative bg-gradient-to-br from-[#24282A] to-[#181C1B] p-8 sm:p-10 rounded-2xl border border-[#343B37] shadow-2xl space-y-6 group hover:border-[#216447] transition-all duration-300 will-change-transform"
          >
            <div className="flex items-center justify-between border-b border-[#343B37] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#174D38]/30 border border-[#216447]/50 text-[#2E8B62]">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#929A96] block">
                    Strategic Direction
                  </span>
                  <h3 className="text-2xl font-bold text-[#E8ECE9] font-display">
                    Our Vision
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#2E8B62] bg-[#111315] px-3 py-1 rounded-lg border border-[#343B37]">
                ASPIRATION
              </span>
            </div>

            {/* Line-by-Line Typography Reveal Container */}
            <div ref={visionQuoteRef} className="border-l-2 border-[#216447] pl-4 py-1 space-y-2">
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                "KPS aspires for a leading market position by delivering best engineering services with customized products,
              </p>
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                reinforcing national and international brand alliances,
              </p>
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                and upholding best quality and ethical standards as the company's backbone of progressive growth."
              </p>
            </div>

            <div ref={visionListRef} className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#216447] shrink-0" />
                <span>Market leadership through customized engineering solutions</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#216447] shrink-0" />
                <span>Reinforcing world-class brand partnerships (Perkins, Lovol, Weichai)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#216447] shrink-0" />
                <span>Uncompromising ethical and technical quality standards</span>
              </div>
            </div>
          </div>

          {/* Mission Card: Crimson Accents */}
          <div
            ref={missionCardRef}
            className="relative bg-gradient-to-br from-[#24282A] to-[#181C1B] p-8 sm:p-10 rounded-2xl border border-[#343B37] shadow-2xl space-y-6 group hover:border-[#B51F32]/60 transition-all duration-300 will-change-transform"
          >
            <div className="flex items-center justify-between border-b border-[#343B37] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#B51F32]/15 border border-[#B51F32]/40 text-[#E83E55]">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#929A96] block">
                    Operational Purpose
                  </span>
                  <h3 className="text-2xl font-bold text-[#E8ECE9] font-display">
                    Our Mission
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#E83E55] bg-[#111315] px-3 py-1 rounded-lg border border-[#343B37]">
                COMMITMENT
              </span>
            </div>

            {/* Line-by-Line Typography Reveal Container */}
            <div ref={missionQuoteRef} className="border-l-2 border-[#B51F32] pl-4 py-1 space-y-2">
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                "To raise the level of customers' satisfaction by setting up to the mark through our services and backup support to our products,
              </p>
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                grouping the qualified and experienced professionals as employees and vendors to conduct business with highest standards of quality, principles, and legitimacy,
              </p>
              <p className="text-base sm:text-lg text-[#E8ECE9] leading-relaxed font-normal italic">
                besides being committed to continuous human and technological developments, and contribute for the welfare of the society and the nation."
              </p>
            </div>

            <div ref={missionListRef} className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#B51F32] shrink-0" />
                <span>Customer satisfaction through relentless backup and lifecycle support</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#B51F32] shrink-0" />
                <span>Empowering certified engineering talent and ethical vendors</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#929A96]">
                <CheckCheck className="w-4 h-4 text-[#B51F32] shrink-0" />
                <span>Continuous technological development contributing to societal welfare</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
