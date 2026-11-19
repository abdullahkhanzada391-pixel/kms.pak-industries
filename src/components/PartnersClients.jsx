import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PartnersClients() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  // Verified Client & Corporate Partner Accounts
  const clientAccounts = [
    { id: 1, name: 'Nishat Group', sector: 'Textile & Conglomerates', file: 'client-partner-1.jpg' },
    { id: 2, name: 'Gourmet Foods', sector: 'Food & FMCG Network', file: 'client-partner-2.jpg' },
    { id: 3, name: 'Shaukat Khanum Hospital', sector: 'Healthcare & Research', file: 'client-partner-3.jpg' },
    { id: 4, name: 'Aga Khan University Hospital', sector: 'Healthcare & Medical', file: 'client-partner-4.jpg' },
    { id: 5, name: 'ICL (Interloop)', sector: 'Industrial Manufacturing', file: 'client-partner-5.jpg' },
    { id: 6, name: 'Taiga Apparel', sector: 'Textile & Garments', file: 'client-partner-6.jpg' },
    { id: 7, name: 'Lahore Stock Exchange', sector: 'Financial Institutions', file: 'client-partner-7.jpg' },
    { id: 8, name: 'Nizam Apparel', sector: 'Textile & Garments', file: 'client-partner-8.jpg' },
    { id: 9, name: 'PTCL', sector: 'Telecom & Infrastructure', file: 'client-partner-9.jpg' },
    { id: 10, name: 'Zong 4G', sector: 'Telecom & Infrastructure', file: 'client-partner-10.jpg' },
    { id: 11, name: 'Outfitters', sector: 'Retail & Fashion', file: 'client-partner-11.jpg' },
    { id: 12, name: 'Azgard-9', sector: 'Textile & Conglomerates', file: 'client-partner-12.jpg' },
    { id: 13, name: 'PepsiCo Pakistan', sector: 'Food & FMCG Network', file: 'client-partner-13.jpg' },
    { id: 14, name: 'ZTE Corporation', sector: 'Telecom & Systems', file: 'client-partner-14.jpg' },
    { id: 15, name: 'Ufone GSM', sector: 'Telecom & Infrastructure', file: 'client-partner-15.jpg' },
    { id: 16, name: "Salt'n Pepper Village", sector: 'Food & Hospitality', file: 'client-partner-16.jpg' },
    { id: 17, name: 'Bundu Khan Restaurant', sector: 'Food & Hospitality', file: 'client-partner-17.jpg' },
    { id: 18, name: 'Savour Foods', sector: 'Food & Hospitality', file: 'client-partner-18.jpg' },
    { id: 19, name: 'LACAS College', sector: 'Education & Institutional', file: 'client-partner-19.jpg' },
    { id: 20, name: 'Pharmagen Limited', sector: 'Pharmaceuticals', file: 'client-partner-20.jpg' },
    { id: 21, name: 'Al Khair Group', sector: 'Industrial Manufacturing', file: 'client-partner-21.jpg' },
    { id: 22, name: 'BNU (Beaconhouse)', sector: 'Education & Institutional', file: 'client-partner-22.jpg' },
    { id: 23, name: 'Ideas by Gul Ahmed', sector: 'Retail & Fashion', file: 'client-partner-23.jpg' },
    { id: 24, name: 'Meezan Bank', sector: 'Financial Institutions', file: 'client-partner-24.jpg' },
    { id: 25, name: 'Mass Pharma (Pvt) Ltd.', sector: 'Pharmaceuticals', file: 'client-partner-25.jpg' },
    { id: 28, name: 'Cummins Power Systems', sector: 'OEM Technology Partner', file: 'client-partner-28.jpg' },
    { id: 29, name: 'Lovol Heavy Industry', sector: 'OEM Technology Partner', file: 'client-partner-29.jpg' },
    { id: 30, name: 'Weichai Power Group', sector: 'OEM Technology Partner', file: 'client-partner-30.jpg' },
    { id: 31, name: 'Deep Sea Electronics', sector: 'OEM Technology Partner', file: 'client-partner-31.jpg' },
    { id: 32, name: 'Schneider Electric', sector: 'OEM Technology Partner', file: 'client-partner-32.jpg' },
    { id: 33, name: 'ABB Switchgear', sector: 'OEM Technology Partner', file: 'client-partner-33.jpg' }
  ];

  const half = Math.ceil(clientAccounts.length / 2);
  const row1Logos = clientAccounts.slice(0, half);
  const row2Logos = clientAccounts.slice(half);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header Reveal
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="partners"
      className="relative py-16 sm:py-20 lg:py-28 bg-white border-t border-[#E2E8F0] overflow-hidden"
    >
      {/* Background Lighting Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#0B192C]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight">
            Trusted by 100+ Industry Leaders Across Pakistan.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-[#334155] leading-relaxed">
            Forging enduring alliances with global power equipment manufacturers and delivering continuous energy uptime to leading industrial conglomerates, textile mills, premier medical centers, FMCG brands, and financial institutions nationwide.
          </p>
        </div>

        {/* Continuous Gliding Marquee */}
        <div className="relative overflow-hidden marquee-mask pause-on-hover py-2 space-y-4">
          {/* Track 1: Gliding Left */}
          <div className="overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-6 items-center">
              {row1Logos.map((item) => (
                <div
                  key={`r1-a-${item.id}`}
                  className="w-32 sm:w-44 md:w-48 h-20 sm:h-24 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C59B27] p-3 sm:p-4 flex items-center justify-center shrink-0 shadow-warm-xs transition-colors"
                >
                  <img
                    src={`/assets/clients/${item.file}`}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate set for infinite loop */}
              {row1Logos.map((item) => (
                <div
                  key={`r1-b-${item.id}`}
                  className="w-32 sm:w-44 md:w-48 h-20 sm:h-24 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C59B27] p-3 sm:p-4 flex items-center justify-center shrink-0 shadow-warm-xs transition-colors"
                >
                  <img
                    src={`/assets/clients/${item.file}`}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Track 2: Gliding Right */}
          <div className="overflow-hidden">
            <div className="animate-marquee-right flex gap-4 sm:gap-6 items-center">
              {row2Logos.map((item) => (
                <div
                  key={`r2-a-${item.id}`}
                  className="w-32 sm:w-44 md:w-48 h-20 sm:h-24 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C59B27] p-3 sm:p-4 flex items-center justify-center shrink-0 shadow-warm-xs transition-colors"
                >
                  <img
                    src={`/assets/clients/${item.file}`}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate set for infinite loop */}
              {row2Logos.map((item) => (
                <div
                  key={`r2-b-${item.id}`}
                  className="w-32 sm:w-44 md:w-48 h-20 sm:h-24 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C59B27] p-3 sm:p-4 flex items-center justify-center shrink-0 shadow-warm-xs transition-colors"
                >
                  <img
                    src={`/assets/clients/${item.file}`}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
