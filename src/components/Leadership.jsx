import React, { useEffect, useRef } from 'react';
import { Quote, Briefcase, Award } from 'lucide-react';
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
      quote: 'At HK Power Industries, we are committed to delivering reliable, innovative, and cost-effective energy solutions that empower businesses to grow without interruption. Our focus on quality, integrity, and customer satisfaction drives everything we do.',
      credentials: 'Executive Leadership & Strategic Direction'
    },
    {
      name: 'Humayun Saeed',
      role: 'Director',
      image: '/assets/team/humayun-saeed-director.jpg',
      quote: 'At HK Power Industries, we believe that every successful partnership begins with trust and a commitment to excellence. Our goal is to provide reliable energy solutions, exceptional service, and long-term value to every client we serve.',
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
      className="relative py-16 sm:py-20 lg:py-28 bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Architectural Grid Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/3 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
            Leadership Dedicated to Engineering Excellence.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#64748B] leading-relaxed">
            Steered by industry professionals with decades of hands-on experience in power systems, electrical manufacturing, and nationwide project execution.
          </p>
        </div>

        {/* Leadership Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-8">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-warm-lg hover:border-[#C59B27] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                {/* Header Profile Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 aspect-square rounded-2xl overflow-hidden border-2 border-[#E2E8F0] bg-white shrink-0 shadow-md group-hover:border-[#C59B27] transition-colors">
                    <img
                      src={leader.image}
                      alt={`${leader.name} - ${leader.role}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-bold tracking-wider text-[#C59B27] uppercase block">
                      {leader.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#0B192C]">
                      {leader.name}
                    </h3>
                    <span className="text-xs text-[#64748B] font-mono block mt-1">
                      {leader.credentials}
                    </span>
                  </div>
                </div>

                {/* Quote Box */}
                <div className="relative bg-[#F8FAFC] p-4 sm:p-5 rounded-xl border border-[#E2E8F0]">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#C59B27]/40 absolute top-3 right-3" />
                  <p className="text-xs sm:text-sm text-[#334155] italic leading-relaxed relative z-10">
                    "{leader.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Footer Strip */}
              <div className="px-6 sm:px-8 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span className="font-bold text-[#0B192C]">HK POWER INDUSTRIES</span>
                <span className="text-[#C59B27] font-semibold">Lahore, Pakistan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
