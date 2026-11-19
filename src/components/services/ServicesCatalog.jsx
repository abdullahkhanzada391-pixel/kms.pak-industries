import React from 'react';
import { ArrowUpRight, Check, Layers } from 'lucide-react';
import { allServices } from './ServicesData';

export default function ServicesCatalog({ onOpenModal }) {
  return (
    <section id="services-catalog" className="py-16 sm:py-20 lg:py-28 bg-[#F7F9FC] relative">
      {/* Decorative architectural background line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C8A34D]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102C4E] tracking-tight">
            Complete Industrial & Engineering Divisions
          </h2>
          
          <p className="text-base text-[#64748B] leading-relaxed">
            Every division is operated by certified engineers and equipped with dedicated fabrication bays, 
            testing apparatus, and round-the-clock maintenance infrastructure.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allServices.map((service) => {
            const IconComponent = service.icon || Layers;
            return (
              <div
                key={service.id}
                onClick={() => onOpenModal(service)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenModal(service);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${service.title} in full detail`}
                className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#C8A34D] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C8A34D]/50"
              >
                {/* Top Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center filter saturate-[1.05] transition-transform duration-500 group-hover:scale-108"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/services/generator-main.jpg';
                    }}
                  />
                  {/* Top Right: Minimal Line Icon Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-md text-[#102C4E] flex items-center justify-center shadow-md border border-white/40 group-hover:bg-[#102C4E] group-hover:text-[#C8A34D] transition-colors duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Title & Short Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#102C4E] group-hover:text-[#1E5A91] transition-colors duration-200 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* 3 Key Offerings list */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#102C4E]/80">
                      Key Capabilities:
                    </p>
                    <ul className="space-y-1">
                      {service.offerings.slice(0, 3).map((offering, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-[#172536] leading-tight">
                          <Check className="w-3.5 h-3.5 text-[#C8A34D] flex-shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="line-clamp-1">{offering}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA Interaction */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(service);
                      }}
                      className="group/btn inline-flex items-center gap-1.5 text-xs font-bold text-[#102C4E] hover:text-[#C8A34D] transition-colors duration-200"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A34D] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <span className="text-[10px] font-mono text-slate-400">
                      SPEC & BOQ
                    </span>
                  </div>

                </div>

                {/* Golden Bottom Highlight bar on Hover */}
                <div className="h-1 w-0 group-hover:w-full bg-[#C8A34D] transition-all duration-300" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
