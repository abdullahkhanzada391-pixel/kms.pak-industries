import React from 'react';

export default function PageHeader({ title, highlight, subtitle }) {
  return (
    <div className="relative pt-28 sm:pt-36 pb-10 sm:pb-16 bg-gradient-to-b from-[#F8FAFC] via-white to-white border-b border-[#E2E8F0] overflow-hidden">
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[450px] h-[250px] bg-[#C59B27]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title with Editorial Serif */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B192C] tracking-tight leading-tight max-w-4xl">
          {title} {highlight && <span className="text-[#C59B27] block sm:inline font-sans font-extrabold">{highlight}</span>}
        </h1>

        {/* Subtitle with High-Readability Body Typography */}
        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#64748B] max-w-3xl leading-relaxed font-sans">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
