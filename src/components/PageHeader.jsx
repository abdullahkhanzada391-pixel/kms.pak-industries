import React from 'react';

export default function PageHeader({ title, highlight, subtitle }) {
  return (
    <div className="relative pt-32 sm:pt-36 pb-14 sm:pb-16 bg-gradient-to-b from-[#111315] via-[#111315] to-[#181C1B] border-b border-[#343B37] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-industrial-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#174D38]/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8ECE9] font-display tracking-tight leading-tight max-w-4xl">
          {title} {highlight && <span className="text-forest-gradient block sm:inline">{highlight}</span>}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#929A96] max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
