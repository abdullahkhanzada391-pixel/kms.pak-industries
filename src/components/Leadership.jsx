import React, { useEffect, useRef } from 'react';
import { UserCheck, Quote, Briefcase, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Leadership() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const leaders = [
    {
      name: 'Khalid Nazir',
      role: 'Chief Executive Officer',
      image: '/assets/team/khalid-nazir-ceo.jpg',
      quote: 'At Keen Power Solutions, we are committed to delivering reliable, innovative, and cost-effective energy solutions that empower businesses to grow without interruption. Our focus on quality, integrity, and customer satisfaction drives everything we do.',
      credentials: 'Executive Leadership & Strategic Direction'
    },
    {
      name: 'Humayun Saeed',
      role: 'Director',
      image: '/assets/team/humayun-saeed-director.jpg',
      quote: 'At Keen Power Solutions, we believe that every successful partnership begins with trust and a commitment to excellence. Our goal is to provide reliable energy solutions, exceptional service, and long-term value to every client we serve.',
      credentials: 'Operations, Brand Alliances & Engineering Oversight'
    }
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

      // 2. Executive Cards Staggered Entrance
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="leadership"
      className="relative py-24 sm:py-32 bg-[#181C1B] border-t border-[#343B37] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-industrial-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-[#174D38]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#174D38]/30 border border-[#216447]/60 text-[#E8ECE9] text-xs font-mono uppercase tracking-widest mb-4">
            <UserCheck className="w-3.5 h-3.5 text-[#216447]" />
            <span>Executive Governance</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight">
            Leadership Dedicated to Engineering Excellence.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#929A96]">
            Steered by industry professionals with decades of hands-on experience in power systems, electrical manufacturing, and nationwide project execution.
          </p>
        </div>

        {/* Minimal Charcoal Leadership Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-[#24282A] rounded-2xl border border-[#343B37] overflow-hidden shadow-2xl hover:border-[#216447] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-8 sm:p-10 space-y-6">
                {/* Header Profile Info */}
                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#216447] bg-[#111315] shrink-0 shadow-lg group-hover:border-[#2E8B62] transition-colors">
                    <img
                      src={leader.image}
                      alt={`${leader.name} - ${leader.role}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-[#2E8B62] uppercase block">
                      {leader.role}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E8ECE9] font-display">
                      {leader.name}
                    </h3>
                    <span className="text-xs text-[#929A96] font-mono block mt-1">
                      {leader.credentials}
                    </span>
                  </div>
                </div>

                {/* Minimal Charcoal Quote Box */}
                <div className="relative bg-[#181C1B] p-5 rounded-xl border border-[#343B37]">
                  <Quote className="w-6 h-6 text-[#216447]/40 absolute top-3 right-3" />
                  <p className="text-xs sm:text-sm text-[#929A96] italic leading-relaxed relative z-10">
                    "{leader.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Footer Strip */}
              <div className="px-8 py-3.5 bg-[#111315] border-t border-[#343B37] flex items-center justify-between text-xs font-mono text-[#929A96]">
                <span>KEEN POWER SOLUTIONS</span>
                <span className="text-[#2E8B62] font-semibold">Lahore, Pakistan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
