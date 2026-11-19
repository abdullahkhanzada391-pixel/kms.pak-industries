import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall } from 'lucide-react';

export default function ServicesCTA() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#102C4E] text-white relative overflow-hidden">
      
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
        aria-hidden="true"
      />

      {/* Decorative Golden Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C8A34D]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          Let's Power Your Next Project.
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Speak with our engineering specialists to discuss your power generation, 
          electrical, solar, or fabrication requirements.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          
          {/* Primary CTA: "Request a Consultation" */}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#C8A34D] hover:bg-[#d8b45d] text-[#102C4E] font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl active:translate-y-0.5 w-full sm:w-auto min-h-[48px]"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Secondary CTA: "Contact Our Team" */}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm w-full sm:w-auto min-h-[48px]"
          >
            <PhoneCall className="w-4 h-4 text-[#C8A34D]" />
            <span>Contact Our Team</span>
          </Link>

        </div>

      </div>
    </section>
  );
}
