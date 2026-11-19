import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun } from 'lucide-react';
import { featuredDivisions } from './ServicesData';

export default function FeaturedServices({ onOpenServiceModal }) {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-white relative overflow-hidden">
      
      {/* Decorative Blueprint Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 pointer-events-none hidden xl:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 sm:space-y-20 lg:space-y-24">
        
        {/* Section Intro */}
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#102C4E] tracking-tight">
            Featured Engineering Disciplines
          </h2>
          
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Take a deeper look at our core engineering specializations built to deliver multi-megawatt 
            power reliability, automated electrical distribution, and heavy industrial metalwork.
          </p>
        </div>

        {/* =========================================================================
            FEATURED SECTION A: Power Generation & Backup Solutions
           ========================================================================= */}
        <div className="relative rounded-3xl bg-[#F7F9FC] border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
          
          {/* Subtle Top-Right Accent Border */}
          <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-[#C8A34D] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Wide Industrial Generator Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-[16/11] bg-slate-900 group">
                <img
                  src="/assets/services/generator-main.jpg"
                  alt="KPS Heavy Power Generation and Backup Solutions"
                  className="w-full h-full object-cover object-center filter saturate-[1.08] transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/services/generator-heavy.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102C4E]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <p className="text-sm font-semibold text-white/95">
                    Synchronized Industrial Diesel Power Plants
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Split Layout Content */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102C4E] tracking-tight">
                  Power Generation & Backup Solutions
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
                  We engineer reliable power generation systems to prevent costly operational blackouts 
                  for manufacturing factories, hospitals, and high-load industrial infrastructures.
                </p>
              </div>

              {/* 4 Core Pillars Required: Sales & Rental, Maintenance, Spare Parts, AMC */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Generator Sales & Rental
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Brand-new and certified refurbished generators (15 kVA – 2500 kVA) available for immediate purchase or prime standby lease.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Generator Maintenance
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Computerized diagnostics, dynamometer load verification, engine overhauls, and preventative health checkups.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Spare Parts Supply
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    OEM genuine filters, electronic AVR modules, governors, sensors, and gaskets directly sourced from engine manufacturers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Annual Contracts (AMC)
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Guaranteed response SLA with periodic oil testing, scheduled technician visits, and round-the-clock emergency support.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#102C4E] hover:bg-[#1E5A91] text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm w-full sm:w-auto"
                >
                  <span>Request Generator Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A34D]" />
                </Link>

                <button
                  onClick={() => onOpenServiceModal && onOpenServiceModal(featuredDivisions[0])}
                  className="text-xs font-bold text-[#102C4E] hover:text-[#C8A34D] transition-colors py-1"
                >
                  View Technical Specs →
                </button>
              </div>

            </div>

          </div>
        </div>


        {/* =========================================================================
            FEATURED SECTION B: Electrical & Solar Engineering
           ========================================================================= */}
        <div className="relative rounded-3xl bg-[#F7F9FC] border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
          
          {/* Subtle Top-Left Accent Border */}
          <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-[#C8A34D] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#102C4E] tracking-tight">
                  Electrical & Solar Engineering
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] mt-2 leading-relaxed">
                  Combining precision switchgear distribution with commercial-grade solar photovoltaic 
                  plants to reduce peak utility reliance and stabilize energy budgets.
                </p>
              </div>

              {/* 4 Core Pillars: Electrical Panels, Power Distribution, Solar Energy Projects, Turnkey Engineering */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Electrical Panels
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Custom LT/HT switchgear, ATS/AMF panels, and capacitor banks built with 99.9% electrolytic copper busbars.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Power Distribution
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Comprehensive factory feeder pillars, distribution board boxes (DB boxes), and busbar trunking systems.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Solar Energy Projects
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Turnkey commercial and industrial rooftop arrays: on-grid, off-grid battery storage, and hybrid solar-diesel sync.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A34D]" />
                    <h4 className="text-xs font-bold text-[#102C4E] uppercase tracking-wider">
                      Turnkey Engineering
                    </h4>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Load auditing, single-line diagrams (SLD), net-metering approvals, structural calculations, and final commissioning.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#102C4E] hover:bg-[#1E5A91] text-white text-xs font-bold tracking-wide transition-all duration-200 shadow-sm w-full sm:w-auto"
                >
                  <span>Request Switchgear / Solar Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A34D]" />
                </Link>

                <button
                  onClick={() => onOpenServiceModal && onOpenServiceModal(featuredDivisions[1])}
                  className="text-xs font-bold text-[#102C4E] hover:text-[#C8A34D] transition-colors py-1"
                >
                  View IEC Standards →
                </button>
              </div>

            </div>

            {/* Right Column: Dual Images Layout (Electrical Switchgear + Solar Installation) */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Image 1: Electrical Switchgear */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-900 group">
                  <img
                    src="/assets/services/electrical-panel-switchgear.jpg"
                    alt="Low Tension and High Tension Electrical Panels"
                    className="w-full h-full object-cover filter saturate-[1.05] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/services/electrical-ats-panel.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-mono text-[#C8A34D] uppercase">LT & HT PANELS</p>
                    <p className="text-xs font-bold">IEC 61439 Switchboards</p>
                  </div>
                </div>

                {/* Image 2: Solar Installation */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md aspect-[4/3] bg-slate-900 group">
                  <img
                    src="/assets/services/solar-installation-commercial.jpg"
                    alt="Commercial Solar Photovoltaic Installation"
                    className="w-full h-full object-cover filter saturate-[1.05] transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/services/solar-panels-rooftop.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] font-mono text-[#C8A34D] uppercase">SOLAR PV SYSTEMS</p>
                    <p className="text-xs font-bold">Industrial Rooftop Solar</p>
                  </div>
                </div>

              </div>

              {/* Bottom Feature Callout */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs text-[#102C4E]">
                <span className="font-semibold flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#C8A34D]" />
                  Zero-Export Diesel Synchronization Available
                </span>
                <span className="font-mono text-[11px] text-[#64748B]">TIER-1 PV CELLS</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
