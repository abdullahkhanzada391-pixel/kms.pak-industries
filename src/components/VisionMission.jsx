import React, { useEffect, useRef } from 'react';
import { Compass, Target } from 'lucide-react';
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
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visionCardRef.current,
            start: 'top 82%',
          }
        }
      );

      // 3. Line-by-line reveal
      if (visionQuoteRef.current) {
        gsap.fromTo(
          visionQuoteRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visionQuoteRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      if (missionQuoteRef.current) {
        gsap.fromTo(
          missionQuoteRef.current.children,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionQuoteRef.current,
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
      id="vision-mission"
      className="relative py-16 sm:py-20 lg:py-28 bg-white border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-architectural-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12 lg:space-y-16">
        {/* Editorial Section Header */}
        <div ref={headerRef} className="max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#0B192C] tracking-tight leading-tight">
            Our Vision & Strategic Mission.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#64748B] leading-relaxed">
            Strategic pillars shaping our engineering discipline, client relationships, and nationwide technological advancement.
          </p>
        </div>

        {/* Distinct Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Vision Area (Col-Span-6) - Light Surface with Gold Accents */}
          <div
            ref={visionCardRef}
            className="lg:col-span-6 bg-[#F8FAFC] p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#E2E8F0] shadow-warm-md space-y-6 sm:space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4 sm:pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#E2E8F0] text-[#C59B27] shadow-sm">
                    <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#64748B] block">
                      Strategic Direction
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#0B192C]">
                      Our Vision
                    </h3>
                  </div>
                </div>
              </div>

              {/* Line-by-Line Typography Reveal Container */}
              <div ref={visionQuoteRef} className="border-l-2 border-[#C59B27] pl-4 sm:pl-5 py-1 space-y-2.5">
                <p className="text-sm sm:text-base lg:text-lg text-[#0B192C] leading-relaxed font-serif italic">
                  "HK Power Industries aspires for a leading market position by delivering best engineering services with customized products,
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#0B192C] leading-relaxed font-serif italic">
                  reinforcing national and international brand alliances,
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#0B192C] leading-relaxed font-serif italic">
                  and upholding best quality and ethical standards as the company's backbone of progressive growth."
                </p>
              </div>
            </div>
          </div>

          {/* Mission Area (Col-Span-6) - Deep Commanding Navy Surface with Gold Accents */}
          <div
            ref={missionCardRef}
            className="lg:col-span-6 bg-[#0B192C] text-white p-6 sm:p-8 lg:p-10 rounded-2xl border border-[#1E3A8A] shadow-warm-lg space-y-6 sm:space-y-8 flex flex-col justify-between"
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E3A8A] pb-4 sm:pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#060E18] border border-[#1E3A8A] text-[#F59E0B]">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-400 block">
                      Operational Purpose
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white">
                      Our Mission
                    </h3>
                  </div>
                </div>
              </div>

              {/* Line-by-Line Typography Reveal Container */}
              <div ref={missionQuoteRef} className="border-l-2 border-[#F59E0B] pl-4 sm:pl-5 py-1 space-y-2.5">
                <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-serif italic">
                  "To raise the level of customers' satisfaction by setting up to the mark through our services and backup support to our products,
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-serif italic">
                  grouping the qualified and experienced professionals as employees and vendors to conduct business with highest standards of quality, principles, and legitimacy,
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-white leading-relaxed font-serif italic">
                  besides being committed to continuous human and technological developments, and contribute for the welfare of the society and the nation."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
